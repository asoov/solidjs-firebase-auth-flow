import { createSignal, onCleanup } from "solid-js"
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../auth"



export function useAuth() {
  const [user, setUser] = createSignal<User | null>(null)
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal<string | null>(null)

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log('user', user)
    setUser(user)
    setLoading(false)
  }, error => { setError(error.message) })

  onCleanup(() => {
    unsubscribe()
  })

  async function logIn(email: string, password: string) {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function logOut() {
    return await signOut(auth)
  }

  return { user, loading, error, logIn, logOut }
}