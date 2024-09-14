import {Card, CardBody, CardTitle} from "reactstrap"
import classNames from "classnames"
import {useNavigate} from "react-router"
import PropTypes from "prop-types";

export const MenuCard = ({className, label = "", iconClass = "", to = "/admin"}) => {
    const navigate = useNavigate();
    return (
        <Card
            className={classNames("menu-card", {[className]: !!className})}
            color="primary"
            inverse
            onClick={() => navigate(to)}
            role="button"
        >
            <CardBody>
                <CardTitle tag="h5">
                    <i className={classNames("bi me-3", {[iconClass]: !![iconClass]})}/>
                    {label}
                </CardTitle>
            </CardBody>
        </Card>
    )
}

MenuCard.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    iconClass: PropTypes.string,
    to: PropTypes.string,
}