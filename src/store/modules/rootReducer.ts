import { combineReducers } from 'redux';

import { errandsReducer } from './errands/errandsSlice';
import { userLoggedReducer } from './userLogged/userLoggedSlice';
import { usersReducer } from './users/usersSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    userLogged: userLoggedReducer,
    errands: errandsReducer,
});

export { rootReducer };
