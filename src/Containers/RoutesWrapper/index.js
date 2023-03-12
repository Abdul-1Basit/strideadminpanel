import React from "react";
import {getToken} from './../../Helpers/tokenManagement'
import { useNavigate } from "react-router-dom";
const RoutesWrapper=(props)=>{
    const navigate=useNavigate();
    React.useEffect(()=>{
       const tokn= getToken()
       console.log(tokn+'token is')
if(tokn){
    localStorage.clear();
    navigate('/Signin')

}
    },[])
    return(props.children)
}
export default RoutesWrapper;