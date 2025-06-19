//styles
import "./styles/ArticleGallery.css";

//components
import ArticleGalleryCard from "./ArticleGalleryCard";

function ArticleGallery({ className, articles, vertical = false }) {
  return (
    <div
      className={`article-gallery ${className} ${vertical ? "vertical" : ""}`}
    >
      {articles.map((article) => (
        <ArticleGalleryCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}

export default ArticleGallery;
