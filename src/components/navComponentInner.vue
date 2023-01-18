<template>
  <div class="">
    <el-alert v-if="verifiy == 0" class="text-center" title="رجاءً قم بتوثيق بريدك الالكتروني" type="error" :closable="false">
    </el-alert>
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <div class="" @click="drawer = true" style="cursor: pointer">
          <i class="fa-solid fa-bars text-white fs-4"></i>
        </div>

        <a class="navbar-brand" href="/"
          ><img src="../assets/siteLogo/LOGO-SITE.png" alt=""
        /></a>


        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav m-auto">
            <router-link to="/" class="nav-link nav-item" 
              >الرئيسية</router-link
            >

            <router-link to="/OurServices"   class="nav-link"
              >خدماتنا</router-link
            >
            <router-link to="/videos"  class="nav-link" >الفيديوهات</router-link>
            <router-link to="/blog"  class="nav-link">المقالات</router-link>
            <router-link to="/ArabiPodcast"  class="nav-link"
              >بودكاست</router-link
            >
            <router-link to="/Consulting" class="nav-link"
              >الاستشارات</router-link
            >
          </div>

          <el-badge
            :value="this.$store.state.count"
            class="item"
            type="primary"
          >
            <router-link to="/Cart"
              ><i
                class="fa-solid fa-cart-shopping text-white ms-4"
                style="font-size: 18px"
              ></i
            ></router-link>
          </el-badge>

          <!-- <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-message"></i>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item command="b">Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->

          <div class="dropdown">
            <el-badge
              :value="this.$store.state.notification"
              class="item"
              type="primary"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="fa-solid fa-bell text-white ms-4"
                style="font-size: 18px"
                alt=""
              ></i>
            </el-badge>

            <ul
              class="dropdown-menu"
              style="height: 250px; overflow-y: unset; width: 250px"
              v-if="notification"
            >
              <ul class="p-0" v-if="notification.length > 0" style="overflow-y:auto; height:80%;">
                <li class="" v-for="item in notification" :key="item.id">
                  <a
                    href=""
                    @click.prevent="showNotification(item.id)"
                    style="color: black; text-decoration: none"
                  >
                    <div
                      class="p-2 pe-3"
                      style="
                        border-bottom: 1px solid #eee;
                        color: #409eff;
                        text-align: right;
                      "
                    >
                      <h6 class="mb-0">{{ item.title }}</h6>
                      <span style="color: #808080; font-size: 14px">{{
                        item.time
                      }}</span>
                    </div>
                  </a>
                </li>
               
              </ul>
                 <router-link class="allNots" to="/allNotifications"
                  >عرض جميع الاشعارات <i class="el-icon-message-solid"></i>
                </router-link>
              <span
                class="text-center"
                style="position: relative; right: -20px"
                v-if="  notification.length == 0"
              >
                لا يوجد اي اشعارات بعد.
              </span>
            </ul>
          </div>

          <div class="dropdown">
              <el-badge
              :value="chat_count"
              class="item"
              type="primary"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
               <i
                class="fa-solid fa-envelope text-white ms-4"
                style="font-size: 18px"
              ></i>

            </el-badge>

            <div class="" data-bs-toggle="dropdown" aria-expanded="true">
           
            </div>
            <ul
              class="dropdown-menu"
              style="height: 250px; overflow-y: auto; width: 250px"
              v-if="massage"
            >
              <li class="" v-for="item in massage" :key="item.user_id" style="border-bottom:1px solid #eee;">
                <a
                  :href="`/chat/${item.mention}`"
                  style="color: black; text-decoration: none"
                >
                  <div class="d-flex align-items-center p-3">
                    <div class="img-box ms-2" style="width: 40px;overflow:hidden">
                      <img :src="item.image" alt="" style="width: 100%;border-radius:50%;height:40px" />
                    </div>
                    <h6>{{ item.user_name }}</h6>
                  </div>
                </a>
                <!-- <el-divider></el-divider> -->
              </li>
                                        <span
                class="text-center"
                style="position: relative; right: -29px"
                v-if="massage.length == 0"
              >
                لا يوجد اي رسائل بعد.
              </span>
            </ul>


          </div>

          <div @click="verifiyCh">
            <div
              
              v-if="showBeMarketer"
              class="btn ms-2 beMarketer"
              type=""
            >
              انضم كـ صانع محتوى
            </div>
          </div>

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
            <img
              :src="imageSrc"
              class="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              alt=""
              width="45px"
              height="45px"
              style="border-radius: 50%"
            />
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click.prevent="profile" href="#"
                  >الحساب الشخصي</a
                >
              </li>
              <li>
                <a class="dropdown-item" @click.prevent="logOut" href="#"
                  >تسجيل الخروج</a
                >
              </li>
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

    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      
      :size="'20%'"
    >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"

      >


              <el-menu-item index="1" v-if="showBeMarketer">
          <a @click="verifiyCh"  class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>انضم كصانع محتوى</span>
            <i class="el-icon-s-custom"></i>
          </a>
        </el-menu-item>



          <el-menu-item index="1" @click="drawer = ! drawer">
          <router-link to="/CreateService" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>اضافة خدمة</span>
            <i class="
                el-icon-circle-plus-outline"></i>
          </router-link>
        </el-menu-item>


        <el-menu-item index="1" @click="drawer = ! drawer">
          <router-link to="/Purchases" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>المشتريات</span>
            <i class="el-icon-goods"></i>
          </router-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>الاقسام</span>
            <i class="el-icon-menu list-icon"></i>
          </template>

          <el-menu-item-group>
            <el-menu-item index="2-1" @click="drawer = ! drawer"
              ><router-link to="/blog">المقالات</router-link></el-menu-item
            >
            <el-menu-item index="2-2" @click="drawer = ! drawer"
              ><router-link to="/OurServices"
                >الخدمات</router-link
              ></el-menu-item
            >
            <el-menu-item index="2-3" @click="drawer = ! drawer"
              ><router-link to="/Arabipodcast"
                >البودكاست</router-link
              ></el-menu-item
            >
            <el-menu-item index="2-4" @click="drawer = ! drawer"
              ><router-link to="/videos">الفيديوهات</router-link></el-menu-item
            >
            <el-menu-item index="2-5" @click="drawer = ! drawer"
              ><router-link to="/Consulting"
                >الاستشارات</router-link
              ></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>

       

         <el-menu-item index="3" @click="drawer = ! drawer" >
          <router-link to="/allNotifications" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>الاشعارات</span>
            <i class="el-icon-message-solid"></i>
          </router-link>
        </el-menu-item>

         <el-menu-item index="4" @click="drawer = ! drawer">
          <router-link to="/Cart" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>السلة</span>
            <i class="el-icon-shopping-cart-2"></i>
          </router-link>
        </el-menu-item>


          <el-menu-item index="5" @click="drawer = ! drawer">
          <router-link to="" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>الرسائل</span>
            <i class="el-icon-chat-line-square"></i>
          </router-link>
        </el-menu-item>

         <el-menu-item index="6" @click="drawer = ! drawer">
          <router-link to="/marketerProfile" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>الملف الشخصي</span>
            <i class="el-icon-user"></i>
          </router-link>
        </el-menu-item>


         <el-menu-item index="7" class="d-lg-none" v-if="showBeMarketer"  @click="verifiyCh ; drawer = ! drawer">
          <router-link to="/editPassword" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>انضم ك صانع محتوى</span>
            <i class="el-icon-edit"></i>
          </router-link>
        </el-menu-item>


        <el-menu-item index="8" @click="drawer = ! drawer" class="d-lg-none">
          <router-link to="/editPassword" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>تغيير كلمة المرور</span>
            <i class="el-icon-edit"></i>
          </router-link>
        </el-menu-item>


        <el-menu-item index="9" @click="drawer = ! drawer" class="d-lg-none">
          <div  @click.prevent="logOut" class="dis">
            <i class="el-icon-arrow-left"></i>
            <span>تسجيل الخروج</span>
            <i class="el-icon-edit"></i>
          </div>
        </el-menu-item>

      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Vue from "vue";

