import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://test-5a194.firebaseio.com/",
});

export default instance;