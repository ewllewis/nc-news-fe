import { useState } from "react";

//styles
import "./styles/Home.css";

//api
import { getArticles } from "../api";

//components
import ArticleGallery from "../features/articles/ArticleGallery";

//hooks
import useLoading from "../hooks/useLoading";

function Home() {
  const { isLoading, error, data: articles } = useLoading(getArticles);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error.message}</p>;

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
