import {ListComponent} from "src/components/ListComponent"
import {getUsers, deleteUser} from "src/config/api";

export const ListUsers = () => {
    const transformResults = (data) => {
        return data.map(item => ({...item, hideDelete: item['is_staff'] ?? false}));
    }
    const fields = [
        {label: 'Usuario', key: 'username'},
        {label: 'Nombre', key: 'first_name'},
        {label: 'Apellido', key: 'last_name'},
        {label: 'Número de teléfono', key: 'phone_number'},
    ];
    return <ListComponent title="Usuarios" fields={fields} urlEdit=":id" urlCreate="nuevo"
                          getData={getUsers} deleteItem={deleteUser} transformResults={transformResults}/>
}