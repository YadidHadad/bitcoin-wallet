
import { userService } from "../../services/user.service"


export function spendBalance(amount) {
    return async (dispatch) => {
        dispatch({ type: 'SPEND_BALANCE', amount })
    }
}

export function setUser() {

    return async (dispatch, getState) => {
        try {
            const user = await userService.getLoggedInUser()
            dispatch({ type: 'SET_USER', user })

        } catch (err) {
            console.log('err:', err)
        }
    }
}