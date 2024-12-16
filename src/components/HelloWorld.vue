<script setup>
import { ref, watch } from 'vue'
import { ElUpload } from 'element-plus'

const isUploading = ref(false)
const loading = ref(false)
const fileList = ref([])
const handleUpload = (file) => {
  // 处理上传的文件
  fileList.value.push(file)

  isUploading.value = true
}

watch(fileList, (newVal) => {
  console.log(newVal)
})
</script>

<template>
  <div class="">
    <ElUpload
    v-model="isUploading"
    v-if="!isUploading"
    :on-change="handleUpload"
    action=""
    :auto-upload="false"
    drag
    multiple
    :show-file-list="false"
  >
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">上传文件</div>
  </ElUpload>
  <div class="success" v-if="isUploading">
    <div class="preview" >
    <div class="preview-item" v-for="file in fileList" :key="file.uid">
       {{ file.name }}
    </div>
  </div>
  </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
