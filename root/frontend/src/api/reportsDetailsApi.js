import axios from 'axios';
import {baseApiUrl} from '../config/config';

const testApiUrl = baseApiUrl + 'reportsdetails/'

class DetailsApi {
 
    static getDetails() {
        return axios({
            method: 'get',
            url: testApiUrl + 'getDetails'
        })
    }
}

export default DetailsApi;