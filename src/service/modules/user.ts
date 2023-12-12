import sjRequest from '..'

export const getArticle = (id: number | string) => {
  return sjRequest.get({
    url: `/personage/article/${id}`,
  })
}

export const getLikeArticle = (id: number | string) => {
  return sjRequest.get({
    url: `/personage/like/${id}`,
  })
}
