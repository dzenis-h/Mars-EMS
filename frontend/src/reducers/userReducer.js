import initialState from '../initial/initialState';
import * as actionTypes from '../actionTypes/actionTypes';

const userReducer = (state = initialState.loggedUser, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGGED_USER:
            return action.data;

        case actionTypes.REMOVE_LOGGED_USER:
            return null;

        default:
            return state;
    }
}

export default userReducer;
