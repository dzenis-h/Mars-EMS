import axios from 'axios';
import {baseApiUrl} from '../config/config';

const spreadsheetApiUrl = baseApiUrl + 'spreadsheet/'

class SpreadSheetApi {
    static getToken() {
        return axios({
            method: 'get',
            url: spreadsheetApiUrl + 'init'
        })
    }

    static verifyCode(code) {
        return axios({
            method: 'post',
            url: spreadsheetApiUrl + 'verifyCode',
            data: {
                code: code
            }
        })
    }
}

export default SpreadSheetApi;
