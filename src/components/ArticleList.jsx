import "../styles/articleList.css";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";

import { getArticles } from "../api";

import ArticleCard from "./ArticleCard";
import useLoading from "../hooks/useLoading";

function ArticleList() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const searchTerm = useMemo(() => {
    return topic !== "new" && topic !== "popular"
      ? { topic, sort_by, order }
      : { sort_by, order };
  }, [topic, sort_by, order]);

  const {
    isLoading,
    error,
    data: articles = [],
  } = useLoading(getArticles, searchTerm);

  function sortforNewArticles(list) {
    return [...list]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);
  }

  function sortforPopularArticles(list) {
    return [...list].sort((a, b) => b.votes - a.votes).slice(0, 10);
  }

  let displayedArticles = [];

  const isUsingSortParams =
    searchParams.has("sort_by") || searchParams.has("order");

  if (topic === "new" && !isUsingSortParams) {
    displayedArticles = sortforNewArticles(articles);
  } else if (topic === "popular" && !isUsingSortParams) {
    displayedArticles = sortforPopularArticles(articles);
  } else {
    displayedArticles = articles;
  }

  const handleSortChange = (e) => {
    setSearchParams({ sort_by: e.target.value, order });
  };

  const handleOrderChange = (e) => {
    setSearchParams({ sort_by, order: e.target.value });
  };

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="article-list-wrapper">
      <div className="sort-controls">
        <label>
          Sort by:
          <select value={sort_by} onChange={handleSortChange}>
            <option value="author">Author</option>
            <option value="title">Title</option>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
          </select>
        </label>

        <label>
          Order:
          <select value={order} onChange={handleOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      <div className="article-list-container">
        {displayedArticles.map((article) => (
          <Link to={`/article/${article.article_id}`} key={article.article_id}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
