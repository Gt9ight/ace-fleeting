import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utilis/Firebase'
import SignupForm from '../signup/SignupForm'

const SigninForm = () => {
    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
  return (
    <div>
    <div>SigninForm</div>
    <button onClick={logGoogleUser}>sign in with google popup</button>
    <SignupForm />
    </div>
  )
}

export default SigninForm