<template>
    <div class="edit-position">
        <h1 class="EditPosition__title">
            Edit Position
        </h1>
        <el-form 
            :model="position" 
            :rules="rules" 
            ref="position" 
            label-width="200px">
          <el-form-item 
            label="Position Name" 
            prop="position_name">
            <el-input v-model="position.position_name">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
                type="primary" 
                @click="onSubmit('position')"
                class="posEdit__btn">
                    Edit
            </el-button>
            <el-button 
                type="danger" 
                @click="handleCancel('position')"
                class="posCancel__btn">
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
          position: {},
          rules: {
            position_name: [
              { required: true, message: 'Position name is required', trigger: 'blur' },
              { min: 5, max: 25, message: 'Input length should be at least 5 characters. Max is 25', trigger: 'blur' }
            ]
          }
        };
      },
      created(){
        let ref = db.collection('positions')
        ref.doc(this.$route.params.position_id).get().then(doc => {
            if(doc){
                    this.position = doc.data()
                    this.position.id = doc.id
                    console.log(this.position.id)

            }
        })
      },
      methods: {
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let position = db.collection('positions').doc(this.position.id)
              position.update({
                  position_name: this.position.position_name
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
.edit-position{
    max-width: 50%;
    margin: 1em auto;
}
.EditPosition_title{
    text-align: center;
}
.PosEdit__btn{
  display: inline-block;
  margin: auto;
}

</style>