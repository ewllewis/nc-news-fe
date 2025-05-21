import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticles } from "../api";
import "../styles/articleList.css";

function ArticleList() {
  let { topic } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (topic === "new") {
      getArticles().then((articles) => {
        setArticles(sortforNewArticles(articles));
      });
    } else if (topic === "popular") {
      getArticles().then((articles) => {
        setArticles(sortforPopularArticles(articles));
      });
    } else {
      getArticles({ topic }).then((articles) => {
        setArticles(articles);
      });
    }
  }, [topic]);

  function sortforNewArticles(articles) {
    const newArticles = [...articles]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);
    return newArticles;
  }

  function sortforPopularArticles(articles) {
    const popularArticles = [...articles]
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 10);
    return popularArticles;
  }

  return (
    <div className="article-list-container">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
