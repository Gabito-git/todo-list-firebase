import { useDispatch, useSelector } from "react-redux"
import { startNewTask } from "../../../actions/tasksActions";
import {removeError, setError, stopModal } from "../../../actions/uiActions";
import { useForm } from "../../../hooks/useForm";
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import datesCalc from "../../../helpers/datesCalc";


const NewTask = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const [datePicked, setDatePicked] = useState(new Date())

    useEffect(() => {
        dispatch( removeError() );
    }, [dispatch])

    const { formState, handleInputChange } = useForm({
        title: '',
        description: '',
        importance:'null',
    })  
    
    const { title, description, importance } = formState;

    const handleModal = () => {
        dispatch( stopModal() );
    }   

    const handleNewTask = ( e ) => {
        e.preventDefault();        
        
        if( !isFullFIlled() ){return };

        const days = datesCalc(moment(datePicked).format('l'));

        const newTask = {
            title, 
            description, 
            importance,
            completed:false,
            date: moment(datePicked).format('LL'),
            days
        };

        dispatch( startNewTask( newTask ) );
        dispatch( stopModal() );

    }

    const isFullFIlled = () => {

        if( title === '' ){
            dispatch( setError( 'Please fill out the title field' ) );
            return false;
        }else if( description ==='' ){
            dispatch( setError( 'Please fill out the description field' ) );
            return false;
        }else if( importance ==='null' ){
            dispatch( setError( 'Please select an importance' ) );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <div className="new-task" id="pop-up">
            <div className="new-task__content animate__animated animate__fadeIn">

                <div className="new-task__close">
                    <i 
                        className="fas fa-times pointer"
                        onClick={ handleModal }
                    ></i>
                </div>

                <form onSubmit={ handleNewTask }>

                    <div className="new-task__group">
                        <h3>Title</h3>
                        <div className="input">
                            <input
                                id="titleInput"
                                placeholder="What needs to be done?"
                                className="input__field"
                                name="title"
                                value={ title }
                                onChange={ handleInputChange }
                            />                            
                        </div>
                    </div>
                    <div className="new-task__group">
                        <h3>Description</h3>
                        <div className="new-task__area">
                            <textarea
                                id="descInput"
                                placeholder="Description about this task"
                                className="new-task__textarea"
                                name="description"
                                value={ description }
                                onChange={ handleInputChange }
                            >
                            </textarea>
                        </div>
                       
                    </div>

                    <div className="new-task__group ">
                        <h3>Date picker</h3>
                        <div className="new-task__date-picker">
                            {/* <MaterialUIPickers funct={ handleInputChange } /> */}
                            <DatePicker selected={datePicked} onChange={date => setDatePicked(date)} />
                        </div>
                    
                    </div>

                    <div className="new-task__importance">
                        <p>Importance </p> 
                        <select name="importance" onChange={ handleInputChange }  className="new-task__select">
                            <option 
                                value="null"
                            >Seleccione</option>

                            <option 
                                value="low"
                            >Low</option>

                            <option 
                                value="medium"
                            >Medium</option>

                            <option 
                                value="high"
                            >High</option>
                        </select>                  
                    </div>

                    {
                        msgError   
                          &&
                        <div className="new-task__alert-info">
                          {msgError}
                       </div>
                        

                    }                   

                    <button 
                        className="btn btn--primary block mt-4"
                    >
                        Add new task
                    </button>

                </form>             
                
            </div>
        </div>  
    )
}

export default NewTask
//