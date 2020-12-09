

const AppReducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,//set the current state
                //send down all the transactions except the one that was deleted
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                //initial state
                ...state,
                //send the new transaction in addition to the existing transactions
                transactions: [action.payload, ...state.transactions]
            }
        default:
            return state;
    }
}

export default AppReducer

