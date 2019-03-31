<template>
  <div style="height: 850px;
    background-color: rgba(242, 242, 242, 1);">
<img class="pic" :src="img" alt="bg">
<el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark" style="text-align: center;">
  	<img :src="searchpng" alt="searchpng" style="margin: 0 auto;height:221px">
<!--    <p style= "text-align: center;">调配界面</p> -->
   
   </div
   ></el-col>
</el-row>

<!-- <el-row type="flex" justify="center">


<el-form :inline="true" :model="search" ref="ruleForm" class="demo-ruleForm" :close-on-click-modal="false" >


   <el-col><div class="grid-content bg-purple-light">

         <el-form-item label="CAS号" prop="cas">
    <el-input v-model="search.cas" style="width:13vw" placeholder="请输入cas号"></el-input>
  </el-form-item>
   <el-form-item label="化学品名" prop="name">
    <el-input v-model="search.name" style="width:13vw" placeholder="请输入化学品名"></el-input>
  </el-form-item>
     <el-form-item  label="条形码" prop="barcode">
    <el-input v-model="search.barcode" placeholder="请输入条形码" style="width:13vw"></el-input>
  </el-form-item>

     <el-form-item  label="库位" prop="barcode">
     <el-select v-model="search.repo" placeholder="请选择" style="width:10vw">
    <el-option
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <el-button type="primary" @click="currentPage=1;search1()">搜索</el-button>
   </el-form-item>

 </div>
 </el-col>

</el-form>

</el-row> -->

<el-form :inline="true" :model="search" ref="ruleForm" class="demo-ruleForm" :close-on-click-modal="false" >
 <el-row  style="margin-top: 2%;" type="flex" justify="center">

  <el-col :span="24" :offset="1" type="flex" justify="center">

   <el-form-item label="CAS号" prop="cas">
    <el-input v-model="search.cas" placeholder="请输入cas号"></el-input>
  </el-form-item>
   <el-form-item label="化学品名" prop="name">
    <el-input v-model="search.name" placeholder="请输入化学品名"></el-input>
  </el-form-item>
     <el-form-item  label="条形码" prop="barcode">
    <el-input v-model="search.barcode" placeholder="请输入条形码"></el-input>
  </el-form-item>
   </el-col>
  </el-row >
   <el-row  type="flex" justify="center">
  <el-col :span="24" :offset="1" type="flex" justify="center"> 
     <el-form-item  label="唯一码" prop="uid">
    <el-input v-model="search.uid" placeholder="请输入唯一码"></el-input>
  </el-form-item>
  <span class="demonstration">库位</span>
     <el-select v-model="search.repo" placeholder="请选择">
    <el-option
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 <el-button type="primary" @click="currentPage=1;search1();">搜索</el-button>

<!--  <el-input v-model="logoutcode" placeholder="请扫描二维码" style="width:200px"></el-input>
 <el-button type="danger" @click="outdialogfunc()">注销</el-button> -->

</el-col>
 </el-row>


</el-form>
<el-row>


<!-- <el-col :span="12">
  <div class="grid-content bg-purple" style="    margin: 19px;">
 <el-input v-model="tableDataName" placeholder="请扫描二维码" style="width:240px"></el-input>
 <el-button type="primary" @click="doFilter">异库调配</el-button>
  <el-button round type="info" @click="msgtip">调配说明</el-button>


</div
></el-col> -->

</el-row>
<el-dialog title="调配" :visible.sync="distribute" width='400px'>
            <el-table :data="repo"  border class="tb-edit" style="width: 483px;" highlight-current-row >
            <el-table-column prop="id" label="实验室编号" width="180">

                <template scope="scope">
                    <el-input :disabled="true" size="small" v-model="scope.row.id" placeholder="请输入内容" ></el-input> <span>{{scope.row.id}}</span>
                </template> 
            </el-table-column>
            <el-table-column label="实验室名称" width="180">
                <template scope="scope">
                    <el-input :disabled="true" size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
         

        </el-table>
        
  <el-form :model="dist">
    <el-form-item label="调到的实验室编号">
      <el-input v-model.number="dist.name" type="number" auto-complete="off"></el-input>
    </el-form-item>
<!--     <el-form-item label="数量">
<el-input v-model="dist.number" auto-complete="off"></el-input>
    </el-form-item> -->
  </el-form>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="distribute = false">取 消</el-button>
    <el-button type="primary" @click="distribute = false;func5()">确 定</el-button>
  </div>
</el-dialog>

<!--   <el-table :data="tableDataEnd"  border style="width: 100%" v-loading="searchloading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column sortable prop="checkinDate" label="入库时间" width="120">
    </el-table-column>
        <el-table-column sortable prop="cas" label="cas号" width="120">
    </el-table-column>

            <el-table-column sortable prop="barcode" label="条形码" width="120">
    </el-table-column>
            <el-table-column sortable prop="repo" label="库位" width="120">
    </el-table-column>
        <el-table-column sortable prop="name" label="药品名" width="120">
    </el-table-column>

    
        <el-table-column sortable prop="concentration" label="浓度(%)" width="120">
    </el-table-column>
        <el-table-column sortable prop="level" label="级号" width="120">
    </el-table-column>
        <el-table-column sortable prop="spec" label="规格" width="120">
    </el-table-column>

        <el-table-column sortable prop="serial" label="批号" width="120">
         </el-table-column>
     <el-table-column sortable prop="vender" label="厂家" width="220">
    </el-table-column>  
 <el-table-column  :formatter="formatter" sortable prop="property" label="性质" width="120">
