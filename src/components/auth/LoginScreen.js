import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startForgotPassword, startSingInWithFormData, startSingInWithGoogle } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import Swal from "sweetalert2";
import validator from 'validator';


const LoginScreen = () => {

    const dispatch = useDispatch();

    const { formState, handleInputChange } = useForm({
        email:'',
        password: ''
    })

    const { email, password } = formState;

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch( startSingInWithFormData( email, password ) );
    }

    const handleGoogleLogin = () => {

        dispatch( startSingInWithGoogle() );
    }

    const handleResetPassword = () => {
        if(!validator.isEmail( email )){
            Swal.fire({
                icon: 'error',
                title: 'Please introduce a valid e-mail',                
            })
        }else{
            dispatch( startForgotPassword( email ) );
        }
    }

    return (
        <div className="auth">
            <div className="auth__box animate__animated animate__fadeIn">

                <div className="auth__box--blue">
                    <h2>Login</h2>
                    <p>Log in and start creating your next task</p>
                    <p>Don't you have an account ? <Link className="link" to="/auth/register">Sign up</Link> </p>
                </div>

                <div className="auth__box--white">
                    <form onSubmit={ handleSignIn }> 
                        <div className="input">
                            <input
                                className="input__field"
                                type="text" 
                                placeholder="Email"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                       
                        <div className="input">
                            <input
                                className="input__field"
                                type="password" 
                                placeholder="Password"
                                name="password"
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>
                      
                        <div>
                            <button 
                                className="btn btn--primary block mt-4"
                                type="submit"
                            >
                                Login
                            </button>                       
                        </div>

                        <div 
                            className="auth__social-networks"                            
                        >
                            <p>Login with social networks</p>
                            <div 
                                className="google-btn"
                                onClick={ handleGoogleLogin }
                            >
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                </div>
                                <p className="btn-text">
                                    <b>Sign in with google</b>
                                </p>
                            </div>
                        </div>

                        <div className="auth__forgot">
                            <p
                                onClick={ handleResetPassword }
                            >Forgot Password?
                            </p>
                        </div>

                    </form>
                    

                </div>
            </div>
        </div>
    )
}

export default LoginScreen
