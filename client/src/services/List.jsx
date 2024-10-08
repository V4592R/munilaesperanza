import {ListComponent} from "src/components/ListComponent"
import {getServices, deleteService} from "src/config/api";

    export const ServicesList = () => {
        const transformResults = (data) => data.map((item) => ({
            ...item,
            description: item['description']?.length > 100 ? `${item['description']?.substring(0, 100)}...` : item['description']
        }));
    const fields = [
        {label: 'Título', key: 'title'},
        {label: 'Descripción', key: 'description'},
    ];
    return <ListComponent title="Servicios" fields={fields} urlEdit=":id" urlCreate="nuevo"
                          getData={getServices} deleteItem={deleteService} transformResults={transformResults}/>
}