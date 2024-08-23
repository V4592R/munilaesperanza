import { ListComponent } from "src/components/ListComponent"
import { getUsers, deleteUser } from "src/config/api";

export const ListUsers = () => {
  const transformResults = (data) => {
    return data;
  }
  const fields = [
    { label: 'Usuario', key: 'username' },
    { label: 'Nombre', key: 'first_name' },
    { label: 'Apellido', key: 'last_name' },
    { label: 'DPI', key: 'dpi' },
    { label: 'Tipo', key: 'type' },
  ];
  return <ListComponent title="Usuarios" fields={fields} urlEdit="/usuarios/:id" urlCreate="/usuarios/nuevo" getData={getUsers} deleteItem={deleteUser} transformResults={transformResults} />
}