import {useCallback, useEffect, useReducer} from 'react';
import PostCard from "src/public_posts/post_card.jsx";
import {SmallContainer} from "src/components/Container.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {getPublicPosts} from "src/config/api.js";

export function PostsView() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onLoading = (payload = true) => dispatch({type: actionTypes.setLoading, payload});
    const onSetData = (payload) => dispatch({type: actionTypes.setData, payload});
    const onSetPage = (payload) => dispatch({type: actionTypes.setPage, payload});
    const onSetLatest = (payload) => dispatch({type: actionTypes.setLatestPosts, payload});

    const fetchData = useCallback(async () => {
        try {
            onLoading();
            const response = await getPublicPosts({page: state.page});
            let posts = state.posts.concat(response.results);
            console.log(response);
            if (state.page === 1) {
                onSetLatest(posts.length > 2 ? posts.slice(0, 2) : posts);
                posts = posts.length > 2 ? posts.slice(2) : [];
            }
            onSetData({posts, hasMore: !!response.next});
            onSetPage(state.page + 1);
            onLoading(false);
        } catch (error) {
            console.log(error);
            onSetData({posts: state.posts, hasMore: false});
            onLoading(false);
        }
    }, [state.page, state.posts])

    useEffect(() => {
        if (state.page === 1) {
            fetchData();
        }

    }, [fetchData, state.page]);

    return (
        <SmallContainer>
            <h3 className="mb-4">Últimas publicaciones</h3>
            <div className="row row-cols-1 row-cols-lg-2 g-4 mb-5">
                {state.latestPosts.map(post => (
                    <div key={post.id} className="col">
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>

            {state.posts.length ? <h3 className="mb-4">Resto de publicaciones publicaciones</h3> : null}
            <InfiniteScroll
                dataLength={state.posts.length}
                next={fetchData}
                hasMore={state.hasMore}
                loader={<h4>Cargando...</h4>}
                className='overflow-visible'
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>No hay más noticias por el momento</b>
                    </p>
                }
            >
                <div className="row row-cols-1 row-cols-lg-2 g-4 mb-5">
                    {state.posts.map((post, index) => (
                        <div key={post.id} className="col">
                            <PostCard post={post} key={post.id ?? index}/>
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
    posts: [],
    latestPosts: [],
};

const actionTypes = {
    setData: "SET_DATA",
    setLoading: "SET_LOADING",
    setPage: "SET_PAGE",
    setLatestPosts: "SET_LATEST_POSTS",
};

const reducerObject = (state, payload) => ({
    [actionTypes.setData]: {
        ...state,
        posts: payload.posts,
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
    [actionTypes.setLatestPosts]: {
        ...state,
        latestPosts: payload
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};