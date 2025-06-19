import { useRef, useState } from "react";

// components
import Button from "../../components/Button";
import NewTopicModal from "../../components/modals/NewTopicModal";
import NewArticleModal from "../../components/modals/NewArticleModal";

// styles
import { AiOutlineDown, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import "./styles/Navbar.css";

// hooks
import { useUser } from "../../context/User";

function NavBar() {
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isLoggedIn } = useUser();
  const scrollRef = useRef(null);

  const topicButtons = [
    { to: "/articles/coding", label: "💻 #coding" },
    { to: "/articles/football", label: "⚽ #football" },
    { to: "/articles/cooking", label: "🍅 #cooking" },
    { to: "/articles/gaming", label: "🎮 #gaming" },
    { to: "/articles/art", label: "🎨 #art" },
    { to: "/articles/science", label: "🚀 #science" },
    { to: "/articles/nature", label: "🌱 #nature" },
    { to: "/articles/diy", label: "🛠️ #diy" },
    { to: "/articles/reading", label: "📖 #reading" },
    { to: "/articles/cars", label: "🚘 #cars" },
  ];

  const scrollByAmount = 300;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar-container">
      <div className="scroll-container">
        <button className="scroll-button" onClick={scrollLeft}>
          <AiOutlineLeft />
        </button>
        <div className="desktop-scroll-wrapper" ref={scrollRef}>
          {isLoggedIn && (
            <>
              <Button
                className="add-buttons"
                onClick={() => setIsNewTopicModalOpen(true)}
              >
                + Topic
              </Button>
              <Button
                className="add-buttons"
                onClick={() => setIsNewArticleModalOpen(true)}
              >
                + Article
              </Button>
            </>
          )}
          {topicButtons.map(({ to, label }) => (
            <Button key={to} to={to}>
              {label}
            </Button>
          ))}
        </div>
        <button className="scroll-button" onClick={scrollRight}>
          <AiOutlineRight />
        </button>
      </div>

      <div className="mobile-dropdown-wrapper">
        <button
          className="dropdown-toggle"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          Topics <AiOutlineDown />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {isLoggedIn && (
              <>
                <Button onClick={() => setIsNewTopicModalOpen(true)}>
                  + Topic
                </Button>
                <Button onClick={() => setIsNewArticleModalOpen(true)}>
                  + Article
                </Button>
              </>
            )}
            {topicButtons.map(({ to, label }) => (
              <Button key={to} to={to}>
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {isNewTopicModalOpen && (
        <NewTopicModal onClose={() => setIsNewTopicModalOpen(false)} />
      )}
      {isNewArticleModalOpen && (
        <NewArticleModal onClose={() => setIsNewArticleModalOpen(false)} />
      )}
    </nav>
  );
}

export default NavBar;
