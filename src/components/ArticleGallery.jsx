import ArticleGalleryCard from "./ArticleGalleryCard";
import "../styles/articleGallery.css";
import { Link } from "react-router";

function ArticleGallery({ articles }) {
  return (
    <div className="article-gallery-container">
      {articles.map((article) => (
        <Link to={`/article/${article.article_id}`} key={article.article_id}>
          <ArticleGalleryCard key={article.article_id} article={article} />
        </Link>
      ))}
    </div>
  );
}

export default ArticleGallery;
