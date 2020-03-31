<template>
    <div class="edit-department">
        <h1 class="EditDepartment__title">
            Edit Department
        </h1>
        <el-form 
            :model="department" 
            :rules="rules" 
            ref="department" 
            label-width="150px">
          <el-form-item 
            label="Name" 
            prop="department_name">
            <el-input v-model="department.department_name">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
                type="primary" 
                @click="onSubmit('department')"
                class="edit-button">
                    Edit
            </el-button>
            <el-button 
                type="danger" 
                @click="handleCancel('department')">
                    Cancel
            </el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import db from '@/firebase/init'
    export default {
      name: 'EditDepartment',
      data() {
        return {
          department: { },
          rules: {
            department_name: [
              { required: true, message: 'Please input department name', trigger: 'blur' },
              { min: 5, max: 25, message: 'Length should be 5 to 25', trigger: 'blur' }
            ]
          }
        };
      },
      created(){
        let ref = db.collection('departments')
        ref.doc(this.$route.params.department_id).get().then(doc => {
            if(doc){
                    this.department = doc.data()
                    this.department.id = doc.id
                    console.log(this.department.id)

            }
        })
      },
      methods: {
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let department = db.collection('departments').doc(this.department.id)
              department.update({
                  department_name: this.department.department_name
              })                
              .then(() => 
                {
                    this.$router.push({ name: 'Department'})
                })
                .catch(err =>
                {
                    console.log(err)
                })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        handleCancel(){
         this.$router.push({ name: 'Department' })
         } 
      }
    }
</script>

<style>
.edit-department{
    max-width: 50%;
    margin: 1em auto;
}
.EditDepartment__title{
    text-align: center;
}

</style>