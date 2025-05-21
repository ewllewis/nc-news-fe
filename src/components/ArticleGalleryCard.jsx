function ArticleGalleryCard({ article }) {
  return (
    <div className="article-gallery-card">
      <div className="image-container">
        <img src={article.article_img_url} alt={article.title} />
        <div className="image-title-overlay">{article.title}</div>
      </div>
    </div>
  );
}

export default ArticleGalleryCard;
