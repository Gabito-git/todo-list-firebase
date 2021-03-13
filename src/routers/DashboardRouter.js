import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import MainScreen from "../components/app/main/MainScreen";
import ProfileScreen from "../components/app/profile/ProfileScreen";
import Topbar from "../components/app/topbar/Topbar";
 

const DashboardRouter = () => {
  

    return (
        <div className="dashboard">
            <Topbar/>
            
            <Switch>

                <Route exact path="/profile" component={ ProfileScreen } />
                <Route exact path="/main" component={ MainScreen } />

                <Redirect to="/main" />

            </Switch>
            
        </div>
    )
}

export default DashboardRouter
