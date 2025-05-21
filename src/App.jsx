import "./styles/App.css";

import { Route, Routes } from "react-router";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div className="app-container">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:topic" element={<ArticleList />} />
        <Route path="/article/:articleid" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
