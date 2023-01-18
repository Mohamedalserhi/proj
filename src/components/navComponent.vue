<template>
  <!-- <nav>
    <router-link to="/" tag="li" exact>Home</router-link> |
    <router-link to="/about" tag="li">About</router-link> |
    <router-link to="/blog" tag="li">blog</router-link> |
    <router-link to="/OurServices" tag="li">OurServices</router-link> |
    <router-link to="/store" tag="li">store</router-link> |
    <router-link to="/pdocast" tag="li">pdocast</router-link> |
  </nav> -->

    <div class="">
    <nav class="navbar navbar-expand-lg">
    <div class="container">
              <div class="" @click="drawer = true" style="cursor:pointer" >
          <i class="fa-solid fa-bars text-white fs-4" ></i>
        </div>

      <router-link to="/" class="navbar-brand"
        ><img src="../assets/siteLogo/LOGO-SITE.png" alt=""
      /></router-link>


      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav m-auto">
          <router-link to="/"  class="nav-link nav-item"
            >الرئيسية</router-link>
          <router-link to="/OurServices"  class="nav-link">خدماتنا</router-link>
          <router-link to="/videos"  class="nav-link">الفيديوهات</router-link>
          <router-link to="/blog"  class="nav-link">المقالات</router-link>
          <router-link to="/ArabiPodcast"  class="nav-link">بودكاست</router-link>
          <router-link to="/Consulting"  class="nav-link">الاستشارات</router-link>

          <!-- <router-link to="/About" class="nav-item nav-link">About</router-link> -->
        </div>

        <i class="fa-solid fa-magnifying-glass text-white ms-4"></i>
        <div class="d-flex btns">
          <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> -->
          <router-link to="/createAccount" class="register btn btn-outline-success ms-2" type="">اشتراك</router-link>
          <router-link to="/signIn" class="btn  btn-outline-success signIn" type="">
            تسجيل الدخول
          </router-link>
        </div>
      </div>
    </div>
  </nav>

      <el-drawer
  :visible.sync="drawer"
  :direction="direction"
  
  :size="'20%'"
  >


      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      
     >

        <el-menu-item index="1" @click="drawer = ! drawer">
          <router-link to="/createAccount"   class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>انضم كمستقل</span>
            <i class="el-icon-s-custom"></i>
          </router-link>
        </el-menu-item>

      <el-submenu index="2" @click="drawer = ! drawer">
        <template slot="title">
          <span>الاقسام</span>
          <i class="el-icon-menu list-icon"></i>

        </template>
        
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="drawer = ! drawer"><router-link to="/blog">المقالات</router-link></el-menu-item>
          <el-menu-item index="1-2" @click="drawer = ! drawer"><router-link to="/OurServices">الخدمات</router-link></el-menu-item>
          <el-menu-item index="1-3" @click="drawer = ! drawer"><router-link to="/Arabipodcast">البودكاست</router-link></el-menu-item>
          <el-menu-item index="1-4" @click="drawer = ! drawer"><router-link to="/videos">الفيديوهات</router-link></el-menu-item>
          <el-menu-item index="1-5" @click="drawer = ! drawer"><router-link to="/Consulting">الاستشارات</router-link></el-menu-item>
        </el-menu-item-group>
     
      </el-submenu>

         <el-menu-item index="8" @click="drawer = ! drawer" class="d-lg-none">
          <router-link to="/createAccount"   class="dis">
            <i class="el-icon-arrow-left"></i>
            <span> اشتراك</span>
            <i class="el-icon-edit"></i>
          </router-link>
        </el-menu-item>


           <el-menu-item index="8" @click="drawer = ! drawer" class="d-lg-none">
          <router-link to="/signIn"   class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>تسجيل الدخول</span>
            <i class="el-icon-edit"></i>
          </router-link>
        </el-menu-item>

      <!-- <el-menu-item index="3">
       
       <router-link to="/marketerProfile" class="dis">
         <i class="el-icon-arrow-left"></i>
        <span>الملف الشخصي</span>
        <i class="el-icon-user"></i>
       </router-link>

      </el-menu-item>
      <el-menu-item index="4">
       <router-link to="/editPassword" class="dis">
         <i class="el-icon-arrow-left"></i>
        <span>تغيير كلمة المرور</span>
        <i class="el-icon-edit"></i>
       </router-link>
        

      </el-menu-item> -->
    </el-menu>

</el-drawer>
</div>

  
</template>

<script>

import {mapGetters} from 'vuex'
export default {
  name: "headerNav",

  // computed:{
  //     ...mapGetters(['user'])
  // }


  data() {
    return {
      drawer: false,
      direction: 'rtl',
    }
  },
};
</script>

<style lang="scss" scoped>

.navbar {
  padding: 20px;
  direction: rtl;
  position: relative;
  z-index: 5;
  width: 100%;
    background-color: var(--darkColor) !important;
font-family: 'Tajawal', sans-serif;

  .nav-link {
    color: white;
    font-weight: 600;
    font-size: 18px;
    text-transform: capitalize;
    margin-left: 10px;
    &:hover {
      color: var(--mainColor);
      text-decoration: underline;
    }
  }

  .navbar-brand{
    height: 60px;
  }

    .navbar-brand img{
    height:100%;
  }

  .nav-item.active {
    color: var(--mainColor);
    text-decoration: underline;
  }

  .btns {
    button {
      color: black;
      border-color: var(--mainColor) ;
      padding: 4px 20px;
      margin-left: 5px;
      text-transform: capitalize;
      font-weight: 700;
    }

    .signIn {
      background-color: var(--mainColor) !important;
      color: black;
    }
  }

  .fa-magnifying-glass {
    font-size: 20px;
  }

  .register{
      color: var(--mainColor);
      border-color: var(--mainColor) ;

      &:hover{
              background-color: var(--mainColor) !important;
      color: black;
      }
  }
}


// [class^="el-icon-"] {
//   font-size: 20px !important;
//   border-left:none !important;
//   padding: 8px;
//   margin: 5px;
// }
</style>

<style lang="scss">
.el-icon-bell,
.el-icon-message {
  font-size: 20px;
  color: white;
}

.el-dropdown-link {
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}


.dropdown-menu {
  border: none !important;
  border-radius: 5px !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

.dropdown-item {
  color: #747474;
}

.el-menu-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-submenu__title{
    display: flex;
  justify-content: center;
  align-items: center;
}

.el-submenu__icon-arrow{
  right: unset !important;
  left: 27px;
}

.list-icon{
  position: absolute;
  right: 20px;
}

.el-submenu .el-menu-item{
  display: block;
  padding: 0 !important;
}

.dis{
  display: flex !important;
  justify-content: space-between;
  align-items: center;
}

.allNots{
    text-decoration: none;
    color: black;
    position: absolute;
    right: 12px;
    bottom: 10px;
    display: block;
}

ul li a{
    cursor: pointer;
    color: var(--darkColor);
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;


}
</style>