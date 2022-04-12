export const checkMobile = (rule, value, cb) => {
  // 验证手机号的正则表达式
  const regMobile = /^1[3|4|5|7|8|9][0-9]{9}$/
  if (regMobile.test(value)) {
    return cb()
  }
  cb(new Error('请输入合法的手机号'))
}
