import sjRequest from '..'

export const getArticles = () => {
  return sjRequest.get({
    url: '/article',
  })
}

export const getArticleItem = (id: number) => {
  return sjRequest.get({
    url: `/article/${id}`,
  })
}
