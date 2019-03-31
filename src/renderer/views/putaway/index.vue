<template>
  <div class="app-container" style="height: 850px;
    background-color: rgba(242, 242, 242, 1);">

 <img class="pic" :src="img" alt="bg">

<el-button id="dialog" type="text" @click="open()" style="visibility: hidden">打开嵌套表单的 Dialog</el-button>
<el-dialog width="600px" title="填写药品信息" :visible.sync="dialogFormVisible" @close="close()">
  
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :close-on-click-modal="false" >
  <el-form-item label="cas号" prop="cas">
    <el-input v-model="ruleForm.cas"></el-input>
  </el-form-item>
    <el-form-item label="化学品名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="入库数量" prop="number">
    <el-input type="number" v-model="ruleForm.number"></el-input>
  </el-form-item>

      <el-form-item label="入库时间" required>
    <el-col :span="11">
      <el-form-item prop="date">
        <el-date-picker  format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    
  </el-form-item>
    <el-form-item label="浓度(%)" prop="concentration">
    <el-input v-model="ruleForm.concentration"></el-input>
  </el-form-item>
      <el-form-item label="规格" prop="spec">
    <el-input v-model="ruleForm.spec"></el-input>
  </el-form-item>
  <el-form-item label="级号" prop="level">
			  <el-select v-model="ruleForm.level" placeholder="请选择试剂级别">
      <el-option label="GR" value="GR"></el-option>
      <el-option label="AR" value="AR"></el-option>
			<el-option label="CP" value="CP"></el-option>
			<el-option label="LR" value="LR"></el-option>
			  </el-select>
  </el-form-item>
	  <el-form-item label="化学品性质" prop="property">
<!--   <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group> -->
	    <el-checkbox-group v-model="ruleForm.property">
      <el-checkbox label="剧毒" name="剧毒"></el-checkbox>
      <el-checkbox label="易燃" name="易燃"></el-checkbox>
      <el-checkbox label="易制爆" name="易制爆"></el-checkbox>
      <el-checkbox label="危化品" name="危化品"></el-checkbox>
			<el-checkbox label="普通试剂" name="普通试剂"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
	
    <el-form-item label="厂家" prop="vender">
    <el-input v-model="ruleForm.vender"></el-input>
  </el-form-item>
    <el-form-item label="批号" prop="serial">
    <el-input v-model="ruleForm.serial"></el-input>
  </el-form-item>
</el-form>




  <div slot="footer" class="dialog-footer">
    <el-button @click="fun1">提交</el-button>
    <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
  </div>
</el-dialog>
		<div>
<el-row>
	<el-col :span="24">
			<div style="width: 222px;margin: 0 auto">
<img :src="shaoma" alt="shaoma">
			<h3>请确认扫码枪已连接好</h3>
			<h3>连接成功，即可开始扫码</h3>
			</div>


			</el-col>
</el-row>

<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">			<div>
				<input v-model="msg" id="barCode" value="" style="text-align:center;" type="text" placeholder="请扫描二维码">
				<div id="info" style="width: 500px;margin: 0 auto">
				<h3>注:如若条形码受损，请手动输入条形码后按回车键确认输入</h3>
				</div>
			</div></div></el-col>
</el-row>


			<div>
				<div id="info" style="width: 500px;margin: 0 auto">
					<el-button id="goon" style="visibility: hidden">  继续扫码  </el-button>
				</div>
			</div>




		</div>
  </div>
</template>

<script>
import shaoma from '@/assets/shaoma.png'
import bg from '@/assets/bg.png'

