import ArticleGallery from "./ArticleGallery";
import { useEffect, useState } from "react";
import { getArticles } from "../api";

function Home() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ topic: "" });

  useEffect(() => {
    getArticles(searchTerm).then((articles) => {
      setArticles(articles);
    });
  }, []);

  const newArticles = [...articles]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const newArticleIds = newArticles.map((article) => article.article_id);

  const popularArticles = [...articles]
    .filter((article) => !newArticleIds.includes(article.article_id))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  return (
    <div className="home-container">
      <h2>New</h2>
      <ArticleGallery articles={newArticles} />
      <h2>Popular</h2>
      <ArticleGallery articles={popularArticles} />
    </div>
  );
}

export default Home;
