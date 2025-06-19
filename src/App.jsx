import "./styles/App.css";

import { Route, Routes } from "react-router";

//components
import Header from "./features/layout/Header";
import NavBar from "./features/layout/NavBar";
import Footer from "./features/layout/Footer";
import TopicPage from "./pages/TopicPage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";

//pages
import Home from "./pages/Home";

//context
import { UserProvider } from "./context/User";

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:topic" element={<TopicPage />} />
          <Route path="/article/:articleid" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
