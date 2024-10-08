import {useMemo, Fragment} from "react";
import {NavLink} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import PropTypes from "prop-types";

export const BreadCrumbComponent = ({location, defaultHome = '/admin'}) => {
    const pathSegments = useMemo(() => {
        return location.pathname
            .split("/")
            .filter((segment) => segment !== "");

    }, [location.pathname]);
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <NavLink
                    to={defaultHome}
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

                if (label === "Admin") {
                    return <Fragment key={urlPath}></Fragment>;
                }

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
        pathname: PropTypes.string.isRequired,
    }),
    defaultHome: PropTypes.string,
}

