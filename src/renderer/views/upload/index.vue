<template>
  <div style="height: 850px;
    background-color: rgba(242, 242, 242, 1);">
<img class="pic" :src="img" alt="bg">
<el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark" style="text-align: center;">
  	<img :src="searchpng" alt="searchpng" style="margin: 0 auto;height:221px">
<p style= "text-align: center;">未实现</p>
   
   </div
   ></el-col>
</el-row>
  </div>

</template>
<script>
import searchpng from '@/assets/delivery-man-giving-a-package-to-a-man.png'
import bg from '@/assets/bg.png'
export default {
  data() {
    return {
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
        repo: 0
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
    this.axios.get(localStorage.ip + '/repo/getAll').then(body => {
      this.repo = body.data.repos
      this.repo.pop()
      this.repo.pop()
    })
    this.search1()

    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
    /*   this.axios.get(this.url).then(body => {this.tableDataEnd = body.data.data;
  this.totalItems = body.data.total;
  }); */

    // 在创建的时候获取远程库位
    this.axios.get(localStorage.ip + '/repo/getAll').then(body => {
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
    formatter(row, column) {
      /*  console.log(row.property); */

      return row.property.join('|')
    },
    // 调配
    func5() {
      var urltiao = localStorage.ip + '/application/send?barcode=' + this.disturl + '&number=' + this.dist.number + '&repo=' + this.dist.name + '&date=' + this.distdate + '&token=' + localStorage.token + '&action=simple'
      this.axios.get(urltiao).then(body => { /* console.log(body.data); */
        /* console.log("调配成功"); */
        // 重新获取表格
        this.$message({
          type: 'success',
          message: '调配成功'
		  })

        this.axios.get(this.url).then(body => {
          this.tableDataEnd = body.data.data
          this.totalItems = body.data.total
        })
      }).catch(function(error) {
        console.log(error)
      })
    },

    disthandleClick(row) { // 调配接受函数
      /*     console.log(row.barcode);
    console.log(row.number); */
      // 获取barcode
      this.disturl = row.barcode
      this.distdate = row.checkinDate
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
      /*   console.log("开始搜索"); */
      /*   if(this.search.repo==""){

this.search.repo='0';
  } */

      /*   this.repotrans(); */

      // 条件筛选
      this.url = localStorage.ip + '/query?repo=' + this.search.repo + '&cas=' + this.search.cas + '&barcode=' + this.search.barcode + '&name=' + this.search.name + '&size=' + this.pageSize + '&start=' + this.currentPage
      this.axios.get(this.url).then(body => {
        this.tableDataEnd = body.data.data
        this.totalItems = body.data.total
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