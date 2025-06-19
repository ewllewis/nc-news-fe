import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

// styles
import "./styles/TopicPage.css";

// api
import { getArticles, getTopics } from "../api";

// hooks
import useLoading from "../hooks/useLoading";

// components
import ArticleList from "../features/articles/ArticleList";
import Article from "../features/articles/Article";
import SearchBar from "../components/SearchBar";

function TopicPage() {
  const { topic } = useParams();
  const [topicInfo, setTopicInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const searchQuery = useMemo(
    () => ({
      topic,
      sort_by,
      order,
    }),
    [topic, sort_by, order]
  );

  const {
    isLoading,
    error,
    data: articles = [],
  } = useLoading(getArticles, searchQuery);

  useEffect(() => {
    getTopics().then((topics = []) => {
      const match = topics.find((item) => item.slug === topic);
      setTopicInfo(match);
    });
  }, [topic]);

  const topTwoArticles = useMemo(() => {
    return articles
      .slice()
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 2);
  }, [articles]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error.message}</p>;
  if (!topicInfo) return <p>Loading topic info...</p>;

  return (
    <div className="topic-page-container">
      <section className="title-and-list">
        <figure className="image-container">
          <img src={topicInfo.img_url} alt={topicInfo.slug} />
          <figcaption className="banner-title">#{topicInfo.slug}</figcaption>
        </figure>
        <SearchBar
          setSearchParams={setSearchParams}
          sort_by={sort_by}
          order={order}
        />
        <ArticleList articles={articles} />
      </section>
      <section className="featured-articles">
        <h2>Featured:</h2>

        {topTwoArticles.length === 0 ? (
          <p>No featured articles</p>
        ) : (
          topTwoArticles.map((article) => (
            <Article key={article.article_id} article_id={article.article_id} />
          ))
        )}
      </section>
    </div>
  );
}

export default TopicPage;
