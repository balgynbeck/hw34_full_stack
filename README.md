# Task Management API

Backend-приложение на NestJS с JWT аутентификацией.

## Технологии

- NestJS
- Prisma ORM
- PostgreSQL
- JWT (Access + Refresh токены)
- Argon2
- Swagger

## Установка

```bash
npm install
```

## Настройка окружения

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
```

## База данных

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Запуск

```bash
npm run start:dev
```

## Swagger документация

```
http://localhost:3000/api
```

## API эндпоинты

### Auth

| Метод | URL | Описание |
|-------|-----|----------|
| POST | /auth/register | Регистрация |
| POST | /auth/login | Вход |
| POST | /auth/refresh | Обновление токена |
| POST | /auth/me | Текущий пользователь |

### Boards (требует Access Token)

| Метод | URL | Описание |
|-------|-----|----------|
| POST | /boards | Создать доску |
| GET | /boards | Все доски |
| GET | /boards/:id | Доска по ID |
| DELETE | /boards/:id | Удалить доску |

## Пример использования

### Регистрация

```json
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123"
}
```

Ответ:
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

### Защищённый запрос

```
Authorization: Bearer <accessToken>
GET /boards
```
