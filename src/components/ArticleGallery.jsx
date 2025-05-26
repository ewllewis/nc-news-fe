import "../styles/ArticleGallery.css";

import ArticleGalleryCard from "./ArticleGalleryCard";

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
