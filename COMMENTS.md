## Process:

1. ### create react app:
npx create-react-app

2.  ### UI Display
- create a folder of components within the src file
    - Header.js
    - Balance.js
    - IncomeExpense.js
    - TransactionList.js
    - AddTransaction.js 
        to handle the form
        import { useState } we need component level state because the input needs to be part of the state.
        const [text, setText] = useState('');
        const [amount, setAmount] = useState('');
        connect the above states to the form and add onclick events

3. ### Functionality 

- next step is global state. We're going to useContext instead of prop drilling

- create a folder called context
    - create GlobalContext.js
    - inside GlobalContext import createContext and useReducer
    - create AppReducer:
    a reducer is how we specify the application state changes, in response to certain actions to our context