import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { startSignOut } from "../../../actions/auth";
import { logoutCleaning } from "../../../actions/tasksActions";
import { profileImageCleaning } from "../../../actions/uiActions";
// import { startLogoutCleaning } from "../../../actions/tasksActions";

const Topbar = () => {

    const [menu, toggle] = useReducer(menu => !menu, false);
    const { name} = useSelector(state => state.auth);
    const { profileImage } = useSelector(state => state.ui)
    const location = useLocation();
    const dispatch = useDispatch();


    const handleSignOut = () => {
        
        dispatch( startSignOut() );
        dispatch( logoutCleaning()  );
        dispatch( profileImageCleaning() );
    }

    return (
        <div className="topbar">
            <h1>Todo App</h1>
            <div className="topbar__info-box">
				
           		 <h2>{ name }
                        <i 
                            className={ `fas fa-chevron-down pointer ml-1 ${ menu && 'fa-rotate-180' } ` }
                            onClick={ toggle }
                        >                            
                        </i>
                </h2>
              
                <div 
                    className="topbar__img-container"
                    style={{ backgroundImage:`url( ${ profileImage.url } )` }}
                >
                </div>
                
			   

                 {
                     menu 
                      &&
                    <div className="topbar__menu animate__animated animate__fadeIn" >
                        <Link 
                            to={ location.pathname === "/main" ? "/profile": "/main" }
                            className="link"
                        >
                            { location.pathname === "/main"? 'Profile': 'Menu' }</Link>
                        <p
                            onClick={ handleSignOut }
                        >
                            Logout
                        </p>
                    </div>

                 }

            </div>
        </div>
    )
}

export default Topbar
