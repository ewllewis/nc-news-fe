import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-j5i5.onrender.com/api/",
});

export const getArticles = (searchTerm = {}) => {
  return ncNewsApi
    .get("/articles", {
      params: searchTerm,
    })
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
    .get("/articles/" + articleId + "/comments")
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

export const patchCommentVotes = (commentId, voteIncrement) => {
  return ncNewsApi
    .patch("/comments/" + commentId, { inc_votes: voteIncrement })
    .then((response) => {
      return response.data.comment;
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

export const deleteArticle = (articleId) => {
  return ncNewsApi.delete("/articles/" + articleId).then((response) => {
    return;
  });
};

export const postTopic = (slug, description, img_url = "") => {
  return ncNewsApi
    .post("/topics/", {
      slug: slug,
      description: description,
      img_url: img_url,
    })
    .then((response) => {
      return response.data.topic;
    });
};

export const postArticle = (
  author,
  title,
  body,
  topic,
  article_img_url = ""
) => {
  return ncNewsApi
    .post("/articles/", {
      author: author,
      title: title,
      body: body,
      topic: topic,
      article_img_url: article_img_url,
    })
    .then((response) => {
      return response.data.article;
    });
};

export const getTopics = () => {
  return ncNewsApi.get("/topics").then((response) => {
    return response.data.topics;
  });
};
