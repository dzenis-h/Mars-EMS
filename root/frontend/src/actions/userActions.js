import * as actionTypes from '../actionTypes/actionTypes';

export const getLoggedUser = (data) => {
    return {
        type: actionTypes.GET_LOGGED_USER,
        data
    }
}

export const removeLoggedUser = (data) => {
    return {
        type: actionTypes.REMOVE_LOGGED_USER,
        data
    }
}