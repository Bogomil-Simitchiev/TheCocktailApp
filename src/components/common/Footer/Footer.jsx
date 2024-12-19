import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-title">Beans Love Cocktails</p>
                <p className="footer-description">
                    Celebrating the perfect blend of cocktails.
                </p>
                <p className="footer-copyright">&copy; {new Date().getFullYear()} Beans Love Cocktails. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;