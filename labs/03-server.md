# Лабораторна 2: Розробка серверної аплікації

## Основні положення

### Мета
Розробити серверну аплікацію.

### Завдання
Обрати одну з задач або узгодити свою тему з викладачем:
- StackOverflow - будь-яка людина може задати питання і будь-яка відповісти. Без реєстрації, просто вказавши своє ім'я в формі;
- Система керування задачами - створення, редагування, видалення, відмітка про виконання задач;
- Блог - створення посту, коментування, адмінка автора блогу.

## Express

### Інсталяція
```
$ npm install --save express
```

### Ініціалізація
```javascript
const express = require('express');

const app = express();
```

### Обробка запиту
```javascript
app.get('/tasks', function(req, res) {
  res.send('Немає задач на сьогодні!');
});
```
Зверніть увагу що замість `get`, можна використати будь який з стандартних http методів: `post`, `put` або `del` ля `delete`.
Зазвичай для отримання даних використовується `get`, для створення `post`, для оновлення `put`, для видалення `del`.

### Обробка параметрів
```javascript
app.get('/tasks/:id', function(req, res) {
  res.send(`Ви хочете отримати задачу з id=${req.params.id}!`);
});
```
Для обробки параметрів перданих через `?` використовується об'єкт `req.query`.

### Відправка статусу
```javascript
res.sendStatus(201);
```

### Відправка тіла
```javascript
res.send({ name: 'Задача' });
```

### Обробка статичних файлів
```javascript
app.use('/', express.static(__dirname + '/static'));
```

### Запуск сервера
```javascript
app.listen(3000);
```
Сервер запуститься на `3000` порту.

## Використання шаблонів

### Інсталяція
```
npm install --save ejs
```

### Інтеграція з express
```javascript
app.set('view engine', 'ejs');
```

### Визначення директорії
```javascript
app.set('views', __dirname + '/views');
```

### Використання
```javascript
res.render('tasks/show', { name: 'Задача' });
```

## Body parser
Необхідний для обробки тіл запитів.

### Інсталяція
```
npm install --save body-parser
```

### Інтеграція з express
```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
```

### Доступ до тіла
```javascript
app.post('/tasks', function(req, res) {
  res.send(`Ви хочете створити задачу з ім\'ям ${req.body.name}!`);
});
```

## MongoDB
Документо-орієнтована база даних.

### Інсталяція бази даних
З [сайту](https://www.mongodb.com/download-center#community).

#### Linux
```
$ sudo apt install mongodb
```

### Інсталяція драйверу
```
$ npm install --save mongodb
```

### Під'єднання
```javascript
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoUrl = 'mongodb://localhost:27017/02-server';
let mongo;
MongoClient
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(function(client) {
    mongo = client.db();
  });
```
Зверніть увагу на `mongoUrl`:
- `localhost:27017` - очікує на те що база розгорнута локально на порту `27017`. Це стандартний порт. Якщо ви його при інсталяції змінили вкажіть свій порт.
- `02-server` - назва бази даних, якщо такой немає вона створиться автоматично.

### Отримання списку
```javascript
mongo
  .collection('tasks')
  .find().toArray()
  .then(function(tasks) {
    // Робота зі списком tasks
  });
```
`collection` - вказує назву колекції (аналог в реляційних базах даних "таблиця").

### Пошук елементів
```javascript
mongo
  .collection('tasks')
  .find({ name: 'Задача1' }).toArray()
  .then(function(task) {
    // Робота зі списком tasks
  });
```
Знаходить всі задачі з ім'ям 'Задача1'.

### Пошук одного елементу
```javascript
mongo
  .collection('tasks')
  .findOne({ name: 'Задача1' })
  .then(function(task) {
    // Робота з task
  });
```
Повертаю першу знайдену задачу з ім'ям 'Задача1'.

### Пошук одного елементу по ідентифікатору
```javascript
const ObjectId = mongodb.ObjectId;

mongo
  .collection('tasks')
  .findOne({ _id: ObjectId(req.params.id) })
  .then(function(task) {
    // Робота з task
  });
```
Повертаю першу знайдену задачу з ім'ям 'Задача1'.

### Створення
```javascript
mongo
  .collection('tasks')
  .insertOne({ name: 'Нова задача' })
  .then(function() {
    // Виконується після створення
  });
```

### Оновлення
```javascript
mongo
  .collection('tasks')
  .updateOne({ name: 'Задача1' }, { name: 'Задача2' })
  .then(function() {
    // Виконується після оновлення
  });
```
Змінює ім'я всіх задач 'Задача1', на 'Задача2'.

### Видалення
```javascript
mongo
  .collection('tasks')
  .deleteOne({ name: 'Задача1' })
  .then(function() {
    // Виконується після видалення
  });
```
Видаляє всі задачі з ім'ям 'Задача1'.

## Ресурс
| Дія               | Метод    | Шлях               | Функція | Шаблон    |
|------------------ |--------- |------------------- |-------- |---------- |
| Список            | GET      | /tasks             | index   | index.ejs |
| Форма створення   | GET      | /tasks/new         | new     | new.ejs   |
| Створення         | POST     | /tasks             | create  | -         |
| Перегляд          | GET      | /tasks/:id         | show    | show.ejs  |
| Форма редагування | GET      | /tasks/:id/edit    | edit    | edit.ejs  |
| Збереження        | PUT      | /tasks/:id         | update  | -         |
| Видалення         | DELETE   | /tasks/:id         | destroy | -         |
| Або:                                                                    |
| Збереження        | POST     | /tasks/:id/update  | update  | -         |
| Видалення         | GET/POST | /tasks/:id/destroy | destroy | -         |
