# ГЕОСТРОЙПРОЕКТ - Next.js App

Профессиональный сайт геодезической компании, созданный в Firebase Studio.

## Как выгрузить проект на GitHub

1. Создайте новый репозиторий на [GitHub](https://github.com/new).
2. Откройте терминал в корневой папке проекта.
3. Выполните следующие команды:

```bash
# Инициализация репозитория (если еще не сделано)
git init

# Добавление всех файлов
git add .

# Создание первого коммита
git commit -m "Initial commit from Firebase Studio"

# Переименование ветки в main
git branch -M main

# Привязка удаленного репозитория (замените URL на свой)
git remote add origin https://github.com/ВАШ_ЛОГИН/ВАШ_РЕПОЗИТОРИЙ.git

# Отправка кода в GitHub
git push -u origin main
```

## Технологии

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Icons:** Lucide React
- **Analytics:** Yandex Metrika
- **Backend Services:** Firebase (Auth, Firestore)
