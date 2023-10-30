import sjRequest from '..'

export const getArticles = () => {
  return sjRequest.get({
    url: '/article',
  })
}
