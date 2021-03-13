import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { startSignUpWithFormData } from '../../actions/auth';
import { removeError, setError } from '../../actions/uiActions';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const { formState, handleInputChange } = useForm({
        username: '',
        email:'',
        password:'',
        password2: ''
    });

    const { username, email, password, password2 } = formState;

    const handleSignUp = (e) => {
        
        e.preventDefault();
        if( isValidForm() ){
            dispatch( startSignUpWithFormData( email, password, username ) );
        }

    }

    const isValidForm = () => {

        if( username.length < 2 ){
            dispatch( setError( 'The username length has to be more than two' ) );
            return false;

        }else if( password !== password2 || password.length < 6 ){
            dispatch( setError( 'Password length has to be more than 6 and match' ) );
            return false;

        }else if( !validator.isEmail( email ) ){
            dispatch( setError( 'Please use a valid e-mail' ) );
            return false;
        }else{

            dispatch( removeError() );
            return true;

        }

    }

    return (
        <div className="auth">
            <div className="auth__box animate__animated animate__fadeIn">
                <div className="auth__box--white">
                    <div>
                        <form onSubmit={ handleSignUp } >

                            <div className="input">
                                <input
                                    className="input__field"
                                    type="text" 
                                    placeholder="Username"
                                    name="username"
                                    value={ username }
                                    onChange={ handleInputChange }
                                />
                            </div>

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

                            <div className="input">
                                <input
                                    className="input__field"
                                    type="password" 
                                    placeholder="Password confirm"
                                    name="password2"
                                    value={ password2 }
                                    onChange={ handleInputChange }
                                />
                            </div>

                            <button 
                                className="btn btn--primary block mt-4"
                                type="submit"
                            >
                                Sign Up
                            </button>

                        </form>
                      

                    </div>          
                 

                </div>

                <div className="auth__box--blue">
                    <h2>Sign Up</h2>
                    <p>Register and create an account on Todo List. Write your tasks anytime and anywhere</p>
                    <p>Already have an account ?  <Link className="link" to="/auth/login">Login</Link> </p>

                    {
                        msgError
                           &&
                        <div className=" auth__info-danger">
                           { msgError }
                        </div>

                    }
                    
                </div>

            </div>
        </div>
    )
}
