import Navigation from "../components/Navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/LoginSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


const SignIn = () => {

      // !STATES

      const [email, setEmail] = useState("");
      const [password,setPassword] = useState("");


       // !redux state
    const {loading, error} = useSelector((state) => state.login);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleLoginEvent = (e) => {
        e.preventDefault();

        let userCredentials = {
            email, password
        }

        dispatch(loginUser(userCredentials)).then((result) => {
            // console.log("###result###",result);
            if(result.payload){

                setEmail("");
                setPassword("");
                navigate('/User')
            }
        })
    }


    return (
        <>
        
            <Navigation />
            <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleLoginEvent} >
                <div className="input-wrapper">
                    <label htmlFor ="username">Username</label
                    ><input type="text" id="username" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor ="password">Password</label
                    ><input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" /><label htmlFor ="remember-me"
                    >Remember me</label
                    >
                </div>
                {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
                {/* <a href="./user.html" className="sign-in-button">Sign In</a> */}
                {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
                <button className="sign-in-button" type="submit">
                {loading?"Loading...":"Sign In"}
                </button>
                {error && (
                    <div role='alert'>{error}</div>
                )}
                {/* <!--  --> */}
                </form>
            </section>
            </main>
            <Footer />

            
        </>
    );
};

export default SignIn;