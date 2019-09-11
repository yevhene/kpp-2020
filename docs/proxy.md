# Налаштування proxy у ВНТУ

Хост: proxy.lan
Порт: 3128

## Linux

### Браузер
Через налаштування мережі.

### npm
Виконати у терміналі команди:
```
npm config set proxy http://proxy.lan:3128
npm config set https-proxy http://proxy.lan:3128
```

### Термінал
Додати у файл:
```
/etc/environment
```

Стрічки:
```
export http_proxy=http://proxy.lan:3128/
export https_proxy=http://proxy.lan:3128/
export ftp_proxy=http://proxy.lan:3128/
export socks_proxy=http://proxy.lan:3128/
```

### Менеджер пакетів APT
Створити файл:
```
/etc/apt/apt.conf.d/40proxy
```

Додати стрічки:
```
Acquire::http::Proxy "http://proxy.lan:3128";
Acquire::https::Proxy "http://proxy.lan:3128";
```

## Windows
Через панель управління.
