import moment from "moment";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const PostCard = ({post}) => {
    return (
        <div className="card h-100 shadow">
            <div className="card-body">
                <h2 className="card-title h4">{post.title}</h2>
                <p className="card-text">{post.description}</p>
                <p className="card-text">
                    <small className="text-muted">
                        Publicado el {moment(post.publication_date).format('dddd, LL')}
                    </small>
                </p>
                <Link to={`/publicaciones/${post.id}`} className="btn btn-link m-0 p-0">
                    Ver más
                </Link>
            </div>
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        publication_date: PropTypes.string,
        id: PropTypes.number,
    })
}

export default PostCard;