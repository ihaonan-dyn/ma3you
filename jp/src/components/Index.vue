<template>
  <div>
    <el-row class="el-card">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 680px" :cell-style="rowClass" :header-cell-style="headClass">
            <el-table-column label="ID" width="180" align="center">
              <template slot-scope="scope"><span style="margin-left: 10px">{{ scope.row.id }}</span></template>
            </el-table-column>
            <el-table-column label="标题" width="180" align="center">
              <template slot-scope="scope"><span style="margin-left: 10px">{{ scope.row.name }}</span></template>
            </el-table-column>
            <el-table-column header-align="center" header-width="180">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入标题的关键字进行搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">二维码
                </el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(scope.$index, scope.row)">删除
                </el-button>
                <el-button
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)">详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">

        <div id="qrcode" ref="qrcode"></div>
      </el-col>
    </el-row>

    <div style="display: flex;  height: 200px;">
      <transition name="el-zoom-in-left">
        <div v-show="show2" class="transition-box">
          <div class="content_phone">
            <div style="text-align: center">
              <h2>057鸿雁唱谱降E调</h2>
            </div>
            <div id="content">
              <div  style="text-align: center;">
                <audio controls="controls" controlslist="nodownload"   src="https://docs.needhub.cn/group1/design/0e58f48ef8c974da719f72f4eb0edec5.m4a">&nbsp;</audio>
              </div>
              <p style="text-align: center;">&nbsp;57何遇程 -G调， 鸿雁 (伴奏)</p>
              <div class="ckeditor-html5-audio" style="text-align: center;">
                <audio controls="controls" controlslist="nodownload"   src="https://docs.needhub.cn/group1/design/0e58f48ef8c974da719f72f4eb0edec5.m4a">&nbsp;</audio>
              </div>
              <p style="text-align: center;">《鸿雁》 原唱</p>
              <div class="ckeditor-html5-audio" style="text-align: center;">
                <audio controls="controls" controlslist="nodownload"   src="https://docs.needhub.cn/group1/design/0e58f48ef8c974da719f72f4eb0edec5.m4a">&nbsp;</audio>
              </div>
              <p><a class="btn btn-success btn-block btn-lg ma3youlink" href="https://haokan.baidu.com/v?pd=bjh&amp;vid=5049496589856742485&amp;fr=bjhauthor&amp;type=video">057鸿雁唱谱降E调视频</a></p>
              <p><a class="btn btn-primary btn-block btn-lg ma3youlink" href="https://haokan.baidu.com/v?pd=bjh&amp;vid=1655995713536288409&amp;fr=bjhauthor&amp;type=video">鸿雁降E调最新唱谱视频</a></p>
              <p><a class="btn btn-danger btn-block btn-lg ma3youlink" href="https://haokan.baidu.com/v?pd=bjh&amp;vid=10177905235240871096&amp;fr=bjhauthor&amp;type=video">《鸿雁》简谱歌词教唱视频</a></p>
            </div>
          </div>
        </div>
      </transition>
      <transition name="el-zoom-in-right">
        <div v-show="show2" class="transition-box">
          <el-form :hide-required-asterisk="false" :rules="rules" ref="userForm" :model="form" label-suffix=":"
                   label-width="80px" size="small">
            <el-form-item label="ID">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-select v-model="form.kind" placeholder="请选择类别">
                <el-option label="音频" value="1"></el-option>
                <el-option label="视频" value="2"></el-option>
                <el-option label="链接" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文件名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="上传文件">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {

  data() {
    return {
      search: '',
      imageUrl: '',
      show: false,
      show2: true,

      form: {
        id: '',
        name: '',
        kind: '',
        address: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },

      tableData: [{
        id: '1',
        name: '标题1',
      }, {
        id: '2',
        name: '标题2',
      }, {
        id: '3',
        name: '标题3',
      }, {
        id: '4',
        name: '标题4',
      }]
    }
  },
  methods: {
    qrcode () {
             let qrcode = new QRCode('qrcode', {
               width: 100,
               height: 100, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
               text: "https://needhub.cn/" // 二维码内容
             // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
             // background: '#f0f'
              // foreground: '#ff0'
          })
              console.log(qrcode)
        }  ,
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;


      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    saveUserInfo() {//点击添加时清空信息

    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 表头样式设置
    headClass() {
      return 'text-align: center;background:rgb(242,242,242);color:rgb(140,138,140)'
    },
    // 表格样式设置
    rowClass() {
      return 'text-align: center;'
    }
  },
  mounted() {
    this.qrcode()
  },
}
</script>

<style scoped>
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  height: 350px;
  border-radius: 4px;
  text-align: center;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
  font-size: xx-small;

}

.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap
}

.el-card {
  min-width: 100%;
  height: 260px;
  margin-right: 20px;
  transition: all .5s;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
}

.avatar {
  width: 55px;
  height: 55px;
  display: block;
}

.content_phone {
  width: 93%;
  height: 100%;
  margin: auto;

  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.ma3youlink {
  width: 98%;
  text-align: center;
  margin: 10px auto;
}

</style>
