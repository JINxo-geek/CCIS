<template>
<!-- <div style="background-color: rgba(242, 242, 242, 1);"> -->
<div style="height: 850px;
    background-color: rgba(242, 242, 242, 1);">
<img class="pic" :src="img" alt="bg">
				 



        
<el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark" style="text-align: center;">
 <!--  	<img :src="searchpng" alt="searchpng" style="margin: 0 auto;height:221px"> -->
<!--    <p style= "text-align: center;">在库查询</p> -->
<!-- <p>{{search}}</p> -->
   </div
   ></el-col>
</el-row>
				
<el-row>
  <el-dialog title="信息" :visible.sync="outdialog" width='400px' v-loading="msgloading">

<el-row>
  <el-col :span="12"><div class="grid-content bg-purple-dark">
    <p>药名：{{uidtable.name}}</p>
    </div>
    </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-dark">
  <img v-if="uidtable.hascheckout==1" style="height: 211px;position: absolute;top: -44px;" class="pic-loginlogo" :src="loginlogo" alt="loginlogo">
   <img v-else style="height: 211px;position: absolute;top: -44px;" class="pic-loginlogo" :src="loginlogo2" alt="loginlogo">
    </div>
    </el-col>

</el-row>
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple"></div>
  <p>cas号：{{uidtable.cas}}</p>
  </el-col>

</el-row>
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-light">
    <p>入库日期：{{uidtable.checkinDate}}</p>
    </div>
    </el-col>

</el-row>
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-light">
    <p>调配时间日期：{{uidtable.disttime}}</p>
    </div>
    </el-col>

</el-row>
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-light">
    <p>领用时间日期：{{uidtable.usetime}}</p>
    </div>
    </el-col>

</el-row>
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-light">
    <p>仓库：{{uidtable.vender}}</p>
    </div>
    </el-col>

</el-row>
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-light">
    <p>批号：{{uidtable.serial}}</p>
    </div>
    </el-col>

</el-row>

<el-row>
  <el-col :span="24">
<p>所属实验室：{{uidtable.repo}}</p>

  </el-col>

</el-row>
<el-row>
    <el-col :span="24">
  <p>唯一码: {{uidtable.uid}}</p>

  </el-col>
</el-row>  
<el-row>
    <el-col :span="24">
 
 <el-tag v-if="uidtable.hascheckout==0" :type="primary">该药品未注销</el-tag>
 <el-tag v-else type="danger">该药品已注销</el-tag>
  </el-col>
</el-row> 
  <div slot="footer" class="dialog-footer">
    <el-button @click="outdialog = false">返 回</el-button>
    <el-button v-if="uidtable.hascheckout==0" type="danger" @click="logout()">确定注销</el-button>
    
  </div>
</el-dialog>
</el-row>


 <!--    <br/> 搜素数据表单search -->

<el-form :inline="true" :model="search" ref="ruleForm" class="demo-ruleForm" :close-on-click-modal="false" >
 <el-row  style="margin-top: 2%;" type="flex" justify="center">
 <!--    <br/> -->
  <el-col :span="24" :offset="1" type="flex" justify="center">
<!--    <el-form-item style="margin-left:200px" label="条形码" prop="cas"> -->
   <el-form-item label="CAS号" prop="cas">
    <el-input v-model="search.cas"></el-input>
  </el-form-item>
   <el-form-item label="化学品名" prop="name">
    <el-input v-model="search.name"></el-input>
  </el-form-item>
     <el-form-item  label="条形码" prop="barcode">
    <el-input v-model="search.barcode"></el-input>
  </el-form-item>
   </el-col>
  </el-row >
   <el-row  type="flex" justify="center">
  <el-col :span="24" :offset="1" type="flex" justify="center"> 
     <el-form-item  label="唯一码" prop="uid">
    <el-input v-model="search.uid"></el-input>
  </el-form-item>
  <span class="demonstration">库位</span>
     <el-select v-model="search.repo" placeholder="请选择" :disabled="true">
    <el-option
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 <el-button type="primary" @click="currentPage=1;search1()">搜索</el-button>

 <el-input v-model="logoutcode" placeholder="请扫描二维码" style="width:200px"></el-input>
 <el-button type="danger" @click="outdialogfunc()">注销</el-button>

