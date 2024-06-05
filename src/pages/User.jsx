import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUserData, UpdateUserData } from "../Store/UserSlice";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const User = () => {
    const dispatch = useDispatch();
    const { user, loading, error, token } = useSelector(state => ({
        user: state.user.user,
        loading: state.user.loading,
        error: state.user.error,
        token: state.login.token  
    }));

    const [isEditing,setIsEditing] = useState(false);
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");

    useEffect(() => {
        if (token && !loading) {
            dispatch(GetUserData(token));
        }
    }, []);

    // console.log("USER DATTA", user ? user.body : "No user data");

    const handleEdit = () => {
        const data = {
            firstName: editFirstName ? editFirstName : user.body.firstName,
            lastName : editLastName ? editLastName : user.body.lastname
        };

        dispatch(UpdateUserData({token, data}))
        setIsEditing(false) 
    }

    const handleCancel = () => {
        setEditFirstName(user.body.firstName)
        setEditLastName(user.body.lastName)

        setIsEditing(false)
    }


    return (
        <>
            <Navigation />
            
            <main className="main bg-dark">

                <div className="header">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message ? error.message : "Unknown error"}</p>} 
                    {user && (
                        <h1>Welcome back<br />
                        {
                            isEditing ? 
                            <div className="textareaContainer">
                            <textarea defaultValue={user.body.firstName} onChange={(e) => setEditFirstName(e.target.value)}></textarea> 
                            <textarea defaultValue={user.body.lastName} onChange={(e) => setEditLastName(e.target.value)}></textarea>
                            </div> : 
                            <div className="nameContainer">
                                <span>{(editFirstName ? editFirstName : user.body.firstName) || "No user data"} </span>
                                <span>{(editLastName ? editLastName : user.body.lastName) || "No user data"}!</span>
                            </div>
                        }
                         
                        </h1>
                    )}
                    {!user && !loading && <p>Please log in.</p>}
                    {user && (isEditing ? 
                        <div className="editContainer">
                            <button className="edit-button" onClick={handleEdit}>Save </button>
                            <button className="edit-button" onClick={handleCancel}>Cancel </button>
                        </div>
                        :
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>)
                    }
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
