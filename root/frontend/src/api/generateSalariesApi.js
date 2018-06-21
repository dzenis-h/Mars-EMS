import axios from 'axios';
import {baseApiUrl} from '../config/config';

const generateSalariesApiUrl = baseApiUrl + 'generatesalaries/'

class GenerateSalariesApi {
    static GetDataFromAccountantSpreadsheet(month) {
        return axios({
            method: 'get',
            url: `${generateSalariesApiUrl}getSalariesDataByAccountant?month=${month}`
        })
    }

    static GetDataFromMainSpreadsheet(code) {
        return axios({
            method: 'get',
            url: `${generateSalariesApiUrl}getSalariesDataFromLastMonth`
        })
    }

    static ImportDataIntoSpreadsheet(year, month, lastRowIndex, salaries) {
        return axios({
            method: 'post',
            url: generateSalariesApiUrl + 'importDataIntoSpreadsheet',
            data: {
                year: year,
                month: month,
                lastRowNumber: lastRowIndex,
                salaries: salaries
            }
        })
    }

}

export default GenerateSalariesApi;
