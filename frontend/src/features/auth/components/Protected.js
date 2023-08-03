import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

export default function Protected({children}){
    const user = useSelector(selectUserInfo);
    if(!user){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    else{
        return children;
    }
}