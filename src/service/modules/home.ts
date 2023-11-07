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
