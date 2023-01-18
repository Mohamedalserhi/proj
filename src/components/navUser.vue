<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="#"
        ><img src="../assets/siteLogo/LOGO-SITE.png" alt=""
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav m-auto">
          <a href="/" class="nav-item nav-link active">الرئيسية</a>
          <a href="/OurServices" class="nav-link">خدماتنا</a>
          <a href="/videos" class="nav-link">الفيديوهات</a>
          <a href="/blog" class="nav-link">المقالات</a>
          <a href="/pdocast" class="nav-link">بودكاست</a>

          <!-- <router-link to="/About" class="nav-item nav-link">About</router-link> -->
        </div>

        <i class="fa-solid fa-magnifying-glass text-white ms-4"></i>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-message"></i>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown >
          <span class="el-dropdown-link">
            <i class="el-icon-bell"></i>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click="logOut">تسجيل الخروج</el-dropdown-item> -->

            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
            <el-dropdown-item command="c">Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <a href="/createUserProfile" class="btn ms-2 beMarketer" type="">
          كن ماركتر
        </a>

        <!-- <el-dropdown @command="profile">
          <span class="el-dropdown-link">
            <img :src="imageSrc" alt="" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="profile">الحساب الشخصي</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->

        <div class="dropdown">
  
            <img :src="imageSrc" class=" dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false" alt="" width="45px" height="45px" style="border-radius:50%" />
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click.prevent="profile" href="#">الحساب الشخصي</a></li>
            <li><a class="dropdown-item" @click.prevent="logOut" href="#">تسجيل الخروج</a></li>
          </ul>
        </div>
        <div class="d-flex btns">
          <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> -->
          <!-- <button class="btn btn-outline-success" type="">اشتراك</button>
          <button class="btn btn-outline-success signIn" type=""> 
            تسجيل الدخول
          </button>-->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "headerNavInner",
  //   computed:{
  //     ...mapGetters(['user'])
  // },
  props: ["imageSrc"],

  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$router.go();
      this.$message("تم تسجيل الخروج");
    },

    profile() {
      this.$router.push("/userProfile");
      this.$router.go();
    },
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
  // background-color: #565353 !important;
  background-color: var(--darkColor) !important;

  font-family: 'Tajawal', sans-serif;


  .nav-link {
    color: white;
    font-weight: 700;
    font-size: 20px;
    text-transform: capitalize;
    margin-left: 20px;
    &:hover {
      color: var(--mainColor);
      text-decoration: underline;
    }

    .active {
      color: var(--mainColor) !important;
      text-decoration: underline;
    }
  }

  .navbar-brand {
    height: 60px;
  }

  .navbar-brand img {
    height: 100%;
  }

  .nav-item.active {
    color: var(--mainColor) !important;
    text-decoration: underline;
  }

  .btns {
    button {
      color: var(--darkColor);
      border-color: var(--mainColor);
      padding: 4px 20px;
      margin-left: 5px;
      text-transform: capitalize;
      font-weight: 700;
    }

    .signIn {
    }
  }

  .beMarketer {
    background-color: var(--mainColor);
    color: var(--darkColor);

    &:hover {
      background-color: var(--mainColor);
      color: white;
    }
  }

  .fa-magnifying-glass {
    font-size: 20px;
  }
}
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

// [class^="el-icon-"] {
//   font-size: 20px !important;
//   border-left:none !important;
//   padding: 8px;
//   margin: 5px;
// }

.dropdown-menu{
  border: none !important;
  border-radius: 5px !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

.dropdown-item{
      color: #747474;
}

</style>