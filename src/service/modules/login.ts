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

export const wxLogin = (code: string) => {
  return sjRequest.post({
    url: '/login/wx',
    data: {
      code: code,
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
export const upUserInfo = (id: string | number, userInfo: any) => {
  return sjRequest.put({
    url: `/user/${id}`,
    data: {
      username: userInfo.username,
      password: userInfo.password,
      avatar_path: userInfo.avatar_path,
      nickname: userInfo.nickname,
      age: userInfo.age,
      role: userInfo.role,
      is_muted: userInfo.is_muted,
      wechat_or_qq: userInfo.wechat_or_qq,
      gender: userInfo.gender,
      major: userInfo.major,
      school_class: userInfo.school_class,
      say: userInfo.say,
    },
  })
}
