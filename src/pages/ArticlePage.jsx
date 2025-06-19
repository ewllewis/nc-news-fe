import { useParams } from "react-router";
import { useEffect, useState } from "react";

//api
import { getArticles, getArticlebyArticleId } from "../api";

//styles
import "./styles/ArticlePage.css";

//components
import CommentList from "../features/comments/CommentList";
import Article from "../features/articles/Article";
import ArticleGallery from "../features/articles/ArticleGallery";

//hooks
import useLoading from "../hooks/useLoading";
import useMediaQuery from "../hooks/useMediaQuery";

function ArticlePage() {
  const { articleid } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 800px)");

  const {
    isLoading: articleLoading,
    error: articleError,
    data: article,
  } = useLoading(getArticlebyArticleId, articleid);

  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [relatedError, setRelatedError] = useState(null);

  useEffect(() => {
    if (article?.topic) {
      setLoadingRelated(true);
      getArticles({ topic: article.topic })
        .then((articles) => {
          const filtered = articles.filter(
            (a) => a.article_id !== parseInt(articleid)
          );
          setRelatedArticles(filtered);
        })
        .catch((err) => {
          setRelatedError(err);
        })
        .finally(() => setLoadingRelated(false));
    }
  }, [article, articleid]);

  if (articleLoading) return <p>Loading article...</p>;
  if (articleError) return <p>{articleError.message}</p>;

  return (
    <article className="article-page-container">
      <section className="article-and-comments">
        <Article article_id={articleid} />
        <CommentList
          articleid={articleid}
          comment_count={article.comment_count}
        />
      </section>

      <section className="related-articles">
        <h2>Related:</h2>
        {loadingRelated && <p>Loading related articles...</p>}
        {relatedError && <p>{relatedError.message}</p>}
        {!loadingRelated && !relatedError && (
          <ArticleGallery
            articles={relatedArticles}
            vertical={!isSmallScreen}
          />
        )}
      </section>
    </article>
  );
}

export default ArticlePage;
