import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { googleLogin } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useGoogleAuth = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      // Use popup but handle COOP warning
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      })

      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user

      const res = await googleLogin({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        googleId: firebaseUser.uid,
      })

      toast.success(res.data.message || 'Google login successful')
      login(res.data.user, res.data.token)
      navigate('/recommendations')

    } catch (error) {
      console.log('Error code:', error.code)
      console.log('Error message:', error.message)
      toast.error(error.message || 'Google sign in failed')
      throw error
    }
  }

  return { signInWithGoogle }
}