import { useSelector } from "react-redux"
import NewTask from "./NewTask"
import Sidebar from "./Sidebar"
import TaskField from "./TaskField"

const MainScreen = () => {

    const { modal } = useSelector(state => state.ui)

    return (
        <>
            <div className="main">
                <Sidebar/>  

                <div className="main__task-field">
                    <TaskField />
                </div> 

            </div>

            {
                modal
                 &&
                <NewTask />

            }

            
                 
        </>
    )
}

export default MainScreen
