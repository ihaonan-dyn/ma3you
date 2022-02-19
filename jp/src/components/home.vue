<template>
  <div class="home-box">
    <div class="top">
      <span
        :class="{ click: check == item.name }"
        v-for="(item, index) in btn"
        :key="index"
        @click="jumpWeb(item)"
        >{{ item.label }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String
  },
  data() {
    return {
      btn: [
        {
          name: "home",
          label: "主页",
          path: "/",
        },
        {
          name: "add",
          label: "添加",
          path: "/add",
        },
      ],
      check: '',
    };
  },
  methods: {
    jumpWeb(item) {
      this.check = item.name
      this.$router.push(item.path)
    },
  },
  watch: {
    path() {
      if (this.path.indexOf('index')) {
        this.check = 'home'
      } else if (this.path.indexOf('add')) {
        this.check = 'add'
      }
    },
  }
};
</script>

<style>
.top {
  margin: 0 auto 20px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  width: 95%;
  height: 60px;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
}
span {
  padding: 0 20px;
  height: 60px;
  color: #909090;
  line-height: 60px;
  cursor: pointer;
}
.click {
  color: #333;
  border-bottom: 2px solid #409eff;
}
</style>