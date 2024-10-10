import {ListComponent} from "src/components/ListComponent"
import {getSuggestions} from "src/config/api";

export const SuggestionsList = () => {
    const transformResults = (data) => data;
    const fields = [
        {label: 'Nombre', key: 'first_name'},
        {label: 'Apellido', key: 'last_name'},
        {label: 'Número de teléfono', key: 'phone_number'},
    ];
    return <ListComponent title="Quejas y sugerencias" fields={fields} urlView=":id"
                          getData={getSuggestions} transformResults={transformResults}/>
}