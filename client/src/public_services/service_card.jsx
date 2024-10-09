import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ServiceCard = ({service}) => {
    return (
        <div className="card h-100 shadow-lg shadow- bg-body-secondary card-service">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-center">
                    <i className="bi bi-question-circle-fill"></i>
                </div>

                <h2 className="card-title h4">{service.title}</h2>
                <p className="card-text">{service.description}</p>
                <Link to={`/servicios/${service.id}`} className="btn btn-link m-0 p-0">
                    Ver detalles
                </Link>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.number,
    })
}

export default ServiceCard;