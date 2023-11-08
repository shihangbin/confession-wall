import sjRequest from '..'

export const login = (user: string, pwd: string) => {
  return sjRequest.post({
    url: '/login',
    data: {
      username: user,
      password: pwd,
    },
  })
}

export const user = () => {
  return sjRequest.get({
    url: `/login/user`,
  })
}
export const userInfo = (id: string | number) => {
  return sjRequest.get({
    url: `/user/${id}`,
  })
}
