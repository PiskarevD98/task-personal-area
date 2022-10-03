import Auth from '../components/pages/Auth'
import List from "../components/pages/List";

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RoutesNames {
    MAIN = '/',
    LIST = '/',
}

export const publicRoutes: IRoute[] = [
    {path: RoutesNames.MAIN, element:Auth}
]

export const privateRoutes: IRoute[] = [
    {path: RoutesNames.LIST, element:List}

]
