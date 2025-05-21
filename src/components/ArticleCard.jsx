function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <div className="article-card-image-container">
        <img src={article.article_img_url} alt={article.title} />
      </div>
      <div className="article-card-middle">
        <div className="article-title">{article.title}</div>
        <div className="article-card-middle-bottom">
          <div className="article-card-votes">Votes: {article.votes}</div>
          <div className="article-card-votes">
            Comments: {article.comment_count}
          </div>
        </div>
      </div>
      <div className="article-card-right">
        <div className="article-card-metadata">#{article.topic}</div>
        <div className="article-card-metadata">
          {new Date(article.created_at).toLocaleDateString()}
        </div>
        <div className="article-card-metadata">@{article.author}</div>
      </div>
    </div>
  );
}

export default ArticleCard;
