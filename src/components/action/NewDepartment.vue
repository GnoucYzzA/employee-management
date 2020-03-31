<template>
    <div class="new-department">
        <h1 class="NewDepartment__title">
            New Department
        </h1>
        <el-form 
            :model="department" 
            :rules="rules" 
            ref="department" 
            label-width="200px">
          <el-form-item 
            label="Department ID" 
            prop="deptID">
            <el-input 
                v-model="department.deptID">
            </el-input>
          </el-form-item>
          <el-form-item 
            label="Name" 
            prop="deptName">
            <el-input v-model="department.deptName">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
                type="primary" 
                @click="onSubmit('department')"
                class="create-button">
                    Create
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
      name: 'NewDepartment',
      data() {
        return {
          department: {
            deptID: '',
            deptName: ''
          },
          rules: {
            deptID: [
              { required: true, message: 'Department ID is required', trigger: 'blur' },
              { min: 2, max: 5, message: 'Input length should be 2-5 characters', trigger: 'blur' }
            ],
            deptName: [
              { required: true, message: 'Please input department name', trigger: 'blur' },
              { min: 5, max: 30, message: 'Input length should be 5-30 characters', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let ref = db.collection('departments').doc(this.department.deptID)
              ref.set({
                  department_name: this.department.deptName
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
.new-department{
    max-width: 50%;
    margin: 1em auto;
}
.NewDepartment__title{
    text-align: center;
}

</style>