import { db } from "../firebase/firebase-config";
import loadTasks from "../helpers/loadTasks";
import { types } from "../types/types";



export const startCreatingProfileImage = ( url ) => {

    return ( dispatch, getState) => {

        const { auth:{uid} } = getState()
        db.collection( `${ uid }/todo-list/profileImage` )
          .add( { url } )
          .then( (doc) => {
            dispatch( setProfileImage( url, doc.id ) )
          } )

    }

}


export const startUpdatingProfileImage = ( url, id ) => {
    console.log( id )
    return (dispatch, getState) => {

        const { auth: { uid } } = getState();

        db.collection( `${ uid }/todo-list/profileImage` )
          .doc( id )
          .update({ url })
          .then(() => {
              dispatch( setProfileImage( url, id ) );
        } );
    }

}


export const startLoadingProfileImage = ( url ) => {
    
    return async( dispatch, getState ) => {

        const { auth: { uid } } = getState();
        const image = await loadTasks( uid, false );

        if( image.length ){
            dispatch( setProfileImage( image[0].url, image[0].id) )
        }
    }

}

export const setError = ( error ) =>({

    type: types.uiSetError,
    payload: error
})

export const removeError = ( ) =>({

    type: types.uiRemoveError,
})

export const startLoading = () =>({

    type: types.uiStartLoading

})

export const stopLoading = () =>({

    type: types.uiStopLoading

})

export const startModal = () => ({
    type: types.uiStartModal
})

export const stopModal = () => ({
    type: types.uiStopModal
})

export const setAction = ( action ) => ({
    type: types.uiSetAction,
    payload: action
})

export const setProfileImage = ( url, id ) => ({

    type: types.uiSetProfileImg,
    payload: {url, id}

})

export const profileImageCleaning = () => ({

    type: types.uiProfileCleaning

})
    
