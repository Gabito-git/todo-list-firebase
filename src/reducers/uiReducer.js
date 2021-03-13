import { types } from "../types/types";

const initialState = {
    msgError: null,
    loading: false,
    modal: false,
    action: 'All Tasks',
    profileImage: {
        url: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        id: ''
    }
}

const uiReducer = (state= initialState, action) => {

    switch (action.type) {
        case types.uiSetError:
            
            return { ...state, msgError: action.payload };

        case types.uiRemoveError:

            return { ...state, msgError: null };

        case types.uiStartLoading:

            return { ...state, loading: true};

        case types.uiStopLoading:

            return { ...state, loading: false};

        case types.uiStartModal:

            return { ...state, modal: true };

        case types.uiStopModal:

            return { ...state, modal: false };
        
        case types.uiSetAction:

            return {...state, action: action.payload };

        case types.uiSetProfileImg:

            return { ...state, profileImage: action.payload };

        case types.uiProfileCleaning:

            return initialState;
    
        default:
            return state;
    }
    
}

export default uiReducer
