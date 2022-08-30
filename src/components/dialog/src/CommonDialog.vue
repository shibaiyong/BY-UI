<template>
  <div v-if='visible'>
    <div class="dialog" v-if="type != 'toast'">

      <div class="dialog_wrap">
      
        <div class="title" v-html="title"></div>
        <div class="content" v-html="content"></div>

        <div class="btns" v-if = "['confirm', 'promot'].includes(type)">
          <span @click="callback1" v-html = "cancel"></span>
          <span class="btn-active" @click="callback2" v-html = "confirm"></span>
        </div>

        <div class="btns" v-else>
          <span class="btn-active" @click="callback2" v-html = "confirm"></span>
        </div>
      </div>
    </div>

    <div class="toast" v-else>
      <span>{{content}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "by-dialog",
  props: {
    visible: Boolean,
    type: [String],
    title: [String],
    content: [String],
    cancel: [String],
    confirm: [String],
    time: {
      default: 3000,
      type: Number
    },
    cancelCB: {
      type: Function,
      default: function() {
        return new Function();
      }
    },
    confirmCB: {
      type: Function,
      default: function() {
        return new Function();
      }
    }
  },
  data() {
    return {};
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    runTimer() {
      if (this.type == "toast") {
        this.$runCountDown(
          this.time / 1000,
          0,
          this.time / 1000,
          1000,
          false,
          res => {
            if (res == 0) {
              this.closed();
            }
          }
        );
      }
    },
    callback1() {
      this.$emit("cancelCB");
      return this.cancelCB();
    },
    callback2() {
      this.$emit("confirmCB");
      return this.confirmCB();
    },
    showed() {
      this.visible = true;
      this.runTimer();
    },
    closed() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.dialog,
.toast {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast {
  background: rgba(0, 0, 0, 0);
}
.toast span {
  display: inline-block;
  padding: 0 0.36rem;
  height: 0.88rem;
  font-size: 0.32rem;
  color: #fff;
  text-align: center;
  line-height: 0.88rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.1rem;
}

.dialog_wrap {
  width: 6.86rem;
  background: white;
  border-radius: 0.24rem;
  text-align: center;
}

.dialog_wrap .title {
  padding-top: 0.56rem;
  font-size: 0.36rem;
  color: #333;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
}

.dialog_wrap .content {
  display: inline-block;
  margin: 0.48rem 0.12rem 0.8rem;
  font-size: 0.32rem;
  color: #666;
  text-align: justify;
}

.btns {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e5e5;
}

.btns span {
  display: inline-block;
  width: 100%;
  font-size: 0.36rem;
  color: #999;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-weight: bold;
}

.btns .btn-active {
  color: #999;
  border-left: 1px solid #e5e5d5;
}
</style>