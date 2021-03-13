
import { types } from "../types/types";

const initialState = {
    uid: null,
    name: '',
    
}

const authReducer = (state=initialState, action) => {
    // console.log( action.payload);
    switch (action.type) {
        case types.authLogin:
            
            return { ...state, ...action.payload };

        case types.authLogOut:

            return { ...initialState };
    
        default:
            return state;
    }

}

export default authReducer
