import {FormComponent} from "src/components/form/FormComponent.jsx";
import {validate, validators} from "validate-redux-form";
import {createPublication, getPublications, updatePublication} from "src/config/api.js";
import {Form} from "react-final-form";
import {Button} from "reactstrap";

const validateForm = (values) => validate(values, {
    first_name: validators.exists()("Campo requerido"),
    last_name: validators.exists()("Campo requerido"),
    username: validators.exists()("Campo requerido"),
    phone_number: validators.exists()("Campo requerido"),
    birthday: validators.exists()("Campo requerido"),
});

export const PublicationForm = () => {
    return (
        <FormComponent
            parentPath={'/admin/publications'}
            getData={getPublications}
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
                            className="d-flex flex-column justify-content-center align-items-center pb-4 col-12 col-md-8 col-lg-6 mx-auto mt-2">
                            <form onSubmit={handleSubmit} className='w-100'>
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
