import axios from 'axios';
import {baseApiUrl} from '../config/config';

class ClearDataApi {
    static remove(month, year) {
        return axios({
            method: 'delete',
            url: `${baseApiUrl}cleardata/remove?month=${month}&year=${year}`
        })
    }
}

export default ClearDataApi;
