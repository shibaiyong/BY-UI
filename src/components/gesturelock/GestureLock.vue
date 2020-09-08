<template>
  
  <div ref="gesturecontent" class="gesturecontent">

    <canvas ref="canvas"></canvas>

  </div>
  
</template>

<script>
export default {
  name: "by-gesturelock",
  props: ["opts"],
  data() {
    return {
      height: this.opts.height || 300,
      width: this.opts.width || 300,
      canvasLockType: this.opts.canvasLockType || 3,
      selectNum: this.opts.selectNum || 4
    };
  },
  methods: {
    initDom: function() {
      var canvas = this.$refs.canvas;
      var contentDom = this.$refs.gesturecontent;
      //高清屏缩放
      //canvas.style.width = width + 'px';
      //canvas.style.height = height + 'px';
      canvas.height = this.height;
      canvas.width = this.width;
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
    },

    bindEvent: function(opts) {
      var self = this;
      this.canvas.addEventListener("touchstart", function(e) {
        //数据重置
        self.lastLocate = [];
        //引用类型的数据，注意使用的时候深拷贝一份
        self.restLocate = self.circleLocate.slice();

        var position = self.getPosition(e);

        for (var i = 0; i < self.restLocate.length; i++) {
          var item = self.restLocate[i];
          if (
            Math.abs(item.x - position.x) < self.r &&
            Math.abs(item.y - position.y) < self.r
          ) {
            self.touchFlag = true;
            self.lastLocate.push(self.restLocate.splice(i, 1)[0]);
            break;
          }
        }
      });
      this.canvas.addEventListener("touchmove", function(e) {
        if (self.touchFlag) {
          self.updateCanvas(self.getPosition(e));
        }
      });
      this.canvas.addEventListener("touchend", function(e) {
        //清空画布 ,重画9个圆
        self.checkGesture(opts);
      });
    },

    updateCanvas: function(po) {
      // 核心变换方法在touchmove时调用
      //清空画布       重画9个圆
      this.resetCircles();
      this.drawPoint("#ccc"); //画圆
      this.drawLine(po, "#ccc"); //画线
      //1.检测手势移动的位置是否处于下一圆的圆内。
      //2.圆内的话则画实心圆 drawPoint
      //3.已经画过实心圆的圆，无需重复检测
      for (var i = 0; i < this.restLocate.length; i++) {
        if (
          Math.abs(po.x - this.restLocate[i].x) < this.r &&
          Math.abs(po.y - this.restLocate[i].y) < this.r
        ) {
          this.lastLocate.push(this.restLocate[i]);
          this.restLocate.splice(i, 1); //画完一个圆就将该圆从restPoint数组中去掉
          break;
        }
      }
    },

    getPosition: function(e) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    },

    drawCircle: function(x, y, color) {
      this.ctx.strokeStyle = color || "#ccc";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.r, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.stroke();
    },

    drawPoint: function(color) {
      for (var i = 0; i < this.lastLocate.length; i++) {
        this.ctx.fillStyle = color || "green";
        this.ctx.beginPath();
        this.ctx.arc(
          this.lastLocate[i].x,
          this.lastLocate[i].y,
          this.r / 2,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.closePath();
      }
    },

    drawLine: function(po, color) {
      this.ctx.strokeStyle = color || "green";
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      // this.ctx.moveTo(this.lastLocate[0].x, this.lastLocate[0].y);
      for (var i = 0; i < this.lastLocate.length; i++) {
        this.ctx.lineTo(this.lastLocate[i].x, this.lastLocate[i].y);
      }
      if (po) {
        this.ctx.lineTo(po.x, po.y);
      }
      this.ctx.stroke();
      this.ctx.closePath();
    },

    createCircles: function() {
      var n = this.canvasLockType;
      this.r = this.width / (2 * n + 1) / 2;
      var count = 0;
      this.circleLocate = [];
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          var obj = {
            x: 3 * this.r + 4 * this.r * j,
            y: 3 * this.r + 4 * this.r * i,
            ind: count++
          };
          this.circleLocate.push(obj);
        }
      }

      this.resetCircles();
    },
    resetCircles: function() {
      this.ctx.clearRect(0, 0, this.height, this.width);
      for (var k = 0; k < this.circleLocate.length; k++) {
        var item = this.circleLocate[k];
        this.drawCircle(item.x, item.y);
      }
    },
    checkGesture(opts) {
      var password = "";
      var unlockPassword = localStorage.unlockPassword;
      for (var i = 0; i < this.lastLocate.length; i++) {
        password += this.lastLocate[i].ind;
      }

      if (password.length < opts.selectNum) {
        this.resetCircles();
        return false;
      }

      if (!unlockPassword) {
        if (!localStorage.password) {
          localStorage.password = password;
          this.resetCircles();
          opts.inputCallback(this);
        } else if (localStorage.password == password) {
          localStorage.unlockPassword = password;
          this.resetCircles();
          this.drawPoint("green");
          this.drawLine(null, "green");
          opts.comfirmCallback(1, this);
        } else {
          localStorage.removeItem("password");
          this.resetCircles();
          this.drawPoint("red");
          this.drawLine(null, "red");
          opts.comfirmCallback(0, this);
        }
      } else if (unlockPassword == password) {
        this.resetCircles();
        this.drawPoint("green");
        this.drawLine(null, "green");
        opts.unlockSucc(this);
      } else if (unlockPassword != password) {
        this.resetCircles();
        this.drawPoint("red");
        this.drawLine(null, "red");
        opts.unlockFail(this);
      }
    }
  },
  mounted() {
    var options = Object.assign(
      {},
      this.opts
    );
    this.initDom();
    this.createCircles();
    this.bindEvent(options);
  }
};
</script>

<style scoped>
.gesturecontent {
  margin: 0;
  width: 100%;
}

.gesturecontent canvas {
  display: block;
  background: gray;
  margin: 0 auto;
}
</style>