import {useCallback, useEffect, useReducer} from 'react';
import {SmallContainer} from "src/components/Container.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {getServices} from "src/config/api.js";
import ServiceCard from "src/public_services/service_card.jsx";

export function ServicesView() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onLoading = (payload = true) => dispatch({type: actionTypes.setLoading, payload});
    const onSetData = (payload) => dispatch({type: actionTypes.setData, payload});
    const onSetPage = (payload) => dispatch({type: actionTypes.setPage, payload});

    const fetchData = useCallback(async () => {
        try {
            onLoading();
            const response = await getServices({page: state.page});
            let services = state.services.concat(response.results);
            onSetData({services, hasMore: !!response.next});
            onSetPage(state.page + 1);
            onLoading(false);
        } catch (error) {
            console.log(error);
            onSetData({services: state.services, hasMore: false});
            onLoading(false);
        }
    }, [state.page, state.services])

    useEffect(() => {
        if (state.page === 1) {
            fetchData();
        }

    }, [fetchData, state.page]);

    return (
        <SmallContainer>
            {state.services.length ? <h3 className="mb-4">Servicios</h3> : null}
            <InfiniteScroll
                dataLength={state.services.length}
                next={fetchData}
                hasMore={state.hasMore}
                loader={<h4>Cargando...</h4>}
                className='overflow-visible'
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>...</b>
                    </p>
                }
            >
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-5">
                    {state.services.map((service, index) => (
                        <div key={service.id} className="col">
                            <ServiceCard service={service} key={service.id ?? index}/>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </SmallContainer>
    )
}

const initialState = {
    hasMore: true,
    loading: false,
    page: 1,
    services: [],
};

const actionTypes = {
    setData: "SET_DATA",
    setLoading: "SET_LOADING",
    setPage: "SET_PAGE",
};

const reducerObject = (state, payload) => ({
    [actionTypes.setData]: {
        ...state,
        services: payload.services,
        hasMore: payload.hasMore,
    },
    [actionTypes.setLoading]: {
        ...state,
        loading: payload
    },
    [actionTypes.setPage]: {
        ...state,
        page: payload
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};