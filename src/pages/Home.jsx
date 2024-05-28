
import Footer from "../components/Footer";
import MainHome from "../components/MainHome";
import Navigation from "../components/Navigation";



const Home = () => {
    return (
        <>
         <Navigation/>
            <main>
                <MainHome />
            </main>
        <Footer/>
            
        </>
    );
};

export default Home;