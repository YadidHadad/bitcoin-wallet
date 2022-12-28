
const INITIAL_STATE = {
    loggedInUser: null
}

export function userReducer(state = INITIAL_STATE, action) {

    let { loggedInUser } = state
    switch (action.type) {
        case 'SPEND_BALANCE':
            return {
                ...state,
                loggedInUser: { loggedInUser: action.user, balance: loggedInUser.balance - action.amount }
            }
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }

        default:
            return state;
    }

}