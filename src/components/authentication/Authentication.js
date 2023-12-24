import React from 'react'
import './authentication.scss'
import SignInForm from '../signinForm/SignInForm'
import SignupForm from '../signupForm/Signup'
const Authentication = () => {

 return (
   <div className='authentication-container'>
     <SignInForm />
     <SignupForm />
   </div>
 )
}

export default Authentication;