import sjRequest from '..'

export const getArticleList = (offset: number, size: number) => {
  return sjRequest.get({
    url: '/article',
    data: {
      offset: offset || 0,
      size: size || 5,
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
