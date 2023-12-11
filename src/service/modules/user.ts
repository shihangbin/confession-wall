import sjRequest from '..'

export const getLikeArticle = (id: number | string) => {
  return sjRequest.get({
    url: `/personage/like`,
  })
}
export const getArticle = (id: number | string) => {
  return sjRequest.get({
    url: `/personage/article`,
  })
}
