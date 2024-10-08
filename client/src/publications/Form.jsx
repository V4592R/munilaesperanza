import {FormComponent} from "src/components/form/FormComponent.jsx";
import {validate, validators, combine} from "validate-redux-form";
import {createPublication, getPublication, updatePublication} from "src/config/api.js";
import {Field, Form} from "react-final-form";
import {Button} from "reactstrap";
import {InputField, InputRichTextField} from "src/components/AppInput.jsx";

const validateForm = (values) => validate(values, {
    title: validators.exists()("Campo requerido"),
    publication_date: validators.exists()("Campo requerido"),
    content: validators.exists()("Campo requerido"),
    description: combine(
        validators.exists()("Campo requerido"),
        validators.length({max: 300})('Máximo 300 caracteres'),
    )
});

export const PublicationForm = () => {
    return (
        <FormComponent
            parentPath={'/admin/publicaciones'}
            getData={getPublication}
            createItem={createPublication}
            updateItem={updatePublication}
            pageName='publicaciones'
            render={({initialValues, onSubmit, id}) => (
                <Form
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validate={validateForm}
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
                                            placeholder="Ej. Desfile de feria"
                                            label="Título"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="description"
                                            render={InputField}
                                            counter={true}
                                            type="text"
                                            placeholder="Ej. Resumen de la noticia"
                                            label="Descripción"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="publication_date"
                                            render={InputField}
                                            type="date"
                                            label="Fecha de publicación"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <Field
                                            name="expiration_date"
                                            render={InputField}
                                            type="date"
                                            label="Expiración"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <Field
                                            name="content"
                                            render={InputRichTextField}
                                            label="Contenido"
                                            placeholder='Comienza a escribir...'
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
