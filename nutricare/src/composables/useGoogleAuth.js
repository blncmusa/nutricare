import { ref } from 'vue'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)

const useGoogleAuth = (redirectAfterGoogleLogin) => {
  const handleGoogleLogin = async () => {
    error.value = null
    isPending.value = true

    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      // Handle successful login
      console.log('Google login success:', result)
      error.value = null
      isPending.value = false
      redirectAfterGoogleLogin() // Call the provided callback function
    } catch (err) {
      // Handle login error
      console.error('Google login error:', err)
      error.value = err.message
      isPending.value = false
    }
  }

  return { error, isPending, handleGoogleLogin }
}

export default useGoogleAuth
