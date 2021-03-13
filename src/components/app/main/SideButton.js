import { useEffect, useState,  } from "react"
import { useDispatch, useSelector } from "react-redux";
import { filterTask } from "../../../actions/tasksActions";
// import { filterTask } from "../../../actions/tasksActions";
import { setAction } from "../../../actions/uiActions";

const SideButton = ({icon, text }) => {

    const dispatch = useDispatch();
    const { action } = useSelector(state => state.ui);
    const [active, setActive]= useState(false);

    const handleAction = () => {
        dispatch( setAction( text ) );
        dispatch( filterTask( text ) );
    }

    useEffect(() => {
       
        if( action === text ){
            setActive( true );
        }else{
            setActive( false )
        }

    }, [action, text]);


    return (
        
        <div 
            className={` main__sideButton ${ active && 'main__activeButton' }`}
            onClick={ handleAction }
        >
            <i className={`${ icon } mr-2` }></i>
            { text }
        </div>
        
    )
}

export default SideButton


