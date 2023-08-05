import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

export default function ProtectedAdmin({children}){
    // TODO: don't redirect on reload
    const userInfo = useSelector(selectUserInfo);
    if(!userInfo){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if(userInfo && userInfo.role!=="admin"){
        return <Navigate to="/" replace={true}></Navigate>
    }
    
     return children;
    
}