<template>
<div class="all-employee" v-if="employees">
  <el-button 
    class="AddEmployee__button" 
    type="primary" 
    icon="el-icon-circle-plus"
    plain
    circle @click="handleAddEmployee">
   </el-button>
  <el-table
    :data="employees"
    style="width: 100%"
    max-height="600"
    fit  
    border>
    <el-table-column
      label="Employee ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="Employee Name"
      prop="name"
      width="200"
      sortable>
    </el-table-column>
    <el-table-column
      label="Date of Birth"
      prop="dob"
      width="100">
    </el-table-column>
    <el-table-column
      label="Department"
      prop="department"
      width="150"
      sortable>
    </el-table-column>
    <el-table-column
      label="Position"
      prop="position">
    </el-table-column>
    <el-table-column
      label="Phone"
      prop="phone">
    </el-table-column>
    <el-table-column
      label="Email"
      prop="email">
    </el-table-column>
    <el-table-column
      align="right"
      width="170">
      <template slot-scope="scope">
        <el-button
          class="EditEmployees__button"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          class="DeleteEmployees__button"
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
import moment from 'moment'

export default {
    name: 'Employees',
data() {
      return {
        employees: []
      }
    },
    created(){
        let ref = db.collection('employees')
        ref.get().then(snapshot => {
          if(snapshot){  
            snapshot.forEach(doc => {
              let employee = doc.data()
              this.employees.push({
                id: doc.id,
                name: employee.name,               
                dob: moment(employee.dob).format('L'),
                department: employee.department,
                position: employee.position, 
                phone: employee.phone,               
                email: employee.email                               
              })
              console.log(this.employees)
            });
          }
        })
    },

    methods: {
      indexMethod(index) {
        return 1;
      },
      handleAddEmployee(){
        this.$router.push({ name: 'NewEmployee' })
      },
      handleEdit(index, row) {
        this.$router.push({ name: 'EditEmployee', params: { employee_id: row.id}})
      },
      handleDelete(index, row) {
        db.collection('employees').doc(row.id).delete()
        .then(() => {
        this.employees = this.employees.filter(employee => {
          return employee.id != row.id
        })
      })
      }
  }    
}
</script>

<style>
.cell{
  text-align: center;
}
.all-employee{
  padding: 2.5em;
  max-width: 80%;
  margin-left: 230px;
}
.AddEmployee__button{
  margin: 2em;
  float: left;
}

.DeleteEmployees__button, .EditEmployees__button {
  margin: .20em;
}
</style>