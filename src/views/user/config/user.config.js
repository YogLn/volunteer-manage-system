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

export const tableContentConfig = {
  propList: [
    { prop: 'id', label: 'Id', minWidth: '130' },
    { prop: 'username', label: '用户名', minWidth: '150' },
    { prop: 'account', label: '账号', minWidth: '80' },
    { prop: 'identity', label: '身份证', minWidth: '120' },
    { prop: 'sex', label: '性别', minWidth: '120', slotName: 'sex' },
    { prop: 'roleId', label: '角色', minWidth: '120', slotName: 'role' },
    { prop: 'school', label: '学校', minWidth: '120' },
    {
      prop: 'serveArea',
      label: '服务地区',
      minWidth: '120',
      slotName: 'serveArea'
    },
    {
      prop: 'serveType',
      label: '服务类型',
      minWidth: '120',
      slotName: 'serveType'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
