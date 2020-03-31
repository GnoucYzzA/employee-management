<template>
    <div class="new-position">
        <h1 class="NewPosition_title">
            New Position
        </h1>
        <el-form 
            :model="position" 
            :rules="rules" 
            ref="position" 
            label-width="200px">
          <el-form-item 
            label="Position ID" 
            prop="posID">
            <el-input 
                v-model="position.posID">
            </el-input>
          </el-form-item>
          <el-form-item 
            label="Name" 
            prop="posName">
            <el-input v-model="position.posName">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
                type="primary" 
                @click="submitForm('position')"
                class="PosCreate__btn">
                    Create
            </el-button>
            <el-button 
                type="danger" 
                @click="handleCancel('position')">
                    Cancel
            </el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import db from '@/firebase/init'
    export default {
      name: 'NewPosition',
      data() {
        return {
          position: {
            posID: '',
            posName: ''
          },
          rules: {
            posID: [
              { required: true, message: 'Position ID is required', trigger: 'blur' },
              { min: 2, max: 5, message: 'Input length should be at least 2 characters. Max is 5', trigger: 'blur' }
            ],
            posName: [
              { required: true, message: 'Position Name is required', trigger: 'blur' },
              { min: 5, max: 25, message: 'Input length should be at least 5 characters. Max is 25', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let ref = db.collection('positions').doc(this.position.posID)
              ref.set({
                  position_name: this.position.posName
              })                
              .then(() => 
                {
                    this.$router.push({ name: 'Position'})
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
         this.$router.push({ name: 'Position' })
         }
      }
    }
</script>

<style>
.new-position{
    max-width: 50%;
    margin: 1em auto;
}
.NewPosition_title{
    text-align: center;
}

</style>