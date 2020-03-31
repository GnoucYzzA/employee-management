<template>
    <div class="all-department" v-if="departments">
      <el-button 
         class="AddDepartment__button" 
         type="primary" 
         icon="el-icon-circle-plus"
         circle
         plain
         @click="handleAddDep">
        </el-button>
        <el-table
          :data="departments"
          style="width: 100%"
          max-height="600"
          fit
          border>
          <el-table-column
            label="Department ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="Department Name"
            prop="department_name"
            sortable>
          </el-table-column>
          <el-table-column
            align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'AllDepartment',
data() {
      return {
        departments: []
      }
    },
created(){
        db.collection('departments').get()
        .then(snapshot => {
          if(snapshot){  
            snapshot.forEach(doc => {
              let department = doc.data()
              department.id = doc.id
              department.employees = []
              var ref = db.collection('employees').where('department', '==' , department.id);
              ref.get().then(each => {
                if(each){
                 each.forEach(data =>{
                   department.employees.push(data.id)
                 })
                }
              })
              this.departments.push({
                id: department.id,
                department_name: department.department_name
              })
            });
          }
        })
    },
    methods: {
      handleAddDep(){
        this.$router.push({ name: 'NewDepartment' })
      },
      handleEdit(index, row) {
        this.$router.push({ name: 'EditDepartment', params: { department_id: row.id}})
      },
      handleDelete(index, row) {
        db.collection('departments').doc(row.id).delete()
        .then(() => {
        this.departments = this.departments.filter(department => {
          return department.id != row.id
        })
      })
      }
    }
}
</script>

<style>
.all-department{
  padding: 2.5em;
  max-width: 80%;
  margin-left: 230px;
}
.AddDepartment__button{   
    margin: 2em;
    float: left;
}
</style>