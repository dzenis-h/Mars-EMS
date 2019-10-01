import axios from 'axios';
import {baseApiUrl} from '../config/config';

class ContentApi {
    static get(url) {
        return axios({
            method: 'get',
            url: `${baseApiUrl}${url}`
        })
    }

    static getById(id, url) {
        return axios({
            method: 'get',
            url: `${baseApiUrl}${url}?where={"employeeJMBG":"${id}"}`
        })
    }

    static post(data,url) {
        return axios({
            method: 'post',
            url: `${baseApiUrl}${url}`,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static delete(id, url) {
        return axios({
            method: 'delete',
            url: `${baseApiUrl}${url}/${id}`
        })
    }

}

export default ContentApi;
