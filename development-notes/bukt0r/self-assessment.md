# Self-Assessment — bukt0r

## 1. Таблица фич

| Категория | Фича | Баллы | Ссылки на код |
|-----------|------|------:|---------------|
| **My Components** | Complex Component: Quiz System — интерактивный квиз со стейт-машиной, таймером обратного отсчёта, выбором ответа, подсчётом баллов, звуковыми эффектами, экранами старта/результатов/перезапуска | +25 | [QuizPage.tsx](../../app/src/pages/QuizPage.tsx), [useCountdown.ts](../../app/src/shared/useCountdown.ts), [quizSfxAudio.ts](../../app/src/shared/quizSfxAudio.ts), [quiz model](../../app/src/entities/quiz/) |
| **My Components** | Rich UI Screen: QuestionsPage — библиотека вопросов с фильтрацией по категории, текстовым поиском с debounce, статусами знания, избранным, управлением пользовательскими вопросами | +20 | [QuestionsPage.tsx](../../app/src/pages/QuestionsPage.tsx), [questionsApi.ts](../../app/src/entities/question/api/questionsApi.ts) |
| **My Components** | Rich UI Screen: StatisticsPage — дашборд с прогресс-баром обучения, графиком точности (Recharts), историей квизов, карточками-счётчиками | +20 | [StatisticsPage.tsx](../../app/src/pages/StatisticsPage.tsx), [statisticsService.ts](../../app/src/entities/statistics/statisticsService.ts) |
| **Backend & Data** | Custom Auth: клиентская авторизация (SHA-256 через crypto.subtle + сессия + route protection через AuthGate) без BaaS | +20 | [authService.ts](../../app/src/entities/auth/authService.ts), [AuthProvider.tsx](../../app/src/entities/auth/AuthProvider.tsx), [LoginPage.tsx](../../app/src/pages/LoginPage.tsx), [App.tsx](../../app/src/App.tsx) |
| **Game** | Audio API: звуковые эффекты квиза через Web Audio API (OscillatorNode, GainNode) + озвучивание вопросов через Web Speech Synthesis API | +5 | [quizSfxAudio.ts](../../app/src/shared/quizSfxAudio.ts), [useSpeech.ts](../../app/src/shared/useSpeech.ts), [QuizSoundToggle.tsx](../../app/src/ui/QuizSoundToggle.tsx) |
| **UI & Interaction** | Theme Switcher: Light/Dark тема через CSS variables + React Context с сохранением в localStorage | +10 | [useTheme.ts](../../app/src/shared/useTheme.ts), [ThemeToggle.tsx](../../app/src/ui/ThemeToggle.tsx) |
| **UI & Interaction** | i18n: локализация на 2 языка (RU/EN) с переключением, двуязычная модель данных вопросов | +10 | [i18n.ts](../../app/src/i18n/i18n.ts), [ru.ts](../../app/src/i18n/locales/ru.ts), [en.ts](../../app/src/i18n/locales/en.ts), [LanguageToggle.tsx](../../app/src/ui/LanguageToggle.tsx) |
| **UI & Interaction** | Accessibility: aria-labels, keyboard navigation (Enter/Space на QuestionCard), семантический HTML, role="button" | +10 | [QuestionCard.tsx](../../app/src/ui/QuestionCard.tsx), [QuizPage.tsx](../../app/src/pages/QuizPage.tsx) |
| **UI & Interaction** | Responsive: адаптивная вёрстка через Tailwind (sm: breakpoints, flex-wrap, адаптивные grid-ы) | +5 | [StatisticsPage.tsx](../../app/src/pages/StatisticsPage.tsx), [QuestionsPage.tsx](../../app/src/pages/QuestionsPage.tsx), [QuizPage.tsx](../../app/src/pages/QuizPage.tsx) |
| **Quality** | Unit Tests (Basic): тесты на Vitest — toQuestion, getApiBaseUrl, fetchQuestions | +10 | [toQuestion.test.ts](../../app/src/features/questions/toQuestion.test.ts), [questions.test.ts](../../app/src/api/questions.test.ts), [config.test.ts](../../app/src/api/config.test.ts) |
| **DevOps & Role** | Auto-deploy: Vercel + GitHub Actions CI | +5 | [PR #11](https://github.com/bukt0r/Final-Project-Tandem/pull/11) |
| **Architecture** | API Layer: выделенный слой данных questionsApi / statisticsService, изолированный от UI | +10 | [questionsApi.ts](../../app/src/entities/question/api/questionsApi.ts), [statisticsService.ts](../../app/src/entities/statistics/statisticsService.ts), [storage.ts](../../app/src/shared/storage.ts) |
| **Architecture** | Design Patterns: Context (AuthContext, QuizSfxContext), Custom Hooks (useCountdown, useSpeech, useDebounce, useTheme, useQuizSfx), Module pattern (quizSfxAudio) | +10 | [shared/](../../app/src/shared/), [entities/auth/](../../app/src/entities/auth/) |
| **Frameworks** | React | +5 | — |
| | **ИТОГО** | **165** | |

> Максимум в зачёт: 250 баллов. Моя заявленная сумма — **165**.

---

## 2. Описание работы

### Роль в проекте

Я работал над фронтенд-частью приложения **Tech Interview Trainer** — тренажёра для подготовки к техническим собеседованиям. Проект разрабатывался в команде из трёх человек, но в итоге я заканчивал работу самостоятельно. Я отвечал за настройку проекта, архитектуру фронтенда, и реализацию основных интерактивных фич.

### Хронология и ключевые этапы

**Неделя 1–2 (11–27 февраля):** Обсуждение идей, выбор концепции (тренажёр для собеседований по типу yeahub.ru), создание репозитория. Я выполнил полную настройку проекта: `npm create vite@latest` с React + TypeScript, строгий TypeScript, ESLint с type-aware правилами, Husky pre-commit хуки, TailwindCSS через PostCSS, Prettier. Столкнулся с EPERM-ошибкой npm, решил переключением npm cache. Настроил CI/CD через GitHub Actions и деплой на Vercel.

**Неделя 3 (1–7 марта):** Реализовал модуль маршрутизации. Создал `routePaths.ts` с типизированными константами путей, `router.tsx` на `createBrowserRouter` с `React.lazy` для code splitting. Написал хелпер `lazyPage` для типизированного lazy loading. Создал Layout с Header и навигацией через NavLink. Записал демо-видео.

**Неделя 4 (9–16 марта):** Создал модель данных `Question`, API-слой (`questionsApi.ts`), UI-компоненты `DifficultyBadge` и `QuestionCard`. Провёл код-ревью бэкенда коллеги (NestJS, Prisma) — нашёл проблему с порядком роутов, несогласованность форматов ответов. Написал первые тесты на Vitest. Создал mock-базу из 20 вопросов. Реализовал API с методами `getQuestions`, `getQuestionById`, `getQuestionsByCategory`, `searchQuestions`.

**Неделя 5 (22–24 марта):** Ключевой рефакторинг: отказ от сервера в пользу mock-данных (решение команды из-за сроков). Реализовал обработку ошибок (NotFoundPage, RouteErrorFallback, Loader, ErrorMessage), pre-loader до загрузки React, фикс stale content при навигации через `key={location.pathname}`. Добавил flip-логику для QuestionCard с клавиатурной доступностью. Реализовал систему фильтрации: категории, текстовый поиск с debounce. Статусы знания (знаю/не знаю) с сохранением в localStorage. Избранное с отдельной страницей. Квиз (QuizPage) с рандомизацией вопросов, выбором ответов, подсчётом баллов. Статистика с историей и графиком точности (Recharts). Форма добавления вопросов. Тёмная тема через Tailwind dark mode с сохранением в localStorage. **Кастомный хук `useCountdown`** для таймера квиза с цветовой индикацией (зелёный → жёлтый → красный). i18n на два языка (RU/EN). **Хук `useSpeech`** для озвучивания вопросов через Web Speech API. Подсветка синтаксиса кода через Prism.js.

**Неделя 6 (29 марта):** Перевёл все 64 вопроса на два языка (двуязычная структура `{ ru, en }`). Добавил экран старта квиза (кнопка «Начать» вместо автозапуска таймера) и кнопку «Начать сначала». Реализовал **звуковые эффекты через Web Audio API** (OscillatorNode + GainNode): звук старта, правильного и неправильного ответа. Решил проблему двойного проигрывания звуков в React Strict Mode через механизм дедупликации (session counter + dedup key). Глобальный контекст звука с кнопкой mute в шапке (только на странице квиза).

**Неделя 7 (5 апреля):** Клиентская авторизация: SHA-256 хэширование паролей через `crypto.subtle`, `AuthService`, `AuthContext` + `AuthProvider`, `AuthGate` для защиты роутов. Изоляция данных по пользователям через `loadUserStorage`/`saveUserStorage` с пользовательским префиксом. Исправление интеграции пользовательских вопросов (приведение к формату `QuestionSource`, обратная совместимость со старыми данными через `resolveTags`/`resolveText`). Удаление пользовательских вопросов с каскадным удалением категорий. Прогресс обучения на странице статистики. Визуальное разделение статистики на два блока (обучение и квиз). Автоматический показ нового вопроса после отметки «знаю/не знаю» с сбросом карточки на сторону вопроса.

### Инструменты и технологии

- **Фреймворк:** React 19 + TypeScript (strict mode)
- **Сборка:** Vite
- **Стили:** TailwindCSS + PostCSS + CSS Variables (OKLCH)
- **Маршрутизация:** react-router-dom (createBrowserRouter, lazy loading)
- **Локализация:** react-i18next (RU/EN)
- **Графики:** Recharts
- **Звук:** Web Audio API (OscillatorNode, GainNode), Web Speech Synthesis API
- **Тестирование:** Vitest
- **Качество кода:** ESLint (type-aware), Prettier, Husky pre-commit
- **Деплой:** Vercel + GitHub Actions
- **AI:** Cursor (для отладки и рефакторинга), ChatGPT (генерация контента вопросов, цветовая тема, помощь с debugging)

### Что было сложным

- **React Strict Mode + звуки:** компоненты монтируются дважды, что приводило к двойному проигрыванию звуков. Решил через модульный счётчик сессий и ключ дедупликации.
- **Совместимость данных:** после добавления двуязычной структуры, старые пользовательские вопросы (плоский формат) вызывали краш. Решил через `resolveTags`/`resolveText` с fallback-значениями.
- **Управление состоянием квиза:** пересечение состояний (started, idle, answered, timeout, finished) требовало аккуратной композиции useEffect-хуков.
- **Архитектурные решения:** переход от серверного API к mock-данным потребовал рефакторинга всего слоя данных за один день.

### Что сделал сам с нуля

- Полная настройка проекта (Vite, TypeScript strict, ESLint, Husky, Tailwind)
- Модуль маршрутизации с lazy loading
- Кастомные хуки: `useCountdown`, `useSpeech`, `useDebounce`, `useTheme`, `useQuizSfx`
- Звуковая система квиза (Web Audio API) с дедупликацией
- QuestionCard с flip-логикой и клавиатурной навигацией
- Страницы: QuizPage, QuestionsPage, StatisticsPage, FavoritesPage, LoginPage, HomePage, AddQuestionPage, NotFoundPage

---

## 3. Личные Feature Component

Ниже - два компонента, которые я разработал **лично**.

---

### Feature 1: `useCountdown` — кастомный хук таймера обратного отсчёта

**Файл:** [`app/src/shared/useCountdown.ts`](../../app/src/shared/useCountdown.ts)

**Что это:** React-хук для управления обратным отсчётом. Используется в QuizPage для таймера вопросов (30 секунд на вопрос). При истечении времени вызывает callback `onComplete`.

**Почему я выбрал этот компонент:**
- Самостоятельная разработка
- Компактный код 
- Демонстрирует понимание React-хуков

**Где используется:** [`QuizPage.tsx`](../../app/src/pages/QuizPage.tsx) — таймер с цветовой индикацией (зелёный > 10с, жёлтый 5-10с, красный < 5с). При timeout вопрос считается неверным.

---

### Feature 2: `useSpeech` — хук озвучивания текста голосом

**Файл:** [`app/src/shared/useSpeech.ts`](../../app/src/shared/useSpeech.ts)

**Что это:** React-хук для озвучивания текста через браузерный Web Speech Synthesis API. Позволяет пользователю прослушать вопрос или ответ голосом, поддерживает русский и английский языки.

**Почему я выбрал этот компонент:**
- Самостоятельная разработка
- Еще компактнее
- Работа с браузерным API (SpeechSynthesis), feature detection


**Где используется:** [`QuestionCard.tsx`](../../app/src/ui/QuestionCard.tsx) — кнопка play/stop на каждой карточке вопроса. Озвучивает текущую сторону карточки (вопрос или ответ) на языке интерфейса.

---

### Связь PR с фичами

| PR | Описание | Ключевые фичи                                               |
|----|----------|-------------------------------------------------------------|
| [#7](https://github.com/bukt0r/Final-Project-Tandem/pull/7) | Настройка проекта | Vite, TypeScript strict, ESLint, Husky, Tailwind            |
| [#11](https://github.com/bukt0r/Final-Project-Tandem/pull/11) | CI/CD | Vercel deploy, GitHub Actions                               |
| [#29](https://github.com/bukt0r/Final-Project-Tandem/pull/29) | Обработка ошибок | NotFoundPage, RouteErrorFallback, Loader, pre-loader        |
| [#30](https://github.com/bukt0r/Final-Project-Tandem/pull/30) | Рефакторинг на mock-данные | Flip card, knowledge status, категории, поиск               |
| [#31](https://github.com/bukt0r/Final-Project-Tandem/pull/31) | Основные фичи | Quiz, Statistics, Favorites, AddQuestion, Recharts          |
| [#32](https://github.com/bukt0r/Final-Project-Tandem/pull/32) | UI и UX | i18n, Dark theme, **useCountdown**, **useSpeech**, Prism.js |
| [#41](https://github.com/bukt0r/Final-Project-Tandem/pull/41) | Квиз и звуки | Двуязычные вопросы, Quiz start/restart, Web Audio SFX       |

