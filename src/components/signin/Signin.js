// import { useState } from "react"
// import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utilis/Firebase";
// import { useNavigate, Link } from "react-router-dom";
// import './signin.scss'



// const defaultFormFields = {
//     email:'',
//     password:''
// }

// const SignInForm = () => {
//     const [formFields, setFormFields] = useState(defaultFormFields);
//     const {email, password} = formFields;
//     const navigate = useNavigate()

//     console.log(formFields)

//     const resetFormFields = () => {
//         setFormFields(defaultFormFields)
//     }


//     const signInWithGoogle = async() => {
//         const {user} = await signInWithGooglePopup();
//         await createUserDocumentFromAuth(user)
//         navigate('/fleetform')
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         navigate('/fleetform')


//     try {
//         const response = await signInAuthUserWithEmailAndPassword(email, password)
//         console.log(response)
//     resetFormFields();
//     }catch(error) {
//     switch(error.code){
//         case 'auth/wrong-passwoird':
//             alert('incorrect password for email')
//             break
//             case'auth/user-not-found':
//             alert('no user associated with this email');
//             break;
//             default:
//             console.log(error)
//         }
//     }
//     }

//     const handleChange = (event) => {
//         const {name, value} = event.target
//         setFormFields({...formFields, [name]: value})
//     }
//     return (
//         <div className='signinform-container'>
//             <div className='form-wrapper'>
//                 <span className='logo'>Ace Fleeting</span>
//                 <span className='title'>Login</span>
//                 <form onSubmit={handleSubmit}>
//                     <input type='email' required onChange={handleChange} name="email" value={email} placeholder='email'/>
//                     <input type='password' required onChange={handleChange} name="password" value={password} placeholder='password'/>
//                     <button>Sign in</button>
//                     <button onClick={signInWithGoogle}>Sign in with Google</button>
//                 </form>
//                 <p>You dont have an account? <Link to='/register'>Register</Link></p>
//             </div>
//         </div>
//       )
//     }

// export default SignInForm