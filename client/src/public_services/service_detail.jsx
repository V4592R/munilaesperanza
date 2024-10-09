import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import {SmallContainer} from "src/components/Container.jsx";
import {getService} from "src/config/api.js";

const IndividualServiceView = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState({
        title: '',
        description: '',
        requirements: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const response = await getService({id});
                    setService(response);
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
                        <h1 className="mb-3">{service.title}</h1>
                        <p>
                            {service.description}
                        </p>
                        <h4>Requisitos</h4>
                        <ul>
                            {service.requirements?.map((requirement) => (
                                <li key={requirement.id}>
                                    {requirement.description}
                                </li>
                            )) ?? []}
                        </ul>
                    </article>
                </div>
            </div>
        </SmallContainer>
    );
}

export default IndividualServiceView;