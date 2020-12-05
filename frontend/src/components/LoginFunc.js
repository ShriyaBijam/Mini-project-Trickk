import axios from "axios"

export const isLogin = () => {

    var token = localStorage.getItem("token");
    console.log(token);

    return axios.get("http://localhost:8000/api/auth/user/", {headers:{
        'Content-Type': 'application/json',
        'authorization': `Token ${token}`,
    }}).then(
        () => {            
            return true;
        }
    ).catch(
        () => {
            return false;
        }
    )
}