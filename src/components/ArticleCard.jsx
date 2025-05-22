function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <figure className="article-card-image-container">
        <img src={article.article_img_url} alt={article.title} />
      </figure>

      <section className="article-card-middle">
        <h2 className="article-title">{article.title}</h2>
        <div className="article-card-middle-bottom">
          <p className="article-card-votes">Votes: {article.votes}</p>
          <p className="article-card-votes">
            Comments: {article.comment_count}
          </p>
        </div>
      </section>

      <aside className="article-card-right">
        <p className="article-card-metadata">#{article.topic}</p>
        <time className="article-card-metadata" dateTime={article.created_at}>
          {new Date(article.created_at).toLocaleDateString()}
        </time>
        <p className="article-card-metadata">@{article.author}</p>
      </aside>
    </article>
  );
}

export default ArticleCard;
