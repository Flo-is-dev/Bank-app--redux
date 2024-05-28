import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUserData } from "../Store/UserSlice";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const User = () => {
    const dispatch = useDispatch();
    const { user, loading, error, token } = useSelector(state => ({
        user: state.user.user,
        loading: state.user.loading,
        error: state.user.error,
        token: state.login.token  // Supposant que le token est stocké dans le state du login slice
    }));

    useEffect(() => {
        if (token) {
            dispatch(GetUserData(token));
        }
    }, []);

    // console.log("USER DATTA", user ? user.body : "No user data");


    return (
        <>
            <Navigation />
            
            <main className="main bg-dark">
                <div className="header">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message ? error.message : "Unknown error"}</p>} {/* Modifié pour accéder spécifiquement au message d'erreur */}
                    {user && (
                        <h1>Welcome back<br />{user.body.firstName || "No user data"} {user.body.lastName || "No user data"} !</h1>
                    )}
                    {!user && !loading && <p>Please log in.</p>}
                    <button className="edit-button">Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default User;
