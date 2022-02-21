<template>
  <div id="qrcode" ref="qrcode">
    <a id="downloadLink"></a>
    <button type="button" @click="downloadClick()">下载</button>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "Code",
  data() {
    return {
      id: "",
      url: "",
    };
  },
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 200,
        height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
        text: window.location.origin + '/#/index/detail:' +this.id, // 二维码内容
      });
    },
    downloadClick() {
      // 获取base64的图片节点
      var img = document
        .getElementById("qrcode")
        .getElementsByTagName("img")[0];
      // 构建画布
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      // 构造url
      this.url = canvas.toDataURL("image/png");
      // 构造a标签并模拟点击
      var downloadLink = document.getElementById("downloadLink");
      downloadLink.setAttribute("href", this.url);
      downloadLink.setAttribute("download", this.id + ".png");
      downloadLink.click();
    },
  },
  created() {
    this.id = this.$route.params.id.split(":")[1];
  },
  mounted() {
    this.qrcode();
  },
  watch: {
    $route(to, from) {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
</style>
