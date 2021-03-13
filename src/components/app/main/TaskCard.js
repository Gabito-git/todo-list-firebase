import { useDispatch } from "react-redux";
import { startDeleteTask, startUpdatingTask } from "../../../actions/tasksActions";
import { startLoading } from "../../../actions/uiActions";
import { memo } from "react";


const TaskCard = ( { title, id, description, completed, date, importance } ) => { 

    const dispatch = useDispatch();
    // const { loading } = useSelector(state => state.ui);


    const handleDelete = () =>{
        dispatch( startDeleteTask(id ) );
    }

    const handleCompleted = () => {
        dispatch( startLoading() );
        dispatch( startUpdatingTask( !completed, id ) );        
    }
    
    return (
        <div className="task animate__animated animate__fadeIn">
            <div className="task__title">
                <h3>{ title }</h3>
                <i 
                    className="far fa-trash-alt pointer"
                    onClick={ handleDelete }
                ></i>
            </div>
            <div className="task__body">
            { description }
         
            </div>
            <div className="task__info">
                <div className="mr-2">
                    <i className="far fa-clock mr-1"></i>
                    { date }
                </div>
                <div>
                    <i 
                        className="fas fa-flag mr-1"
                        style={{ color: `
                            ${ importance === 'low'
                                ? 'green'
                                : importance === 'medium'
                                    ? 'yellow': 'red' }` }}
                    ></i>
                    <i                          
                        className="fas fa-check pointer"
                        onClick={ handleCompleted }
                        style={{ color: `${ completed ? '#535353': '#c5b3b3' }`}}
                    ></i>
                </div>
            </div>
            
        </div>
    )
}

// export default TaskCard;

export const PureTaskCard = memo( TaskCard  );


