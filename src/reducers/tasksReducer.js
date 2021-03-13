import datesCalc from "../helpers/datesCalc";
import { types } from "../types/types";
import moment from 'moment';

const initialState = {
    tasks: [],
    filteredTask:[]
}


const tasksReduer = (state= initialState, action) => {  
    
   

    switch (action.type) {
        case types.taskAddNew:
            
            return { ...state, tasks:[...state.tasks, action.payload] };

        case types.taskDelete:

            return{ ...state, tasks: state.tasks.filter( task => task.id !== action.payload ) };

        case types.taskLoad:

            return { ...state, tasks:[...action.payload] };

        case types.taskUpdate:

            return {...state, tasks: state.tasks.map( task => (
                task.id === action.payload 
                ? {...task, completed: !task.completed}
                : task 
            ) )}

        case types.taskCleaning:

            return initialState;

        case types.taskFilter:  
                
            const today = datesCalc( moment( new Date() ).format('l') );
            const month = moment( new Date() ).format('MMMM');

            switch (action.payload) {
                case 'All Tasks':
                    
                    return state;
                
                case 'In Progress':

                    return { ...state, filteredTask: state.tasks.filter( task => task.completed === false ) };

                case 'Completed':

                    return { ...state, filteredTask: state.tasks.filter( task => task.completed === true ) };

                case 'Today':                   

                    return  {...state, filteredTask: state.tasks.filter( task => task.days - today === 0 )};

                case 'Tomorrow':

                    return  {...state, filteredTask: state.tasks.filter( task => task.days - today === 1 )};

                case 'Month':

                    return {...state, filteredTask: state.tasks.filter( task => task.date.split(' ')[0] === month )};                

          
                default:
                    return state;
            }

           
      
            
    
        default:
            return state;
    }

}

export default tasksReduer
