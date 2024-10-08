import {FormComponent} from "src/components/form/FormComponent.jsx";
import {validate, validators, combine} from "validate-redux-form";
import {createService, getService, updateService} from "src/config/api.js";
import {Field, Form} from "react-final-form";
import {Button} from "reactstrap";
import {InputField, InputTextAreaField} from "src/components/AppInput.jsx";
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

const validateForm = (values) => validate(values, {
    title: validators.exists()("Campo requerido"),
    description: combine(
        validators.exists()("Campo requerido"),
        validators.length({max: 300})('Máximo 300 caracteres'),
    )
});

export const ServiceForm = () => {
    return (
        <FormComponent
            parentPath={'/admin/servicios'}
            getData={getService}
            createItem={createService}
            updateItem={updateService}
            pageName='servicios'
            render={({initialValues, onSubmit, id}) => (
                <Form
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validate={validateForm}
                    mutators={{
                        ...arrayMutators
                    }}
                    render={({handleSubmit, submitting}) => (
                        <div
                            className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-8 mx-auto mt-2">
                            <form onSubmit={handleSubmit} className='w-100'>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="title"
                                            render={InputField}
                                            type="text"
                                            placeholder="Ej. Licencia de construcción"
                                            label="Título"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="description"
                                            render={InputTextAreaField}
                                            counter={true}
                                            type="text"
                                            placeholder="Ej. Este servicio es..."
                                            label="Descripción"
                                            rows={8}
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
            )}/>
    );
};
