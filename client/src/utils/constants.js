import PropTypes from "prop-types";

export const checkRoles = (allow = [], user) => {
    if (!user) return false;
    if (!allow.length) return true;
    return allow.some((role) => role === user.user_type);
};

export const ComponentCheckRole = ({allow = [], user, children}) => {
    if (!checkRoles(allow, user)) return null;
    return children;
};

ComponentCheckRole.propTypes = {
    allow: PropTypes.array,
    user: PropTypes.object,
    children: PropTypes.node,
}