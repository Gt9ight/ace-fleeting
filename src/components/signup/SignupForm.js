// import { useState } from "react"
// import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utilis/Firebase";
// import './signup.scss'
// import { Link } from "react-router-dom";


// const defaultFormFields = {
//     displayName:'',
//     email:'',
//     password:'',
//     confirmPassword:''
// }

// const SignupForm = () => {
//     const [formFields, setFormFields] = useState(defaultFormFields);
//     const {displayName, email, password, confirmPassword} = formFields;

//     console.log(formFields)

//     const resetFormFields = () => {
//         setFormFields(defaultFormFields)
//     }
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if(password !== confirmPassword){
//             alert('passwords do not match')
//             return
//         }

//         try {
//             const {user} = await createAuthUserWithEmailAndPassword(email, password);

//             await createUserDocumentFromAuth(user, {displayName});
//             resetFormFields();


//         }catch(error) {
//             if(error.code === 'auth/email-already-in-use'){
//                 alert('Cannot create user, email already in use')
//             }else{
//              console.log('user creation encountered an error', error)
//             }
//         }
//     }

//     const handleChange = (event) => {
//         const {name, value} = event.target
//         setFormFields({...formFields, [name]: value})
//     }
//  return (
//     <div className='form-container'>
//         <div className='form-wrapper'>
//             <span className='logo'>Ace Fleeting</span>
//             <span className='title'>Register</span>
//             <form onSubmit={handleSubmit}>
//                 <input type='text' required onChange={handleChange} name="displayName" value={displayName} placeholder='display name'/>
//                 <input type='email' required onChange={handleChange} name="email" value={email} placeholder='email'/>
//                 <input type='password' required onChange={handleChange} name="password" value={password} placeholder='password'/>
//                 <input  type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword} placeholder="Confirm Password"/>
//                 <button>Sign up</button>
//             </form>
//             <p>You do have an account? <Link to='/login'>Login</Link></p>
//         </div>
//     </div>
//   )
// }

// export default SignupForm