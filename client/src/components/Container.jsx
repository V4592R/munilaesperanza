import {Spinner} from "./Spinner";
import PropTypes from "prop-types";

export const SmallContainer = ({children, className, loading = false}) => {
    return (
        loading ? <Spinner/> :
            (
                <div className={`container-sm ${className ? className : ''}`}>
                    {children}
                </div>
            )

    )
};

SmallContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    loading: PropTypes.bool,
}