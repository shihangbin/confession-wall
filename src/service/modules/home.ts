import sjRequest from '..'

export const getArticleList = (
  offset: number,
  size: number,
  assort: number,
  sort: string
) => {
  return sjRequest.get({
    url: '/article',
    data: {
      offset: offset || 0,
      size: size || 5,
      assort: assort || 1,
      sort: sort || 'DESC',
    },
  })
}

export const getArticleSearch = (search: string) => {
  return sjRequest.get({
    url: '/article/search',
    data: {
      search,
    },
  })
}

export const getArticleItem = (id: string) => {
  return sjRequest.get({
    url: `/article/${id}`,
  })
}

export const postArticle = (content: any, assort: number) => {
  return sjRequest.post({
    url: `/article`,
    data: {
      content: content,
      assort: assort,
    },
  })
}

export const getCommentList = (articleId: number) => {
  return sjRequest.get({
    url: `/comment/${articleId}`,
  })
}

export const postComment = (content: any, articleId: number) => {
  return sjRequest.post({
    url: `/comment`,
    data: {
      content: content,
      articleId: articleId,
    },
  })
}

export const delArticle = (id: number | string) => {
  return sjRequest.delete({
    url: `/article/${id}`,
  })
}

export const postLikeArticle = (id: number | string) => {
  return sjRequest.post({
    url: `/like`,
    data: {
      articleId: id,
    },
  })
}

export const getLikeArticle = (articleId: number, userId: number) => {
  return sjRequest.get({
    url: `/like`,
    data: {
      articleId,
      userId,
    },
  })
}

export const getLikeListArticle = (articleId: number) => {
  return sjRequest.get({
    url: `/like/list`,
    data: {
      articleId,
    },
  })
}

export const delLikeArticle = (id: number) => {
  return sjRequest.delete({
    url: `/like/${id}`,
  })
}

export const getLikeUserArticle = (id: number) => {
  return sjRequest.get({
    url: `/like/user`,
  })
}
