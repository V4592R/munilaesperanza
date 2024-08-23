import {Button} from "reactstrap";
import PropTypes from 'prop-types';


export const AppButton = (props) => {
    return (
        <Button color="primary" className="m-1" {...props}>
            {props.children}
        </Button>
    );
};

AppButton.propTypes = {
    children: PropTypes.node,
}

export const AppButtonSecondary = (props) => {
    return (
        <Button color="secondary" className="m-1" {...props}>
            {props.children}
        </Button>
    );
};

AppButtonSecondary.propTypes = {
    children: PropTypes.node,
}

export const AppButtonDanger = (props) => {
    return (
        <Button color="danger" className="m-1" {...props}>
            {props.children}
        </Button>
    );
};
AppButtonDanger.propTypes = {
    children: PropTypes.node,
}


export const AppButtonDark = (props) => {
    return (
        <Button color="dark" className="m-1" {...props}>
            {props.children}
        </Button>
    );
};

AppButtonDark.propTypes = {
    children: PropTypes.node,
}


export const AppButtonLink = (props) => {
    return (
        <Button color="link" {...props}>
            {props.children}
        </Button>
    );
};

AppButtonLink.propTypes = {
    children: PropTypes.node,
}
