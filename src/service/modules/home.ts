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

export const postArticle = (content: any) => {
  return sjRequest.post({
    url: `/article`,
    data: {
      content: content,
    },
  })
}

export const delArticle = (id: number | string) => {
  return sjRequest.delete({
    url: `/article/${id}`,
  })
}
