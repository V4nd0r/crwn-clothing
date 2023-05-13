import { USER_ACTION_TYPES } from "./user.types";

//Defining initial state for reducer
const INITIAL_STATE = {
    currentUser: null
}

//Reducer
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default: 
            return state;
    }
}
