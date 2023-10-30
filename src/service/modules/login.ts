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
