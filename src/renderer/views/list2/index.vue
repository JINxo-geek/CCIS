<template>
<div style="background-color: rgba(242, 242, 242, 1);">
  <img class="pic" :src="img" alt="bg">
<el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark" style="text-align: center;">
  	<img :src="searchpng" alt="searchpng" style="margin: 0 auto;height:221px">
<!--    <p style= "text-align: center;">调配界面</p> -->
   
   </div
   ></el-col>
</el-row>
				
<!-- <el-dialog title="领用" :visible.sync="distribute" width='250px'>
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
</el-dialog> -->

  <el-table :data="distable" border style="width: 100%">
        <el-table-column type="selection" width="55">
    </el-table-column>
        <el-table-column  prop="cas" label="cas号" width="120">
    </el-table-column>
            <el-table-column  prop="barcode" label="条形码" width="120">
    </el-table-column>
        <el-table-column prop="name" label="药品名" width="120">
    </el-table-column>
         <el-table-column prop="number" label="库存" width="120">
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
<!--         <el-table-column prop="recordId" label="领用码" width="120">
         </el-table-column> -->

    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click="disthandleClick(scope.row);" type="primary" size="small">同意</el-button>
    <el-button @click="disthandleClick2(scope.row);" type="danger" size="small">拒绝</el-button>
        </template>
    </el-table-column>
    </el-table>
<!--    
 <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[5, 20, 30, 40]"
  :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalItems">
 </el-pagination> -->

 <el-row>
   
  <el-col :span="24"><div class="grid-content bg-purple-dark">
    <!--  <p>搜索数据{{search}}</p>
<p>过滤的{{filterTableDataEnd}}</p>
<p>tableDataBegin{{tableDataBegin}}</p>
  <p>{{tableDataEnd}}</p>
 <br/>
 <p>{{tableDataName}}</p>
 <br/>
  <p>远程库位{{states}}</p>
   <br/>
  <p>远程得到{{temp}}</p>
   <br/>
  <p>远程得到本地{{list}}</p> -->
   <!--  <p>{{distable}}</p> -->
    </div></el-col>
</el-row> 

</div>

</template>
<script>
import { mapGetters } from 'vuex'
import permission from '@/directive/permission/index.js' // 权限判断指令
import searchpng from '@/assets/get-money.png'
import bg from '@/assets/bg.png'
export default {
  data() {
    return {
      img:bg,
      distable: [],
      distribute: false,
      searchpng,
      // 待领用表url
      disturl: '',
      // 控制调配表单提交出现和消失,调配接口

      dist: {
        name: '',
        number: ''
      },

      // 时间选择器

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
      }

    }
  },

  mounted: function() {
    // 获取待领用表
    this.querydist()

    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
  },

  created() {

  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    // 获取收到的 
    querydist() {
      this.disturl = localStorage.ip + '/application/list?repo=' + this.roles[1]+'&token='+localStorage.token
      console.log('打印', this.disturl)
      this.axios.get(this.disturl).then(body => {
        console.log(body.data)
        this.distable = body.data.data
        console.log('接受成功')
      }).catch(function(error) {
        console.log('报错', error)
      })
    },

    disthandleClick(row) {
      //同意申请
      var distedurl = localStorage.ip + '/application/review?recordId=' + row.recordId+'&token='+localStorage.token+'&action=accept'
      this.axios.get(distedurl).then(body => {
        console.log(body.data)
        console.log('接受成功')
        this.$message({
          message: '同意',
          type: 'success'
        })
        //刷新数据
        this.querydist()
      }).catch(function(error) {
        console.log(error)
      })
    },
        disthandleClick2(row) {
      //同意拒绝
      var distedurl = localStorage.ip + '/application/review?recordId=' + row.recordId+'&token='+localStorage.token+'&action=reject'
      this.axios.get(distedurl).then(body => {
        console.log(body.data)
        console.log('接受成功')
        this.$message({
          message: '拒绝',
          type: 'success'
        })
        this.querydist()
      }).catch(function(error) {
        console.log(error)
      })
    }

    /* repotrans(){
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

    // 前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    // 用两个变量接收currentChangePage函数的参数
    /*     doFilter() {
      if (this.tableDataName == '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tabletemp = this.tableDataEnd;
      this.tableDataBegin = this.tableDataEnd;
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
      this.tableDataEnd = this.tabletemp;

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
 */
    // 远程库位搜索的方法
    /*           remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      } */
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.pic{

position: absolute;
width: 108%;
left:-102px;
top:10%;
}


</style>