</el-col>
 </el-row>


</el-form>



<el-row>



</el-row>
<el-dialog title="打印预览" :visible.sync="distribute" width='320px'>
<el-row>

    <el-card  v-loading="jia" :body-style="{ padding: '0px' }" shadow="hover" >
      
      <div style="padding: 14px;">
      
        <div class="bottom clearfix">
         <div id="print" style="display:flex;">
    <img id="image" src="" />
    <div style="line-height: 0.05;height: 100px;
    width: 175px;    ">

    <p style="margin-top: 8px;font-weight: bolder;font-size:14px">{{printname}}</p>
    <p style="font-weight: bolder;">入库时间：</p>
    <p style="font-size: 11.7px;">{{printdate}}</p>
    <p style="font-weight: bolder;">领用时间：</p>
    <p style="font-size: 11.7px;">{{printtime}}</p>
    <p style="font-weight: bolder;">码值：<p>
    <p style="font-size: 11.7px;">{{printuid}}</p>
    </div>
</div>


<el-col :span="8" :offset="8" >
          <el-button type="text" round @click="funprint()" class="button">确认打印</el-button>
</el-col>          
        </div>
      </div>
    </el-card>
 
</el-row>
</el-dialog>

  <el-table :data="tableDataEnd" border style="width: 100%" v-loading="searchloading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    
        <el-table-column type="selection" width="55">
    </el-table-column>
          <el-table-column sortable  prop="uid" label="唯一码" width="120">
    </el-table-column>

<!--      <el-table-column
      prop="hascheckout"
      label="状态"
      width="100"
      :filters="[{ text: '未注销', value: 0 }, { text: '注销', value: 1 }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.hascheckout === 1 ? 'primary' : 'success'"
          disable-transitions>{{scope.row.hascheckout}}</el-tag>
      </template>
    </el-table-column> -->

        <el-table-column sortable prop="cas" label="cas号" width="120">
    </el-table-column>
    <el-table-column sortable prop="usetime" label="领用时间" width="120">
    </el-table-column>
        <el-table-column sortable prop="checkinDate" label="入库时间" width="120">
    </el-table-column>
            <el-table-column sortable prop="barcode" label="条形码" width="120">
    </el-table-column>

        <el-table-column sortable prop="name" label="药品名" width="120">
    </el-table-column>
            <el-table-column sortable prop="repo" label="实验室" width="120">
    </el-table-column> 
        <el-table-column sortable prop="property" label="性质" width="120">
    </el-table-column>
        <el-table-column sortable prop="concentration" label="浓度(%)" width="120">
    </el-table-column>
        <el-table-column sortable prop="level" label="级号" width="120">
    </el-table-column>
        <el-table-column sortable prop="spec" label="规格" width="120">
    </el-table-column>
            <el-table-column sortable prop="vender" label="厂家" width="120">
    </el-table-column>
        <el-table-column sortable prop="serial" label="批号" width="120">
         </el-table-column>

    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="disthandleClick(scope.row);distribute=true" type="primary" size="small">打印</el-button>
   
        </template>
    </el-table-column>
    </el-table>
   
 <el-row style="z-index=99;">
 <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[10, 20, 30, 40]"
  :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalItems">
 </el-pagination>

 </el-row>

 <el-row>
   
  <el-col :span="24"><div class="grid-content bg-purple-dark">
  <el-row style="visibility: hidden">
  <el-col :span="24">
    <div class="grid-content bg-purple-dark" style="text-align: center;">


    <input type="text" id="txt">
    <div id="code"></div>

    </div>
   </el-col>
