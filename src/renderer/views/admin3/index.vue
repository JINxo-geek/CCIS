

<template>
   <div style="height: 850px;background-color: rgba(242, 242, 242, 1);">
<img class="pic" :src="img" alt="bg">

          <el-row>
  <el-col :span="24">
 <p style= "text-align: center;">库位管理</p>
    <div class="grid-content bg-purple-dark" style="text-align: center;">
  	<img :src="searchpng" alt="searchpng" style="margin: 0 auto;height:221px">
<!--    <p style= "text-align: center;">库位管理</p> -->
   
   </div
   ></el-col>
</el-row>
 <!--  <el-table border class="tb-edit" highlight-current-row @row-click="handleCurrentChange" :data="tableData" style="width: 100%">

    
             <el-table-column label="账户名" width="180">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.account" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.account}}</span>
                </template>
            </el-table-column>

 <el-table-column
  prop="password"
  label="密码"
  width="180">
 </el-table-column>
 <el-table-column
  prop="belong"
  label="拥有者">
 </el-table-column>
 <el-table-column
 prop="phone"
 label="拥有者电话"
 >
 </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table> -->

        <el-table :data="tableData"  border class="tb-edit" style="width: 483px;margin-left: auto; margin-right: auto;" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column  label="实验室编号" width="180">
                <template scope="scope">
                    <el-input :disabled="true" size="small" v-model="scope.row.id" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.id}}</span>
                </template> 
            </el-table-column>
            <el-table-column label="实验室名称" width="180">
                <template scope="scope">
                    <el-input  size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作"  width="120">
                <template scope="scope">
                    <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">确定修改</el-button>
            
                    <el-button v-if="debutton" size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                   
                </template>
            </el-table-column>
        </el-table>
<el-row type="flex" justify="center">

    <el-button @click="dialogFormVisible = true" >新增实验室</el-button>
    <el-button id="shuaxin" @click="fun2()">刷新数据</el-button>
    <el-button id="shuaxin" type="danger" @click="debutton=true">开启删除功能</el-button>

</el-row>


    <el-dialog title="新建实验室" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="新建实验室名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="button" @click="fun3()">添加</el-button>
  </div>
</el-dialog>

<p><br>数据:{{tableData}}</p>

  </div>
</template>
<script>
import searchpng from '@/assets/warehouse.png'
import bg from '@/assets/bg.png'
export default {
  methods: {
    handleCurrentChange(row, event, column) {
      // 碰到表格就会获取该行元素，此时用oldname保存久的名称
      this.oldname = row.name
      console.log('row', row)
    },

    handleEdit(index, row) { // row可以获取到相应的数据
      console.log(index, row)
      console.log('被编辑的名字是', row.name)
      // {name:'',newname:''}
      if (row.id == 9999) {
        this.$notify.error({
          title: '错误',
          message: '特殊仓库不可修改或删除'
        })
      }
      var fix = {}
      fix.name = this.oldname
      fix.newname = row.name

      // 重命名
      var renameurl = localStorage.ip + '/repo/modify'
      this.axios.post(renameurl, fix).then(body => {
        console.log(body.data)
        console.log('重命名成功')

        $('#shuaxin').click()
      }

      ).catch(function(error) {
        console.log(error)
      })
    },

    handleDelete(index, row) { // 删除
      console.log(index, row)
      console.log('被编辑的id是', row.id)
      var deleteurl = localStorage.ip + '/repo/remove?repo=' + row.id
      this.axios.get(deleteurl).then(body => {
        console.log(body.data)
        if (row.id == 9999) {
          this.$notify.error({
            title: '错误',
            message: '特殊仓库不可修改或删除'
          })
        }
        console.log('删除成功')
        $('#shuaxin').click()
      }).catch(function(error) {
        console.log(error)
      })
    },
    fun1: function() {
      this.dialogFormVisible = false
      this.axios.get(localStorage.ip + '/repo/getAll').then(body => {
        alert(body)
        $('#shuaxin').click()
      })
    },
    fun2: function() { // 刷新函数
      this.axios.get(localStorage.ip + '/repo/getAll').then(body => {
        this.tableData = body.data.repos
        //
        this.tableData.pop()
        this.tableData.pop()
      })
    },

    fun3: function() {
      this.dialogFormVisible = false
      this.url = localStorage.ip + '/repo/new?name=' + this.form.name
      this.axios.get(this.url).then(body => {
        console.log(body.data)
        console.log('接受成功')
        $('#shuaxin').click()
      }).catch(function(error) {
        console.log(error)
      })
    }
  },

  mounted() {
    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
    this.axios.get(localStorage.ip + '/repo/getAll').then(body => {
      this.tableData = body.data.repos
      // 删除最后一个实验室
      this.tableData.pop()
      this.tableData.pop()
    })
  },

  data() {
    return {
      img: bg,
      oldname: '',
      searchpng,

      tableData: [

      ],
      debutton: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px'
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
