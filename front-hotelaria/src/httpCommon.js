import axios from "axios";

export default axios.create({
    baseURL: "https://luisco123.pythonanywhere.com/",
    headers: {
        "Content-type": "application/json"
    }
});