import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial state: it's gonna be a single object, any global state will go in this object 
const initialState = {
    transactions: [
        { id: 1, text: 'Flower', amount: -20 },
        { id: 2, text: 'Salary', amount: 300 },
        { id: 3, text: 'Book', amount: -10 },
        { id: 4, text: 'Camera', amount: 150 }
    ]
}

//create Context
export const GlobalContext = createContext(initialState);

//Provider Component to wrap all other components in App.js 
export const GlobalProvider = ({ children  }) => {
    //dispatch is for whenever we want to call a reducer action
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
    <GlobalContext.Provider value={{
        //we can access transactions from any component that uses context
        transactions: state.transactions
    }}>
        {children}
    </GlobalContext.Provider>)
}


