import type { QuestionSource } from '../entities/question/model/types'

export const questionSources: QuestionSource[] = [
  {
    id: 'q-js-1',
    question: {
      ru: 'В чём разница между let, const и var в JavaScript?',
      en: 'What is the difference between let, const, and var in JavaScript?',
    },
    answer: {
      ru: 'var имеет область видимости функции и всплывает, let и const имеют блочную область видимости. const не позволяет переназначить переменную.',
      en: 'var is function-scoped and hoisted; let and const are block-scoped. const prevents reassignment of the binding.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'easy',
    tags: { ru: ['переменные', 'область-видимости'], en: ['variables', 'scope'] },
  },
  {
    id: 'q-js-2',
    question: {
      ru: 'Что такое замыкание в JavaScript?',
      en: 'What is a closure in JavaScript?',
    },
    answer: {
      ru: 'Замыкание — это функция, которая «помнит» переменные из своей внешней (лексической) области видимости, даже если вызывается вне этой области.',
      en: 'A closure is a function that remembers variables from its outer (lexical) scope even when invoked outside that scope.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'medium',
    tags: { ru: ['замыкания', 'функции'], en: ['closures', 'functions'] },
  },
  {
    id: 'q-js-3',
    question: {
      ru: 'Объясните разницу между == и === в JavaScript.',
      en: 'Explain the difference between == and === in JavaScript.',
    },
    answer: {
      ru: '== сравнивает значения с приведением типов, а === сравнивает и тип, и значение без приведения.',
      en: '== compares values with type coercion; === compares both type and value without coercion.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'easy',
    tags: { ru: ['сравнение', 'операторы'], en: ['comparison', 'operators'] },
  },
  {
    id: 'q-js-4',
    question: {
      ru: 'Что такое делегирование событий и зачем оно нужно?',
      en: 'What is event delegation and why is it useful?',
    },
    answer: {
      ru: 'Делегирование событий — это приём, когда обработчик вешают на общего родителя и обрабатывают события от дочерних элементов. Это уменьшает число обработчиков и упрощает код.',
      en: 'Event delegation attaches one listener on a parent and handles events from children. It reduces handler count and simplifies code.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'medium',
    tags: { ru: ['события', 'делегирование'], en: ['events', 'delegation'] },
  },
  {
    id: 'q-react-1',
    question: {
      ru: 'В чём разница между контролируемым и неконтролируемым компонентом в React?',
      en: 'What is the difference between controlled and uncontrolled components in React?',
    },
    answer: {
      ru: 'Контролируемый компонент получает значение из состояния React через props, а неконтролируемый хранит своё состояние напрямую в DOM (через ref).',
      en: 'A controlled component gets its value from React state via props; an uncontrolled one keeps state in the DOM (via ref).',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'easy',
    tags: { ru: ['формы', 'состояние'], en: ['forms', 'state'] },
  },
  {
    id: 'q-react-2',
    question: {
      ru: 'Какую проблему решают React-хуки по сравнению с классовыми компонентами?',
      en: 'What problem do React hooks solve compared to class components?',
    },
    answer: {
      ru: 'Хуки позволяют переиспользовать логику с состоянием без классов и уменьшают необходимость в HOC и render props для шаринга логики.',
      en: 'Hooks let you reuse stateful logic without classes and reduce the need for HOCs and render props to share logic.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'medium',
    tags: { ru: ['hooks', 'состояние'], en: ['hooks', 'state'] },
  },
  {
    id: 'q-react-3',
    question: {
      ru: 'За что отвечает хук useEffect в React?',
      en: 'What does the useEffect hook do in React?',
    },
    answer: {
      ru: 'useEffect позволяет выполнять побочные эффекты после рендера: запросы к серверу, подписки, ручные обновления DOM и очистку ресурсов.',
      en: 'useEffect runs side effects after render: data fetching, subscriptions, manual DOM updates, and cleanup.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'easy',
    tags: { ru: ['hooks', 'effects'], en: ['hooks', 'effects'] },
  },
  {
    id: 'q-react-4',
    question: {
      ru: 'Как в общих чертах работает процесс reconcilliation в React?',
      en: 'How does reconciliation work in React at a high level?',
    },
    answer: {
      ru: 'React строит виртуальное дерево, сравнивает его с предыдущим (diffing) и делает минимально необходимый набор операций с реальным DOM.',
      en: 'React builds a virtual tree, diffs it against the previous one, and applies the minimum set of updates to the real DOM.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'hard',
    tags: { ru: ['reconciliation', 'virtual-dom'], en: ['reconciliation', 'virtual-dom'] },
  },
  {
    id: 'q-ts-1',
    question: {
      ru: 'В чём разница между type и interface в TypeScript?',
      en: 'What is the difference between type and interface in TypeScript?',
    },
    answer: {
      ru: 'И type, и interface описывают форму данных. Интерфейсы можно «расширять» повторным объявлением, а типы более гибки для объединений (union) и сложных преобразований.',
      en: 'Both describe shapes. Interfaces can be extended via declaration merging; types are more flexible for unions and advanced type operations.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'medium',
    tags: { ru: ['types', 'interfaces'], en: ['types', 'interfaces'] },
  },
  {
    id: 'q-ts-2',
    question: {
      ru: 'Что такое сужение типа (type narrowing) в TypeScript?',
      en: 'What is type narrowing in TypeScript?',
    },
    answer: {
      ru: 'Сужение типа — это когда TypeScript может уточнить union-тип до более конкретного на основе проверок вроде typeof, in, проверки на null и т.д.',
      en: 'Narrowing is when TypeScript refines a union to a more specific type using checks like typeof, in, or null checks.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'easy',
    tags: { ru: ['narrowing', 'control-flow'], en: ['narrowing', 'control-flow'] },
  },
  {
    id: 'q-ts-3',
    question: {
      ru: 'Объясните, зачем нужны дженерики (generics) в TypeScript.',
      en: 'Explain why generics are useful in TypeScript.',
    },
    answer: {
      ru: 'Дженерики позволяют писать переиспользуемые функции и компоненты, которые работают с разными типами, при этом сохраняя информацию о типе.',
      en: 'Generics let you write reusable functions and components that work with many types while preserving type information.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'medium',
    tags: { ru: ['generics'], en: ['generics'] },
  },
  {
    id: 'q-ts-4',
    question: {
      ru: 'Зачем нужен тип unknown в TypeScript?',
      en: 'Why does TypeScript have the unknown type?',
    },
    answer: {
      ru: 'unknown — более безопасная альтернатива any. Перед использованием значения unknown вы должны сузить его тип, иначе компилятор не даст обращаться к нему как к конкретному типу.',
      en: 'unknown is a safer alternative to any. You must narrow unknown before use; the compiler blocks treating it as a concrete type until then.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'hard',
    tags: { ru: ['unknown', 'safety'], en: ['unknown', 'safety'] },
  },
  {
    id: 'q-alg-1',
    question: {
      ru: 'Какова асимптотическая сложность бинарного поиска?',
      en: 'What is the time complexity of binary search?',
    },
    answer: {
      ru: 'Бинарный поиск на отсортированном массиве работает за O(log n).',
      en: 'Binary search on a sorted array runs in O(log n) time.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'easy',
    tags: { ru: ['поиск', 'сложность'], en: ['search', 'complexity'] },
  },
  {
    id: 'q-alg-2',
    question: {
      ru: 'В чём разница между обходом в ширину (BFS) и в глубину (DFS)?',
      en: 'What is the difference between breadth-first (BFS) and depth-first (DFS) traversal?',
    },
    answer: {
      ru: 'BFS обходит граф или дерево по уровням, используя очередь. DFS идёт в глубину по одному пути, используя стек или рекурсию.',
      en: 'BFS explores level by level using a queue. DFS goes deep along one path using a stack or recursion.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'medium',
    tags: { ru: ['графы', 'обход'], en: ['graphs', 'traversal'] },
  },
  {
    id: 'q-alg-3',
    question: {
      ru: 'Что такое стабильный алгоритм сортировки?',
      en: 'What is a stable sorting algorithm?',
    },
    answer: {
      ru: 'Стабильная сортировка сохраняет относительный порядок элементов с одинаковыми ключами таким же, как в исходных данных.',
      en: 'A stable sort preserves the relative order of elements with equal keys as in the original data.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'medium',
    tags: { ru: ['сортировка', 'стабильность'], en: ['sorting', 'stability'] },
  },
  {
    id: 'q-alg-4',
    question: {
      ru: 'Объясните нотацию O-большое (Big-O) простыми словами.',
      en: 'Explain Big-O notation in simple terms.',
    },
    answer: {
      ru: 'Big-O описывает, как время работы или потребление памяти растут при увеличении размера входа, при этом нас интересует только главный порядок роста, без констант.',
      en: 'Big-O describes how runtime or memory grows with input size, focusing on the dominant growth rate, not constants.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'hard',
    tags: { ru: ['сложность', 'big-o'], en: ['complexity', 'big-o'] },
  },
  {
    id: 'q-css-1',
    question: {
      ru: 'В чём разница между margin и padding?',
      en: 'What is the difference between margin and padding?',
    },
    answer: {
      ru: 'Padding — это внутренний отступ между контентом и рамкой, margin — внешний отступ снаружи рамки между элементами.',
      en: 'Padding is space inside the border between content and the edge; margin is space outside the border between elements.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'easy',
    tags: { ru: ['box-model'], en: ['box-model'] },
  },
  {
    id: 'q-css-2',
    question: {
      ru: 'Чем Flexbox отличается от CSS Grid?',
      en: 'How does Flexbox differ from CSS Grid?',
    },
    answer: {
      ru: 'Flexbox — это одномерный лейаут (по строке или по столбцу), а Grid — двумерный и одновременно управляет строками и столбцами.',
      en: 'Flexbox is one-dimensional (row or column). Grid is two-dimensional and controls rows and columns together.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'medium',
    tags: { ru: ['layout', 'flexbox', 'grid'], en: ['layout', 'flexbox', 'grid'] },
  },
  {
    id: 'q-css-3',
    question: {
      ru: 'Что такое каскад (cascade) в CSS?',
      en: 'What is the cascade in CSS?',
    },
    answer: {
      ru: 'Каскад — это процесс, по которому браузер решает, какие именно правила применить, если на один и тот же элемент действуют несколько селекторов.',
      en: 'The cascade is how the browser decides which rules apply when multiple selectors target the same element.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'medium',
    tags: { ru: ['cascade', 'specificity'], en: ['cascade', 'specificity'] },
  },
  {
    id: 'q-css-4',
    question: {
      ru: 'Что такое CSS-переменные (custom properties) и зачем они нужны?',
      en: 'What are CSS custom properties and why use them?',
    },
    answer: {
      ru: 'CSS-переменные — это значения вида --имя, которые можно переиспользовать в стилях. С их помощью удобно настраивать темы и управлять дизайн-токенами.',
      en: 'Custom properties (--name) are reusable values in styles. They help with theming and design tokens.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'easy',
    tags: { ru: ['variables', 'design-system'], en: ['variables', 'design-system'] },
  },
  {
    id: 'q-js-5',
    question: {
      ru: 'Что такое event loop в JavaScript и зачем он нужен?',
      en: 'What is the JavaScript event loop and why does it matter?',
    },
    answer: {
      ru: 'Event loop обрабатывает очередь задач и микрозадач, позволяя однопоточному JS выполнять асинхронный код без блокировки UI. Сначала выполняется синхронный код, затем микрозадачи (промисы), затем макрозадачи (таймеры, события).',
      en: 'The event loop processes a task queue and microtasks so single-threaded JS can run async work without freezing the UI. Sync code runs first, then microtasks (promises), then macrotasks (timers, events).',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'medium',
    tags: { ru: ['async', 'event-loop'], en: ['async', 'event-loop'] },
  },
  {
    id: 'q-js-6',
    question: {
      ru: 'В чём разница между Promise и async/await?',
      en: 'What is the relationship between Promises and async/await?',
    },
    answer: {
      ru: 'async/await — синтаксический сахар над промисами: async-функция всегда возвращает Promise, await приостанавливает выполнение до разрешения промиса. Ошибки ловятся через try/catch вместо .catch().',
      en: 'async/await is syntactic sugar over Promises: an async function always returns a Promise; await pauses until it settles. Errors can be handled with try/catch instead of .catch().',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'easy',
    tags: { ru: ['promises', 'async-await'], en: ['promises', 'async-await'] },
  },
  {
    id: 'q-js-7',
    question: {
      ru: 'Что такое прототипное наследование в JavaScript?',
      en: 'What is prototypal inheritance in JavaScript?',
    },
    answer: {
      ru: 'Объекты могут наследовать свойства и методы через цепочку прототипов (__proto__ / Object.getPrototypeOf). Классы в ES6 — синтаксический сахар над прототипами.',
      en: 'Objects inherit properties and methods via the prototype chain (__proto__ / Object.getPrototypeOf). ES6 classes are mostly syntactic sugar over this model.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'medium',
    tags: { ru: ['prototype', 'oop'], en: ['prototype', 'oop'] },
  },
  {
    id: 'q-js-8',
    question: {
      ru: 'Что делает метод Array.prototype.map и чем он отличается от forEach?',
      en: 'What does Array.prototype.map do, and how is it different from forEach?',
    },
    answer: {
      ru: 'map возвращает новый массив той же длины, применяя функцию к каждому элементу. forEach только перебирает элементы и возвращает undefined.',
      en: 'map returns a new array of the same length by applying a function to each element. forEach only iterates and returns undefined.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'easy',
    tags: { ru: ['arrays', 'functional'], en: ['arrays', 'functional'] },
  },
  {
    id: 'q-js-9',
    question: {
      ru: 'Что такое debounce и throttle? Когда что использовать?',
      en: 'What are debounce and throttle? When would you use each?',
    },
    answer: {
      ru: 'Debounce откладывает вызов до паузы в событиях (поиск при вводе). Throttle ограничивает частоту вызовов (скролл, resize). Оба уменьшают нагрузку от частых событий.',
      en: 'Debounce delays a call until events pause (e.g. search input). Throttle caps how often a function runs (scroll, resize). Both reduce work from high-frequency events.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'medium',
    tags: { ru: ['performance', 'events'], en: ['performance', 'events'] },
  },
  {
    id: 'q-js-10',
    question: {
      ru: 'Что такое стрелочные функции и чем они отличаются от function?',
      en: 'What are arrow functions, and how do they differ from the function keyword?',
    },
    answer: {
      ru: 'Стрелочные функции не имеют своего this и arguments, их this лексический. Нельзя использовать как конструктор. Краткий синтаксис для колбэков.',
      en: 'Arrow functions have no own this or arguments; this is lexical. They cannot be used as constructors. Handy short syntax for callbacks.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'easy',
    tags: { ru: ['arrow-functions', 'this'], en: ['arrow-functions', 'this'] },
  },
  {
    id: 'q-js-11',
    question: {
      ru: 'Что такое JSON и как безопасно парсить строку JSON?',
      en: 'What is JSON, and how do you safely parse a JSON string?',
    },
    answer: {
      ru: 'JSON — текстовый формат обмена данными. JSON.parse() превращает строку в объект; при невалидном JSON будет исключение. Не используйте eval для парсинга JSON.',
      en: 'JSON is a text data format. JSON.parse() turns a string into a value; invalid JSON throws. Never use eval to parse JSON.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'easy',
    tags: { ru: ['json', 'data'], en: ['json', 'data'] },
  },
  {
    id: 'q-js-12',
    question: {
      ru: 'Объясните разницу между null и undefined.',
      en: 'Explain the difference between null and undefined.',
    },
    answer: {
      ru: 'undefined — значение «не присвоено», часто по умолчанию. null — явное «пусто» или «нет объекта», задаётся программистом. Оба falsy, но typeof разный.',
      en: 'undefined means “not assigned,” often by default. null is an intentional “empty” or “no object.” Both are falsy but typeof differs.',
    },
    category: { ru: 'JavaScript', en: 'JavaScript' },
    categoryKey: 'javascript',
    difficulty: 'easy',
    tags: { ru: ['types', 'basics'], en: ['types', 'basics'] },
  },
  {
    id: 'q-react-5',
    question: {
      ru: 'Зачем в списках React нужен prop key и что будет, если его не указать?',
      en: 'Why do lists in React need a key prop, and what happens without it?',
    },
    answer: {
      ru: 'key помогает React сопоставлять элементы между рендерами для эффективного обновления DOM и сохранения состояния. Без key или с индексом как key возможны баги при переупорядочивании.',
      en: 'key helps React match list items across renders for efficient DOM updates and state preservation. Missing keys or index-as-key can cause bugs when reordering.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'easy',
    tags: { ru: ['lists', 'keys'], en: ['lists', 'keys'] },
  },
  {
    id: 'q-react-6',
    question: {
      ru: 'Что такое React.memo и useMemo? В чём разница?',
      en: 'What are React.memo and useMemo? How do they differ?',
    },
    answer: {
      ru: 'React.memo мемоизирует компонент (поверхностное сравнение props). useMemo мемоизирует вычисленное значение внутри компонента. Оба помогают избежать лишних пересчётов, но на разных уровнях.',
      en: 'React.memo memoizes a component (shallow prop compare). useMemo memoizes a computed value inside a component. Both reduce work but at different levels.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'medium',
    tags: { ru: ['performance', 'memoization'], en: ['performance', 'memoization'] },
  },
  {
    id: 'q-react-7',
    question: {
      ru: 'Для чего нужен React.Fragment?',
      en: 'What is React.Fragment for?',
    },
    answer: {
      ru: 'Fragment позволяет группировать дочерние элементы без лишнего DOM-узла. Синтаксис <>...</> или <Fragment>. Полезно, когда нужен один родитель по правилам JSX.',
      en: 'A Fragment groups children without an extra DOM node. Use <>...</> or <Fragment> when JSX requires a single parent.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'easy',
    tags: { ru: ['jsx', 'dom'], en: ['jsx', 'dom'] },
  },
  {
    id: 'q-react-8',
    question: {
      ru: 'Что такое ленивая загрузка компонентов (React.lazy) и Suspense?',
      en: 'What is React.lazy loading and Suspense?',
    },
    answer: {
      ru: 'React.lazy динамически импортирует компонент и разбивает бандл. Suspense показывает fallback, пока чанк грузится. Улучшает время первой загрузки.',
      en: 'React.lazy dynamically imports a component and splits the bundle. Suspense shows a fallback while the chunk loads. Improves initial load time.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'medium',
    tags: { ru: ['code-splitting', 'performance'], en: ['code-splitting', 'performance'] },
  },
  {
    id: 'q-react-9',
    question: {
      ru: 'Что такое подъём состояния (lifting state up) в React?',
      en: 'What is lifting state up in React?',
    },
    answer: {
      ru: 'Когда нескольким компонентам нужны одни данные, состояние поднимают к общему родителю и передают вниз через props. Источник правды один — проще синхронизировать UI.',
      en: 'When several children need the same data, state moves to their common parent and flows down via props. One source of truth keeps UI in sync.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'easy',
    tags: { ru: ['state', 'architecture'], en: ['state', 'architecture'] },
  },
  {
    id: 'q-react-10',
    question: {
      ru: 'Чем виртуальный DOM React отличается от реального DOM?',
      en: 'How does React’s virtual DOM relate to the real DOM?',
    },
    answer: {
      ru: 'Виртуальный DOM — лёгкое описание UI в памяти. React сравнивает деревья и применяет минимальные изменения к реальному DOM. Это не всегда быстрее «ручного» DOM, но упрощает разработку.',
      en: 'The virtual DOM is an in-memory UI description. React diffs trees and applies minimal updates to the real DOM. Not always faster than hand-written DOM, but easier to build with.',
    },
    category: { ru: 'React', en: 'React' },
    categoryKey: 'react',
    difficulty: 'medium',
    tags: { ru: ['virtual-dom', 'rendering'], en: ['virtual-dom', 'rendering'] },
  },
  {
    id: 'q-ts-5',
    question: {
      ru: 'Что такое union type и как с ним работать безопасно?',
      en: 'What is a union type, and how do you use it safely?',
    },
    answer: {
      ru: 'Union (A | B) означает «одно из». Перед доступом к полям нужно сужение типа (typeof, in, discriminated union с общим полем-тегом).',
      en: 'A union (A | B) means “one of.” Narrow with typeof, in, or a discriminated union with a shared tag field before accessing members.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'medium',
    tags: { ru: ['union', 'narrowing'], en: ['union', 'narrowing'] },
  },
  {
    id: 'q-ts-6',
    question: {
      ru: 'Для чего нужны readonly и const assertions?',
      en: 'What are readonly and const assertions for?',
    },
    answer: {
      ru: 'readonly делает поля интерфейса неизменяемыми на уровне типов. as const сужает литеральный тип и делает массив/объект глубоко readonly-подобным.',
      en: 'readonly marks interface fields immutable in the type system. as const narrows literal types and makes tuples/objects deeply readonly-like.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'medium',
    tags: { ru: ['immutability', 'types'], en: ['immutability', 'types'] },
  },
  {
    id: 'q-ts-7',
    question: {
      ru: 'Что такое keyof и typeof в типах TypeScript?',
      en: 'What are keyof and typeof in TypeScript types?',
    },
    answer: {
      ru: 'keyof T — объединение строковых ключей типа T. typeof в позиции типа извлекает тип значения переменной/объекта. Часто вместе для типобезопасных маппингов.',
      en: 'keyof T is the union of keys of T. typeof in type position gets the type of a value. Often combined for type-safe mappings.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'hard',
    tags: { ru: ['mapped-types', 'utilities'], en: ['mapped-types', 'utilities'] },
  },
  {
    id: 'q-ts-8',
    question: {
      ru: 'Зачем нужен strict mode в tsconfig и что даёт strictNullChecks?',
      en: 'Why use TypeScript strict mode, and what does strictNullChecks do?',
    },
    answer: {
      ru: 'strict включает набор проверок для более безопасного кода. strictNullChecks заставляет явно обрабатывать null/undefined, уменьшая ошибки времени выполнения.',
      en: 'strict enables a bundle of safer checks. strictNullChecks forces explicit null/undefined handling, reducing runtime errors.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'easy',
    tags: { ru: ['tsconfig', 'strict'], en: ['tsconfig', 'strict'] },
  },
  {
    id: 'q-ts-9',
    question: {
      ru: 'В чём разница между interface extends и пересечением типов (&)?',
      en: 'How does interface extending differ from an intersection type (&)?',
    },
    answer: {
      ru: 'extends объединяет интерфейсы с возможностью declaration merging. Пересечение A & B совмещает оба типа; при конфликте полей получится never. Для классов и публичных API часто удобнее interface.',
      en: 'extends merges interfaces and supports declaration merging. A & B combines both; conflicting fields become never. Interfaces are often nicer for public APIs.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'hard',
    tags: { ru: ['intersection', 'interface'], en: ['intersection', 'interface'] },
  },
  {
    id: 'q-ts-10',
    question: {
      ru: 'Что такое type assertion (as) и когда его стоит избегать?',
      en: 'What is a type assertion (as), and when should you avoid it?',
    },
    answer: {
      ru: 'as говорит компилятору «доверься мне», не меняя значение в рантайме. Избегайте, если можно выразить тип через проверки или дженерики — иначе теряется безопасность.',
      en: 'as tells the compiler to trust you; it does not change runtime values. Prefer checks or generics over blind assertions.',
    },
    category: { ru: 'TypeScript', en: 'TypeScript' },
    categoryKey: 'typescript',
    difficulty: 'easy',
    tags: { ru: ['assertions', 'safety'], en: ['assertions', 'safety'] },
  },
  {
    id: 'q-css-5',
    question: {
      ru: 'Что такое специфичность (specificity) селекторов CSS?',
      en: 'What is CSS selector specificity?',
    },
    answer: {
      ru: 'При конфликте правил браузер считает «вес»: inline > ID > классы/атрибуты/псевдоклассы > элементы. !important перебивает обычные правила. Большая специфичность усложняет поддержку.',
      en: 'When rules clash, the browser scores specificity: inline > ID > classes/attributes/pseudo-classes > elements. !important overrides normal rules. High specificity is hard to maintain.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'medium',
    tags: { ru: ['specificity', 'cascade'], en: ['specificity', 'cascade'] },
  },
  {
    id: 'q-css-6',
    question: {
      ru: 'В чём разница между display: none и visibility: hidden?',
      en: 'What is the difference between display: none and visibility: hidden?',
    },
    answer: {
      ru: 'display: none убирает элемент из потока и из дерева доступности для скринридеров (часто). visibility: hidden скрывает визуально, но место может оставаться; дочерние могут быть visible.',
      en: 'display: none removes the element from layout (and often from accessibility trees). visibility: hidden hides visually but may preserve space; children can override to visible.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'easy',
    tags: { ru: ['display', 'a11y'], en: ['display', 'a11y'] },
  },
  {
    id: 'q-css-7',
    question: {
      ru: 'Что такое z-index и когда «не работает»?',
      en: 'What is z-index, and when does it seem not to work?',
    },
    answer: {
      ru: 'z-index работает только у позиционированных элементов (не static) внутри контекста наложения (stacking context). Новый контекст создаёт, например, opacity < 1, transform, filter.',
      en: 'z-index applies to positioned (non-static) elements inside a stacking context. New contexts come from things like opacity < 1, transform, or filter.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'hard',
    tags: { ru: ['stacking', 'layout'], en: ['stacking', 'layout'] },
  },
  {
    id: 'q-css-8',
    question: {
      ru: 'Что такое mobile-first в вёрстке?',
      en: 'What is mobile-first in CSS layout?',
    },
    answer: {
      ru: 'Сначала стили для узких экранов, затем min-width медиазапросы для больших. Упрощает прогрессивное улучшение и часто даёт более лёгкий CSS для мобильных.',
      en: 'Start with narrow-screen styles, then add min-width media queries for larger breakpoints. Encourages progressive enhancement and often lighter mobile CSS.',
    },
    category: { ru: 'CSS', en: 'CSS' },
    categoryKey: 'css',
    difficulty: 'easy',
    tags: { ru: ['responsive', 'media-queries'], en: ['responsive', 'media-queries'] },
  },
  {
    id: 'q-alg-5',
    question: {
      ru: 'Какова сложность по времени сортировки слиянием (merge sort) в худшем случае?',
      en: 'What is merge sort’s worst-case time complexity?',
    },
    answer: {
      ru: 'O(n log n) по времени и O(n) по дополнительной памяти для типичной реализации. Стабильна и предсказуема.',
      en: 'O(n log n) time and O(n) extra space for a typical implementation. Stable and predictable.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'medium',
    tags: { ru: ['sorting', 'complexity'], en: ['sorting', 'complexity'] },
  },
  {
    id: 'q-alg-6',
    question: {
      ru: 'Что такое хеш-таблица и какова средняя сложность поиска?',
      en: 'What is a hash table, and what is average lookup complexity?',
    },
    answer: {
      ru: 'Структура ключ→значение с хеш-функцией и разрешением коллизий. В среднем O(1) для get/set; в худшем при плохих коллизиях может деградировать.',
      en: 'Key→value storage with a hash function and collision handling. Average O(1) get/set; worst case can degrade with many collisions.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'medium',
    tags: { ru: ['hash-table', 'structures'], en: ['hash-table', 'structures'] },
  },
  {
    id: 'q-alg-7',
    question: {
      ru: 'Чем отличается стек от очереди?',
      en: 'How does a stack differ from a queue?',
    },
    answer: {
      ru: 'Стек — LIFO (последний зашёл, первый вышел). Очередь — FIFO. Используются в парсинге, отмене операций, обходе графов, планировщиках задач.',
      en: 'Stack is LIFO; queue is FIFO. Used in parsing, undo, graph traversal, and task scheduling.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'easy',
    tags: { ru: ['stack', 'queue'], en: ['stack', 'queue'] },
  },
  {
    id: 'q-alg-8',
    question: {
      ru: 'Что такое динамическое программирование?',
      en: 'What is dynamic programming?',
    },
    answer: {
      ru: 'Разбиение задачи на подзадачи с перекрывающимися результатами, кэширование ответов (мемоизация или таблица), чтобы избежать экспоненциального пересчёта. Пример — числа Фибоначчи, задача о рюкзаке.',
      en: 'Break a problem into overlapping subproblems, cache answers (memoization or tabulation) to avoid exponential recomputation. Examples: Fibonacci, knapsack.',
    },
    category: { ru: 'Алгоритмы', en: 'Algorithms' },
    categoryKey: 'algorithms',
    difficulty: 'hard',
    tags: { ru: ['dp', 'optimization'], en: ['dp', 'optimization'] },
  },
  {
    id: 'q-html-1',
    question: {
      ru: 'В чём семантическая разница между <section>, <article> и <div>?',
      en: 'What is the semantic difference between <section>, <article>, and <div>?',
    },
    answer: {
      ru: 'article — самодостаточный фрагмент контента. section — тематическая группа. div — нейтральный контейнер без смысловой нагрузки. Семантика помогает доступности и SEO.',
      en: 'article is a self-contained piece of content. section groups related content by theme. div is a generic box. Semantics help accessibility and SEO.',
    },
    category: { ru: 'HTML', en: 'HTML' },
    categoryKey: 'html',
    difficulty: 'easy',
    tags: { ru: ['semantic', 'a11y'], en: ['semantic', 'a11y'] },
  },
  {
    id: 'q-html-2',
    question: {
      ru: 'Зачем нужен атрибут alt у <img>?',
      en: 'Why is the alt attribute important on <img>?',
    },
    answer: {
      ru: 'Описание изображения для скринридеров и при ошибке загрузки. Пустой alt="" для декоративных картинок. Улучшает доступность и иногда SEO.',
      en: 'Describes the image for screen readers and when the image fails. Use alt="" for decorative images. Improves accessibility and sometimes SEO.',
    },
    category: { ru: 'HTML', en: 'HTML' },
    categoryKey: 'html',
    difficulty: 'easy',
    tags: { ru: ['a11y', 'images'], en: ['a11y', 'images'] },
  },
  {
    id: 'q-html-3',
    question: {
      ru: 'Что такое CORS и почему браузер его применяет?',
      en: 'What is CORS, and why do browsers enforce it?',
    },
    answer: {
      ru: 'Cross-Origin Resource Sharing — механизм, при котором сервер явно разрешает запросы с другого origin. Без заголовков CORS браузер блокирует ответ JS из соображений безопасности (Same-Origin Policy).',
      en: 'CORS lets a server explicitly allow cross-origin requests. Without proper CORS headers, the browser blocks JS from reading the response (Same-Origin Policy).',
    },
    category: { ru: 'Веб и HTTP', en: 'Web & HTTP' },
    categoryKey: 'http',
    difficulty: 'medium',
    tags: { ru: ['cors', 'security'], en: ['cors', 'security'] },
  },
  {
    id: 'q-html-4',
    question: {
      ru: 'В чём разница между cookie, localStorage и sessionStorage?',
      en: 'What is the difference between cookies, localStorage, and sessionStorage?',
    },
    answer: {
      ru: 'Cookies уходят на сервер с запросами (если настроено), имеют срок и ограничения по размеру. localStorage и sessionStorage только в браузере; sessionStorage живёт до закрытия вкладки, localStorage — дольше.',
      en: 'Cookies can be sent to the server, have size limits and expiry. localStorage/sessionStorage stay client-side; sessionStorage clears with the tab, localStorage persists longer.',
    },
    category: { ru: 'Веб и HTTP', en: 'Web & HTTP' },
    categoryKey: 'http',
    difficulty: 'medium',
    tags: { ru: ['storage', 'browser'], en: ['storage', 'browser'] },
  },
  {
    id: 'q-http-1',
    question: {
      ru: 'Чем отличаются методы HTTP GET и POST?',
      en: 'How do HTTP GET and POST differ?',
    },
    answer: {
      ru: 'GET обычно для чтения, параметры в URL, идемпотентен и кэшируется. POST для создания/отправки данных в теле; не считается безопасным для повторов без осторожности.',
      en: 'GET is for reads, params in the URL, idempotent and cacheable. POST sends a body, often for creates; repeats may have side effects.',
    },
    category: { ru: 'Веб и HTTP', en: 'Web & HTTP' },
    categoryKey: 'http',
    difficulty: 'easy',
    tags: { ru: ['http', 'rest'], en: ['http', 'rest'] },
  },
  {
    id: 'q-http-2',
    question: {
      ru: 'Что означают коды ответа 301 и 302?',
      en: 'What do HTTP status codes 301 and 302 mean?',
    },
    answer: {
      ru: '301 — постоянный редирект (URL изменился навсегда, SEO переносит вес). 302 — временный редирект; клиенты могут продолжать обращаться к старому URL.',
      en: '301 is a permanent redirect (SEO passes ranking signals). 302 is temporary; clients may keep using the old URL.',
    },
    category: { ru: 'Веб и HTTP', en: 'Web & HTTP' },
    categoryKey: 'http',
    difficulty: 'easy',
    tags: { ru: ['http', 'redirects'], en: ['http', 'redirects'] },
  },
  {
    id: 'q-http-3',
    question: {
      ru: 'Что такое идемпотентность в контексте HTTP?',
      en: 'What is idempotency in HTTP?',
    },
    answer: {
      ru: 'Повтор одного и того же запроса даёт тот же эффект на сервере, что и один раз. GET, PUT, DELETE считают идемпотентными; POST — обычно нет.',
      en: 'Repeating the same request has the same effect as doing it once. GET, PUT, DELETE are idempotent; POST generally is not.',
    },
    category: { ru: 'Веб и HTTP', en: 'Web & HTTP' },
    categoryKey: 'http',
    difficulty: 'medium',
    tags: { ru: ['rest', 'api-design'], en: ['rest', 'api-design'] },
  },
  {
    id: 'q-http-4',
    question: {
      ru: 'Что такое REST API в двух словах?',
      en: 'What is a REST API in simple terms?',
    },
    answer: {
      ru: 'Стиль API поверх HTTP: ресурсы идентифицируются URL, операции через методы (GET/POST/PUT/DELETE), часто JSON. Stateless между запросами.',
      en: 'An HTTP-centric style: resources at URLs, verbs for operations (GET/POST/PUT/DELETE), often JSON. Typically stateless between requests.',
    },
    category: { ru: 'Веб и HTTP', en: 'Web & HTTP' },
    categoryKey: 'http',
    difficulty: 'easy',
    tags: { ru: ['rest', 'api'], en: ['rest', 'api'] },
  },
  {
    id: 'q-git-1',
    question: {
      ru: 'В чём разница между git merge и git rebase?',
      en: 'What is the difference between git merge and git rebase?',
    },
    answer: {
      ru: 'merge создаёт коммит слияния и сохраняет историю ветвлений. rebase переносит коммиты поверх другой ветки, делая историю линейной; переписывает историю (осторожно с общими ветками).',
      en: 'merge adds a merge commit and preserves branch history. rebase replays commits on top of another branch for a linear history; rewrites history (avoid on shared branches).',
    },
    category: { ru: 'Git', en: 'Git' },
    categoryKey: 'git',
    difficulty: 'medium',
    tags: { ru: ['git', 'workflow'], en: ['git', 'workflow'] },
  },
  {
    id: 'q-git-2',
    question: {
      ru: 'Что делает git stash?',
      en: 'What does git stash do?',
    },
    answer: {
      ru: 'Временно убирает незакоммиченные изменения из рабочей директории в стек, чтобы переключить ветку или подтянуть изменения. git stash pop возвращает их.',
      en: 'Saves uncommitted changes to a stack so you can switch branches or pull. git stash pop restores them.',
    },
    category: { ru: 'Git', en: 'Git' },
    categoryKey: 'git',
    difficulty: 'easy',
    tags: { ru: ['git', 'stash'], en: ['git', 'stash'] },
  },
  {
    id: 'q-git-3',
    question: {
      ru: 'Что такое HEAD в Git?',
      en: 'What is HEAD in Git?',
    },
    answer: {
      ru: 'Указатель на текущий коммит (или ветку, которая на него указывает). HEAD~1 — родитель текущего коммита. detached HEAD — когда HEAD указывает напрямую на коммит, а не на ветку.',
      en: 'A pointer to the current commit (or the branch that points to it). HEAD~1 is the parent. Detached HEAD means HEAD points directly at a commit, not a branch.',
    },
    category: { ru: 'Git', en: 'Git' },
    categoryKey: 'git',
    difficulty: 'easy',
    tags: { ru: ['git', 'basics'], en: ['git', 'basics'] },
  },
  {
    id: 'q-git-4',
    question: {
      ru: 'Зачем нужен .gitignore?',
      en: 'Why use a .gitignore file?',
    },
    answer: {
      ru: 'Список файлов и папок, которые Git не должен отслеживать: сборки, зависимости, секреты, IDE-файлы. Уменьшает шум и риск утечки ключей.',
      en: 'Lists paths Git should ignore: build output, dependencies, secrets, IDE files. Reduces noise and accidental secret commits.',
    },
    category: { ru: 'Git', en: 'Git' },
    categoryKey: 'git',
    difficulty: 'easy',
    tags: { ru: ['git', 'workflow'], en: ['git', 'workflow'] },
  },
  {
    id: 'q-browser-1',
    question: {
      ru: 'Что такое Same-Origin Policy?',
      en: 'What is the Same-Origin Policy?',
    },
    answer: {
      ru: 'Правило браузера: скрипт с одного origin не читает ответы другого origin по умолчанию. Защищает от кражи данных; CORS ослабляет правило с согласия сервера.',
      en: 'Browsers restrict scripts from reading cross-origin responses by default. Protects data theft; CORS relaxes this when the server allows it.',
    },
    category: { ru: 'Браузер', en: 'Browser' },
    categoryKey: 'browser',
    difficulty: 'medium',
    tags: { ru: ['security', 'web'], en: ['security', 'web'] },
  },
  {
    id: 'q-browser-2',
    question: {
      ru: 'Что такое XSS и как от него защищаться?',
      en: 'What is XSS and how do you mitigate it?',
    },
    answer: {
      ru: 'Cross-Site Scripting — внедрение чужого JS в страницу. Защита: экранирование вывода, Content-Security-Policy, httpOnly для cookie, валидация ввода.',
      en: 'Cross-Site Scripting injects malicious JS. Mitigate with output encoding, CSP, httpOnly cookies, and input validation.',
    },
    category: { ru: 'Браузер', en: 'Browser' },
    categoryKey: 'browser',
    difficulty: 'medium',
    tags: { ru: ['security', 'xss'], en: ['security', 'xss'] },
  },
  {
    id: 'q-browser-3',
    question: {
      ru: 'Что такое reflow и repaint в браузере?',
      en: 'What are reflow and repaint in the browser?',
    },
    answer: {
      ru: 'Reflow (layout) — пересчёт геометрии элементов. Repaint — перерисовка пикселей. Частые reflow дороги; избегайте чтения layout после записи стилей в цикле (forced synchronous layout).',
      en: 'Reflow recalculates layout; repaint repaints pixels. Frequent reflows are expensive; avoid read-then-write layout thrashing in loops.',
    },
    category: { ru: 'Браузер', en: 'Browser' },
    categoryKey: 'browser',
    difficulty: 'hard',
    tags: { ru: ['performance', 'rendering'], en: ['performance', 'rendering'] },
  },
  {
    id: 'q-browser-4',
    question: {
      ru: 'Зачем нужен Service Worker?',
      en: 'What is a Service Worker for?',
    },
    answer: {
      ru: 'Скрипт в фоне отдельно от страницы: офлайн-кэш, push, перехват fetch. Требует HTTPS (кроме localhost). Основа PWA.',
      en: 'A background script for offline caching, push, and fetch interception. Requires HTTPS (except localhost). Core to PWAs.',
    },
    category: { ru: 'Браузер', en: 'Browser' },
    categoryKey: 'browser',
    difficulty: 'hard',
    tags: { ru: ['pwa', 'offline'], en: ['pwa', 'offline'] },
  },
]
