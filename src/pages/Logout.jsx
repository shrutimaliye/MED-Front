import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";
import { loggedinmedical } from "../reducer/UseReducer";

function Logout() {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    loggedinmedical ? dispatch({type:"MEDICAL", payload:false}) : dispatch({type:"USER", payload:false})
    navigate("/");
}

export default Logout;