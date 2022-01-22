<template>
  <div>
        <span class="add_img">
              <div class="upload_div file_input" v-show="!filedata">
                <label class="btn" for="upload">
                  <span class="forimg"> 上传文件</span>
                </label>
                <input
                  type="file"
                  id="upload"
                  style="position:absolute; clip:rect(0 0 0 0);"
                  @change="filechange($event)"
                >
              </div>
              <span class="folder" v-show="filedata">
                <div>{{ fileName }}</div>
              </span>
        </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filedata: null,//上传的文件
      fileName: '',//上传的文件名字
    }
  },
  methods: {
    filechange(e) {//文件上传
      const that = this
      if (this.filedata == null) {
        var file = e.target.files[0]
        var timer = setInterval(() => {
          if (file) {
            let fileSize = file.size / 1048576
            this.fileName = file.name
            clearInterval(timer)
            var formdate = new FormData()
            formdate.append("design", file)
            if (fileSize < 20) {
              this.filedata = {}
              this.$http.post((`http://localhost:8083/bucket/design/upload`), formdate,).then(e => {
                const res_ = e.data
                that.$message.success("文件已上传成功！")
                // this.imgList.push(res.data.full_url)
                that.filedata = res_.data
              }).catch(e => {
                that.$message("文件上传失败")
              })
            } else if (fileSize >= 20) {
              this.$message("暂不支持超过20MB的文件上传")
            }
          }
        }, 100);
      }
    },
  },
}
</script>

