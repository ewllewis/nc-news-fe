import ArticleGalleryCard from "./ArticleGalleryCard";
import "../styles/articleGallery.css";

function ArticleGallery({ articles }) {
  return (
    <div className="article-gallery-container">
      {articles.map((article) => (
        <ArticleGalleryCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}

export default ArticleGallery;
