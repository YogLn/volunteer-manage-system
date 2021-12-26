<template>
  <div>
    <el-upload class="avatar-uploader"
               action="#"
               :show-file-list="false"
               :on-success="uploadSuccess"
               :before-upload="beforeUpload"
               :http-request="uploadImg">
      <img v-if="imgUrl || image" :src="imgUrl || image">
      <i v-else class="el-icon-plus uploader-icon" />
    </el-upload>
    <el-progress v-if="showProgress"
                 :percentage="percentage" />
  </div>
</template>

<script>
import { ref } from 'vue'
import COS from 'cos-js-sdk-v5'
import { ElMessage } from "element-plus";
export default {
  props: {
    image: {
      type: String
    }
  },
  emits:['imgUrl'],
  setup(props, {emit}) {
    let showProgress = ref(false)
    let percentage = ref(20)
    let imgUrl = ref('')
    const cos = new COS({
      SecretId: 'AKIDMYUAZgX7SW7TZOvBBuLVO1NSGn31jAKD',
      SecretKey: 'dz4sPecJjslMgkW2HFwNXP0LPChvtafT'
    })
    // 上传之前的校验
    const beforeUpload = (file) => {
      const isPNG = file.type === 'image/png' || 'image/jpeg' || 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isPNG) {
        ElMessage.error("上传头像图片格式不对!");
      }
      if (!isLt2M) {
        ElMessage.error("上传头像图片大小不能超过 5MB!");
      }
      return isPNG && isLt2M
    }

    // 开始上传
    const uploadImg = (files) => {
      if (!files.file) {
        return
      }
      showProgress.value = true
      // 1. 把图片上传到腾讯云COS
      // 执行上传操作
      cos.putObject({
        Bucket: 'blog-1304388092', /* 存储桶 */
        Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
        Key: files.file.name, /* 文件名 */
        StorageClass: 'STANDARD', // 上传模式, 标准模式
        Body: files.file, // 上传文件对象
        onProgress: (progressData) => {
          percentage.value = progressData.percent * 100
        }
      }, (err, data) => {
        // 上传成功之后
        if (data.statusCode === 200) {
          // 2. 显示图片
          imgUrl.value = `https:${data.Location}`
          // 3. 通知父组件
          emit('imgUrl', imgUrl.value)
        }
        showProgress.value = false
      })
    }
    const uploadSuccess = () => {
    }
    return {
      imgUrl,
      showProgress,
      percentage,
      beforeUpload,
      uploadImg,
      uploadSuccess
    }
  }
}
</script>

<style scoped>
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
img {
  width: 100%;
  height: 100%;
}
</style>