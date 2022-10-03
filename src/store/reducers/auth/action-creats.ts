import axios from "axios";
import { AppDispatch } from "../../index";
import { IUser } from "../../../components/models/IUser";
import { AuthActionEnum, SetAuthAction, SetUserAction } from "./types";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean) : SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    enter: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get<IUser[]>('http://localhost:3000/users')
            const mockUser = response.data.find( user => user.username === username && user.password === password)
           if(mockUser) {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', mockUser.username);
            dispatch(AuthActionCreators.setIsAuth(true))
            dispatch(AuthActionCreators.setUser(mockUser))
           } else {
            alert('Неправильное имя или пароль')
           }
        } catch (e) {
            alert('error')
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}