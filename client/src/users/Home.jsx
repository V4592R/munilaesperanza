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
            to: "/usuarios",
        },
    ]

    return (
        <SmallContainer>
            <div className="d-flex flex-column align-items-center justify-content-center">
                {
                    items.map(({allow, label, iconClass, to}) => (
                        <ComponentCheckRole allow={allow} user={user} key={label}>
                            <MenuCard className="col-12 col-md-5 col-lg-4 my-3" label={label} iconClass={iconClass}
                                      to={to}/>
                        </ComponentCheckRole>
                    ))
                }
            </div>
        </SmallContainer>
    )
}
