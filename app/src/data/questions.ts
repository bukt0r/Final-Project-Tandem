import type { Question } from '../entities/question/model/types'

export const questions: Question[] = [
  {
    id: 'q-js-1',
    question: 'В чём разница между let, const и var в JavaScript?',
    answer:
      'var имеет область видимости функции и всплывает, let и const имеют блочную область видимости. const не позволяет переназначить переменную.',
    category: 'JavaScript',
    difficulty: 'easy',
    tags: ['переменные', 'область-видимости'],
  },
  {
    id: 'q-js-2',
    question: 'Что такое замыкание в JavaScript?',
    answer:
      'Замыкание — это функция, которая «помнит» переменные из своей внешней (лексической) области видимости, даже если вызывается вне этой области.',
    category: 'JavaScript',
    difficulty: 'medium',
    tags: ['замыкания', 'функции'],
  },
  {
    id: 'q-js-3',
    question: 'Объясните разницу между == и === в JavaScript.',
    answer:
      '== сравнивает значения с приведением типов, а === сравнивает и тип, и значение без приведения.',
    category: 'JavaScript',
    difficulty: 'easy',
    tags: ['сравнение', 'операторы'],
  },
  {
    id: 'q-js-4',
    question: 'Что такое делегирование событий и зачем оно нужно?',
    answer:
      'Делегирование событий — это приём, когда обработчик вешают на общего родителя и обрабатывают события от дочерних элементов. Это уменьшает число обработчиков и упрощает код.',
    category: 'JavaScript',
    difficulty: 'medium',
    tags: ['события', 'делегирование'],
  },
  {
    id: 'q-react-1',
    question: 'В чём разница между контролируемым и неконтролируемым компонентом в React?',
    answer:
      'Контролируемый компонент получает значение из состояния React через props, а неконтролируемый хранит своё состояние напрямую в DOM (через ref).',
    category: 'React',
    difficulty: 'easy',
    tags: ['формы', 'состояние'],
  },
  {
    id: 'q-react-2',
    question: 'Какую проблему решают React-хуки по сравнению с классовыми компонентами?',
    answer:
      'Хуки позволяют переиспользовать логику с состоянием без классов и уменьшают необходимость в HOC и render props для шаринга логики.',
    category: 'React',
    difficulty: 'medium',
    tags: ['hooks', 'состояние'],
  },
  {
    id: 'q-react-3',
    question: 'За что отвечает хук useEffect в React?',
    answer:
      'useEffect позволяет выполнять побочные эффекты после рендера: запросы к серверу, подписки, ручные обновления DOM и очистку ресурсов.',
    category: 'React',
    difficulty: 'easy',
    tags: ['hooks', 'effects'],
  },
  {
    id: 'q-react-4',
    question: 'Как в общих чертах работает процесс reconcilliation в React?',
    answer:
      'React строит виртуальное дерево, сравнивает его с предыдущим (diffing) и делает минимально необходимый набор операций с реальным DOM.',
    category: 'React',
    difficulty: 'hard',
    tags: ['reconciliation', 'virtual-dom'],
  },
  {
    id: 'q-ts-1',
    question: 'В чём разница между type и interface в TypeScript?',
    answer:
      'И type, и interface описывают форму данных. Интерфейсы можно «расширять» повторным объявлением, а типы более гибки для объединений (union) и сложных преобразований.',
    category: 'TypeScript',
    difficulty: 'medium',
    tags: ['types', 'interfaces'],
  },
  {
    id: 'q-ts-2',
    question: 'Что такое сужение типа (type narrowing) в TypeScript?',
    answer:
      'Сужение типа — это когда TypeScript может уточнить union-тип до более конкретного на основе проверок вроде typeof, in, проверки на null и т.д.',
    category: 'TypeScript',
    difficulty: 'easy',
    tags: ['narrowing', 'control-flow'],
  },
  {
    id: 'q-ts-3',
    question: 'Объясните, зачем нужны дженерики (generics) в TypeScript.',
    answer:
      'Дженерики позволяют писать переиспользуемые функции и компоненты, которые работают с разными типами, при этом сохраняя информацию о типе.',
    category: 'TypeScript',
    difficulty: 'medium',
    tags: ['generics'],
  },
  {
    id: 'q-ts-4',
    question: 'Зачем нужен тип unknown в TypeScript?',
    answer:
      'unknown — более безопасная альтернатива any. Перед использованием значения unknown вы должны сузить его тип, иначе компилятор не даст обращаться к нему как к конкретному типу.',
    category: 'TypeScript',
    difficulty: 'hard',
    tags: ['unknown', 'safety'],
  },
  {
    id: 'q-alg-1',
    question: 'Какова асимптотическая сложность бинарного поиска?',
    answer: 'Бинарный поиск на отсортированном массиве работает за O(log n).',
    category: 'Algorithms',
    difficulty: 'easy',
    tags: ['search', 'complexity'],
  },
  {
    id: 'q-alg-2',
    question: 'В чём разница между обходом в ширину (BFS) и в глубину (DFS)?',
    answer:
      'BFS обходит граф или дерево по уровням, используя очередь. DFS идёт в глубину по одному пути, используя стек или рекурсию.',
    category: 'Algorithms',
    difficulty: 'medium',
    tags: ['graphs', 'traversal'],
  },
  {
    id: 'q-alg-3',
    question: 'Что такое стабильный алгоритм сортировки?',
    answer:
      'Стабильная сортировка сохраняет относительный порядок элементов с одинаковыми ключами таким же, как в исходных данных.',
    category: 'Algorithms',
    difficulty: 'medium',
    tags: ['sorting', 'stability'],
  },
  {
    id: 'q-alg-4',
    question: 'Объясните нотацию O-большое (Big-O) простыми словами.',
    answer:
      'Big-O описывает, как время работы или потребление памяти растут при увеличении размера входа, при этом нас интересует только главный порядок роста, без констант.',
    category: 'Algorithms',
    difficulty: 'hard',
    tags: ['complexity', 'big-o'],
  },
  {
    id: 'q-css-1',
    question: 'В чём разница между margin и padding?',
    answer:
      'Padding — это внутренний отступ между контентом и рамкой, margin — внешний отступ снаружи рамки между элементами.',
    category: 'CSS',
    difficulty: 'easy',
    tags: ['box-model'],
  },
  {
    id: 'q-css-2',
    question: 'Чем Flexbox отличается от CSS Grid?',
    answer:
      'Flexbox — это одномерный лейаут (по строке или по столбцу), а Grid — двумерный и одновременно управляет строками и столбцами.',
    category: 'CSS',
    difficulty: 'medium',
    tags: ['layout', 'flexbox', 'grid'],
  },
  {
    id: 'q-css-3',
    question: 'Что такое каскад (cascade) в CSS?',
    answer:
      'Каскад — это процесс, по которому браузер решает, какие именно правила применить, если на один и тот же элемент действуют несколько селекторов.',
    category: 'CSS',
    difficulty: 'medium',
    tags: ['cascade', 'specificity'],
  },
  {
    id: 'q-css-4',
    question: 'Что такое CSS-переменные (custom properties) и зачем они нужны?',
    answer:
      'CSS-переменные — это значения вида --имя, которые можно переиспользовать в стилях. С их помощью удобно настраивать темы и управлять дизайн-токенами.',
    category: 'CSS',
    difficulty: 'easy',
    tags: ['variables', 'design-system'],
  },
]

