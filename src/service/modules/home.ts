import sjRequest from '..'

sjRequest
  .request({
    url: '/article',
  })
  .then((res) => {
    console.log(res)
  })
