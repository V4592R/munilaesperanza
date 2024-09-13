import {useMemo} from "react";
import {NavLink} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import PropTypes from "prop-types";

export const BreadCrumbComponent = ({location}) => {
    const pathSegments = useMemo(() => {
        return location.pathname
            .split("/")
            .filter((segment) => segment !== "");

    }, [location.pathname]);
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <NavLink
                    to="/"
                    end
                >
                    Home
                </NavLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
                const urlPath = `/${pathSegments
                    .slice(0, index + 1)
                    .join("/")}`;


                const label = segment
                    .split("-")
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(" ");

                return (
                    <BreadcrumbItem key={urlPath}>
                        <NavLink
                            to={urlPath}
                            end
                        >
                            {label}
                        </NavLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
};

BreadCrumbComponent.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    })
}

