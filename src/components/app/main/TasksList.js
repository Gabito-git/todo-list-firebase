import { useSelector } from "react-redux"
import { PureTaskCard } from "./TaskCard"

const TasksList = () => {

    const { filteredTask, tasks } = useSelector(state => state.task);
    const { action } = useSelector(state => state.ui)

    return (
        <div className="main__task-list">

            {   
                (action === 'All Tasks'? tasks : filteredTask).map(  task => <PureTaskCard 
                                    key={ task.id }
                                    { ...task } 
                            /> 
                )
            }
           
        </div>
    )
}

export default TasksList
