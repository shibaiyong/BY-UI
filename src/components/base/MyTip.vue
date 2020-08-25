<template>
  <div class="mytip" v-show="configMessage.tipvisible">
    <div class="header">
      <i class="mui-icon mui-icon-arrowleft" :style="{visibility:'hidden'}"/>
      <span>{{configMessage.header}}</span>
      <span class="close" @click="configMessage.tipvisible=false">关闭</span>
    </div>
    <img :src="configMessage.imgsrc" :style="tipStyle" />
    <div class="tipcontent">
      <ul>
        <li>
          <span>{{configMessage.title}}</span>
        </li>
        <li>
          <span>{{configMessage.subtitle}}</span>
        </li>
        <li>{{configMessage.des}}</li>
      </ul>
    </div>
    <MyButton
      :content="configMessage.btnText"
      @click.native="gotoSite"
      :btnStyle="configMessage.btnStyle"
    />
    <div class="service">
      <Service />
    </div>
  </div>
</template>

<script>
import Service from "@/components/base/Service.vue";
import MyButton from "@/components/base/MyButton";
import MyHeader from "@/components/base/MyHeader";
export default {
  name: "MyTip",
  props: {
    
    configMessage: {
      default: function() {
        return {}
      },
      type: Object
    },
    tipStyle: {
      default: function() {
        return {
          width: "0.65rem"
        };
      },
      type: Object
    }
  },
  data() {
    return {
      value: "",
      arrowleft:{
        visibility:'hidden'
      }
    };
  },
  created() {},
  methods: {
    getValue() {
      this.$emit("input", this.value);
    },
    gotoSite() {
      this.configMessage.callback();
    }
  },
  computed: {
  },
  mounted() {},
  components: {
    MyButton,
    Service,
    MyButton,
    MyHeader
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.mytip {
  width: 100%;
  height: 100vh;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}
.mytip .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.16rem;
  box-sizing: border-box;
  font-size: 0.18rem;
}

.mytip .header .close {
  font-size: 0.14rem;
}
.mytip .header img {
  height: 0.12rem;
  width: 0.07rem;
  margin: 0;
}
.mytip img {
  width: 0.65rem;
  margin: 0.62rem 0 0.17rem;
}

.tipcontent {
  text-align: center;
}

.tipcontent ul li:nth-child(1) {
  font-size: 0.27rem;
  color: black;
  margin-bottom: 0.2rem;
}
.tipcontent ul li:nth-child(1) span {
  margin-left: 0.05rem;
}
.tipcontent ul li:nth-child(2) {
  font-size: 0.24rem;
  color: black;
}
.tipcontent ul li:nth-child(3) {
  font-size: 0.14rem;
  color: #a5a5a5;
  padding: 0.28rem 0 0.62rem;
}
.service {
  width: 100%;
  position: absolute;
  bottom: 0.2rem;
  left: 0;
}
</style>