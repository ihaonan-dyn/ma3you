<template>
  <div>
    <div class="content_phone">
      <div style="text-align: center">
        <h2>{{ title }}</h2>
      </div>
      <div id="content">
        <!-- 音频 -->
        <div
          style="text-align: center"
          v-for="item in audio"
          :key="item.Id + 'audio'"
        >
          <p style="text-align: center">{{ item.Name }}</p>
          <audio
            controls="controls"
            controlslist="nodownload"
            :src="item.Address"
          ></audio>
        </div>
        <!-- 链接 -->
        <p v-for="(lItem, lIndex) in link" :key="lItem.Id + 'link'">
          <a
            :class="[
              'btn btn-block btn-lg ma3youlink',
              lIndex == 0
                ? 'btn-success'
                : lIndex == 1
                ? 'btn-primary'
                : 'btn-danger',
            ]"
            :href="lItem.Address"
            >{{ lItem.Name }}</a
          >
        </p>
        <!-- 视频 -->
        <div class="video-box" v-for="vItem in video" :key="vItem.Id + 'video'">
          <p style="text-align: center">{{ vItem.Name }}</p>
          <video :src="vItem.Address" controls height="200px"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/apis/index.js";
export default {
  data() {
    return {
      title: "",
      id: "",
      audio: [], // 音频
      link: [], // 链接
      video: [], // 视频
    };
  },
  mounted() {
    this.id = this.$route.params.id.split(":")[1];
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await getDetail({
        id: this.id,
      });
      this.title = res.data.message.Title;
      this.audio = res.data.message.AudioMessage;
      this.link = res.data.message.LinkMessage;
      this.video = res.data.message.VideoMessage;
    },
  },
};
</script>

<style scoped>
.video-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
