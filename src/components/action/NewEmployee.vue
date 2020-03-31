<template>
    <div class="new-employee">
        <h1 class="NewEmployee__title">
            Employee informations
        </h1>
        <el-form 
            :model="employee" 
            :rules="rules" 
            ref="employee" 
            label-width="120px">
          <el-form-item 
            label="Full name" 
            prop="name">
            <el-input 
                v-model="employee.name">
            </el-input>
          </el-form-item>
          <el-form-item 
            label="Phone" 
            prop="phone">
            <el-input 
                v-model="employee.phone">
            </el-input>
          </el-form-item>
        <el-form-item 
            label="Email" 
            prop="email">
            <el-input 
                v-model="employee.email">
            </el-input>
          </el-form-item>
          <el-form-item 
            label="Date of Birth" 
            required>
            <el-col :span="11">
              <el-form-item prop="dob">
                <el-date-picker 
                    type="date" 
                    placeholder="Date of birth" 
                    v-model="employee.dob" 
                    style="width: 100%;" 
                    format="yyyy/MM/dd"
                    value-format="timestamp"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item 
            label="Department" 
            prop="department">
            <el-select 
                v-model="employee.department" 
                placeholder="department...">
              <el-option 
              v-for="department in alldepartments"
              :key="department.id"
              :label="department.department_name"
              :value="department.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item 
            label="Position" 
            prop="position">
            <el-select 
                v-model="employee.position" 
                placeholder="Position...">
              <el-option      
              v-for="position in allposition"
              :key="position.id"
              :label="position.position_name"
              :value="position.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button 
                type="primary" 
                @click="onSubmit('employee')">
                    Create
            </el-button>
            <el-button 
                type="danger" 
                @click="handleCancel('employee')">
                    Cancel
            </el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import db from '@/firebase/init'
    export default {
      name: 'NewEmployee',
      data() {
        return {
          employee: {
            name: '',
            email: '',
            phone: '',
            dob: '',
            department: '',
            position: ''
          },
          allposition: [],
          alldepartments: [],
          rules: {
            name: [
              { required: true, message: 'Name is required', trigger: 'blur' },
              { min: 5, max: 25, message: 'You must input at least 5 characters', trigger: 'blur' }
            ],
            email: [
              { type: 'email', required: true, message: 'Email is required', trigger: 'blur' },
            ],
            phone: [
              {pattern: /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/, message: 'Please input correct phone number', trigger: 'blur' },
            ],
            dob: [
              { type: 'date', required: true, message: 'Date of birth is required', trigger: 'change' }
            ],
            department: [
              { required: true, message: 'Department is required', trigger: 'change' }
            ],
            
          }
        };
      },
      created(){
        //Get all Positions
        db.collection('positions').get()
        .then(snapshot => {
          if(snapshot){  
            snapshot.forEach(doc => {
              let position = doc.data()
              position.id = doc.id
              this.allposition.push(position)
            });
          }
        })
        //Get all departments
        db.collection('departments').get()
        .then(data => {
          if(data){  
            data.forEach(obj => {
              let department = obj.data()
              department.id = obj.id
              this.alldepartments.push(department)
            });
          }
        })
      },
      methods: {
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                db.collection('employees').add({
                    name: this.employee.name,
                    email: this.employee.email,
                    phone: this.employee.phone,
                    dob: this.employee.dob,
                    department: this.employee.department,
                    position: this.employee.position
                }).then(() => {
                    this.$router.push({name: 'Employee'})
                }).catch(err => {
                    console.log(err)
                })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        handleCancel(){
         this.$router.push({ name: 'Employee' })
         }
      }
    }
</script>

<style>
.new-employee{
    max-width: 50%;
    margin: 3em auto;
}
.NewEmployee__title{
    text-align: center;
}
</style>