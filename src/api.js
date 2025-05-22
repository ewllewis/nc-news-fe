import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-j5i5.onrender.com/api/",
});

export const getArticles = (searchTerm = {}) => {
  return ncNewsApi
    .get("/articles", { params: { topic: searchTerm.topic } })
    .then((response) => {
      return response.data.articles;
    });
};

export const getArticlebyArticleId = (articleId) => {
  return ncNewsApi.get("/articles/" + articleId).then((response) => {
    return response.data.article;
  });
};

export const getCommentsbyArticleId = (articleId) => {
  return ncNewsApi
    .get("/articles/" + articleId + "/comments/")
    .then((response) => {
      return response.data.comments;
    });
};
