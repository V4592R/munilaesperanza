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
                                  view = false,
                                  showDefaultTitle = true,
                                  title = '',
                                  successTitle = 'Creado con éxito',
                                  navigateCreationSuccess = true,
                              }) => {
    const navigate = useNavigate();
    const user = useUser();
    const {id} = useParams();
    const [initialValues, setInitialValues] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                if (!getData) return;
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
            if (!updateItem) return;
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
            if (!createItem) return;
            try {
                await createItem({token: user.token, data});
                await Swal.fire({
                    icon: 'success',
                    title: successTitle,
                    showConfirmButton: true,
                })
                if(navigateCreationSuccess) {
                    console.log('entrado')
                    navigate(parentPath);
                } else {
                    setInitialValues(data);
                }
            } catch (error) {
                handleError(error, 'Oops...');
                setInitialValues(data);
            }
        }
        setLoading(false);
    };

    return (
        <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center" loading={loading}>
            {showDefaultTitle ? (<h3>{`${id ? (view ? "Ver" : "Editar") : "Crear"} ${pageName}`} </h3>) :
                <h3>{title}</h3>}
            {render({initialValues, onSubmit, id})}
        </SmallContainer>
    );
};

FormComponent.propTypes = {
    getData: PropTypes.func,
    updateItem: PropTypes.func,
    createItem: PropTypes.func,
    parentPath: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    transformData: PropTypes.func,
    transformSubmitData: PropTypes.func,
    view: PropTypes.bool,
    successTitle: PropTypes.string,
    showDefaultTitle: PropTypes.bool,
    title: PropTypes.string,
    navigateCreationSuccess: PropTypes.bool,
}