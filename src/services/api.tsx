import axios from "axios";

export default function apiConnection() {
    axios.defaults.baseURL = "https://randomuser.me/api";

    axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";

    return axios;
}
