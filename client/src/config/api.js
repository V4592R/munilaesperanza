import Axios from 'axios';

const DOMAIN = 'http://localhost:8000/api/v1';
const USERS = 'users';
const PUBLICATIONS = 'publications';
const signUpUrl = `${USERS}/signup`;
export const LOGIN = `${USERS}/login`;
const RESET_PASSWORD = `reset_password`;

export const getEndpoint = (path) => {
    return `${DOMAIN}/${path}/`;
};

const getHeaders = (token) => {
    return !token ? {} : {
        headers: {
            Authorization: `Token ${token}`,
        },
    };
}

export const postGeneric = async ({data, token, path}) => {
    const headers = getHeaders(token);
    try {
        const endpoint = getEndpoint(path);
        const response = await Axios.post(endpoint, data, {
            ...headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteGeneric = async ({id, token, path}) => {
    const headers = getHeaders(token);
    try {
        const endpoint = getEndpoint(path) + `${id}/`;
        const response = await Axios.delete(endpoint, {
            ...headers,
        });
        return response.status;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllGeneric = async ({token, path, page = 1, params = {}}) => {
    const headers = getHeaders(token);
    try {
        const endpoint = getEndpoint(path);
        const response = await Axios.get(endpoint, {
            params: {page, ...params},
            ...headers,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateGeneric = async ({id, token, data, path}) => {
    const headers = getHeaders(token);
    try {
        const endpoint = `${getEndpoint(path)}${id}/`;
        const response = await Axios.patch(endpoint, data, {
            ...headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getGeneric = async ({id, token, path}) => {
    const headers = getHeaders(token);
    try {
        const endpoint = `${getEndpoint(path)}${id}/`;
        const response = await Axios.get(endpoint, {
            ...headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const resetPassword = async ({id, token}) => {
    const path = `${USERS}/${id}/${RESET_PASSWORD}`;
    return await postGeneric({data: {}, token, path});
};

export const signUpUser = async ({data, token}) => {
    return await postGeneric({data, token, path: signUpUrl});
};


export const getUsers = async ({token, page = 1}) => {
    return await getAllGeneric({token, path: USERS, page});
};

export const updateUser = async ({id, token, data}) => {
    return await updateGeneric({id, token, data, path: USERS});
};

export const getUser = async ({id, token}) => {
    return await getGeneric({id, token, path: USERS});
};

export const deleteUser = async ({id, token}) => {
    return await deleteGeneric({id, token, path: USERS});
};

export const getPublication = async ({id, token}) => {
    return await getGeneric({id, token, path: PUBLICATIONS});
};

export const getPublications = async ({token, page = 1}) => {
    return await getAllGeneric({token, path: PUBLICATIONS, page});
};

export const getPublicDetailPost = async ({id, token}) => {
    return await getGeneric({id: `${id}/public_detail`, token, path: PUBLICATIONS});
};

export const getPublicPosts = async ({token, page = 1}) => {
    return await getAllGeneric({token, path: `${PUBLICATIONS}/public_posts`, page});
};

export const createPublication = async ({data, token}) => {
    return await postGeneric({data, token, path: PUBLICATIONS});
};

export const updatePublication = async ({id, token, data}) => {
    return await updateGeneric({id, token, data, path: PUBLICATIONS});
};


export const deletePublication = async ({id, token}) => {
    return await deleteGeneric({id, token, path: PUBLICATIONS});
};