export default {
  name: "headerNavInner",
  computed: {
    ...mapGetters(["count"]),
  },
  props: ["imageSrc"],

  data() {
    return {
      showBeMarketer: null,
      massage: undefined,
      itemsLength: this.$store.state.count,
      notifiy: this.$store.state.notification,
      Clickshow: localStorage.getItem("showBtn"),
      notification: undefined,
      drawer: false,
      direction: "rtl",
      verifiy:localStorage.getItem('verifiy'),
      profile2: null,
      chat_count:undefined

    };
  },

  mounted() {



    this.profileData()
    // alert(this.Clickshow)
    // alert(this.verifiy)
    this.$store.dispatch("count", localStorage.getItem("itemCount"));

    this.$store.dispatch(
      "notification",
      localStorage.getItem("itemNotification")
    );

    // alert(this.itemsLength)

    // this.itemsLength=localStorage.getItem('itemCount');
    if (localStorage.getItem("profileType") != "marketer") {
      this.showBeMarketer = true;
    } else if (localStorage.getItem("profileType") == "marketer") {
      this.showBeMarketer = false;
    }

        axios
      .get("https://dashboard.arabicreators.com/api/chat_count", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.chat_count = res.data.data;

      });

    axios
      .get("https://dashboard.arabicreators.com/api/all_message", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.massage = res.data.data;

        // console.log(postData);
      });

    axios
      .get("https://dashboard.arabicreators.com/api/carts", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // this.itemsLength = res.data.data.count;
        // console.log(postData);
      });

    axios
      .get("https://dashboard.arabicreators.com/api/my_notification", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.notification = res.data.data;

        for (let i = 0; i < res.data.data.length; i++) {
          var count = 0;

          // count = parseInt(count)

          localStorage.setItem("itemNotification", 0);

          if (res.data.data[i].is_read == 1) {
            count = count;
            // alert(count)
            // count-=1

            localStorage.setItem("itemNotification", parseInt(count));
            // alert(count)
            // alert('0'+this.$store.state.notification)
          } else if (res.data.data[i].is_read == 0) {
            count += 1;
            localStorage.setItem("itemNotification", parseInt(count));
            // alert('1'+this.$store.state.notification)
          }
        }

        // console.log(postData);
      });

    this.$store.dispatch(
      "notification",
      localStorage.getItem("itemNotification")
    );
  },

  methods: {


        profileData() {
      Vue.axios
        .get("https://dashboard.arabicreators.com/api/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          this.profile2 = res.data.data;
          this.type = this.profile.type;
          // localStorage.setItem("pio", res.data.data.pio);
        });
    },

    verifiyCh(){
      if(this.verifiy==1){
        this.$router.push('/UpdateProfile')
      }else if(this.verifiy==0){
        this.$message.error('يجب ان تقوم بتأكيد بريدك الالكتروني');

      }
    },
    // stsfun(){
    //           // localStorage.setItem('sts',false)
    //           this.$store.dispatch("sts", localStorage.getItem('sts') );
    //           // this.click=this.$store.state.sts
    //           //     alert(this.click)

    // },
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$router.go();

     this.$store.dispatch(
      "notification", 0
                            );

      this.$store.dispatch("count", 0);

      this.$message("تم تسجيل الخروج");

      // localStorage.setItem("itemNotification",0)

      // localStorage.setItem("itemCount",0)

      localStorage.removeItem('email')
      localStorage.removeItem('itemCount')
      localStorage.removeItem('itemNotification')
      localStorage.removeItem('user')

      localStorage.removeItem('requiredChangePassword')
      localStorage.removeItem('type')
      localStorage.removeItem('pio')
      
    },

    // showNotification(rul){
    //   this.$router.push(rul)
    // },

    showNotification(id) {
      this.$router.push(`/notification/${id}`);
    },

    profile() {
      this.$router.push("/marketerProfile");
      // this.$router.go();
    },
  },
};
</script>

