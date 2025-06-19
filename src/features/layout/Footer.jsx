import { Link } from "react-router";

//styles
import "./styles/Footer.css";

//components
import Button from "../../components/Button";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-links">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/about">
          <Button>About</Button>
        </Link>
      </section>
      <section className="footer-copyright">
        <h4>NC-News, Inc. © 2025. All rights reserved</h4>
      </section>
    </div>
  );
}

export default Footer;
