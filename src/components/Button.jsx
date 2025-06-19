import { Link } from "react-router-dom";

//styles
import "./styles/Button.css";

function Button({ children, onClick, disabled = false, className = "", to }) {
  if (to) {
    return (
      <Link to={to} className={`button ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
