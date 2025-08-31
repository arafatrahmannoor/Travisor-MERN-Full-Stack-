import { Helmet } from "react-helmet";

const About = () => {
    return (
        <div>
            <Helmet>
                <title>About Us</title>
                <meta name="description" content="Learn more about our travel agency and our mission." />
            </Helmet>
            About Us Page
            <p>This is the about page of our application.</p>
        </div>
    );
};

export default About;