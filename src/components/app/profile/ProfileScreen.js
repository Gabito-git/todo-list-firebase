import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUpdatingProfile } from "../../../actions/auth";
import { removeError, setError, startCreatingProfileImage, startUpdatingProfileImage } from "../../../actions/uiActions";
import fileUpload from "../../../helpers/fileUpload";
import { useForm } from "../../../hooks/useForm";
import { firebase } from "../../../firebase/firebase-config";

const ProfileScreen = () => {

    const [isNotGoogle, setIsNotGoogle] = useState(true);
    const { name } = useSelector(state => state.auth);
    const { profileImage, msgError } = useSelector(state => state.ui)
    const dispatch = useDispatch();

    useLayoutEffect(() => {
       
        const user = firebase.auth().currentUser;

        if( user.providerData[0].providerId === 'google.com' ){
            setIsNotGoogle( false );
        }

    }, [])


    const { formState, handleInputChange } = useForm({
        user: name,
        password: "",
        password2: ""
    })

    const { user, password, password2 } = formState;

    const handleUploadImage = () => {
        document.getElementById('input-image').click();
    }

    const inputImageChange = async( e ) => {

        const imageUrl = await fileUpload( e.target.files[0] ); 

        if( profileImage.url === "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" ){
            dispatch( startCreatingProfileImage( imageUrl ) );
        }else{
            console.log(profileImage.id)
            dispatch( startUpdatingProfileImage(imageUrl, profileImage.id ) )
        }

    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        if( user.length < 2 ){
            dispatch( setError( 'Invalid username' ) );
        } else if( password.length < 6 && password !== "" ){
            dispatch( setError( 'Password length has to be more than 6 and match' ) );
        } else if(password2 === password){
            dispatch( removeError() );
            dispatch( startUpdatingProfile( user, password ) );
        } else if( password === "" && password2 === "" ){
            dispatch( startUpdatingProfile( user ) )
        }       
        
        
    }   

    return (
        <div className="profile">
            <h2>Profile</h2>

            <div className="profile__user-info">
                <div 
                    className="profile__user-image"
                    style={{ backgroundImage: `url( ${ profileImage.url } )` }}
                >
                
                </div>
                <button 
                    className="btn btn--primary block"
                    onClick={ handleUploadImage }
                >
                    Choose a file
                </button>
                <input 
                    id="input-image" 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={ inputImageChange }
                />
            </div>

            {   
                isNotGoogle
                  &&
                <form onSubmit={ handleUpdateProfile }>

                  <div className="input">
                     <input 
                          className="input__field"
                          name="user"
                          value={ user }
                          onChange={ handleInputChange }
                      />
                  </div>
  
                  <div className="input">
                     <input 
                          type="password"
                          className="input__field"
                          placeholder=" Password (blank to keep the same)" 
                          name="password"
                          value={ password }
                          onChange={ handleInputChange }
                      />
                  </div>
  
                  <div className="input">
                      <input 
                          type="password"
                          className="input__field" 
                          placeholder="Confirm (blank to keep the same)" 
                          name="password2"
                          value={ password2 }
                          onChange={ handleInputChange }
                      />
                  </div>
  
                  {
                      msgError
                        &&
                      <div className=" auth__info-danger">
                        { msgError }
                      </div>
  
                  }                
  
                  <button 
                      className="btn btn--primary block mt-2"
                      type="submit"
                  >
                      Update
                  </button>
  
              </form>

            }

           

        </div>
    )
}

export default ProfileScreen
