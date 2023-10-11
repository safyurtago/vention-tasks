import "./styles/style.css"
import Facebook from '../../assets/images/facebook.svg';
import Linkedn from '../../assets/images/linkedn.svg';
import Twitter from '../../assets/images/twitter.svg';
import Pris from '../../assets/images/pris.svg';
import Instagram from '../../assets/images/instagram.svg';
const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <p className="ftext">&copy; 2023 Your Website Name</p>
        <p className="ftext-description">If you have any questions please contact us sabrihakuli@outlook.com</p>
        <div className="social-links">
          <a href="#" className="social-link">
            <img src={Facebook} alt="" />
          </a>
          <a href="#" className="social-link">
            <img src={Pris} alt="" />
          </a>
          <a href="#" className="social-link">
            <img src={Linkedn} alt="" />
          </a>
          <a href="#" className="social-link">
            <img src={Instagram} alt="" />
          </a>
          <a href="#" className="social-link">
            <img src={Twitter} alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
