import axios from 'axios';
import {baseApiUrl} from '../config/config';

const detailsApiUrl = baseApiUrl + 'reports/'

class ReportsApi {
 
    static getReports() {
        return axios({
            method: 'get',
            url: detailsApiUrl + 'getReports'
        })
    }
}

export default ReportsApi;