export default {
  data() {
    return {
      img: bg,
      barcode: '',
      shaoma,
			 ruleForm: {
        cas: '',
        name: '',
        date: '',
        concentration: '',
        spec: '',
        property: [],
        level: '',
        number: '',
        vender: '',
        serial: ''

      },
				 rules: {
					 number: [{
          required: true, message: '不能为空'
					 }],
        	cas: [
          { required: true, message: '不能为空' }
        ],
        name: [
          { required: true, message: '请输入化学品名称', trigger: 'blur' }

        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],

        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        sl: [
          { required: true, type: 'string', required: true, message: '请输入数量' }
        ]
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      msg: '',
      list: null,
      listLoading: true,
      url: '',
      body2: ''
    }
  },
  created() {

  },
  methods: {
    open() {
      this.dialogFormVisible = true
      this.barcode = this.msg
      // 入库

      this.url = localStorage.ip+'/checkin?barcode=' + this.barcode

 	this.axios.get(this.url).then(body => {
		 console.log('打印接受的数据：', body.data.data)
		 if ($.isEmptyObject(body.data.data)) {
          console.log('后台无数据')
          var dt = new Date()
          var month = dt.getMonth() + 1
          var nowdate = dt.getFullYear() + '-' + month + '-' + dt.getDate()
          this.ruleForm.date = nowdate
          this.ruleForm.cas = ''
          this.ruleForm.name = '',
          this.ruleForm.concentration = ''
          this.ruleForm.spec = ''
          this.ruleForm.property = []
          this.ruleForm.level = ''
          this.ruleForm.number = ''
          this.ruleForm.vender = ''
          this.ruleForm.serial = ''
		 } else {
          this.ruleForm = body.data.data
          this.ruleForm.number = 0
 	var dt = new Date()
          var month = dt.getMonth() + 1
          var nowdate = dt.getFullYear() + '-' + month + '-' + dt.getDate()
          this.ruleForm.date = nowdate
		 }
      })
    },

    close() {
      this.dialogFormVisible = false
      $('#goon').click()
    },

    fun1() {
      $('#goon').click()

      this.msg = ''

      console.log('开始入库', this.url)
      /* 		this.axios.get(url).then(body => {console.log(body.data);
		this.ruleForm = body.data;
		}); */
      console.log(this.ruleForm)
      this.axios.post(this.url, this.ruleForm).then(body => { console.log(body.data)
     if(body.data.code!=20000){
     this.$message({
        type: 'warning',
        message: body.data.msg
		  })
     }else{
            this.$message({
        type: 'success',
        message: "入库成功"
		  })
     }
      
      })

      this.dialogFormVisible = false
      console.log(this.ruleForm)
    }
  },
  mounted: function() {
		 var layer = this.$layer// vue-layer和这个代码兼容
    this.dialogFormVisible;
		 // 在下面的匿名函数中this指向的不是vue的实例，所以访问不到dialogFormVisible，我们将this.dialogFormVisible赋值给一个变量

    (function($) {
      var barcode = {

        listenerObj: null,
        letter: false,
        number: true,
        check: true, // 是否禁止手动输入

        oneKeyTime: '',
        /* 一次按键时间间隔 */
        twoKeyTime: '',
        /* 两次按键时间间隔 */
        keyDownTime: '',
        /* 键按下的时间    */
        barcodeLen: 13,
        /* 条形码长度      */
        spanTime: 70,
        /* 一次按键按下到释放的时间间隔 */
        zerokeyVal: 48,
        /* 零的key值      */
        ninekeyVal: 57,
        /* 数字9的key值   */
        akeyVal: 65,
        /* a的key值      */
        zkeyVal: 90,
        /* z的key值      */

        show: function() {},

        checkHandInput: function() {
          console.log(this.oneKeyTime)

          if ((this.oneKeyTime > this.spanTime)) {
            return true
          } else {
            return false
          }
        },
        on_key_down: function() {
          var that = this

          this.listenerObj.keydown(function(e) {
            if (e.which !== 13 && !(that.in_range(e.which))) {
              $(that.listenerObj).val('')
              return
            }
            var d = new Date()
            var curTime = parseInt(d.getTime())
            if (that.keyDownTime !== '' && that.keyDownTime !== NaN) {
              that.twoKeyTime = curTime - that.keyDownTime
            }
            that.keyDownTime = curTime
          })
        },
        on_key_up: function() {
          var that = this
          this.listenerObj.keyup(function(e) {
            var d = new Date()
            var keyUpTime = d.getTime()

            that.oneKeyTime = parseInt(keyUpTime) - parseInt(that.keyDownTime)

            var isHand = that.checkHandInput()

            if (that.check && isHand && that.in_range(e.which)) {
              layer.msg('禁止手动输入')
              $(that.listenerObj).val('')
            }
          })
        },
        on_key_press: function() {
          var that = this
          this.listenerObj.keypress(function(e) {
            if (e.which == 13 && that.check_barcode()) {
              that.createListEl()
            }
          })
        },
        check_barcode: function() {
          var code = $(this.listenerObj).val()

          if (code.length !== this.barcodeLen) {
            $(this.listenerObj).val('').focus()
            layer.msg('条形码不合法')
          } else {
            return true
          }
        },
        // 判断按下的键是否在字母加数字这个范围
        in_range: function(key) {
          var isLegal = false
          if (this.number) {
            isLegal = this.is_number(key)
          }
          if (this.letter) {
            isLegal = this.is_letter(key)
          }
          if (this.number && this.letter) {
            isLegal = !!((this.is_number || this.is_letter))
          }
          return isLegal
        },
        is_number: function(key) {
          if (key > this.ninekeyVal || key < this.zerokeyVal) {
            return false
          } else {
            return true
          }
        },
        is_letter: function(key) {
          if (key > this.zkeyVal || key < this.akeyVal) {
            return false
          } else {
            return true
          }
        },
        check_network: function() {
          return !!(navigator.onLine)
        },
        createListEl: function() {
          if (typeof this.show === 'function') {
            this.show(this.listenerObj.val())
            /* 	layer.msg('扫描成功',{time:1000}); */
          } else {
            layer.msg('no callback function')
          }
          this.listenerObj.val('').focus()
        },
        keepFocusInput: function() {
          this.listenerObj.blur(function() {
            var that = $(this)
            setTimeout(function() {
              that.focus().select()
            }, 300)
          })
        },
        startListen: function(listenerObj, settings) {
          for (var member in settings) {
            if (typeof barcode[member] !== 'undefined') {
              barcode[member] = settings[member]
            }
          }
          barcode.listenerObj = listenerObj

          this.on_key_down()
          this.on_key_up()
          this.on_key_press()
          this.keepFocusInput()
          this.listenerObj.focus().select()
        }

      }
      $.fn.startListen = function(options) {
        var settings = $.extend({
          barcodeLen: 13,
          letter: false, // 条码不包含字母
          number: true // 条码为数字
        }, options)
        barcode.startListen(this, settings)
      }
    })(jQuery)
    var valmsg
    $('#barCode').startListen({
      barcodeLen: 13,
      letter: true,
      number: true,
      check: false,
      /* 		show : function(code){
					layer.msg(code);
				} */
      show: function(code) {
        /* layer.msg("扫码成功"); */
        $('#dialog').click()
        layer.msg(code)
        valmsg = code
        console.log(valmsg)
        $('#barCode').hide()
      }
    })

    $('#goon').click(function() {
      $('#barCode').show()
      setTimeout(function() {
        $('#barCode').focus().select()
	 }, 300)
    })
  }
}
</script>

<style scoped>
#body{
	height: 892px;
    background: rgba(242, 242, 242, 1);
}
	#barCode {
		width: 500px;height: 45px;border-radius: 1px solid #ddd;
		display: block;
		margin : 0 auto;
		padding: 0px 5px;
		outline: none;
	}

.pic{

position: absolute;
width: 108%;
left:-102px;
top:6%;
}

</style>
