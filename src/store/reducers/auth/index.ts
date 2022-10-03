import { IUser } from "../../../components/models/IUser";
import { AuthAction, AuthState, AuthActionEnum } from "./types";


const initialState: AuthState = {
    isAuth: false, 
    user: {} as IUser
}


export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch( action.type){
       case AuthActionEnum.SET_AUTH: 
       return {...state, isAuth: action.payload}
       case AuthActionEnum.SET_USER:
        return {...state, user: action.payload}
       
        default:
        return state;
    }
}