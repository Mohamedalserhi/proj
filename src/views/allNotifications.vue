<template>
  <div class="notfy">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">الرئيسية</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/allNotifications">الاشعارات</router-link>
          </li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-lg-4"></div>

        <div class="col-lg-8">
          <div
            class="text-center m-4 no-notification"
            v-if="notification.length == 0"
          >
            <img
              src="../assets/no-alarm.png"
              class="m-auto"
              alt=""
              style="width: 150px"
            />
            <p class="fw-bold mt-4 text-center">لا يوجد اشعارات</p>
          </div>

          <div class="notfy-main" v-if="notification.length > 0">
            <div class="notfy-item" v-for="item in notification" :key="item.id">
              <div class="notfy-body">
               <router-link :to="`/notification/${item.id}`" 
                    style="color: black; text-decoration: none">
                 <p v-html="item.title" class="mb-1"></p>
                <span>{{ item.time }}</span>
               </router-link>
              </div>

              <div class="user-img">
                <img src="../assets/notification.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";

export default {
  data() {
    return {
      carts: undefined,
      checkout: undefined,
      itemPrice: undefined,
      sumPrice: 0,
      itemsLength: undefined,
      show: false,
      notification: undefined,
    };
  },

  components: {},

  mounted() {
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/my_notification", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.notification = res.data.data;
      });
  },

  methods: {
    deleteItem(id) {
      this.axios
        .delete(
          `https://dashboard.arabicreators.com/api/delete_from_carts/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);

          this.$router.go();

          localStorage.setItem(
            "itemCount",
            localStorage.getItem("itemCount") - 1
          );
          this.$store.dispatch("count", localStorage.getItem("itemCount"));
        });
    },

    pay() {
      this.show = !this.show;
      window.scrollTo(0, 0);

      Vue.axios
        .get("https://dashboard.arabicreators.com/api/checkout", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((r) => {
          this.checkout = r.data.data;

          // window.location=`${r.data.data.link}`
          window.open(`${r.data.data.link}`, "_blank");

          this.show = !this.show;
        });
    },

    // this.$store.dispatch('user',res.data.token)
  },
};
</script>


<style lang="scss">
.notfy .breadcrumb {
  direction: rtl !important;
  padding: 10px;
  .breadcrumb-item {
    font-size: 20px;
    color: rgb(41, 41, 41);
    font-weight: 700;
    a {
      color: rgb(45, 45, 45);
      text-decoration: none;
    }

    &::before {
      float: right;
      color: rgb(91, 91, 91);
      margin-left: 5px;
    }
  }
}
</style>


<style lang="scss" scoped>
.no-notification {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: 20px;
  border-radius: 8px;
}

.notfy {
  overflow: hidden;
  font-family: "Tajawal", sans-serif;
  text-align: right;

  h2 {
    padding-top: 60px;
    text-align: right;
    margin-bottom: 15px;
  }

  p {
    text-align: right;
  }

  .notfy-main {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 50px;

    .notfy-item {
      padding: 10px;
      margin: 10px;
      display: flex;
      justify-content: end;
      align-items: center;
      border-bottom: 1px solid rgb(193, 193, 193);
      .user-img {
        width: 80px;
        height: 80px;
        margin: 15px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .notfy-body {
        p {
          font-size: 20px;
        }

        span {
          font-size: 14px;
          color: rgb(118, 118, 118);
        }
      }
    }
  }
}
</style>


