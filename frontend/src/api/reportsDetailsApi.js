import axios from "axios";
import { baseApiUrl } from "../config/config";

const detailsApiUrl = baseApiUrl + "reportsdetails/";

class DetailsApi {
  static getDetails(date) {
    return axios({
      method: "post",
      url: detailsApiUrl + "getDetails",
      data: date
    });
  }
}

export default DetailsApi;
