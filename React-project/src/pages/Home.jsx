import { Helmet } from "react-helmet";
import Hero from "../Hero";
import Pakage from "./Pakage";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Welcome to our travel agency. Explore the world with us!" />
            </Helmet>
            <Hero />
            
        </div>
    );
};

export default Home;