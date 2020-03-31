<template>
<div class="nav-bar">
       <!-- Sidebar -->
<div class="sidebar  w3-bar-block" style="width:15%">
  <h3 class="w3-bar-item">Menu</h3>
        <router-link 
        :to="{ name: 'Department'}" 
        class="side__button">
            Departments
        </router-link>

        <router-link 
        :to="{ name: 'Employee'}" 
        class="side__button">
            Employees
        </router-link>

        <router-link 
        :to="{ name: 'Position'}" 
        class="side__button">
            Positions
        </router-link>
</div>

<!-- Page Content -->
<div style="margin-left: 15%">

<div class="w3-container top-bar">
  <img class="top__logo" src="@/assets/logo.png">
  <span>
      <router-link 
      :to="{ name: 'HomePage'}"
      class="text__logo">
      Employees Management
      </router-link></span>
</div>
</div>
    </div>
    <!-- <div class="header">
        <div class="header__inner">
            <div class="logo">
                <router-link 
                    :to="{ name: 'Home'}" 
                    class="logo__text">
                        Unitech
                </router-link>
            </div>
            <ul class="menu">
                <li class="menu__item">
                    <a href="" class="menu__link">
                        Home
                    </a>
                    <div class="menu__child">
                        <router-link 
                            :to="{ name: 'AllDepartment'}" 
                            class="menu__child-item">
                                <h4>Departments</h4>
                        </router-link>
                        <router-link 
                            :to="{ name: 'AllPosition'}" 
                            class="menu__child-item">
                                <h4>Positions</h4>
                        </router-link>
                        <router-link 
                            :to="{ name: 'AllStaff'}" 
                            class="menu__child-item">
                                <h4>Staffs</h4>
                        </router-link>
                    </div>
                </li>
                <li class="menu__item">
                    <a href="" class="menu__link">
                        About
                    </a>
                </li>
                <li class="menu__item">
                    <a href="" class="menu__link">
                        Contact
                    </a>
                </li>
            </ul>
        </div>

    </div> -->
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return{

        }
    }

}
</script>

<style>
.w3-bar-item {
    background: #3781ca;
    padding: 9.5px !important;
    margin: 0;
    font-weight: bold;
    
}
.sidebar {
    height: 100%;
    width: 100px;
    background-color: #f1f1f1;
    position: fixed;
    z-index: 1;
    overflow: auto;
}
.top__logo {
    height: 3em;
    width: 4em;
    margin: 5px 5px 5px 400px;
}
.text__logo {
    text-decoration: none;
    font-weight: bolder;
    font-size: 1.5em;
}
.side__button{
    width: 100%;
    display: block;
    padding: 8px 16px;
    text-align: left;
    border: none;
    white-space: normal;
    float: none;
    outline: 0;
    text-decoration: none;
}
.side__button:hover{
    background-color: #409eff;
}
.top-bar{
    background-color: #409eff;
    color: #fff;

}

</style>