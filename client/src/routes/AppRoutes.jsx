import {Routes, Route} from "react-router";
import {Link, Navigate, Outlet} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import {Login, Home} from "src/users";

import {useUser} from "src/utils/useUser";

import {ListUsers, FormUsers} from "src/users";
import {PublicationForm, PublicationsList} from "src/publications/index.js";
import {PostsView} from "src/public_posts/public_posts_list.jsx";
import IndividualPostView from "src/public_posts/post_detail.jsx";
import PublicRoutes from "src/routes/PublicRoutes.jsx";
import {ServicesList, ServiceForm} from "src/services/index.js";
import {ServicesView} from "src/public_services/public_service_list.jsx";
import IndividualServiceView from "src/public_services/service_detail.jsx";
import {SuggestionsList, SuggestionView} from "src/suggestions/index.js";
import {SuggestionsForm} from "src/public_suggestions/Form.jsx";
import {HomePage} from "src/home/index.jsx";
import {WaterForm} from "src/public_water/Form.jsx";
import {AlcaldesList} from "src/home/AlcaldesList.jsx";

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
                <Route element={<PrivateRoutes forStaff={true}/>}>
                    <Route element={<ListUsers/>} path="usuarios" exact/>
                    <Route element={<FormUsers/>} path="usuarios/nuevo" exact/>
                    <Route element={<FormUsers/>} path="usuarios/:id" exact/>
                </Route>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<PublicationsList/>} path="publicaciones" exact/>
                    <Route element={<PublicationForm/>} path="publicaciones/nuevo" exact/>
                    <Route element={<PublicationForm/>} path="publicaciones/:id" exact/>
                </Route>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<ServicesList/>} path="servicios" exact/>
                    <Route element={<ServiceForm/>} path="servicios/nuevo" exact/>
                    <Route element={<ServiceForm/>} path="servicios/:id" exact/>
                </Route>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<SuggestionsList/>} path="sugerencias" exact/>
                    <Route element={<SuggestionView/>} path="sugerencias/:id" exact/>
                </Route>
            </Route>
            <Route path='/' element={<PublicRoutes/>}>
                <Route path='' element={<HomePage/>} exact/>
                <Route path='formulario-agua' element={<WaterForm/>} exact/>
                <Route path='publicaciones' element={<PostsView/>} exact/>
                <Route path='publicaciones/:id' element={<IndividualPostView/>} exact/>
                <Route path='servicios' element={<ServicesView/>} exact/>
                <Route path='servicios/:id' element={<IndividualServiceView/>} exact/>
                <Route path='sugerencias' element={<SuggestionsForm/>} exact/>
                <Route path='alcaldes' element={<AlcaldesList />} exact />
            </Route>
        </Routes>
    )
}