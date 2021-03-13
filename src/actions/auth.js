import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from "sweetalert2";


export const startSignUpWithFormData = ( email, password, name ) => {

    return async( dispatch ) => { 
        
        try {
            const { user } = await firebase.auth()
                                    .createUserWithEmailAndPassword(email, password);

            if( !user?.uid ){
                throw user;
            }
            
            await user.updateProfile({ displayName: name });       
            dispatch( login( user.displayName, user.uid ) );                     
            
        } catch( err ){       

            console.log( err )
        }
       

    }
}

export const startSingInWithFormData = (email, password) => {

    return async( dispatch ) => {

        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword( email, password );

            if( !user?.uid ){
                throw user;
             }

            // dispatch( login( user.displayName, user.uid ) );

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error              
              })
            console.log( error );
        }
        
    }

}

export const startForgotPassword = ( email) => {

    return () => {
        firebase.auth().sendPasswordResetEmail( email )
                .then( () => {
                    Swal.fire({
                        icon: 'success',             
                        text: `An e-mail has been sent to ${ email } to reset your password`,        
                    })
                } )
                .catch( err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err,
                    })
                } )
    }

}

export const startSingInWithGoogle = () => {

    return () =>{ 

        firebase.auth().signInWithPopup( googleAuthProvider )                      
                       
    }


}

export const startSignOut = () => {

    return ( dispatch ) =>{

        firebase.auth().signOut()
                       .then( () => {
                           dispatch( logout() );
                       } )
    }

}

export const startUpdatingProfile = ( displayName, password = "" ) => {

    return async( dispatch ) => {

        try {

            const user = firebase.auth().currentUser;
            await user.updateProfile({
                displayName            
            });
    
            dispatch(login( user.displayName, user.uid ) );    
    
            if( password !== "" ){
                await user.updatePassword( password );
            } 

            Swal.fire({
                icon: 'success',             
                text: 'Profile successfully updated',        
            })
            
        } catch (error) {
                    
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
            
        }
      
       
    }

}   

export const login = ( name, uid ) =>({

    type: types.authLogin,
    payload: { name, uid }

})

export const logout = () => ({

    type: types.authLogOut

})