import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;


function token_is_valid(){
    let token = localStorage.getItem('token');
    try{
        let decodedToken = jwtDecode(token)
        let currentDate = new Date();

        //token expired
        if (decodedToken.exp * 1000 < currentDate.getTime()){
            return false
        }
    }catch (error){
        console.log(error)
        return false
    }
    return true
}

export default token_is_valid;