import "../styles/articleList.css";

import { useParams, Link } from "react-router";
import { useMemo } from "react";

import { getArticles } from "../api";

import ArticleCard from "./ArticleCard";
import useLoading from "../hooks/useLoading";

function ArticleList() {
  const { topic } = useParams();
  const searchTerm = useMemo(() => {
    return topic !== "new" && topic !== "popular" ? { topic } : {};
  }, [topic]);
  const {
    isLoading,
    error,
    data: articles = [],
  } = useLoading(getArticles, searchTerm);

  function sortforNewArticles(articlesList) {
    return [...articlesList]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);
  }

  function sortforPopularArticles(articlesList) {
    return [...articlesList].sort((a, b) => b.votes - a.votes).slice(0, 10);
  }

  let displayedArticles = [];
  if (topic === "new") {
    displayedArticles = sortforNewArticles(articles);
  } else if (topic === "popular") {
    displayedArticles = sortforPopularArticles(articles);
  } else {
    displayedArticles = articles;
  }

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="article-list-container">
      {displayedArticles.map((article) => (
        <Link to={`/article/${article.article_id}`} key={article.article_id}>
          <ArticleCard article={article} />
        </Link>
      ))}
    </div>
  );
}

export default ArticleList;
