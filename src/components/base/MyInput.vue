<template>
  <div class="myinput">
    <span>￥</span>
    <input
      type="text"
      v-model="value"
      @change="getValue"
      :placeholder="placeholder"
      @blur="$emit('changeStatus','blur')"
      @focus="$emit('changeStatus','focus')"
    />
  </div>
</template>

<script>
import eventBus from "@/assets/utils/eventbus";
export default {
  name: "MyInput",
  props: {
    placeholder: {
      default: "请输入购买金额(0.01元起)",
      type: String
    }
  },
  data() {
    return {
      value: ""
    };
  },
  created() {
    eventBus.$on("changeValue", val => {
      //用于清空输入框的内容
      this.value = val;
    });
  },
  methods: {
    getValue() {
      this.$emit("input", this.value);
    }
  },
  computed: {},
  mounted() {},
  beforeDestroy() {}
};
</script>
<style scoped>
.myinput {
  width: 100%;
  background: white;
  border-bottom: 1px solid #c7d9fd;
}
.myinput input {
  display: inline-block;
  border: none;
  vertical-align: middle;
  width: 84%;
  margin: 0;
  font-size: 0.24rem;
}

.myinput input::placeholder {
  font-size: 0.18rem;
}
.myinput span {
  display: inline-block;
  vertical-align: middle;
  font-size: 0.24rem;
  width: 9%;
}
</style>