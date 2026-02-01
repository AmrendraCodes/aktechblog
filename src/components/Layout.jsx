import Navigation from "./Navigation";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navigation />
            <main className="layout-main">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