</el-table-column>
         <el-table-column fixed="right" sortable prop="number" label="库存" width="120">
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
  -->
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
        <el-button @click="disthandleClick(scope.row);distribute=true" type="primary" size="small">调配</el-button>
   
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
import searchpng from '@/assets/delivery-man-giving-a-package-to-a-man.png'
import bg from '@/assets/bg.png'
export default {
  data() {
    return {
      reponum:0,
      // loading
      searchloading: false,
      img: bg,
      // 去除最后一位的远程库位
      repo: '',
      // 控制调配表单提交出现和消失,调配接口
      distribute: false,
      disturl: '',
      distdate: '',
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

      // 时间选择器

      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
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
        nd: '',
        type: [],
        jh: '',
        hl: '',
        cj: '',
        ph: '',
        sl: ''
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

  mounted() {

    // 获取远程仓库不要最后一个
    this.axios.get(localStorage.ip+'/repo/getAll').then(body => {
      this.repo = body.data.repos
      this.repo.pop()
      this.repo.pop()
      this.reponum = this.repo.length
    })
    this.search1()

    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
    /*   this.axios.get(this.url).then(body => {this.tableDataEnd = body.data.data;
  this.totalItems = body.data.total;
  }); */

    // 在创建的时候获取远程库位
    this.axios.get(localStorage.ip+'/repo/getAll').then(body => {
      this.temp = body.data.repos

      /*   console.log(this.temp[0]);
  console.log(this.temp[0].name); */
      var temparry = []
      /*   console.log("数组长度",this.temp.length); */
      for (var i = this.temp.length - 1; i > -1; i--) {
        /* console.log(this.temp[0].name);
console.log("i的值",i);
console.log("遍历name元素",this.temp[i].name);
console.log("遍历id元素",this.temp[i].id);  */
        var jsontemp = {}
        jsontemp.value = this.temp[i].id
        jsontemp.label = this.temp[i].name
        temparry.push(jsontemp)

        /* console.log("转化后的",temparry); */
      }
      console.log(temparry.shift())
      this.options4 = temparry
    })
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
    // 使用提示
    msgtip() {
      const h = this.$createElement

      this.$notify.info({
        title: '异库调配说明',
        message: h('i', { style: 'color: black' }, '不同实验之间分配时，需要提供被分配的药品的唯一码进行调配'),
        offset: 100
      })
    },
    formatter(row, column) {
      /*  console.log(row.property); */

      return row.property.join('|')
    },
    // 调配
    func5() {
      var urltiao = localStorage.ip+'/distribute?uid=' + this.tableDataName+'&repo=' + this.dist.name;/*  '&date=' + this.distdate */
      if(this.dist.name>this.reponum||this.dist.name<=0){
        this.$message({
          type: 'warning',
          message: "实验室编号不在有效范围内"
      })
      return
      } 
      this.axios.get(urltiao).then(body => { /* console.log(body.data); */
        /* console.log("调配成功"); */
        // 重新获取表格
        var that = this;
  if(body.data.code==20000){
         this.$message({
          type: 'success',
          message: body.data.msg
		  })
        }else{
           this.$message({
          type: 'warning',
          message: body.data.msg
      })
        }

        this.axios.get(this.url).then(body => {
          this.tableDataEnd = body.data.data
          this.totalItems = body.data.total
        })
      }).catch(function(error) {

        console.log("网络错误",error);

      })
    },

    disthandleClick(row) { // 调配接受函数
      /*     console.log(row.barcode);
    console.log(row.number); */
      // 获取barcode
      this.disturl = row.barcode
      this.distdate = row.checkinDate
      this.tableDataName = row.uid
    },

    repotrans() {
      // 进行库位和实验室名转换
      /*   console.log("进行转换"); */
      for (var i = this.temp.length - 1; i > -1; i--) {
        /*     console.log('远程实验室名',this.temp[i].name);
    console.log('本地搜索名',this.search.repo);
     */
        if (this.temp[i].name == this.search.repo) {
          /* console.log("实验室名",this.search.repo,"and", this.temp[i].id ,'进行相互转换') */
          this.search.repo = this.temp[i].id
        }
      }
    },

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
      
      this.distribute = true;
      

    },
    openData() {
      this.tableDataEnd = this.tabletemp
    },

    handleSizeChange(val) {
    /*   console.log(`每页 ${val} 条`) */
      this.pageSize = val
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange(val) {
      /*  console.log(`当前页: ${val}`) */
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
    }

  }
}
</script>
<style>
.tb-edit .el-input {    display: none
}.tb-edit .current-row .el-input {    display: block
}.tb-edit .current-row .el-input+span {    display: none
} 
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.pic{

position: absolute;
width: 108%;
left:-102px;
top:5%;
}


</style>