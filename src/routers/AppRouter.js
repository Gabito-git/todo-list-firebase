import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch, 
    Redirect,
    
} from "react-router-dom";
import AuthRouter from "./AuthRouter";
import DashboardRouter from "./DashboardRouter";
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import PublicRoute from "../routes/PublicRoute";
import PrivateRoute from "../routes/PrivateRoute";
import { startLoadingNotes } from "../actions/tasksActions";
import { startLoadingProfileImage } from "../actions/uiActions";

const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, checkToggle] = useState( true );
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {

        firebase.auth().onAuthStateChanged( user => {
            
            if( user?.uid ){
                
                dispatch( login( user.displayName, user.uid) );
                dispatch( startLoadingNotes() );
                dispatch( startLoadingProfileImage( ) );                
                setLoggedIn( true );
                
            }else{
                setLoggedIn( false );
            }

            checkToggle( false );

        } )
    }, [dispatch]);


    if( checking ){ return <h2> Wait... </h2> }
    
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div>

                <Switch>

                    <PublicRoute  
                        path="/auth" 
                        isLoggedIn={ loggedIn }
                        component={ AuthRouter } 
                    />

                    <PrivateRoute 
                         
                         path="/" 
                         isLoggedIn={ loggedIn }  
                         component={ DashboardRouter } 
                    /> 

                    <Redirect to="/auth/login" />

                </Switch>


            </div>
        </Router>
    )
}

export default AppRouter
