import sjRequest from '..'

export const userSignUp = (user, pwd) => {
  return sjRequest.post({
    url: '/user',
    data: {
      username: user,
      password: pwd,
    },
  })
}
