> # Вёрстка расчитана только на мобильную версию, целью было лишь протестировать возможности Nuxt и Vue

## Особенности
- SSR web-интерфейс
- Vue
- Хранение данных о товарах и пользователях в Supabase
- Библиотека стилей Tailwind

## Возможности
- Формирование страниц статей из обычных markdown файлов
- Аутентификация
- Поиск среди товаров

# Запуск проекта после скачивания репозитория

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server (для простого просмотра нужен этот сценарий)

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## .env
> в репозитории есть файл [`preview.env`](/preview.env), нужно в названии оставить только `.env`

```env
SUPABASE_URL=
SUPABASE_KEY=
```
