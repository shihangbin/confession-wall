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
