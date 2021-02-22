import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handleResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login (email, password)  {

      const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            referrer: "about:client",
            body: JSON.stringify(
                {

                    email: email,
                    password: password,

                }),
        }

    return fetch('/api/auth/login/', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(user)
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function register (email, password)  {

      const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            referrer: "about:client",
            body: JSON.stringify(
                {

                    email: email,
                    password: password,

                }),
        }

    return fetch('/api/auth/register/', requestOptions);
      
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}