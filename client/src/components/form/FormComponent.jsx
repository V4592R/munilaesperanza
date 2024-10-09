import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {SmallContainer} from 'src/components/Container';
import {useUser} from 'src/utils/useUser';
import {handleError} from 'src/utils/handleError';
import PropTypes from "prop-types";


export const FormComponent = ({
                                  getData,
                                  updateItem,
                                  createItem,
                                  parentPath,
                                  pageName,
                                  render,
                                  transformData,
                                  transformSubmitData,
                              }) => {
    const navigate = useNavigate();
    const user = useUser();
    const {id} = useParams();
    const [initialValues, setInitialValues] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const data = await getData({id, token: user.token});
                    if (transformData) {
                        setInitialValues(transformData(data));
                    } else {
                        setInitialValues(data);
                    }
                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    });
                    setInitialValues({});
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [id, user, getData]);

    const onSubmit = async (dataForm) => {
        const data = transformSubmitData ? transformSubmitData(dataForm) : dataForm;
        setLoading(true);
        if (id) {
            try {
                await updateItem({id, token: user.token, data})
                await Swal.fire({
                    icon: 'success',
                    title: 'Guardado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(parentPath);
            } catch (error) {
                handleError(error, 'Oops...');
                setInitialValues(data);
            }
        } else {
            try {
                await createItem({token: user.token, data});
                await Swal.fire({
                    icon: 'success',
                    title: 'Creado con éxito',
                    showConfirmButton: true,
                })
                navigate(parentPath);
            } catch (error) {
                handleError(error, 'Oops...');
                setInitialValues(data);
            }
        }
        setLoading(false);
    };

    return (
        <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center" loading={loading}>
            <h3>{`${id ? "Editar" : "Crear"} ${pageName}`} </h3>
            {render({initialValues, onSubmit, id})}
        </SmallContainer>
    );
};

FormComponent.propTypes = {
    getData: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    createItem: PropTypes.func.isRequired,
    parentPath: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    transformData: PropTypes.func,
    transformSubmitData: PropTypes.func,
}