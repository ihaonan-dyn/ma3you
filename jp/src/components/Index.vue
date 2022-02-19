<template>
  <div class="list-box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Id" label="ID"> </el-table-column>
      <el-table-column prop="Title" label="标题"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <div class="operate">
            <span v-for="(item, index) in operateBtn" :key="index" @click="operateItem(item,scoped.row)">{{
              item.label
            }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAll,del } from "@/apis/index.js";
export default {
  data() {
    return {
      tableData: [], // 表格数据
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 当前每页的条数
        total: 0, // 宗条目数
      },
      operateBtn: [
        {
          name: "check",
          label: "查看",
        },
        {
          name: "detail",
          label: "详情",
        },
        {
          name: "del",
          label: "删除",
        },
      ],
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    // 换页
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getAllList();
    },
    // 获取列表页
    async getAllList() {
      const obj = {
        pageSize: this.page.pageSize,
        pageNow: this.page.currentPage,
      };
      const res = await getAll(obj);
      if (res.data.list) {
        this.tableData = res.data.list;
        this.page.total = res.data.total_page;
      }
    },
    // 操作按钮事件
    operateItem(opItem,scope) {
      if (opItem.name == 'check') {
        this.$router.push(`/index/code:${scope.Id}`)
      } else if (opItem.name == 'detail') {
        this.$router.push(`/index/detail:${scope.Id}`)
      } else {
        this.delItem(scope.Id)
      }
    },
    // 删除
    async delItem(id) {
      const res = await del({
        id: id,
      })
      if (res.code == 200) {
        this.getAllList()
      }
    }
  },
};
</script>

<style scoped>
.operate span{
  padding-left: 0;
  color: #28b7c4;
}
</style>
