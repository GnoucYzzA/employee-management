<template>
<div class="content">
        <el-row 
            type="flex" 
            class="bg-center" 
            justify="center">
            <el-col :span="2">
                <div> 
                <img class="main__logo" 
                    src="@/assets/staff.png"> 
                </div>
            </el-col>
        </el-row>
        <el-row
            type="flex"
            class="welcome-row"
            justify="center">
          <el-col :span="1">
              <div class="welcome-title">
                <h1>Welcome!</h1>
              </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{

    }
  }
}
</script>

<style>
.main__logo{
    height: 15em;
    width: 20em;
}
.bg-center {
    margin-top: 10em;
 }
.welcome-title{
  font-weight: bolder;
  margin: 0 3.5em;
}
</style>