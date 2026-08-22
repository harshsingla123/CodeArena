import './App.css'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
      <header>
        <h1>Welcome to the Interview Platform</h1>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
          <SignOutButton />
        </Show>
      </header>
    </>
  )
}

export default App