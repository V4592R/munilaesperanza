import {Routes, Route} from "react-router";
import {Link, Navigate, Outlet} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import {Login, Home} from "src/users";

import {useUser} from "src/utils/useUser";

import {ListUsers, FormUsers} from "src/users";

const NoRoleUser = () => {
    return (
        <>
            <h1>Usted no puede ingresar al sistema, consulte con el administrador</h1>
            <Link to="login">Regresar al login</Link>
        </>
    );
};

export const AppRoutes = () => {
    const user = useUser();
    return (
        <Routes>
            <Route path='/admin' element={<Outlet/>}>
                    <Route element={user && user.token ? <Navigate to="/admin"/> : <Login/>} path="login" exact/>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<NoRoleUser/>} path="norole" exact/>
                    <Route element={<Home/>} path="" exact/>
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route element={<ListUsers/>} path="usuarios" exact/>
                    <Route element={<FormUsers/>} path="usuarios/nuevo" exact/>
                    <Route element={<FormUsers/>} path="usuarios/:id" exact/>
                </Route>
            </Route>

        </Routes>
    )
}