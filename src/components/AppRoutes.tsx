import {Routes, Route} from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { privateRoutes, publicRoutes } from '../router'
function AppRoutes() {
    const {isAuth} = useTypedSelector(state => state.auth);
  return (
    isAuth ?
    <Routes>
        {privateRoutes.map(route => <Route path={route.path}  element={<route.element/>} key={route.path}/>)}
    </Routes>
     :
    <Routes>
        {publicRoutes.map(route => <Route path={route.path}  element={<route.element/>} key={route.path}/>)}
    </Routes>
  )
}

export default AppRoutes