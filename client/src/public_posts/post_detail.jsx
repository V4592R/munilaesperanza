import moment from "moment";
import parse from 'html-react-parser';
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {SmallContainer} from "src/components/Container.jsx";
import {getPublicDetailPost} from "src/config/api.js";

const IndividualPostView = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
        title: '',
        description: '',
        publication_date: '',
        content: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const response = await getPublicDetailPost({id});
                    setPost(response);
                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    });
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [id]);


    return (
        <SmallContainer loading={loading}>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <article className="bg-white p-4 my-4 rounded shadow overflow-hidden">
                        <h1 className="mb-3">{post.title}</h1>
                        <p className="text-muted mb-4">
                            <small>
                                Publicado el {moment(post.publication_date).format('dddd, LL')}
                            </small>
                        </p>
                        <div className="post-content">
                            {parse(post.content)}
                        </div>
                    </article>
                </div>
            </div>
        </SmallContainer>
    );
}

export default IndividualPostView;