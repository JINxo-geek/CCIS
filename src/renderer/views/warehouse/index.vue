
<template>
  <div id="app">

  <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55">
    </el-table-column>
        <el-table-column  prop="cas" label="cas号" width="120">
    </el-table-column>
            <el-table-column  prop="kw" label="库位" width="120">
    </el-table-column>
        <el-table-column prop="name" label="药品名" width="120">
    </el-table-column>
        <el-table-column prop="wxx" label="危险性" width="120">
    </el-table-column>
        <el-table-column prop="nd" label="浓度" width="120">
    </el-table-column>
        <el-table-column prop="jh" label="级号" width="120">
    </el-table-column>
        <el-table-column prop="hl" label="含量" width="120">
    </el-table-column>
        <el-table-column prop="ph" label="批号" width="120">
         </el-table-column>
                <el-table-column fixed="left" prop="rkdata" label="入库时间" width="120">
    </el-table-column>
     <el-table-column prop="kc" label="库存" width="120">
      </el-table-column>
           <el-table-column prop="ysy" label="已使用" width="120">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row)
    }
  },

  data() {
    return {
      tableData: [
        {
          cas: '1',
          name: '三聚氰胺',
          wxx: '高',
          nd: '97%',
          jh: '2019级',
          hl: '500ml',
          cj: '杭州xx',
          ph: '200',
          kc: '100',
          ysy: '20',
          rkdata: '2018-6-5',
          kw: '1'

        },
        {
          cas: '1',
          name: '三聚氰胺',
          wxx: '高',
          nd: '97%',
          jh: '2019级',
          hl: '500ml',
          cj: '杭州xx',
          ph: '200',
          kc: '100',
          ysy: '20',
          rkdata: '2018-6-5',
          kw: '2'
        },
        {
          cas: '2',
          name: '三聚氰胺',
          wxx: '高',
          nd: '97%',
          jh: '2019级',
          hl: '500ml',
          cj: '杭州xx',
          ph: '200',
          kc: '100',
          ysy: '20',
          rkdata: '2018-6-5',
          kw: '3'
        },
        {
          cas: '3',
          name: '三聚氰胺',
          wxx: '高',
          nd: '97%',
          jh: '2019级',
          hl: '500ml',
          cj: '杭州xx',
          ph: '200',
          kc: '100',
          ysy: '20',
          rkdata: '2018-6-5',
          kw: '4'

        }
      ]
    }
  }
}
</script>




