## Development Process:

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
    - Transaction.js

3. ### Functionality 

- next step is global state. We're going to useContext instead of prop drilling

- create a folder called context
    - create GlobalContext.js
    - inside GlobalContext import createContext and useReducer
    - create AppReducer:
    a reducer is how we specify the application state changes, in response to certain actions to our context

    - TransactionList.js
        - pull the global state into the TransactionList.js component by using the useContext hook
        - import GlobalContext from context/GlobalState
        - import Transaction.js map through the transactions object that is coming from the GlobalState and pass <Transaction />, also pass each transaction from the object as a prop. Add a unique key for this list

    - Create Transaction.js
        - return the <li> element from  Transaction.js
        - catch each transaction passed as a prop in TransactionList.js
        - each amount should be preceded by a positive or negative sign to indicate if it is an income or an expense. Use a ternary  operator, if the amount is less than zero display a negative sign, if not display a plus sign
        - get rid of the negative sign coming from transaction.amount, we only one to display the negative sign from the ternary operator. 
        Wrap transaction amount inside Math.abs(), to get an absolute number which will always be positive
        - handle the border green if income, red if expense. Use a ternary operator to choose the className dynamically. If amount < 0 ? 'red' : 'green'

    - Balance.js:
        - import GlobalContext from GlobalState
        - bring in const { transactions } = useContext(GlobalContext)
        - use map to create an array with the amounts
        - to get the total amount use reduce to add all amounts together and use toFix(2) to get 2 decimals.The total balance will update every time we delete, edit or add amounts

    - IncomeExpenses.js
        - import GlobalContext from GlobalState
        - bring in const { transactions } = useContext(GlobalContext)
        - we need to apply some calculations to get the income and expense
        - Income = amounts
            filter through and get any number greater than zero
            reduce to add all numbers together
            toFixed(2) to add two decimals
        - Expense = amounts
            filter and get any number less than zero
            reduce to add them all together 
            toFixed(2)

    - GlobalState.js
        - we need to have in action in our GlobalState, so inside the Provider above the return add the Actions that are going to make the calls to our reducer
        - the actions will be delete, add, edit... make them into functions, 
        inside each function dispatch an object to our reducer with a type which is going to be a descriptive string and a payload which is any data we want to send, in this case will be id
        this type: 'ACTION_STRING' will be used in a switch statement inside AppReducer.js, used type as cases
        - pass down the action e.g. deleteTransaction in the provider as we initially did with the transactions

- AppReducer:
reducer is a way to change the state and send it down to the component. We can't just change a state, we have to create a new one and send it down.
 delete: filter out anything with the action.payload.id that wants to be deleted

- Transactions.js
    - Import { useContext }
    - Import GlobalContext from GlobalState
    - bring in the deleteTransaction action and set that to useContext(GlobalContext)
    call the action deleteTransaction onClick using the delete button, identify the action with the transaction.id coming from TransactionList.js

    to add a transaction
    1. first create an action in our GlobalState addTransaction(transaction), instead of just passing the id as we did with deleteTransaction, pass the entire transaction. Dispatch 'ADD_TRANSACTION' and the payload should also be the entire transaction
    2. pass addTransaction in the Provider so it becomes available for all components throughout the entire app
    3. create the action in the reducer, go to AppReducer.js and create another case in the switch statement. Return the transactions that are already there in addition to the new one which is in the payload
    4. go to AddTransaction.js, useContext, import GlobalContext
       use the addTransaction action 
       const { addTransaction } = useContext(GlobalContext)
       on the form add an onSubmit event with an onSubmit function
       inside the onSubmit function, build a newTransaction object and return the action with the new object addTransaction(newTransaction)
  
