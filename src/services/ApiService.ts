import axios, { AxiosResponse } from 'axios';

import { ResponseAPI } from '../store/modules/typeStore';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiGet = async (rota: string): Promise<ResponseAPI> => {
    try {
        const response: AxiosResponse = await axios.get(rota);

        const responseAPI: ResponseAPI = {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data,
        };

        return responseAPI;
    } catch (error: any) {
        const responseAPIError: ResponseAPI = {
            success: error.response.data.success,
            message: error.response.data.message,
            data: error.response.data.data,
        };

        return responseAPIError;
    }
};

const apiPost = async (rota: string, dados: any): Promise<ResponseAPI> => {
    try {
        const response: AxiosResponse = await axios.post(rota, dados);

        const responseAPI: ResponseAPI = {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data,
        };

        return responseAPI;
    } catch (error: any) {
        const responseAPIError: ResponseAPI = {
            success: error.response.data.success,
            message: error.response.data.message,
            data: error.response.data.data,
        };

        return responseAPIError;
    }
};

const apiPut = async (rota: string, dados: any): Promise<ResponseAPI> => {
    try {
        const response: AxiosResponse = await axios.put(rota, dados);

        const responseAPI: ResponseAPI = {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data,
        };

        return responseAPI;
    } catch (error: any) {
        const responseAPIError: ResponseAPI = {
            success: error.response.data.success,
            message: error.response.data.message,
            data: error.response.data.data,
        };

        return responseAPIError;
    }
};

const apiDelete = async (rota: string): Promise<ResponseAPI> => {
    try {
        const response: AxiosResponse = await axios.delete(rota);

        const responseAPI: ResponseAPI = {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data,
        };

        return responseAPI;
    } catch (error: any) {
        const responseAPIError: ResponseAPI = {
            success: error.response.data.success,
            message: error.response.data.message,
            data: error.response.data.data,
        };

        return responseAPIError;
    }
};

export { apiGet, apiPost, apiPut, apiDelete };
