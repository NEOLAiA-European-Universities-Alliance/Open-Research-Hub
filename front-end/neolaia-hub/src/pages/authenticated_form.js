import { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../components/AuthContext";
import Auth from "../components/auth";
import token_is_valid from "../utils";
import MappingResearchers from "../forms/mapping_researchers";


function AuthenticatedForm(){
    const { token, loading} = useContext(AuthContext);  
    const [form, setForm] = useState(null);
    const [token_validity, setTokenValidity] = useState(false)

    useEffect(() => {
        if (loading){
            return 
        }
        //check on the client side if the token is expired
        setTokenValidity(token_is_valid())

        if(token && token_validity){
            //insert here the form component to render after login
            const form_component = (
                <MappingResearchers />
            )
            setForm(form_component)
        }
    }, [loading, token, token_validity])
    

    return(
        <div>
            {loading && <p>Caricamento...</p>}
            {(!token || !token_validity) && <Auth />}
            {token && form}
        </div>
    )
}

export default AuthenticatedForm;