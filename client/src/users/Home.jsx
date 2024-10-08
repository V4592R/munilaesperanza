import {SmallContainer} from "src/components/Container";
import {MenuCard} from "src/components/MenuCard";
import {ComponentCheckRole} from "src/utils/constants";
import {useUser} from "src/utils/useUser";

export const Home = () => {
    const user = useUser();

    const items = [
        {
            label: "Usuarios",
            iconClass: "bi-people-fill",
            to: "usuarios",
            forStaff: true,
        },
        {
            label: "Publicaciones",
            iconClass: "bi-postcard",
            to: "publicaciones",
            forStaff: false,
        },
        {
            label: "Servicios",
            iconClass: "bi-gear",
            to: "servicios",
            forStaff: false,
        },
    ]

    return (
        <SmallContainer>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h1>Bienvenido</h1>
                <p>Dashboard</p>
                {
                    items.map(({forStaff, label, iconClass, to}) => (
                        <ComponentCheckRole  user={user} key={label} forStaff={forStaff ?? false}>
                            <MenuCard className="col-12 col-md-5 col-lg-4 my-3" label={label} iconClass={iconClass}
                                      to={to}/>
                        </ComponentCheckRole>
                    ))
                }
            </div>
        </SmallContainer>
    )
}