<style lang="scss" scoped>
.allNots {
  text-decoration: none;
  color: black;
  position: absolute;
  right: 12px;
  bottom: 10px;
  display: block;
}

ul li a {
  cursor: pointer;
  color: var(--darkColor);
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.navbar {
  padding: 20px;
  direction: rtl;
  position: relative;
  z-index: 5;
  width: 100%;
  // background-color: #565353 !important;
  background-color: var(--darkColor) !important;

  font-family: "Tajawal", sans-serif;

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


@media (max-width: 986px) {

.el-drawer{
  width: 40% !important;
}

}

@media (max-width: 557px) {

.el-drawer{
  width: 60% !important;
}

}


.el-alert__content{
  margin: auto !important;
}

.el-alert__title{
  font-size: 15px !important;
}

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

.el-menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-submenu__title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-submenu__icon-arrow {
  right: unset !important;
  left: 27px;
}

.list-icon {
  position: absolute;
  right: 20px;
}

.el-submenu .el-menu-item {
  display: block;
  padding: 0 !important;
}

.dis {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
}
</style>



<style lang="scss">
//  nav li:hover,
//  nav li.router-link-active,
//  nav li.router-link-exact-active {
//    background-color: indianred;
//    cursor: pointer;
//  }


 .navbar-nav .nav-link.active, .navbar-nav .show>.nav-link{
    text-decoration: underline;
    color: white !important;
 }
</style>