
import {handleResponse} from '../helpers/handleResponse'
import {authHeader} from '../helpers/authHeader'

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`api/auth/getuser/`, requestOptions).then(handleResponse);
}