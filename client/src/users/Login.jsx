import {Form, Field} from "react-final-form";
import {Button} from "reactstrap";
import {validate, validators} from "validate-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {SmallContainer} from "src/components/Container";
import {InputField} from "src/components/AppInput";
import {login} from "src/store/user";
import logo from "src/assets/logo.jpg";

const validateForm = (values) => validate(values, {
    username: validators.exists()("Ingrese su usuario"),
    password: validators.exists()("Ingrese su contraseña")
})

export const Login = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);


    const onSubmit = (data) => {
        dispatch(login({credentials: data}));
    };

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center mx-auto min-vw-100 min-vh-100"
        >
            <SmallContainer loading={status === "loading"}>
                <div
                    className="row justify-content-center align-items-center px-1 py-3 px-md-3 py-md-5 mx-auto rounded bg-white shadow col-md-8 col-12"
                >
                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                        <img src={logo} alt="logo" width="150" className="rounded-4"/>
                    </div>
                    <div className="col-12 col-md-8">
                        <Form
                            onSubmit={onSubmit}
                            validate={validateForm}
                            render={({handleSubmit, submitting, pristine}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <Field
                                                name="username"
                                                render={InputField}
                                                type="text"
                                                placeholder="usuario1234"
                                                label="Usuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <Field
                                                name="password"
                                                render={InputField}
                                                type="password"
                                                placeholder="Contraseña"
                                                label="Contraseña"
                                            />
                                        </div>
                                    </div>
                                    {status === "failed" && pristine ? (
                                        <div className="text-danger mb-4  ">Usuario y/o contraseña incorrectos</div>
                                    ) : null}
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Button
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                            block
                                        >
                                            Ingresar
                                        </Button>
                                    </div>
                                </form>
                            )}
                        />
                    </div>

                </div>
            </SmallContainer>
        </div>
    );
};
