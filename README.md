# ShopTop Fullstack

Полностью рабочая версия ShopTop без demo-режима.

## Что изменилось

- Нет seed/demo витрин.
- Пользователь регистрируется сам.
- При регистрации создается первая пустая витрина.
- Витрина, товары, активные 5 товаров, комментарии, лайки и клики сохраняются в общей SQLite-базе.
- Все посетители видят добавленные витрины.
- GitHub Pages для такой версии не подходит, потому что Pages не запускает backend и не хранит общую базу.

## Локальный запуск

```bash
npm install
npm run dev
```

Адреса:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

SQLite-база появится здесь:

```text
data/shoptop.sqlite
```

## Деплой

Эту версию нужно размещать как Node.js-приложение на VPS, Render, Railway, Fly.io или другом хостинге с постоянным диском для SQLite.

Для production:

```bash
npm install
npm run build --prefix client
npm start
```

Сервер будет отдавать собранный frontend из `client/dist` и API из Express.

## Docker

```bash
docker build -t shoptop .
docker run -p 4000:4000 -v shoptop-data:/app/data shoptop
```

После запуска сайт будет доступен на `http://localhost:4000`.
