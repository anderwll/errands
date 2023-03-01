import { combineReducers } from 'redux';

import { userLoggedReducer } from './userLogged/userLoggedSlice';
import { usersReducer } from './users/usersSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    userLogged: userLoggedReducer,
});

export { rootReducer };
