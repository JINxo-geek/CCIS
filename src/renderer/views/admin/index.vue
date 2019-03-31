

<template>
  <div style="height: 850px;background-color: rgba(242, 242, 242, 1);">
<img class="pic" :src="img" alt="bg">
<el-tooltip :content="'Switch value: ' + value5" placement="top">

</el-tooltip>
    <el-row>
  <el-col :span="24">
          <p style= "text-align: center;">用户管理界面</p>
    <div class="grid-content bg-purple-dark" style="text-align: center;">
  	<img :src="searchpng" alt="searchpng" style="margin: 0 auto;height:221px">

   
   </div>
   </el-col>
<!--      <el-col :span="11">
         
          
          <el-button type="info" round>信息修改</el-button>
    </el-col> -->
    <el-col :span="6" >
      <el-button type="info" round @click="info">权限分配说明</el-button>
    </el-col>
</el-row>
<el-dialog title="权限分配" :visible.sync="distribute" width='400px'>
          <el-table :data="repo"  border class="tb-edit" style="width: 483px;" highlight-current-row @row-click="handleCurrentChange">
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
         

        </el-table>
  <el-form :model="dist">
    <el-form-item label="分配到的实验室编号">
      <el-input type="number" v-model="dist.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="distribute = false">取 消</el-button>
    <el-button type="primary" @click="fun4()">确 定</el-button>
  </div>
</el-dialog>
        <el-table :data="tableData" border class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="学工号" width="100">
                <template scope="scope">
                    <el-input :disabled="true"  size="small" v-model="scope.row.username" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.username}}</span>
                </template>
            </el-table-column>
            <el-table-column label="密码" width="130">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.newpassword" placeholder="输入新密码" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.newpassword}}</span>
                </template>
            </el-table-column>
            <el-table-column label="拥有者" width="130">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
                        <el-table-column  label="电话" width="110">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.tel" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.tel}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="权限" width="130">
                <template scope="scope">
                    <el-input size="small" :disabled="true" v-model="scope.row.roles" placeholder="请分配权限" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.roles}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width=320>

                <template scope="scope">

 <!--        <el-button @click="disthandleClick(scope.row);distribute=true" type="primary" size="small">调配</el-button> -->


                    <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">确定修改</el-button>
                    <el-button size="small" type="success" icon="el-icon-edit" @click="disthandleClick(scope.row);distribute=true">权限分配</el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      <el-row>
    <el-button @click="dialogFormVisible = true" style="margin-left: 23%;margin-top: 3%;">添加用户</el-button>
    <el-button id="shuaxin" @click="fun2()" style="margin-left: 30%;margin-top: 3%;">刷新数据</el-button>
</el-row>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="账户名" :label-width="formLabelWidth">
      <el-input v-model="form.username" auto-complete="off"></el-input>
    </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.newpassword" auto-complete="off"></el-input>
    </el-form-item>
        <el-form-item label="拥有者" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.tel" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="button" @click="fun3()">添加</el-button>
  </div>
</el-dialog>



  </div>
</template>
<script>
import searchpng from '@/assets/group-of-people.png'
import bg from '@/assets/bg.png'
export default {
  methods: {
    disthandleClick(row) { // 权限调配函数
      this.url = localStorage.ip+'/user/modify?token='+localStorage.token
      this.changetable.username = row.username
      this.changetable.password = row.newpassword
      this.changetable.name = row.name
      this.changetable.tel = row.tel
      this.changetable.roles = row.roles
      if (this.changetable.password == undefined) {
        delete this.changetable.password
      }

      console.log('table', this.changetable)
      this.axios.post(this.url, this.changetable).then(body => {
        console.log(body.data)
        $('#shuaxin').click()
      })
    },

    // 使用通知
    info() {
      const h = this.$createElement

      this.$notify.info({
        title: '权限分配',
        message: h('i', { style: 'color: teal' }, '权限的第一位为用户身份（admin为超级管理员，user为分库管理院员），第二位为用户的实验室编号权限'),
        offset: 100
      })
    },
    handleCurrentChange(row, event, column) {

    },

    handleEdit(index, row) { // 修改确认
      console.log(index, row)
      this.url = localStorage.ip+'/user/modify?token='+localStorage.token
      this.changetable.username = row.username
      this.changetable.password = row.newpassword
      this.changetable.name = row.name
      this.changetable.tel = row.tel
      this.changetable.roles = row.roles
      if (this.changetable.password == undefined) {
        delete this.changetable.password
      }
      console.log('table', this.changetable)
      this.axios.post(this.url, this.changetable).then(body => {
        console.log(body.data)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(function(error) {
        console.log(error)
      })
    },

    handleDelete(index, row) {
      console.log(index, row);
      var deleteurl = localStorage.ip+'/user/remove?username='+row.username+'&token='+row.token;
this.axios.get(deleteurl).then(body => {console.log(body.data);
console.log("接受成功");
$("#shuaxin").click();
}).catch(function(error) {
console.log(error);
});

    },

    fun2: function() { // 刷新数据
      this.axios.get(localStorage.ip+'/user/getAll').then(body => {
        this.tableData = body.data.users
        /* console.log("打印内容"+this.tableDate); */
      })

      /* this.axios.get("http://127.0.0.1:8080/search").then(body => {this.tableData = body.data;}); */
    },

    fun3: function() {
      // 用户注册接口
      this.dialogFormVisible = false
      this.form.password = this.form.newpassword
      this.axios.post(localStorage.ip+'/user/register', this.form).then(body => {
        console.log(body.data)
        this.$notify({
          title: '成功',
          message: '用户注册成功',
          type: 'success'
        })
        console.log('接受成功'); $('#shuaxin').click()
      }).catch(function(error) {
        console.log(error)
      })
    },

    fun4: function() { // 用户权限分配
      console.log('分配权限')

      this.changetable.roles[1] = this.dist.name
      console.log('table', this.changetable)
      this.axios.post(this.url, this.changetable).then(body => {
        console.log(body.data)
        $('#shuaxin').click()
        this.distribute = false
      })
    }
  },

  mounted() {
    { // 获取仓库
    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
      this.axios.get(localStorage.ip+'/repo/getAll').then(body => {
        this.repo = body.data.repos
        this.repo.pop()
        this.repo.pop()
      })
    }
    /*         this.axios.post("http://rap2api.taobao.org/app/mock/15053/msg").then(body => {this.content = body.data; });    */
    this.axios.get(localStorage.ip+'/user/getAll').then(body => {
      this.tableData = body.data.users

      /* console.log("打印内容"+this.tableDate); */
    })
  },

  data() {
    return {

      img: bg,
      url: '',
      value5: '100',
      repo: '',
      // 权限调配
      distribute: false,
      dist: {
        name: '',
        number: ''
      },

      password: '',
      searchpng,
      tableData: [

      ],
      changetable: {
        username: '',
        password: '',
        name: '',
        tel: '',
        roles: []
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        // 注册用所使用表单
        username: '',
        password: '',
        name: '',
        tel: ''
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

