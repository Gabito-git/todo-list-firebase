import { useDispatch, useSelector } from "react-redux"
import { startModal } from "../../../actions/uiActions";
import TasksList from "./TasksList"


const TaskField = () => {

    const dispatch = useDispatch();
    const { action } = useSelector(state => state.ui);
    const { tasks, filteredTask } = useSelector(state => state.task)

    const handleModal = () =>{
        dispatch( startModal() );
    }

    return (
        <>
            <h2>{ action }<span>({ action === 'All Tasks'? tasks.length: filteredTask.length })</span> </h2>
            <div className="main__taskAndButton">

                <TasksList />

                <div className="main__button">
                    <button 
                        className="btn btn--primary block"
                        onClick={ handleModal }
                    >
                        + New Task
                    </button >                                                

                </div>               

            </div>
        </>
    )
}

export default TaskField
