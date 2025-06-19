import { useParams, Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

//api
import { getArticles } from "../../api";

//styles
import "./styles/ArticleList.css";

//hooks
import useLoading from "../../hooks/useLoading";

//components
import ArticleCard from "./ArticleCard";

function ArticleList({ articles }) {
  return (
    <div className="article-list-wrapper">
      <div className="article-list-container">
        {articles.map((article) => (
          <Link to={`/article/${article.article_id}`} key={article.article_id}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
