<template>
  <div class="dashboard-container" style="background-color: rgba(242, 242, 242, 1);height:2000px;">
<!--     <img class="pic1" :src="img" alt="bg"> -->



<!--     <div class="bg_line"></div>
<div class="allpage">
   <div class="pic">
    <div class="cube_block_a">
      <div class="tria_a"></div>
      <div class="cube_a"></div>
      <div class="dot_a"></div>
    </div>
    <div class="cube_block_b">
      <div class="tria_b"></div>
      <div class="cube_b"></div>
      <div class="dot_b"></div>
    </div>
  </div> 
  <div class="cube"></div> -->
  <div class="mark"> </div><a class="namecard" target="_blank">
    <div class="hover01"></div>
    <div class="hover02"></div>
    <div class="contact">
      <p style="font-size: 28px;">用户拥有者:<span>{{name}}</span></p>
      <p style="font-size: 20px;">管理的实验室编号为:{{roles[1]}}</p>
      <p>&nbsp;</p>
      <hr/>
      <p>程序版本1.0</p>
    </div></a>
</div>


</template>

<script>
import { mapGetters } from 'vuex'
import bg from '@/assets/bg.png'
export default {
  data() {
    return {
      img: bg
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    console.log('打印ip', localStorage.ip)
     if (this.roles[0] == 'admin') {
      // 隐藏分库管理
      $('.el-submenu')[2].hidden = true
      //隐藏申请
      $('.el-submenu')[3].hidden = true
    }

    if (this.roles[0] != 'admin') {

      $('.el-menu-item')[0].hidden = true;
      $('.el-menu-item')[3].hidden = true
      $('.el-submenu')[4].hidden = true
      $('.el-submenu')[5].hidden = true
      $('.el-submenu')[0].hidden = true
    } 
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pic1{

position: absolute;
width: 100%;

top:55%;
left:0px;

}
@charset "UTF-8";
html, body {
  margin: 0px;
  pading: 0px;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  overflow: hidden;
  font-family: "Noto Sans TC", 微軟正黑體;
  line-height: 24pt;
}

@keyframes ani1 {
  0% {
    transform: rotate3d(0, 1, 0, 180deg);
  }
  50% {
    transform: rotate3d(0, 0, 0, 180deg);
  }
  100% {
    transform: rotate3d(0, 1, 0, 180deg);
  }
}
.mark {
  width: 100%;
  height: 100%;
  font-size: 250px;
  color: rgba(0, 0, 0, 0.1);
  position: fixed;
  text-align: center;
  padding-top: 0%;
}

.bg_line {
  width: 100%;
  height: 110px;
  position: fixed;
  bottom: 0px;
  background-color: #dac08c;
}

.allpage {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 1000px;
}

a, hr {
  text-decoration: none;
  display: block;
  border-style: none;
  border-top-style: solid;
}

a:link {
  color: #a6e3e4;
  border: solid 0px;
  text-decoration: none;
}

a:visited {
  color: #fff;
  border: solid 0px;
  text-decoration: none;
}

a:active {
  color: #fff;
  text-decoration: none;
}

a:hover {
  color: #fff;
  font-weight: 500;
}

.namecard {
  cursor: pointer;
  position: relative;
  background-color: #575757;
  top: 100px;
  left: 50%;
  width: 500px;
  height: 300px;
  transform: translateX(-50%);
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  transition-duration: 0.5s;
  padding-top: 10px;
  overflow: hidden;
}
.namecard:hover {
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);
  background-color: #ede0c6;
}

.namecard:hover h1 {
  font-size: 30px;
  letter-spacing: 6px;
  color: #575757;
  font-weight: 300;
}

.namecard:hover span {
  font-size: 15px;
  letter-spacing: 3px;
  color: #575757;
  margin-left: 5px;
}

.namecard:hover h2 {
  font-size: 17px;
  letter-spacing: 2px;
  color: #575757;
  font-weight: 300;
}

.namecard:hover p {
  font-size: 13.5px;
  letter-spacing: 2px;
  color: #575757;
  font-weight: 200;
}

h1 {
  font-size: 30px;
  letter-spacing: 5px;
  color: #dac08c;
  font-weight: 300;
  transition-duration: 0.5s;
}

span {
  font-size: 15px;
  letter-spacing: 2px;
  color: #f1de9e;
  margin-left: 5px;
  transition-duration: 0.5s;
}

h2 {
  font-size: 17px;
  letter-spacing: 2px;
  color: #f1de9e;
  font-weight: 300;
  transition-duration: 0.5s;
}

p {
  font-size: 13.5px;
  letter-spacing: 2px;
  color: #fff;
  font-weight: 100;
  transition-duration: 0.5s;
}

.contact {
  position: relative;
  top: -50px;
  margin-left: 50px;
  margin-right: 50px;
}

.cube {
  width: 292px;
  height: 35px;
  background-color: #dac08c;
  transform: rotate(-90deg);
  left: 50%;
  position: fixed;
  bottom: 45px;
  transform-origin: 17px 100%;
}

.pic {
  width: 350px;
  height: 350px;
  animation: ani1 3s infinite;
  bottom: 0px;
  transform-origin: 0% 100%;
  position: fixed;
  left: 50%;
}

.cube_block_a {
  position: relative;
  top: 0%;
  left: -165px;
  transform: rotate(-90deg);
  width: 140px;
  height: 140px;
}

.cube_a {
  position: absolute;
  top: 43%;
  width: 80px;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 80px solid #dac08c;
  transition-duration: 1s;
}

.tria_a {
  position: absolute;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-bottom: 60px solid #dac08c;
  transition-duration: 1s;
}

.dot_a {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #eeeeee;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  left: 50%;
  top: 70%;
  transform: translateX(-50%) translateY(-50%);
}

.cube_block_b {
  position: relative;
  top: -40%;
  left: 25px;
  transform: rotate(-90deg);
  width: 140px;
  height: 140px;
}

.cube_b {
  position: absolute;
  top: 0%;
  width: 80px;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 80px solid #dac08c;
  transition-duration: 1s;
}

.tria_b {
  position: absolute;
  top: 57%;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-top: 60px solid #dac08c;
  transition-duration: 1s;
}

.dot_b {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #eeeeee;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  left: 50%;
  top: 30%;
  transform: translateX(-50%) translateY(-50%);
}

.hover01 {
  position: relative;
  width: 100px;
  height: 50px;
  background-color: #707070;
  top: 50px;
  left: 495px;
  transition-duration: 1.5s;
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
  border-radius: 0px;
}

.hover02 {
  position: relative;
  width: 100px;
  height: 30px;
  background-color: #777777;
  top: 64px;
  left: 495px;
  transition-duration: 1.5s;
}

.namecard:hover .hover01 {
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  width: 300px;
  height: 50px;
  background-color: #fff;
  top: 50px;
  left: -15px;
}

.namecard:hover .hover02 {
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  width: 320px;
  height: 30px;
  background-color: #dac08c;
  top: 64px;
  left: -10px;
}

</style>
