import { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import PaginatedTable from 'src/components/PaginatedTable';
import Swal from 'sweetalert2';
import { SmallContainer } from 'src/components/Container';
import { useUser } from 'src/utils/useUser';
import PropTypes from "prop-types";

const handleError = (error, title) => {
  if (error.response) {
    Swal.fire({
      icon: 'error',
      title,
      text: JSON.stringify(error.response.data),
    });
  } else {
    Swal.fire({
      icon: 'error',
      title,
      text: error,
    });
  }
}

export const ListComponent = ({ children, title = "", showActions = true, fields = [], urlEdit = "", urlCreate = "", getData = async () => { }, deleteItem = null, transformResults = (data) => data, urlView = '' }) => {
  const navigate = useNavigate();
  const user = useUser();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, page } = state;

  const onSetData = (payload) => dispatch({ type: actionTypes.setData, payload });
  const onLoading = (payload = true) => dispatch({ type: actionTypes.setLoading, payload });
  const onSetPage = (payload = 1) => dispatch({ type: actionTypes.setPage, payload })

  const fetchData = async (page = 1) => {
    try {
      onLoading();
      const response = await getData({ token: user.token, page });
      response.results = transformResults(response.results)
      onSetData(response);
      onSetPage(page);
    } catch (error) {
      handleError(error, "Oops...");
    } finally {
      onLoading(false)
    }
  }

  const handleEdit = (id) => {
    navigate(urlEdit?.replace(":id", id))
  };

  const handleView = (id) => {
    navigate(urlView?.replace(":id", id))
  };

  const handleDelete = (id) => {
    if (!deleteItem) return;
    Swal.fire({
      title: '¿Está seguro que desea eliminar este elemento?',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteItem({ id, token: user.token });
          Swal.fire({
            icon: 'success',
            title: 'Eliminado con éxito',
            showConfirmButton: false,
            timer: 1500
          });
          fetchData();
        } catch (error) {
          handleError(error, "Oops...");
        }
      }
    })
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SmallContainer loading={loading}>
      <div className="mt-5">
        <h3 className="mokoto-font">{title}</h3>
        {children}
        {urlCreate ? (
            <Link to={urlCreate} className="btn btn-primary my-3">
              <i className="bi bi-plus-circle-fill"/>
            </Link>
        ) : <></>}
        <PaginatedTable data={data} fields={fields} actions={showActions} onDelete={deleteItem ? handleDelete : null}
                        onEdit={urlEdit ? handleEdit : null} fetchData={fetchData} currentPage={page} onView={urlView ? handleView : null}/>
      </div>
    </SmallContainer>
  );
};

ListComponent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  showActions: PropTypes.bool,
  fields: PropTypes.array.isRequired,
  urlEdit: PropTypes.string,
  urlCreate: PropTypes.string,
  getData: PropTypes.func,
  deleteItem: PropTypes.func,
  transformResults: PropTypes.func,
}

const initialState = {
  data: {
    results: [],
  },
  loading: false,
  page: 1,
};

const actionTypes = {
  setData: "FETCH_DATA",
  setLoading: "SET_LOADING",
  setPage: "SET_PAGE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.setData]: {
    ...state,
    data: payload,
  },
  [actionTypes.setLoading]: {
    ...state,
    loading: payload
  },
  [actionTypes.setPage]: {
    ...state,
    page: payload,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

