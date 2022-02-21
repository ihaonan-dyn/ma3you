<template>

<div>
  <el-form :hide-required-asterisk="false"  ref="userForm" :model="form" label-suffix=":"
           label-width="80px" size="small">
    <el-form-item label="ID">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="form.kind" placeholder="请选择类别">
        <el-option label="音频" value="1" @click.native="selectnotlink"></el-option>
        <el-option label="链接" value="2" @click.native="selectlink"></el-option>
        <el-option label="视频" value="3" @click.native="selectnotlink"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="资源名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="上传文件" v-show="filekind">
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
    </el-form-item>
    <el-form-item label="链接地址" v-show="!filekind">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存信息</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "Add",
  data(){
    return{
      filekind:true,
      filedata: null,//上传的文件
      fileName: '',//上传的文件名字
      form: {
        id: '',
        title:'',
        name: '',
        kind: '',
        address: '',
      },
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      console.log(res)

      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file.raw)
      console.log(this.imageUrl)

    },
    handlePreview(file) {
      console.log(file);
    },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M;
    // },
    onSubmit() {
      this.form.id= parseInt(this.form.id)
      this.form.kind= parseInt(this.form.kind)
      console.log(this.form)
          this.$http.post("http://39.106.101.15:8088/jp/new", this.form).then(res => {
            console.log(res.data);
            if (res.data.code) {
              this.$message({
                message: '恭喜你，' + res.data.message,
                type: 'success'
              });
              //清空表单信息
              this.form = {};
            } else {
              this.$message.error(res.data.message);
            }
          });
    },
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
            formdate.append("filename", file)
            if (fileSize < 20) {
              this.filedata = {}
              this.$http.post((`http://39.106.101.15:8088/jp/upload`), formdate,).then(e => {
                const res_ = e.data
                console.log(e.data)
                that.$message.success("文件已上传成功！")
                // this.imgList.push(res.data.full_url)
                that.filedata = res_.data
                console.log(res_.data)
                that.form.address =res_.data.full_url
                console.log(that.filedata)
                console.log(11111)

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
    selectlink(){
      this.filekind=false
    },
    selectnotlink(){
      this.filekind=ture
    },
  }
}
</script>

<style scoped>

</style>
