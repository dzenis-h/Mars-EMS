import axios from "axios";
import { baseApiUrl } from "../config/config";

const reportsApiUrl = baseApiUrl + "reports/";

class ReportsApi {
  static getReports() {
    return axios({
      method: "get",
      url: reportsApiUrl + "getReports"
    });
  }
}

export default ReportsApi;
