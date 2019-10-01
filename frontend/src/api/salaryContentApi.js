import axios from 'axios';
import {baseApiUrl} from '../config/config';

class SalaryContentApi {
    static get(url,year,month) {
        return axios({
            method: 'get',
            url: `${baseApiUrl}${url}/getByDate?year=${year}&month=${month}`
        })
    }

    static delete(url,id) {
        return axios({
            method: 'delete',
            url: `${baseApiUrl}${url}/${id}`
        })
    }
}

export default SalaryContentApi;
