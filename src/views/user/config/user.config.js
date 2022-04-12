import { checkMobile } from '@/utils/check'

export const rules = {
  account: [
    { required: true, message: '请输入手机号~', trigger: 'blur' },
    { validator: checkMobile, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码~', trigger: 'blur' },
    { min: 6, message: '密码不得少于6位', trigger: 'blur' }
  ]
}
