import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';


const PublicRoute = ({
    isLoggedIn,
    component:Component,
    ...rest
}) => {
    // console.log( isLoggedIn )

    return (
        <Route 
            {...rest}
            component = { ( props ) => (
                    !isLoggedIn
                        ? <Component {...props}/>
                        : <Redirect to="/main" />
             ) } 
        />
    )
}

export default PublicRoute

PublicRoute.propTypes = {

    isLoggedIn: PropTypes.bool.isRequired

}
