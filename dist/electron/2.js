webpackJsonp([2],{218:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(236),e=c(276),f=c(4),g=f(d.a,e.a,!1,function(){c(272),c(274)},"data-v-4bedd9b8",null);b["default"]=g.exports},226:function(a,b,c){a.exports=c.p+"imgs/bg--assets.png"},227:function(a,b,c){a.exports=c.p+"imgs/delivery-man-giving-a-package-to-a-man--assets.png"},236:function(a,b,c){"use strict";var d=c(227),e=c.n(d),f=c(226),g=c.n(f);b.a={data:function(){return{reponum:0,searchloading:!1,img:g.a,repo:"",distribute:!1,disturl:"",distdate:"",url:"",searchpng:e.a,search:{name:"",cas:"",barcode:"",repo:9999,uid:""},dist:{name:"",number:""},pickerOptions2:{shortcuts:[{text:"\u6700\u8FD1\u4E00\u5468",onClick:function(a){var b=new Date,c=new Date;c.setTime(c.getTime()-604800000),a.$emit("pick",[c,b])}},{text:"\u6700\u8FD1\u4E00\u4E2A\u6708",onClick:function(a){var b=new Date,c=new Date;c.setTime(c.getTime()-2592000000),a.$emit("pick",[c,b])}},{text:"\u6700\u8FD1\u4E09\u4E2A\u6708",onClick:function(a){var b=new Date,c=new Date;c.setTime(c.getTime()-7776000000),a.$emit("pick",[c,b])}}]},options4:[],list:[],loading:!1,states:["dd","aa"],ruleForm:{cas:"",name:"",wxx:"",nd:"",type:[],jh:"",hl:"",cj:"",ph:"",sl:""},content:"",tableDataBegin:[],tableDataName:"",tableDataEnd:[],tabletemp:[],currentPage:1,pageSize:10,totalItems:0,filterTableDataEnd:[],flag:!1,temp:""}},mounted:function(){var a=this;this.axios.get(localStorage.ip+"/repo/getAll").then(function(b){a.repo=b.data.repos,a.repo.pop(),a.repo.pop(),a.reponum=a.repo.length}),this.search1(),this.axios.get(localStorage.ip+"/repo/getAll").then(function(b){a.temp=b.data.repos;for(var c,d=[],e=a.temp.length-1;-1<e;e--)c={},c.value=a.temp[e].id,c.label=a.temp[e].name,d.push(c);console.log(d.shift()),a.options4=d})},created:function(){if(this.totalItems=this.tableDataBegin.length,this.totalItems>this.pageSize)for(var a=0;a<this.pageSize;a++)this.tableDataEnd.push(this.tableDataBegin[a]);else this.tableDataEnd=this.tableDataBegin},methods:{msgtip:function(){var a=this.$createElement;this.$notify.info({title:"\u5F02\u5E93\u8C03\u914D\u8BF4\u660E",message:a("i",{style:"color: black"},"\u4E0D\u540C\u5B9E\u9A8C\u4E4B\u95F4\u5206\u914D\u65F6\uFF0C\u9700\u8981\u63D0\u4F9B\u88AB\u5206\u914D\u7684\u836F\u54C1\u7684\u552F\u4E00\u7801\u8FDB\u884C\u8C03\u914D"),offset:100})},formatter:function(a){return a.property.join("|")},func5:function(){var a=this,b=localStorage.ip+"/distribute?uid="+this.tableDataName+"&repo="+this.dist.name;return this.dist.name>this.reponum||0>=this.dist.name?void this.$message({type:"warning",message:"\u5B9E\u9A8C\u5BA4\u7F16\u53F7\u4E0D\u5728\u6709\u6548\u8303\u56F4\u5185"}):void this.axios.get(b).then(function(b){2e4==b.data.code?a.$message({type:"success",message:b.data.msg}):a.$message({type:"warning",message:b.data.msg}),a.axios.get(a.url).then(function(b){a.tableDataEnd=b.data.data,a.totalItems=b.data.total})}).catch(function(a){console.log("\u7F51\u7EDC\u9519\u8BEF",a)})},disthandleClick:function(a){this.disturl=a.barcode,this.distdate=a.checkinDate,this.tableDataName=a.uid},repotrans:function(){for(var a=this.temp.length-1;-1<a;a--)this.temp[a].name==this.search.repo&&(this.search.repo=this.temp[a].id)},search1:function(){var a=this;this.searchloading=!0,this.url=localStorage.ip+"/newquery?repo="+this.search.repo+"&cas="+this.search.cas+"&barcode="+this.search.barcode+"&name="+this.search.name+"&size="+this.pageSize+"&start="+this.currentPage+"&uid="+this.search.uid,this.axios.get(this.url).then(function(b){a.tableDataEnd=b.data.data,a.totalItems=b.data.total,a.searchloading=!1})},doFilter:function(){return""==this.tableDataName?void this.$message.warning("\u67E5\u8BE2\u6761\u4EF6\u4E0D\u80FD\u4E3A\u7A7A\uFF01"):void(this.distribute=!0)},openData:function(){this.tableDataEnd=this.tabletemp},handleSizeChange:function(a){this.pageSize=a,this.handleCurrentChange(this.currentPage)},handleCurrentChange:function(a){this.currentPage=a,this.flag?this.currentChangePage(this.filterTableDataEnd):this.currentChangePage(this.tableDataEnd)},currentChangePage:function(a){var b=(this.currentPage-1)*this.pageSize,c=this.currentPage*this.pageSize;for(this.tableDataEnd=[];b<c;b++)a[b]&&this.tableDataEnd.push(a[b]);this.search1()}}}},272:function(a,b,c){var d=c(273);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(15)("6de52a4b",d,!0,{})},273:function(a,b,c){b=a.exports=c(14)(!1),b.push([a.i,".tb-edit .el-input{display:none}.tb-edit .current-row .el-input{display:block}.tb-edit .current-row .el-input+span{display:none}",""])},274:function(a,b,c){var d=c(275);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(15)("31287e95",d,!0,{})},275:function(a,b,c){b=a.exports=c(14)(!1),b.push([a.i,".pic[data-v-4bedd9b8]{position:absolute;width:108%;left:-102px;top:5%}",""])},276:function(a,b){"use strict";b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticStyle:{height:"850px","background-color":"rgba(242, 242, 242, 1)"}},[c("img",{staticClass:"pic",attrs:{src:a.img,alt:"bg"}}),a._v(" "),c("el-row",[c("el-col",{attrs:{span:24}},[c("div",{staticClass:"grid-content bg-purple-dark",staticStyle:{"text-align":"center"}},[c("img",{staticStyle:{margin:"0 auto",height:"221px"},attrs:{src:a.searchpng,alt:"searchpng"}})])])],1),a._v(" "),c("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{inline:!0,model:a.search,"close-on-click-modal":!1}},[c("el-row",{staticStyle:{"margin-top":"2%"},attrs:{type:"flex",justify:"center"}},[c("el-col",{attrs:{span:24,offset:1,type:"flex",justify:"center"}},[c("el-form-item",{attrs:{label:"CAS\u53F7",prop:"cas"}},[c("el-input",{attrs:{placeholder:"\u8BF7\u8F93\u5165cas\u53F7"},model:{value:a.search.cas,callback:function(b){a.$set(a.search,"cas",b)},expression:"search.cas"}})],1),a._v(" "),c("el-form-item",{attrs:{label:"\u5316\u5B66\u54C1\u540D",prop:"name"}},[c("el-input",{attrs:{placeholder:"\u8BF7\u8F93\u5165\u5316\u5B66\u54C1\u540D"},model:{value:a.search.name,callback:function(b){a.$set(a.search,"name",b)},expression:"search.name"}})],1),a._v(" "),c("el-form-item",{attrs:{label:"\u6761\u5F62\u7801",prop:"barcode"}},[c("el-input",{attrs:{placeholder:"\u8BF7\u8F93\u5165\u6761\u5F62\u7801"},model:{value:a.search.barcode,callback:function(b){a.$set(a.search,"barcode",b)},expression:"search.barcode"}})],1)],1)],1),a._v(" "),c("el-row",{attrs:{type:"flex",justify:"center"}},[c("el-col",{attrs:{span:24,offset:1,type:"flex",justify:"center"}},[c("el-form-item",{attrs:{label:"\u552F\u4E00\u7801",prop:"uid"}},[c("el-input",{attrs:{placeholder:"\u8BF7\u8F93\u5165\u552F\u4E00\u7801"},model:{value:a.search.uid,callback:function(b){a.$set(a.search,"uid",b)},expression:"search.uid"}})],1),a._v(" "),c("span",{staticClass:"demonstration"},[a._v("\u5E93\u4F4D")]),a._v(" "),c("el-select",{attrs:{placeholder:"\u8BF7\u9009\u62E9"},model:{value:a.search.repo,callback:function(b){a.$set(a.search,"repo",b)},expression:"search.repo"}},a._l(a.options4,function(a){return c("el-option",{key:a.value,attrs:{label:a.label,value:a.value}})})),a._v(" "),c("el-button",{attrs:{type:"primary"},on:{click:function(){a.currentPage=1,a.search1()}}},[a._v("\u641C\u7D22")])],1)],1)],1),a._v(" "),c("el-row"),a._v(" "),c("el-dialog",{attrs:{title:"\u8C03\u914D",visible:a.distribute,width:"400px"},on:{"update:visible":function(b){a.distribute=b}}},[c("el-table",{staticClass:"tb-edit",staticStyle:{width:"483px"},attrs:{data:a.repo,border:"","highlight-current-row":""}},[c("el-table-column",{attrs:{prop:"id",label:"\u5B9E\u9A8C\u5BA4\u7F16\u53F7",width:"180"},scopedSlots:a._u([{key:"default",fn:function(b){return[c("el-input",{attrs:{disabled:!0,size:"small",placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9"},model:{value:b.row.id,callback:function(c){a.$set(b.row,"id",c)},expression:"scope.row.id"}}),a._v(" "),c("span",[a._v(a._s(b.row.id))])]}}])}),a._v(" "),c("el-table-column",{attrs:{label:"\u5B9E\u9A8C\u5BA4\u540D\u79F0",width:"180"},scopedSlots:a._u([{key:"default",fn:function(b){return[c("el-input",{attrs:{disabled:!0,size:"small",placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9"},on:{change:function(){a.handleEdit(b.$index,b.row)}},model:{value:b.row.name,callback:function(c){a.$set(b.row,"name",c)},expression:"scope.row.name"}}),a._v(" "),c("span",[a._v(a._s(b.row.name))])]}}])})],1),a._v(" "),c("el-form",{attrs:{model:a.dist}},[c("el-form-item",{attrs:{label:"\u8C03\u5230\u7684\u5B9E\u9A8C\u5BA4\u7F16\u53F7"}},[c("el-input",{attrs:{type:"number","auto-complete":"off"},model:{value:a.dist.name,callback:function(b){a.$set(a.dist,"name",a._n(b))},expression:"dist.name"}})],1)],1),a._v(" "),c("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[c("el-button",{on:{click:function(){a.distribute=!1}}},[a._v("\u53D6 \u6D88")]),a._v(" "),c("el-button",{attrs:{type:"primary"},on:{click:function(){a.distribute=!1,a.func5()}}},[a._v("\u786E \u5B9A")])],1)],1),a._v(" "),c("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.searchloading,expression:"searchloading"}],staticStyle:{width:"100%"},attrs:{data:a.tableDataEnd,border:"","element-loading-text":"\u62FC\u547D\u52A0\u8F7D\u4E2D","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[c("el-table-column",{attrs:{type:"selection",width:"55"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"uid",label:"\u552F\u4E00\u7801",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"cas",label:"cas\u53F7",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"usetime",label:"\u9886\u7528\u65F6\u95F4",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"checkinDate",label:"\u5165\u5E93\u65F6\u95F4",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"barcode",label:"\u6761\u5F62\u7801",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"name",label:"\u836F\u54C1\u540D",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"repo",label:"\u5B9E\u9A8C\u5BA4",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"property",label:"\u6027\u8D28",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"concentration",label:"\u6D53\u5EA6(%)",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"level",label:"\u7EA7\u53F7",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"spec",label:"\u89C4\u683C",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"vender",label:"\u5382\u5BB6",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{sortable:"",prop:"serial",label:"\u6279\u53F7",width:"120"}}),a._v(" "),c("el-table-column",{attrs:{fixed:"right",label:"\u64CD\u4F5C",width:"100"},scopedSlots:a._u([{key:"default",fn:function(b){return[c("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(){a.disthandleClick(b.row),a.distribute=!0}}},[a._v("\u8C03\u914D")])]}}])})],1),a._v(" "),c("el-row",{staticStyle:{}},[c("el-pagination",{attrs:{"current-page":a.currentPage,"page-sizes":[10,20,30,40],"page-size":a.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:a.totalItems},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1),a._v(" "),c("el-row",[c("el-col",{attrs:{span:24}},[c("div",{staticClass:"grid-content bg-purple-dark"},[c("el-row",{staticStyle:{visibility:"hidden"}},[c("el-col",{attrs:{span:24}},[c("div",{staticClass:"grid-content bg-purple-dark",staticStyle:{"text-align":"center"}},[c("input",{attrs:{type:"text",id:"txt"}}),a._v(" "),c("div",{attrs:{id:"code"}})])])],1)],1)])],1)],1)},staticRenderFns:[]}}});