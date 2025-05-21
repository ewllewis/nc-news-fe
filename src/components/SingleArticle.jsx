import { useParams } from "react-router";
import { getArticlebyArticleId } from "../api";
import { useEffect, useState } from "react";
import "../styles/SingleArticle.css";

function SingleArticle() {
  let { articleid } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticlebyArticleId(articleid).then((article) => {
      setArticle(article);
    });
  }, []);

  return (
    <div className="single-article-container">
      <div className="single-article-main">
        <div className="single-article-data">
          <div className="single-article-title">{article.title}</div>

          <div className="single-article-img">
            <img src={article.article_img_url} alt={article.title} />
          </div>
          <div className="single-article-body">{article.body}</div>
          <div className="single-article-votes-comments">
            <div>Votes: {article.votes}</div>
            <div>Comments: {article.comment_count}</div>
          </div>
        </div>
        <div className="single-article-divider" />
        <div className="single-article-metadata">
          <div className="article-card-metadata">#{article.topic}</div>
          <div className="article-card-metadata">
            {new Date(article.created_at).toLocaleDateString()}
          </div>
          <div className="article-card-metadata">@{article.author}</div>
        </div>
      </div>
      <div className="single-article-comments">
        <div>single-article-comments</div>
      </div>
    </div>
  );
}

export default SingleArticle;
