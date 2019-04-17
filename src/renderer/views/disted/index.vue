<template>
<div style="background-color: rgba(242, 242, 242, 1);">
<el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark" style="text-align: center;">
  	<img :src="searchpng" alt="searchpng" style="margin: 0 auto;height:221px">
<!--    <p style= "text-align: center;">调配界面</p> -->
   
   </div
   ></el-col>
</el-row>
				

<el-row>

 <!--    <br/> 搜素数据表单search -->
<el-form :inline="true" :model="search" ref="ruleForm" class="demo-ruleForm" :close-on-click-modal="false" >

 <!--    <br/> -->
   <el-col :span="24"><div class="grid-content bg-purple-light">
<!--    <el-form-item style="margin-left:200px" label="条形码" prop="cas"> -->
         <el-form-item label="CAS号" prop="cas">
    <el-input v-model="search.cas" style="    width: 112px;"></el-input>
  </el-form-item>
   <el-form-item label="化学品名" prop="name">
    <el-input v-model="search.name" style="    width: 112px;"></el-input>
  </el-form-item>
     <el-form-item  label="条形码" prop="barcode">
    <el-input v-model="search.barcode"></el-input>
  </el-form-item>

  <span class="demonstration">库位</span>
    <el-select v-model="search.repo" filterable="" remote="" reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
 <el-button type="primary" @click="search1()">搜索</el-button>
<!--  <el-button type="primary" @click="openData">展示数据</el-button> -->
 </div>
 </el-col>

</el-form>

</el-row>

<el-row>
<el-col :span="12"><div class="grid-content bg-purple" style="    margin: 19px;">
 <el-input v-model="tableDataName" placeholder="请输化学品名" style="width:240px"></el-input>
 <el-button type="primary" @click="doFilter">筛选</el-button>
 <el-button type="primary" @click="openData">展示数据</el-button>
</div></el-col>

<el-col :span="12">
  <div class="grid-content bg-purple" style="    margin: 19px;">
 <el-input v-model="tableDataName" placeholder="请扫描二维码" style="width:240px"></el-input>
 <el-button type="danger" @click="doFilter">注销</el-button>

</div
></el-col>
</el-row>
<el-dialog title="调配" :visible.sync="distribute" width='250px'>
  <el-form :model="dist">
    <el-form-item label="调到的实验室名称">
      <el-input v-model="dist.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="数量">
<el-input v-model="dist.number" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="distribute = false">取 消</el-button>
    <el-button type="primary" @click="distribute = false">确 定</el-button>
  </div>
</el-dialog>

  <el-table :data="tableDataEnd" border style="width: 100%">
        <el-table-column type="selection" width="55">
    </el-table-column>
          <el-table-column  prop="uid" label="唯一码" width="120">
    </el-table-column>
        <el-table-column  prop="cas" label="cas号" width="120">
    </el-table-column>
    <el-table-column  prop="usetime" label="领用时间" width="120">
    </el-table-column>
        <el-table-column  prop="disttime" label="调配时间" width="120">
    </el-table-column>
            <el-table-column  prop="barcode" label="条形码" width="120">
    </el-table-column>

        <el-table-column prop="name" label="药品名" width="120">
    </el-table-column>
  
        <el-table-column prop="property" label="性质" width="120">
    </el-table-column>
        <el-table-column prop="concentration" label="浓度(%)" width="120">
    </el-table-column>
        <el-table-column prop="level" label="级号" width="120">
    </el-table-column>
        <el-table-column prop="spec" label="规格" width="120">
    </el-table-column>
            <el-table-column prop="vender" label="厂家" width="120">
    </el-table-column>
        <el-table-column prop="serial" label="批号" width="120">
         </el-table-column>

    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="disthandleClick(scope.row);distribute=true" type="primary" size="small">打印</el-button>
   
        </template>
    </el-table-column>
    </el-table>
   
 <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[10, 20, 30, 40]"
  :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalItems">
 </el-pagination>

 <el-row>
   
  <el-col :span="24"><div class="grid-content bg-purple-dark">
  <!--    <p>搜索数据{{search}}</p>
<p>过滤的{{filterTableDataEnd}}</p>
<p>tableDataBegin{{tableDataBegin}}</p>
  <p>{{tableDataEnd}}</p>
 <br/>
 <p>{{tableDataName}}</p>
 <br/>
  <p>远程库位{{states}}</p>`
   <br/>
  <p>远程得到{{temp}}</p>
   <br/>
  <p>远程得到本地{{list}}</p>
     -->
    </div></el-col>
</el-row>

</div>

</template>
<script>
import { mapGetters } from 'vuex'
import searchpng from '@/assets/search.png'
export default {
  data() {
    return {
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
        repo: ''
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
      pageSize: 6,
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
    this.newquery = localStorage.ip + '/newquery?repo=' + this.roles[1]
    console.log('url', this.newquery)

    this.axios.get(this.newquery).then(body => { this.tableDataEnd = body.data.data })
    // 在创建的时候获取远程库位
    this.axios.get(localStorage.ip + '/repo/getAll').then(body => {
      this.temp = body.data.repos

      /*   console.log(this.temp[0]);
  console.log(this.temp[0].name); */
      var temparry = []
      console.log('数组长度', this.temp.length)
      for (var i = this.temp.length - 1; i > -1; i--) {
        console.log(this.temp[0].name)
        console.log('i的值', i)

        console.log('遍历name元素', this.temp[i].name)
        temparry[i] = this.temp[i].name
        console.log('拼接后的数组', temparry)
      }
      this.states = temparry
      this.list = this.states.map(item => {
        return { value: item, label: item }
      })
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

    disthandleClick(row) {
      console.log(row.barcode)
      console.log(row.number)

      this.disturl = localStorage.ip + '/distribute?barcode=' + row.barcode + '&number=' + this.dist.nubmer + '&repo=' + this.dist.name+'&token='+localStorage.token
      this.axios.get(this.disturl).then(body => {
        console.log(body.data)
        console.log('接受成功')
        $('#shuaxin').click()
      }).catch(function(error) {
        console.log(error)
      })
    },

    repotrans() {
      // 进行库位和实验室名转换
      console.log('进行转换')
      for (var i = this.temp.length - 1; i > -1; i--) {
        console.log('远程实验室名', this.temp[i].name)
        console.log('本地搜索名', this.search.repo)

        if (this.temp[i].name == this.search.repo) {
          console.log('实验室名', this.search.repo, 'and', this.temp[i].id, '进行相互转换')
          this.search.repo = this.temp[i].id
        }
      }
    },

    search1() {
      console.log('开始搜索')
      if (this.search.repo == '') {
        this.search.repo = '0'
      }

      this.repotrans()

      // 条件筛选
      this.url = localStorage.ip + '/query?repo=' + this.search.repo + '&cas=' + this.search.cas + '&barcode=' + this.search.barcode + '&name=' + this.search.name
      this.axios.get(this.url).then(body => { this.tableDataEnd = body.data.data })
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