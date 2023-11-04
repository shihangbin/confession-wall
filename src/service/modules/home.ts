import sjRequest from '..'

export const getArticles = () => {
  return sjRequest.get({
    url: '/article',
  })
}

export const getArticleItem = (id: string) => {
  return sjRequest.get({
    url: `/article/${id}`,
  })
}
