import sjRequest from '..'

export const getArticleList = () => {
  return sjRequest.get({
    url: '/article',
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
