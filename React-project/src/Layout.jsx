import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";

const Layout = () => {
    return (
        <div>
            <ScrollToTop smooth={true} />
            <Header />
            <Outlet />
            <Footer />
            <BackToTopButton />
        </div>
    );
};

export default Layout;