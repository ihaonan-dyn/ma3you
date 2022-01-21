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
        <Code> </Code>
      </el-col>
    </el-row>

    <div style="display: flex;  height: 200px;">
      <transition name="el-zoom-in-left">
        <div v-show="show2" class="transition-box">
          <!--详情页面          -->
          <Detail :name1="test1" @listChildChange="childChage"></Detail>
        </div>
      </transition>
      <transition name="el-zoom-in-right">
        <div v-show="show2" class="transition-box">
          <!--添加页面          -->
          <Add></Add>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import Detail from "./Detail";
import Add from "./Add";
import Code from "./Code";

export default {
  components: {
    Detail,
    Add,
    Code
  },
  data() {
    return {
      data1: '',
      test1: '小晨晨',
      search: '',
      imageUrl: '',
      show: false,
      show2: true,


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
    childChage: function (data) {
      this.data1 = data
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
  comments: {
    Detail: Detail
  }
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
