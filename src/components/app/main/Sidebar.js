import SideButton from "./SideButton"

const Sidebar = () => {
    return (
        <div className="main__sidebar">
            <h3>Task Management</h3>

            <SideButton
                icon={ "far fa-list-alt "}
                text="All Tasks"                
             />

            <SideButton
                icon={ "fas fa-lock" }
                text="In Progress"
             />

            <SideButton
                icon={ "fas fa-check" }
                text="Completed"
             />

            <SideButton
                icon={" fas fa-calendar-week "}
                text="Today"
             />

            <SideButton
                icon={ "fas fa-calendar-day" }
                text="Tomorrow"
             />

            <SideButton
                icon={ "far fa-calendar-times" }
                text="Month"
             />   

          
        </div>
    )
}

export default Sidebar
