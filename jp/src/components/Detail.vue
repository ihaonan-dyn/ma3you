<template>
  <div>
    <div class="content_phone">
      <div style="text-align: center">
<!--        <button @click="changeText">给父组件传值</button>-->
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
        <p style="text-align: center;">{{name1}}111</p>
        <div class="ckeditor-html5-audio" style="text-align: center;">
          <audio controls="controls" controlslist="nodownload"   src="https://docs.needhub.cn/group1/design/0e58f48ef8c974da719f72f4eb0edec5.m4a">&nbsp;</audio>
        </div>
        <p><a class="btn btn-success btn-block btn-lg ma3youlink" href="https://haokan.baidu.com/v?pd=bjh&amp;vid=5049496589856742485&amp;fr=bjhauthor&amp;type=video">057鸿雁唱谱降E调视频</a></p>
        <p><a class="btn btn-primary btn-block btn-lg ma3youlink" href="https://haokan.baidu.com/v?pd=bjh&amp;vid=1655995713536288409&amp;fr=bjhauthor&amp;type=video">鸿雁降E调最新唱谱视频</a></p>
        <p><a class="btn btn-danger btn-block btn-lg ma3youlink" href="https://haokan.baidu.com/v?pd=bjh&amp;vid=10177905235240871096&amp;fr=bjhauthor&amp;type=video">《鸿雁》简谱歌词教唱视频</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
data(){
    return{
     test2 :"woshixxxxxx"
    }
},
  props:['name1'],
  methods:{
    changeText:function (){
      this.$emit("listChildChange",this.test2)
    }
}





}
</script>

<style scoped>

</style>
