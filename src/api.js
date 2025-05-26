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

export const patchArticleVotes = (articleId, voteIncrement) => {
  return ncNewsApi
    .patch("/articles/" + articleId, { inc_votes: voteIncrement })
    .then((response) => {
      return response.data.article;
    });
};

export const patchCommentVotes = (articleId, voteIncrement) => {
  return ncNewsApi
    .patch("/comments/" + articleId, { inc_votes: voteIncrement })
    .then((response) => {
      return response.data.article;
    });
};

export const postComment = (articleId, { username, body }) => {
  return ncNewsApi
    .post("/articles/" + articleId + "/comments", {
      username: username,
      body: body,
    })
    .then((response) => {
      return response.data.comment;
    });
};

export const getUserbyUsername = (username) => {
  return ncNewsApi.get("/users/" + username).then((response) => {
    return response.data.user;
  });
};

export const deleteComment = (commentId) => {
  return ncNewsApi.delete("/comments/" + commentId).then((response) => {
    return;
  });
};
