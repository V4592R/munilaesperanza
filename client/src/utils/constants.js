import PropTypes from "prop-types";

export const checkRoles = (forStaff = false, user) => {
    if (!user) return false;
    return !forStaff || user['is_staff'];
};

export const ComponentCheckRole = ({forStaff = false, user, children}) => {
    if (!checkRoles(forStaff, user)) return null;
    return children;
};

ComponentCheckRole.propTypes = {
    forStaff: PropTypes.bool,
    user: PropTypes.object,
    children: PropTypes.node,
}