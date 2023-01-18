<template>
  <div id="app">
    <div v-if="showApp" class="loader">
      <img
        src="./assets/logo.gif"
        width="300"
        height="200"
        style="margin-top: 17%"
        alt="404 image"
      />

   
    </div>

    <appNavUser v-if="userAuth" :imageSrc="acc.image" />
    <appNav v-if="!userAuth" />

    <div class="page-wrapper">
      <router-view />
    </div>

    <!-- <div class="
    home"></div> -->

    <footerSec />
  </div>
</template>

<script>
import appNav from "@/components/navComponent";
import appNavUser from "@/components/navComponentInner.vue";
import Vue from "vue";

import footerSec from "@/components/footer.vue";
import carousel from "vue-owl-carousel";



export default {
  name: "app",
  // metaInfo: {
  //   title: 'Default App Title',
  //   titleTemplate: '%s | vue-meta Example App',
  //   htmlAttrs: {
  //     lang: 'en-US'
  //   },
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'description', content: 'An example Vue application with vue-meta.' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  //   ]
  // },

  components: {
    appNav,
    footerSec,
    appNavUser,
    carousel,
  },

  data() {
    return {
      acc: null,
      user: null,
      userAuth: null,
      showApp: true,
      color: "#022d47",
      loading: false,
      width: "",
      height: "",
      verifiy: undefined,
    };
  },


  async mounted() {
    this.axios
      .get("https://dashboard.arabicreators.com/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((r) => {
        if (r.data.code == 200) {
          this.acc = r.data.data;

          // this.$store.dispatch('user',res.data)
          this.user = r.data;

          if (this.user) {
            localStorage.setItem("user", true);
          } else if (!this.user) {
            localStorage.removeItem("user");
          }

          if (localStorage.getItem("user")) {
            this.userAuth = localStorage.getItem("user");
          } else if (!localStorage.getItem("user")) {
            this.userAuth = null;
          }

          this.verifiy = this.acc.email_verified;

          localStorage.setItem("verifiy", this.verifiy);

          // alert(localStorage.getItem('verifiy'))

          console.log(r.data);
          console.log(localStorage.getItem("token"));

          localStorage.setItem("userId", r.data.data.id);

          localStorage.setItem("mention", r.data.data.mention);

          localStorage.setItem("profileType", r.data.data.type);

          localStorage.setItem("name", r.data.data.name);


        }

    //    var channel = pusher.subscribe('chat-user');
    // // Bind a function to a Event (the full Laravel class)
    // channel.bind('App\\Events\\ChatUser', function(data) {

      
    //   alert(data)});


   

      });

    // this.axios.get("https://dashboard.arabicreators.com/api/home", {

    // }).then((res => {

    // }))

    setTimeout(() => (this.showApp = !this.showApp), 5000);

    // localStorage.setItem('s',false)


  


  },

  methods: {
    showAppLoader() {
      this.showApp = !this.showApp;
    },
  },
};
</script>

<style lang="scss">
.page-wrapper {
  min-height: 90vh;

  @media screen and (max-width: 767px) {
    min-height: 100px;
  }
}

#app {
  font-family: "Tajawal", sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  // min-height: 100%;

  .home {
    width: 100%;
  }

  .loader {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 500%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 50;
  }

  .v-spinner {
    margin-top: 20%;
  }
}
</style>


<style>
@media (max-width: 557px) {
  footer .footer-col form .input {
    width: 100% !important;
  }
}
</style>