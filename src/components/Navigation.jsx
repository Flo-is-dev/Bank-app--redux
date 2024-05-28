import logo from  "../designs/img/argentBankLogo.png"
import { NavLink, useNavigate   } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUserData, clearUserData  } from "../Store/UserSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navigation = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    
    const { user, token } = useSelector(state => ({
        user: state.user.user,
        token: state.login.token 
    }));

    useEffect(() => {
        if (token) {
            dispatch(GetUserData(token));
        }
    }, [token,dispatch]);

    // console.log("USER DATTA", user ? user.body : "No user data");

    const handleLogout = () => {
        dispatch(clearUserData());
        navigate('/SignIn'); 
    };


    return (
        <nav className="main-nav">
             <NavLink to="/">
                    <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            
            <div className="main-nav-item-container">
                {user ? (
                    <>
                        <NavLink to="/User">
                            <FontAwesomeIcon icon={faCircleUser} />
                            {user?.body?.firstName}
                        </NavLink>
                        <button  onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
                        </button>
                    </>
                ) : (
                    <NavLink to="/SignIn">
                        <FontAwesomeIcon icon={faCircleUser} /> Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navigation;