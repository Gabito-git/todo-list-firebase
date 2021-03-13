import { Route, Redirect } from "react-router-dom";
import  PropTypes  from 'prop-types';

const PrivateRoute = ({
    isLoggedIn,
    component:Component,
    ...rest
}) => {
    // console.log( isLoggedIn )
    return (
        <Route 
            {...rest}
            component = { ( props ) => (
                    isLoggedIn
                        ? <Component {...props}/>
                        : <Redirect to="/auth/login" />
             ) } 
        />
    )
}

export default PrivateRoute


PrivateRoute.propTypes = {

    isLoggedIn: PropTypes.bool.isRequired

}