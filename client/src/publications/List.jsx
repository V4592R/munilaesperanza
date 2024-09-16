import {ListComponent} from "src/components/ListComponent"
import {getPublications, deletePublication} from "src/config/api";

export const PublicationsList = () => {
    const transformResults = (data) => data;
    const fields = [
        {label: 'Título', key: 'title'},
        {label: 'Fecha de publicación', key: 'publication_date'},
    ];
    return <ListComponent title="Publicaciones" fields={fields} urlEdit=":id" urlCreate="nuevo"
                          getData={getPublications} deleteItem={deletePublication} transformResults={transformResults}/>
}