import React from "react";
import { useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    return (
        <nav style={{backgroundColor: "#1565c0", color:"#fff",textAlign:"start",padding: "8px", display:"flex", justifyContent:"space-between", alignItems:"baseline"}} onClick={()=>navigate('/')}>
            <span><strong style={{fontSize:"24px"}}>Parking Reservation</strong></span>
        </nav>
        )
}

export default Header;