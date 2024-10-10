import {FormComponent} from "src/components/form/FormComponent.jsx";
import {validate, validators, combine} from "validate-redux-form";
import {createSuggestion} from "src/config/api.js";
import {Field, Form} from "react-final-form";
import {Button} from "reactstrap";
import {InputField, InputTextAreaField} from "src/components/AppInput.jsx";
import ReCAPTCHA from 'react-google-recaptcha';
import {useState} from "react";

const validateForm = (values) => {
    return validate(values, {
        first_name: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 50})('Máximo 50 caracteres'),
        ),
        last_name: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 50})('Máximo 50 caracteres'),
        ),
        phone_number: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 15})('Máximo 15 caracteres'),
            validators.regex(/^\+?1?\d{8,15}$/)('Número inválido')
        ),
        content: combine(
            validators.exists()("Campo requerido"),
            validators.length({max: 500})('Máximo 500 caracteres'),
        ),
    })
};

export const SuggestionsForm = () => {
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptcha = (value) => {
        setCaptchaValue(value);
    };

    return (
        <FormComponent
            parentPath={'/'}
            createItem={createSuggestion}
            pageName='sugerencias'
            successTitle='Gracias por tus comentarios'
            showTitle={false}
            render={({initialValues, onSubmit, id}) => (
                <Form
                    onSubmit={async (formData) => {
                        if (!captchaValue) {
                            return;
                        }
                        formData['captchaToken'] = captchaValue;
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                const {latitude, longitude} = position.coords;
                                formData["latitude"] = latitude.toFixed(6);
                                formData["longitude"] = longitude.toFixed(6);
                                onSubmit(formData);
                            }, () => {
                                console.error("Unable to retrieve your location");
                                onSubmit(formData);
                            }, { enableHighAccuracy: true, maximumAge: 0 });
                        } else {
                            console.error("Geolocation not supported");
                            onSubmit(formData);
                        }
                        setCaptchaValue(null);
                    }}
                    validate={validateForm}
                    initialValues={initialValues}
                    render={({handleSubmit, form, submitting}) => (
                        <div
                            className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-8 mx-auto mt-2">
                            <form onSubmit={handleSubmit} className='w-100'>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="first_name"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Emanuel"
                                            label="Nombre"
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
                                            label="Apellido"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="phone_number"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. 34534475"
                                            label="Número de teléfono"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="content"
                                            render={InputTextAreaField}
                                            counter={true}
                                            type="text"
                                            placeholder="Ej. Buen servicio..."
                                            label="Sugerencia"
                                            rows={8}
                                        />
                                    </div>
                                </div>
                                <ReCAPTCHA
                                    sitekey="6LdTS10qAAAAADl7pQ2tds-rd-I4mdSX1LoDKpVu"
                                    onChange={handleCaptcha}
                                />
                                <div className="d-flex align-items-center justify-content-center">
                                    <Button
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                        block
                                    >
                                        {"Enviar"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                />
            )}/>
    );
};