</el-row>
    </div></el-col>
</el-row>

</div>

</template>
<script>
import { mapGetters } from 'vuex'
import searchpng from '@/assets/search.png'
import loginlogo from '@/assets/yizhuxiao.png'
import loginlogo2 from '@/assets/zaiku.png'
import bg from '@/assets/bg.png'
export default {
  data() {
    return {

      msgloading: false,
      searchloading: false,
      img: bg,
      // 图片
      loginlogo,
      loginlogo2,
      // 一物一码信息
      uidtable: [],
      // 注销确认
      outdialog: false,
      // 注销
      logoutcode: '',
      // 打印信息
      printname: '',
      printdate: '',
      printtime: '',
      printuid: '',

      // 二维码加载
      jia: true,
      // 表格数据url
      newquery: '',
      // 控制调配表单提交出现和消失,调配接口
      distribute: false,
      disturl: '',
      // 搜索数据
      url: '',
      searchpng,
      search: {
        name: '',
        cas: '',
        barcode: '',
        repo: 9999,
        uid: ''
      },
      // 调配表单
      dist: {
        name: '',
        number: ''
      },

      // 远程库位
      options4: [],
      list: [],
      loading: false,
      states: ['dd', 'aa'],
      // 表格内容
      ruleForm: {
        cas: '',
        name: '',
        wxx: '',
        nd: ''
      },
      content: '',
      // 过滤表格
      tableDataBegin: [

      ],

      tableDataName: '',
      tableDataEnd: [],
      tabletemp: [],
      currentPage: 1,
      // 每页的条数
      pageSize: 10,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      temp: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    var str = this.roles[1]
    this.search.repo = parseInt(str)

    // 在创建的时候获取远程库位
    this.axios.get(localStorage.ip+'/repo/getAll').then(body => {
      this.temp = body.data.repos

      /*   console.log(this.temp[0]);
  console.log(this.temp[0].name); */
      var temparry = []
      console.log('数组长度', this.temp.length)
      for (var i = this.temp.length - 1; i > -1; i--) {
        console.log(this.temp[0].name)
        console.log('i的值', i)

        console.log('遍历name元素', this.temp[i].name)
        console.log('遍历id元素', this.temp[i].id)
        var jsontemp = {}
        jsontemp.value = this.temp[i].id
        jsontemp.label = this.temp[i].name
        temparry.push(jsontemp)
      }
      // 删除数组的第一个元素
      temparry.shift()
      this.options4 = temparry
    })

    //
    this.search1();
    //
    // -----------------------------------------------------------------------
    // Eros Fratini - eros@recoding.it
    // jqprint 0.3
    //
    // - 19/06/2009 - some new implementations, added Opera support
    // - 11/05/2009 - first sketch
    //
    // Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
    // requires jQuery 1.3.x
    //
    // Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
    // ------------------------------------------------------------------------

    (function($) {
      var opt

      $.fn.jqprint = function(options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options)

        var $element = (this instanceof jQuery) ? this : $(this)

        if (opt.operaSupport && $.browser.opera) {
          var tab = window.open('', 'jqPrint-preview')
          tab.document.open()

          var doc = tab.document
        } else {
          var $iframe = $('<iframe  />')

          if (!opt.debug) { $iframe.css({ position: 'absolute', width: '0px', height: '0px', left: '-600px', top: '-600px' }) }

          $iframe.appendTo('body')
          var doc = $iframe[0].contentWindow.document
        }

        if (opt.importCSS) {
          if ($('link[media=print]').length > 0) {
            $('link[media=print]').each(function() {
              doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr('href') + "' media='print' />")
            })
          } else {
            $('link').each(function() {
              doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr('href') + "' />")
            })
          }
        }

        if (opt.printContainer) { doc.write($element.outer()) } else { $element.each(function() { doc.write($(this).html()) }) }

        doc.close();

        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus()
        setTimeout(function() { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close() } }, 1000)
      }

      $.fn.jqprint.defaults = {
        debug: true,
        importCSS: true,
        printContainer: true,
        operaSupport: true
      }

      // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
      jQuery.fn.outer = function() {
        return $($('<div></div>').html(this.clone())).html()
      }
    })(jQuery);

    //
    (function(r) {
      r.fn.qrcode = function(h) {
        var s; function u(a) { this.mode = s; this.data = a } function o(a, c) { this.typeNumber = a; this.errorCorrectLevel = c; this.modules = null; this.moduleCount = 0; this.dataCache = null; this.dataList = [] } function q(a, c) { if (void 0 == a.length) throw Error(a.length + '/' + c); for (var d = 0; d < a.length && a[d] == 0;)d++; this.num = Array(a.length - d + c); for (var b = 0; b < a.length - d; b++) this.num[b] = a[b + d] } function p(a, c) { this.totalCount = a; this.dataCount = c } function t() { this.buffer = []; this.length = 0 }u.prototype = { getLength: function() { return this.data.length },
          write: function(a) { for (var c = 0; c < this.data.length; c++)a.put(this.data.charCodeAt(c), 8) } }; o.prototype = { addData: function(a) { this.dataList.push(new u(a)); this.dataCache = null }, isDark: function(a, c) { if (a < 0 || this.moduleCount <= a || c < 0 || this.moduleCount <= c) throw Error(a + ',' + c); return this.modules[a][c] }, getModuleCount: function() { return this.moduleCount }, make: function() {
          if (this.typeNumber < 1) {
            for (var a = 1, a = 1; a < 40; a++) {
              for (var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t(), b = 0, e = 0; e < c.length; e++)b += c[e].dataCount
              for (e = 0; e < this.dataList.length; e++)c = this.dataList[e], d.put(c.mode, 4), d.put(c.getLength(), j.getLengthInBits(c.mode, a)), c.write(d); if (d.getLengthInBits() <= 8 * b) break
            } this.typeNumber = a
          } this.makeImpl(!1, this.getBestMaskPattern())
        }, makeImpl: function(a, c) {
          this.moduleCount = 4 * this.typeNumber + 17; this.modules = Array(this.moduleCount); for (var d = 0; d < this.moduleCount; d++) { this.modules[d] = Array(this.moduleCount); for (var b = 0; b < this.moduleCount; b++) this.modules[d][b] = null } this.setupPositionProbePattern(0, 0); this.setupPositionProbePattern(this.moduleCount -
7, 0); this.setupPositionProbePattern(0, this.moduleCount - 7); this.setupPositionAdjustPattern(); this.setupTimingPattern(); this.setupTypeInfo(a, c); this.typeNumber >= 7 && this.setupTypeNumber(a); this.dataCache == null && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)); this.mapData(this.dataCache, c)
        }, setupPositionProbePattern: function(a, c) {
          for (var d = -1; d <= 7; d++) {
            if (!(a + d <= -1 || this.moduleCount <= a + d)) {
              for (var b = -1; b <= 7; b++) {
                c + b <= -1 || this.moduleCount <= c + b || (this.modules[a + d][c + b] =
d >= 0 && d <= 6 && (b == 0 || b == 6) || b >= 0 && b <= 6 && (d == 0 || d == 6) || d >= 2 && d <= 4 && b >= 2 && b <= 4 ? !0 : !1)
              }
            }
          }
        }, getBestMaskPattern: function() { for (var a = 0, c = 0, d = 0; d < 8; d++) { this.makeImpl(!0, d); var b = j.getLostPoint(this); if (d == 0 || a > b)a = b, c = d } return c }, createMovieClip: function(a, c, d) { a = a.createEmptyMovieClip(c, d); this.make(); for (c = 0; c < this.modules.length; c++) for (var d = 1 * c, b = 0; b < this.modules[c].length; b++) { var e = 1 * b; this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d), a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill()) } return a },
        setupTimingPattern: function() { for (var a = 8; a < this.moduleCount - 8; a++) this.modules[a][6] == null && (this.modules[a][6] = a % 2 == 0); for (a = 8; a < this.moduleCount - 8; a++) this.modules[6][a] == null && (this.modules[6][a] = a % 2 == 0) }, setupPositionAdjustPattern: function() { for (var a = j.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++) for (var d = 0; d < a.length; d++) { var b = a[c], e = a[d]; if (this.modules[b][e] == null) for (var f = -2; f <= 2; f++) for (var i = -2; i <= 2; i++) this.modules[b + f][e + i] = f == -2 || f == 2 || i == -2 || i == 2 || f == 0 && i == 0 ? !0 : !1 } }, setupTypeNumber: function(a) {
          for (var c =
j.getBCHTypeNumber(this.typeNumber), d = 0; d < 18; d++) { var b = !a && (c >> d & 1) == 1; this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b } for (d = 0; d < 18; d++)b = !a && (c >> d & 1) == 1, this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
        }, setupTypeInfo: function(a, c) {
          for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; b < 15; b++) { var e = !a && (d >> b & 1) == 1; b < 6 ? this.modules[b][8] = e : b < 8 ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e } for (b = 0; b < 15; b++) {
            e = !a && (d >> b & 1) == 1, b < 8 ? this.modules[8][this.moduleCount -
b - 1] = e : b < 9 ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e
          } this.modules[this.moduleCount - 8][8] = !a
        }, mapData: function(a, c) { for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1; i > 0; i -= 2) for (i == 6 && i--; ;) { for (var g = 0; g < 2; g++) if (this.modules[b][i - g] == null) { var n = !1; f < a.length && (n = (a[f] >>> e & 1) == 1); j.getMask(c, b, i - g) && (n = !n); this.modules[b][i - g] = n; e--; e == -1 && (f++, e = 7) }b += d; if (b < 0 || this.moduleCount <= b) { b -= d; d = -d; break } } } }; o.PAD0 = 236; o.PAD1 = 17; o.createData = function(a, c, d) {
          for (var c = p.getRSBlocks(a,
              c), b = new t(), e = 0; e < d.length; e++) { var f = d[e]; b.put(f.mode, 4); b.put(f.getLength(), j.getLengthInBits(f.mode, a)); f.write(b) } for (e = a = 0; e < c.length; e++)a += c[e].dataCount; if (b.getLengthInBits() > 8 * a) throw Error('code length overflow. (' + b.getLengthInBits() + '>' + 8 * a + ')'); for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); b.getLengthInBits() % 8 != 0;)b.putBit(!1); for (;!(b.getLengthInBits() >= 8 * a);) { b.put(o.PAD0, 8); if (b.getLengthInBits() >= 8 * a) break; b.put(o.PAD1, 8) } return o.createBytes(b, c)
        }; o.createBytes = function(a, c) {
          for (var d =
0, b = 0, e = 0, f = Array(c.length), i = Array(c.length), g = 0; g < c.length; g++) { var n = c[g].dataCount, h = c[g].totalCount - n, b = Math.max(b, n), e = Math.max(e, h); f[g] = Array(n); for (var k = 0; k < f[g].length; k++)f[g][k] = 255 & a.buffer[k + d]; d += n; k = j.getErrorCorrectPolynomial(h); n = (new q(f[g], k.getLength() - 1)).mod(k); i[g] = Array(k.getLength() - 1); for (k = 0; k < i[g].length; k++)h = k + n.getLength() - i[g].length, i[g][k] = h >= 0 ? n.get(h) : 0 } for (k = g = 0; k < c.length; k++)g += c[k].totalCount; d = Array(g); for (k = n = 0; k < b; k++) {
            for (g = 0; g < c.length; g++) {
              k < f[g].length &&
(d[n++] = f[g][k])
            }
          } for (k = 0; k < e; k++) for (g = 0; g < c.length; g++)k < i[g].length && (d[n++] = i[g][k]); return d
        }; s = 4; for (var j = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52,
            78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function(a) { for (var c = a << 10; j.getBCHDigit(c) - j.getBCHDigit(j.G15) >= 0;)c ^= j.G15 << j.getBCHDigit(c) - j.getBCHDigit(j.G15); return (a << 10 | c) ^ j.G15_MASK }, getBCHTypeNumber: function(a) {
            for (var c = a << 12; j.getBCHDigit(c) -
j.getBCHDigit(j.G18) >= 0;)c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18); return a << 12 | c
          }, getBCHDigit: function(a) { for (var c = 0; a != 0;)c++, a >>>= 1; return c }, getPatternPosition: function(a) { return j.PATTERN_POSITION_TABLE[a - 1] }, getMask: function(a, c, d) {
            switch (a) {
              case 0:return (c + d) % 2 == 0; case 1:return c % 2 == 0; case 2:return d % 3 == 0; case 3:return (c + d) % 3 == 0; case 4:return (Math.floor(c / 2) + Math.floor(d / 3)) % 2 == 0; case 5:return c * d % 2 + c * d % 3 == 0; case 6:return (c * d % 2 + c * d % 3) % 2 == 0; case 7:return (c * d % 3 + (c + d) % 2) % 2 == 0; default:throw Error('bad maskPattern:' +
a)
            }
          }, getErrorCorrectPolynomial: function(a) { for (var c = new q([1], 0), d = 0; d < a; d++)c = c.multiply(new q([1, l.gexp(d)], 0)); return c }, getLengthInBits: function(a, c) {
            if (c >= 1 && c < 10) switch (a) { case 1:return 10; case 2:return 9; case s:return 8; case 8:return 8; default:throw Error('mode:' + a) } else if (c < 27) switch (a) { case 1:return 12; case 2:return 11; case s:return 16; case 8:return 10; default:throw Error('mode:' + a) } else if (c < 41) {
              switch (a) {
                case 1:return 14; case 2:return 13; case s:return 16; case 8:return 12; default:throw Error('mode:' +
a)
              }
            } else throw Error('type:' + c)
          }, getLostPoint: function(a) {
            for (var c = a.getModuleCount(), d = 0, b = 0; b < c; b++) for (var e = 0; e < c; e++) { for (var f = 0, i = a.isDark(b, e), g = -1; g <= 1; g++) if (!(b + g < 0 || c <= b + g)) for (var h = -1; h <= 1; h++)e + h < 0 || c <= e + h || g == 0 && h == 0 || i == a.isDark(b + g, e + h) && f++; f > 5 && (d += 3 + f - 5) } for (b = 0; b < c - 1; b++) for (e = 0; e < c - 1; e++) if (f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e + 1) && f++, a.isDark(b + 1, e + 1) && f++, f == 0 || f == 4)d += 3; for (b = 0; b < c; b++) {
              for (e = 0; e < c - 6; e++) {
                a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e +
2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40)
              }
            } for (e = 0; e < c; e++) for (b = 0; b < c - 6; b++)a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40); for (e = f = 0; e < c; e++) for (b = 0; b < c; b++)a.isDark(b, e) && f++; a = Math.abs(100 * f / c / c - 50) / 5; return d + 10 * a
          } }, l = { glog: function(a) { if (a < 1) throw Error('glog(' + a + ')'); return l.LOG_TABLE[a] }, gexp: function(a) { for (;a < 0;)a += 255; for (;a >= 256;)a -= 255; return l.EXP_TABLE[a] }, EXP_TABLE: Array(256),
            LOG_TABLE: Array(256) }, m = 0; m < 8; m++)l.EXP_TABLE[m] = 1 << m; for (m = 8; m < 256; m++)l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m - 6] ^ l.EXP_TABLE[m - 8]; for (m = 0; m < 255; m++)l.LOG_TABLE[l.EXP_TABLE[m]] = m; q.prototype = { get: function(a) { return this.num[a] }, getLength: function() { return this.num.length }, multiply: function(a) { for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++) for (var b = 0; b < a.getLength(); b++)c[d + b] ^= l.gexp(l.glog(this.get(d)) + l.glog(a.get(b))); return new q(c, 0) }, mod: function(a) {
          if (this.getLength() - a.getLength() <
0) return this; for (var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++)d[b] = this.get(b); for (b = 0; b < a.getLength(); b++)d[b] ^= l.gexp(l.glog(a.get(b)) + c); return (new q(d, 0)).mod(a)
        } }; p.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27],
          [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146,
            116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15,
            43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45,
            3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19,
            55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10,
            45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]]; p.getRSBlocks = function(a, c) { var d = p.getRsBlockTable(a, c); if (void 0 == d) throw Error('bad rs block @ typeNumber:' + a + '/errorCorrectLevel:' + c); for (var b = d.length / 3, e = [], f = 0; f < b; f++) for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0; l < h; l++)e.push(new p(g, j)); return e }; p.getRsBlockTable = function(a, c) {
          switch (c) {
            case 1:return p.RS_BLOCK_TABLE[4 * (a - 1) + 0]; case 0:return p.RS_BLOCK_TABLE[4 * (a - 1) + 1]; case 3:return p.RS_BLOCK_TABLE[4 *
(a - 1) + 2]; case 2:return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
          }
        }; t.prototype = { get: function(a) { return (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1) == 1 }, put: function(a, c) { for (var d = 0; d < c; d++) this.putBit((a >>> c - d - 1 & 1) == 1) }, getLengthInBits: function() { return this.length }, putBit: function(a) { var c = Math.floor(this.length / 8); this.buffer.length <= c && this.buffer.push(0); a && (this.buffer[c] |= 128 >>> this.length % 8); this.length++ } }; typeof h === 'string' && (h = { text: h }); h = r.extend({}, { render: 'canvas', width: 256, height: 256, typeNumber: -1,
          correctLevel: 2, background: '#ffffff', foreground: '#000000' }, h); return this.each(function() {
          var a; if (h.render == 'canvas') {
            a = new o(h.typeNumber, h.correctLevel); a.addData(h.text); a.make(); var c = document.createElement('canvas'); c.width = h.width; c.height = h.height; for (var d = c.getContext('2d'), b = h.width / a.getModuleCount(), e = h.height / a.getModuleCount(), f = 0; f < a.getModuleCount(); f++) {
              for (var i = 0; i < a.getModuleCount(); i++) {
                d.fillStyle = a.isDark(f, i) ? h.foreground : h.background; var g = Math.ceil((i + 1) * b) - Math.floor(i * b),
                  j = Math.ceil((f + 1) * b) - Math.floor(f * b); d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
              }
            }
          } else {
            a = new o(h.typeNumber, h.correctLevel); a.addData(h.text); a.make(); c = r('<table></table>').css('width', h.width + 'px').css('height', h.height + 'px').css('border', '0px').css('border-collapse', 'collapse').css('background-color', h.background); d = h.width / a.getModuleCount(); b = h.height / a.getModuleCount(); for (e = 0; e < a.getModuleCount(); e++) {
              f = r('<tr></tr>').css('height', b + 'px').appendTo(c); for (i = 0; i < a.getModuleCount(); i++) {
                r('<td></td>').css('width',
                  d + 'px').css('background-color', a.isDark(e, i) ? h.foreground : h.background).appendTo(f)
              }
            }
          }a = c; jQuery(a).appendTo(this)
        })
      }
    })(jQuery)
  },

  created() {
    this.totalItems = this.tableDataBegin.length
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index])
      }
    } else {
      this.tableDataEnd = this.tableDataBegin
    }
  },

  methods: {
    // 状态位
    filterTag(value, row) {
      return row.hascheckout === value
    },

    // 注销确认接口
    outdialogfunc() {
      this.outdialog = true

      var urlout = localStorage.ip+'/query?uid=' + this.logoutcode
      this.axios.get(urlout).then(body => {
        console.log(body.data)
        this.uidtable = body.data.data[0]
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 注销
    logout() {
      this.msgloading = true
      var logouturl = localStorage.ip+'/checkout?uid=' + this.logoutcode
      this.axios.get(logouturl).then(body => {
        console.log(body.data)
        this.msgloading = false

        this.$message({
          message: '注销成功',
          type: 'success'
        })
        this.uidtable.hascheckout = 1
        this.axios.get(this.url).then(body => {
          console.log('刷新数据')
          this.tableDataEnd = body.data.data
        })
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 打印
    funprint() {
      $('#print').jqprint({
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: false
      })
    },

    disthandleClick(row) {
      this.jia = true
      console.log('药品名', row.name)
      console.log('入库时间', row.checkinDate)
      console.log('领用时间', row.usetime)
      console.log('一物一码', row.uid)

      // 设置打印信息
      this.printname = row.name
      this.printdate = row.checkinDate
      this.printtime = row.usetime
      this.printuid = row.uid

      /* this.disturl='http://139.199.170.130:2333/distribute?barcode='+row.barcode+'&number='+this.dist.nubmer+'&repo='+this.dist.name;
this.axios.get(this.disturl).then(body => {console.log(body.data);
console.log("接受成功");
$("#shuaxin").click();
}).catch(function(error) {
console.log(error);
}); */
      $('#code').empty()
      var str = row.uid
      $('#code').qrcode({
        render: 'canvas', // table方式
        width: 110, // 寬度
        height: 110, // 高度
        text: str // 任意內容
      })

      var canvas = document.getElementsByTagName('canvas')[0] // get canvas element
      console.log('cnavas', canvas)

      // var img = $("#image");
      // var canvas = $("canvas");
      // 需要做一个延时处理,不然不生效
      var that = this

      setTimeout(function() {
        $('#image').attr('src', canvas.toDataURL())
        that.jia = false
      }, 1000)
    },

    /*
repotrans(){
  //进行库位和实验室名转换
  console.log("进行转换");
for(var i=this.temp.length-1;i>-1;i--)
  {
    console.log('远程实验室名',this.temp[i].name);
    console.log('本地搜索名',this.search.repo);

    if(this.temp[i].name == this.search.repo)
  {
    console.log("实验室名",this.search.repo,"and", this.temp[i].id ,'进行相互转换')
    this.search.repo  = this.temp[i].id;
    }

  }

}, */

    search1() {
      this.searchloading = true
      // 条件筛选
      this.url = localStorage.ip+'/newquery?repo=' + this.search.repo + '&cas=' + this.search.cas + '&barcode=' + this.search.barcode + '&name=' + this.search.name + '&size=' + this.pageSize + '&start=' + this.currentPage + '&uid=' + this.search.uid
      this.axios.get(this.url).then(body => {
        this.tableDataEnd = body.data.data
        this.totalItems = body.data.total
        this.searchloading = false
      })
    },

    // 前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    // 用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tabletemp = this.tableDataEnd
      this.tableDataBegin = this.tableDataEnd
      this.tableDataEnd = []
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableDataBegin.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      // 页面数据改变重新统计数据数量和当前页
      this.currentPage = 1
      this.totalItems = this.filterTableDataEnd.length
      // 渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      // 页面初始化数据需要判断是否检索过
      this.flag = true
    },
    openData() {
      this.tableDataEnd = this.tabletemp
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      // 需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataEnd)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    }, // 组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize
      const to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
      this.search1()
    },

    // 远程库位搜索的方法
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options4 = []
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.pic{

position: absolute;
width: 108%;
left:-102px;
top:5%;
}


</style>