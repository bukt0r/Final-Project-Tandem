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
]
