import { authenticationService } from '../services/authenticationservice';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Token ${currentUser.token}` };
    } else {
        return {};
    }
}