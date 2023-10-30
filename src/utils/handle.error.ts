export const showToastError = (error: string = 'none', message?: string) => {
  let iconName: string = ''

  switch (error) {
    case 'success':
      iconName = error
      break
    case 'error':
      iconName = error
      break
    case 'fail':
      iconName = error
      break
    case 'exception':
      iconName = error
      break
    case 'loading':
      iconName = error
      break
    case 'none':
      iconName = error
      break
  }

  uni.showToast({
    icon: iconName,
    title: message,
    duration: 2000,
  })
}
