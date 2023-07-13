import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../context/Auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useOAuth = () => {
    const navigate = useNavigate()
    async function signin() {
        // try {
            let response = await axios.get("http://localhost:8393/auth/login")
            console.log(response.data.url)

            window.open(response.data.url, "_blank", "noreferrer")
            
            response = await axios.get(response.data.url)

            if (response.status === 307) {
                Cookies.set("google_token", response.data.token)
                return navigate("/dashboard")
            }

            return navigate("/auth")
        // } catch (error) {
        //  console.log(error)   
        // }
    }
    return { signin}
}

export default useOAuth