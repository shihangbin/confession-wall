import sjRequest from '..'

export const signUp = (user: string, pwd: string) => {
  return sjRequest.post({
    url: '/user',
    data: {
      username: user,
      password: pwd,
    },
  })
}
