import { Link } from "react-router";

//styles
import "./styles/ArticleGalleryCard.css";

function ArticleGalleryCard({ article }) {
  return (
    <article className="article-gallery-card">
      <Link to={`/article/${article.article_id}`} key={article.article_id}>
        <figure className="image-container">
          <img src={article.article_img_url} alt={article.title} />
          <figcaption className="image-title-overlay">
            {article.title}
          </figcaption>
        </figure>
      </Link>
    </article>
  );
}

export default ArticleGalleryCard;
