import axios from "axios";
import { baseApiUrl } from "../config/config";

const detailsApiUrl = baseApiUrl + "reportsdetails/";

class DetailsApi {
  static getDetails() {
    return axios({
      method: "get",
      url: detailsApiUrl + "getDetails"
    });
  }
}

export default DetailsApi;
