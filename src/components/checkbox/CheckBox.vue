<template>
<div class="checkboxContainer" @click="selected($event)">
    <div class="checkBox">
      <label v-show="isChecked"></label>
    </div>
    <slot></slot>
</div>
</template>

<script>
export default {
  name: "by-checkbox",
  props: {
    label: {
      type: [String, Number],
      default: ""
    },

    checklist: {
      type: Array,
      default: function() {
        return [];
      }
    },

    all: {
      type: String,
      default: ""
    },

    selectall: {
      type: Function
    },

    allisselect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isChecked: false
    };
  },
  
  methods: {
    selected(event) {
      if (event) {
        //组件内部的点击操作才执行
        this.isChecked = !this.isChecked;
        if (this.selectall) {
          //判断是否为全选复选框。如果是则return
          if (this.isChecked) {
            this.selectall(Math.random() + 1 + "");
          } else {
            this.selectall("");
          }
          return false;
        }
      }
      var index = this.checklist.indexOf(this.label);

      if (this.isChecked) {
        //直接调用执行的代码
        if (index == -1) {
          //防止点击全选的时候，往数组里重复添加。
          this.checklist.push(this.label);
        }
      } else {
        if (index != -1) {
          //取消选择时，删除对应的值
          this.checklist.splice(index, 1);
        }
      }
    }
  },
  watch: {
    all(val) {
      //全选框控制的属性
      if (val != "") {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
      this.selected();
    },
    allisselect(val) {
      //各个复选框都处于选中状态时。该值为真。
      this.isChecked = val ? true : false;
    }
  }
};
</script>
<style scoped>
.checkBox {
  width: 14px;
  height: 14px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #cdcdcd;
  background: white;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.checkBox label {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  line-height: 14px;
  font-size: 12px;
  left: 0;
  top: 0;
  cursor: pointer;
}

.checkBox label::after {
  content: "\2714";
}
.checkboxContainer {
  display: inline-block;
}
</style>