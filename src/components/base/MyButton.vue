<template>
  <button :style="btnStyle">{{ content }}</button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    btnStyle: {
      default: function() {
        return {
          height: "0.38rem",
          background: "#3a65ff",
          borderRadius: "0.19rem",
          color: "white",
          width: "1.37rem"
        };
      },
      type: Object
    },
    content:{
      default:'立即抢购',
      type:String
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped>
button {
  border: none;
  outline: none;
  font-size: 0.15rem;
  letter-spacing: 2px;
}
</style>