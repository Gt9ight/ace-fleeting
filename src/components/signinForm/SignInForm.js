import {useState} from 'react'
import FormInput from '../forminput/FormInput';
import './signin.scss'
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utilis/Firebase';

const defaultFormFields = {
  email:'',
  password:'',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;
  

 


  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }


  const signInWithGoogle= async () => {
    await signInWithGooglePopup();
    
     
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();


    }catch(error){
      if(error.code === 'auth/invalid-login-credentials' ) {
        alert('incorrect email or password')
      }
     }
  }

  const handleChange = (event) =>{
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value });
  }
  return (
    <div className='sign-up-container'>
      <h2>Already Have an account?</h2>
        <span>Sign In with your email or passaword</span>

        <form onSubmit={handleSubmit}>     
            <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>     
            <FormInput label='Password'type='password' required onChange={handleChange} name='password' value={password}/>
           
           <div className='buttons-container'>
            <button type='submit'>Sign In</button>
            <button  onClick={signInWithGoogle}>Google Sign In</button>
          </div>

        </form>
    </div>
  )
}

export default SignInForm