<template>
  <div class="footer">
    <dl @click="changeStatus('home')">
      <dt>
        <img src="@/assets/img/homeicoactive@2x.png" v-if="isHomeActive" />
        <img src="@/assets/img/homeico@2x.png" v-else />
      </dt>
      <dd>首页</dd>
    </dl>
    <dl @click="changeStatus('mine')">
      <dt>
        <img src="@/assets/img/mineicoactive@2x.png" v-if="isMineActive" />
        <img src="@/assets/img/mineico@2x.png" v-else />
      </dt>
      <dd>我的</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "MyFooter",

  props: {
    title: {
      default: "标题",
      type: String
    },
    close: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      isHomeActive: true,
      isMineActive: false
    };
  },
  created() {},
  methods: {
    changeStatus(name) {
      if (name == "home") {
        this.isHomeActive = true;
        this.isMineActive = false;
      } else if (name == "mine") {
        this.isHomeActive = false;
        this.isMineActive = true;
      }
    }
  },
  computed: {},
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.12rem;
  color: rgb(183, 194, 218);
  background: white;
  padding: 0.08rem 0;
  position: fixed;
  bottom:0px;
  left:0px;
  right: 0px;
}

.footer dl img {
  width: 0.24rem;
}

.footer dl dt {
  margin-bottom: 0.05rem;
}
</style>