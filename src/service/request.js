import axios from 'axios';
import LocalCache from '@/utils/cache'

const service = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        config.headers.authorization = LocalCache.getCache('token')
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
