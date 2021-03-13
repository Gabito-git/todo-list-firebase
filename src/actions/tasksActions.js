import { db } from "../firebase/firebase-config"
import loadTasks from "../helpers/loadTasks";
import { types } from "../types/types";
import { stopLoading } from "./uiActions";


export const startNewTask = ( task ) => {

    
    return (dispatch, getState) => {

        const { auth: { uid } } = getState();

        db.collection( `${ uid }/todo-list/tasks` )
          .add( task )
          .then( ( doc ) => {

            dispatch( addNewTask( task, doc.id ) )

          } )

    }

}

export const startDeleteTask = ( id ) => {

    return ( dispatch, getState ) => {

        const { auth: { uid } } = getState();

        db.collection( `${ uid }/todo-list/tasks` )
          .doc( id )
          .delete( )
          .then( () => dispatch( deleteTask( id ) ) );
    }

}

export const startLoadingNotes = () => {
    
    return async( dispatch, getState ) => {

        const { auth: { uid } } = getState();
        const tasks = await loadTasks( uid );

        dispatch( loadTasksAction( tasks ) );

    }
} 

export const startUpdatingTask = ( completed, id ) => {

    return (dispatch, getState) => {

        const { auth: { uid } } = getState();

        db.collection( `${ uid }/todo-list/tasks` )
          .doc( id )
          .update({completed })
          .then(() => {
              dispatch( updateTask(  id  ) );
              dispatch( stopLoading() );
        } );
    }

}


const addNewTask = ( task, id ) => ({

    type: types.taskAddNew,
    payload: { ...task, id}

})

export const filterTask = ( filter ) => ({

    type: types.taskFilter,
    payload: filter

})

export const deleteTask = ( id ) => ({

    type: types.taskDelete,
    payload: id

})

export const loadTasksAction = ( tasks ) =>({

    type: types.taskLoad,
    payload: tasks

})

export const updateTask = ( id ) => ({

    type: types.taskUpdate,
    payload: id

})

export const logoutCleaning = () =>({

    type: types.taskCleaning

})
