import {FormComponent} from "src/components/form/FormComponent.jsx";
import {getSuggestion} from "src/config/api.js";
import {AppButtonLink} from "src/components/AppButton.jsx";

export const SuggestionView = () => {
    return (
        <FormComponent
            parentPath={'/admin/sugerencias'}
            getData={getSuggestion}
            pageName='sugerencia'
            view={true}
            render={({initialValues, onSubmit, id}) => (
                <div className='w-75 card p-3'>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <strong>Nombre</strong>
                            <p>{initialValues['first_name']}</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <strong>Apelllido</strong>
                            <p>{initialValues['last_name']}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <strong>Número de teléfono</strong>
                            <p>{initialValues['phone_number']}</p>
                        </div>
                        {initialValues['latitude'] && initialValues['longitude'] ? (
                            <div className="col-12 col-md-6">
                                <strong>Ubicación</strong>
                                <br/>
                                <AppButtonLink className='p-0' onClick={() => {
                                    window.open(`https://maps.google.com?q=${initialValues['latitude']},${initialValues['longitude']}`)
                                }}>Ver ubicación</AppButtonLink>
                            </div>
                        ) : <></>}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <strong>Sugerencia</strong>
                            <p>{initialValues['content']}</p>
                        </div>
                    </div>
                </div>
            )}/>
    );
};
