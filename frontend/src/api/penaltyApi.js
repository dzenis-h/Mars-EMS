import axios from 'axios';
import {baseApiUrl} from '../config/config';

const penaltyApi = baseApiUrl + 'penalty'

class PenaltyApi {

    static addBulk(penalties) {
        return axios({
            method: 'post',
            url: penaltyApi + '/addBulk',
            data: penalties
        })
    }

}

export default PenaltyApi;
