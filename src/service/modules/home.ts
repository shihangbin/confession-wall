import sjRequest from '..'

sjRequest
  .request({
    url: '/login/test',
  })
  .then((res) => {
    console.log(res)

    return res.data
  })
// export function test() {
//   return sjRequest.post({
//     url: '/login',
//     data: account,
//   })
// }
