import { Show, createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth } from './hooks/useAuth'

function App() {

  const [count, setCount] = createSignal(0)

  const { user, logIn, logOut } = useAuth()
  console.log(user())
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
      <div>
        <h2>Login</h2>
        <Show when={!user()}>
          <p>User NEEDS to be logged in</p>
          <button onClick={() => logIn('adrian.soovary@gmx.de', 'otto123vorbei')}>Log in</button>
        </Show>
        <Show when={user()}>
          <p>User IS logged in</p>
          <button onClick={() => logOut()}>Log Out</button>
        </Show>
        {user()?.email}
      </div>
    </>
  )
}

export default App
