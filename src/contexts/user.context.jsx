import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

//export the the value
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
})

//set up action types
export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

//Reducer
const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default: 
            throw new Error(`Unhandled type: ${type} in userReducer`);
    }
}

//Defining initial state for reducer
const INITIAL_STATE = {
    currentUser: null
}

//export the provider (actual functional component)
export const UserProvider = ({ children }) => {
    const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE)

    const setCurrentUser = (user) => {
        dispatch(
            createAction(
                USER_ACTION_TYPES.SET_CURRENT_USER, 
                user)
        );
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
               createUserDocumentFromAuth(user);
            }
            console.log(user);
            setCurrentUser(user);
        })
        return unsubscribe;
    }, 
    []);

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}
