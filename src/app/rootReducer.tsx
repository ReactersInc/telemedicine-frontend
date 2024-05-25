import {combineReducers} from 'redux'
import userReducer from '../features/users/userSlice'
import modalReducer from '../features/modal/modalSlice'


const rootReducer = combineReducers({
        user: userReducer,
        // userRegister: userRegisterReducer,
        modal: modalReducer
    })

export default rootReducer