//styles
import "./styles/HeaderDate.css";

function HeaderDate() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-UK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <div className="header-date">{formattedDate}</div>;
}

export default HeaderDate;
