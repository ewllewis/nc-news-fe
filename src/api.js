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
