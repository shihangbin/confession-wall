import sjRequest from '..'

export const userSignUp = (user: string, pwd: string) => {
  return sjRequest.post({
    url: '/user',
    data: {
      username: user,
      password: pwd,
    },
  })
}
