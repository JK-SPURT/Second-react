# @zero-dependency/react

[![npm version](https://img.shields.io/npm/v/@zero-dependency/react)](https://npm.im/@zero-dependency/react)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@zero-dependency/react)](https://bundlephobia.com/package/@zero-dependency/react@latest)
![npm license](https://img.shields.io/npm/l/@zero-dependency/react)

## Installation

```sh
npm install @zero-dependency/react
```

```sh
yarn add @zero-dependency/react
```

```sh
pnpm add @zero-dependency/react
```

## Usage

```tsx
import {
  namedLazy,
  useLocalStorage,
  useSessionStorage,
  useCookie,
  ProviderTree,
  createProvider
} from '@zero-dependency/react'

// React.lazy
const LazyComponent = namedLazy(() => import('./LazyComponent'), 'LazyComponent')

// localStorage/sessionStorage
interface User {
  name: string
}

function App() {
  const [users, { setUsers, resetUsers }] = useLocalStorage<User[]>('users', [])

  function addUser(user: User) {
    setUsers((prevState) => [...prevState, user])
  }

  return (
    <div>
      <button onClick={() => addUser({ name: 'John Doe' })}>Add</button>
      <button onClick={() => resetUsers()}>Reset</button>
    </div>
  )
}

// cookie
interface Cookie {
  theme: 'dark' | 'light'
}

function App() {
  const [cookies, { setCookie, removeCookie }] = useCookie<Cookie>({
    initialValue: {
      theme: 'dark'
    },
    attributes: {
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }
  })

  return (
    <div>
      <h1>{cookies.theme}</h1>
      <button onClick={() => setCookie('theme', 'dark')}>Dark</button>
      <button onClick={() => setCookie('theme', 'light')}>Light</button>
      <button onClick={() => removeCookie('theme')}>Remove</button>
    </div>
  )
}

// ProviderTree edge case
import { StrictMode } from 'react'
import { SWRConfig } from 'swr'
import { createRoot } from 'react-dom/client'
import App from './App'
import Layout from './Layout'
import Router from './Router'

const root = document.querySelector<HTMLElement>('#root')!

// this is a helper function to create a tree of components
createRoot(root).render(
  <ProviderTree
    providers={(wrapper) => [
      wrapper(StrictMode),
      wrapper(SWRConfig, {
        value: {
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json())
        }
      }),
      wrapper(Router),
      wrapper(Layout)
    ]}
  >
    <App />
  </ProviderTree>
)

// instead of
createRoot(root).render(
  <StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then(res => res.json())
      }}
    >
      <Router>
        <Layout>
          <App />
        </Layout>
      </Router>
    </SWRConfig>
  </StrictMode>
)

// createProvider
interface Counter {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}

const [useCounter, CounterProvider] = createProvider<Counter>('Counter')

function Counter() {
  const { count, setCount } = useCounter()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <CounterProvider value={{ count, setCount }}>
      <Counter />
    </CounterProvider>
  )
}
```
