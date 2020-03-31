<template>
    <div class="all-position" v-if="positions">
      <el-button 
         class="AddPosition__button" 
         type="primary" 
         icon="el-icon-circle-plus" 
         plain
         @click="handleAddPos">
        </el-button>
        <el-table
          :data="positions"       
          style="width: 100%"
          max-height="600"
          fit
          border>
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="Position"
            prop="position_name"
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
    name: 'AllPosition',
data() {
      return {
        positions: []
      }
    },

 created(){
        db.collection('positions').get()
        .then(snapshot => {
          if(snapshot){  
            snapshot.forEach(doc => {
              let position = doc.data()
              position.id = doc.id
              position.employees = []
              var ref = db.collection('employees').where('position', '==' , position.id);
              ref.get().then(each => {
                if(each){
                 each.forEach(data =>{
                   position.employees.push(data.id)
                 })
                }
              })
              this.positions.push({
                id: position.id,
                position_name: position.position_name,
                position_employee: position.employees,
              })
            });
          }
        })
    },
    methods: {
      handleAddPos(){
        this.$router.push({ name: 'NewPosition' })
      },
      handleEdit(index, row) {
        this.$router.push({ 
          name: 'EditPosition', params: { position_id: row.id }
        })
      },
      handleDelete(index, row) {
        db.collection('positions').doc(row.id).delete()
        .then(() => {
        this.positions = this.positions.filter(position => {
          return position.id != row.id
        })
      })
      }
      
    }
}
</script>

<style>
.all-position{
  padding: 2em;
  max-width: 80%;
  margin-left: 230px;
}
.AddPosition__button{
    float: left;
    margin: 2em;
}
</style>