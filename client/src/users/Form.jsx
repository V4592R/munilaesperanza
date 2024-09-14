import {useState, useEffect} from 'react';
import {Form, Field} from 'react-final-form';
import {useParams, useNavigate} from 'react-router-dom';
import {Button} from 'reactstrap';
import {validate, validators} from 'validate-redux-form';
import Swal from 'sweetalert2';
import {InputField, InputNumberField} from 'src/components/AppInput';
import {SmallContainer} from 'src/components/Container';
import {AppButtonDanger} from 'src/components/AppButton';
import {useUser} from 'src/utils/useUser';
import {getUser, updateUser, signUpUser, resetPassword} from 'src/config/api';
import {usernameRegexValidator, phoneRegexValidator} from 'src/utils/validators';
import {handleError} from 'src/utils/handleError';


const validateForm = (values) => validate(values, {
    first_name: validators.exists()("Campo requerido"),
    last_name: validators.exists()("Campo requerido"),
    username: validators.exists()("Campo requerido"),
    phone_number: validators.exists()("Campo requerido"),
    birthday: validators.exists()("Campo requerido"),
});

export const FormUsers = () => {
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
                    const data = await getUser({id, token: user.token})
                    setInitialValues(data);
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
    }, [id, user]);

    const onSubmit = async (data) => {
        setLoading(true);
        if (id) {
            try {
                await updateUser({id, token: user.token, data})
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/admin/usuarios');
            } catch (error) {
                handleError(error, 'Oops...');
            }
        } else {
            try {
                const response = await signUpUser({token: user.token, data});
                Swal.fire({
                    icon: 'success',
                    title: 'Creado con éxito',
                    text: `${response.username} - ${response.password}`,
                    showConfirmButton: true,
                })
                navigate('/admin/usuarios');
            } catch (error) {
                handleError(error, 'Oops...');
            }
        }
        setLoading(false);
    };

    const resetUserPassword = async () => {
        Swal.fire({
            title: '¿Está seguro que desea resetear la contraseña de este usuario?',
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: 'No',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const response = await resetPassword({id, token: user.token});
                    Swal.fire({
                        icon: 'success',
                        title: `La nueva contraseña es ${response.new_password}`,
                        showConfirmButton: true,
                    });
                } catch (error) {
                    handleError(error, "Oops...");
                } finally {
                    setLoading(false);
                }
            }
        })
    };

    return (
        <SmallContainer className="mt-5 d-flex flex-column align-items-center justify-content-center" loading={loading}>
            <h3>{`${id ? "Editar" : "Crear"} usuario`} </h3>

            {id && initialValues['is_staff'] !== true ? (<AppButtonDanger onClick={resetUserPassword}>
                Resetear contraseña
            </AppButtonDanger>) : <></>}
            <Form
                initialValues={initialValues}
                validate={validateForm}
                onSubmit={onSubmit}
                render={({handleSubmit, submitting}) => (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-8 col-lg-6 mx-auto mt-2">
                        <form onSubmit={handleSubmit} className="w-100">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <Field
                                        name="username"
                                        render={InputField}
                                        type="text"
                                        placeholder="usuario1234"
                                        label="Usuario"
                                        validate={usernameRegexValidator}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <Field
                                        name="first_name"
                                        render={InputField}
                                        type="text"
                                        placeholder="Ej. Emanuel"
                                        label="Primer nombre"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <Field
                                        name="middle_name"
                                        render={InputField}
                                        type="text"
                                        placeholder="Ej. Alexander"
                                        label="Segundo nombre"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <Field
                                        name="last_name"
                                        render={InputField}
                                        type="text"
                                        placeholder="Ej. Orozco"
                                        label="Primer apellido"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <Field
                                        name="second_surname"
                                        render={InputField}
                                        type="text"
                                        placeholder="Ej. Zuñiga"
                                        label="Segundo apellido"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <Field
                                        name="birthday"
                                        render={InputField}
                                        type="date"
                                        label="Fecha de nacimiento"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <Field
                                        name="phone_number"
                                        render={InputNumberField}
                                        type="text"
                                        placeholder="Ej. 4346 44345"
                                        label="Número de teléfono"
                                        allowNegative={false}
                                        validate={phoneRegexValidator}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={submitting}
                                    block
                                >
                                    {id ? "Editar" : "Agregar"}
                                </Button>
                            </div>
                        </form>
                    </div>

                )}
            />
        </SmallContainer>
    );
};
