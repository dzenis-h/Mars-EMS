import axios from 'axios';
import {baseApiUrl} from '../config/config';

const loansApiUrl = baseApiUrl + 'loan/'

class LoansApi {
 
    static getLoansData() {
        return axios({
            method: 'get',
            url: loansApiUrl + 'getLoansData'
        })
    }

    static addBulk(loanData) {
        return axios({
            method: 'post',
            url: loansApiUrl + 'addBulk',
            data: loanData
        })
    }
}

export default LoansApi;