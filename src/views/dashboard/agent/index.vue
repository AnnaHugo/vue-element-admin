<template>
  <div class="agent-editor-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="trees">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree 
            :props="props1" 
            :load="loadNode1" 
            lazy 
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            ref="tree"
            highlight-current
            @node-click="handleNodeClick"
          >
          </el-tree>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="show">
          <el-button-group class="btns">
            <el-button type="primary" icon="el-icon-edit" v-show="!editing" @click="editing=true;">编辑</el-button>
            <el-button type="warning" icon="el-icon-check" v-show="editing" @click="save">保存</el-button>
            <el-button type="primary" icon="el-icon-plus">插入</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="remove">删除</el-button>
          </el-button-group>
          <table v-if="selected">
            <tbody>
              <tr v-for="(value, key, index) in selected" :key="key+index">
                <td>{{key}}</td>
                <td>
                  <span v-show="!editing">{{value}}</span>
                  <input v-show="editing" v-model="selected[key]">
                  </td>
              </tr>  
            </tbody>  
          </table>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'agent-editor',
    data() {
      return {
        filterText:'',
        expandOnClickNode:false,
        props1: {
          label: (node)=>{return `${node.name}(${node.nickName})`}
        },
        selected:null,
        noded:null,
        editing:false
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      save(){
        this.editing=false;
        this.$message(`保存成功!`);
      },
      remove() {
        if(!this.node){
          this.$message(`请选择节点!`);
          return;
        }
        const parent = this.node.parent;
        const children = parent.children||parent.childNodes;
        const index = children.findIndex(d => d.id === this.node.id);
        this.$message(`删除成功!`);
      },
      handleNodeClick(data,node,el) {
        console.log(data);
        console.log(node);
        //点击中当前节点
        this.selected=data;
        this.node=node;
        return false;
      },      
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      loadNode1(node, resolve) {
        this.$message(`获取${node.level+1}级代理`);
        if (node.level === 0) {
          return resolve([{
            name: `${node.level+1}级代理`,
            nickName:`我是${node.level+1}级代理`,
            parent:`a_${(new Date().getTime())}`,
            loginName:`a_${(new Date().getTime())}`,
            createTime:(new Date().getTime()),
            domain:`http://www.${(new Date().getTime())}.com`,
            remark:"remark",
            sort:"0",
            updateTime:"updatime"
          }]);
        }
        if (node.level > 4) {
          console.log(">1")
          return resolve([])
        };

        setTimeout(() => {
          const data = [{
            name: `${node.level+1}级代理`,
            nickName:`我是${node.level+1}级代理`,
            parent:`a_${(new Date().getTime())}`,
            loginName:`a_${(new Date().getTime())}`,
            createTime:(new Date().getTime()),
            domain:`http://www.${(new Date().getTime())}.com`,
            remark:"remark",
            sort:"0",
            updateTime:"updatime"
          }
          ];

          resolve(data);
        }, 500);
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .agent-editor-container {
    background-color: #e3e3e3;
    .trees{
      height:100vh;
      background:#fff;
      overflow:scroll;
    }
    .show{
      background:#fff;
      height:100vh;
      padding:20px;
      table{
        margin-top:20px;
        border-collapse:collapse;
        width:100%;
        td{
          padding:6px 10px;
          border:solid 1px #ccc;
          input{
            border:none;
            background:#eee;
            outline:0;
            padding:2px;
          }
        }
      }
    }
  }

</style>
