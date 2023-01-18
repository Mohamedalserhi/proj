<template >
  <div class="blogItem">
    <!-- <app-nav-inner /> -->

    <!-- <appNavUser v-if="userAuth" :imageSrc="acc.image" />
    <appNav v-if="!userAuth" /> -->

    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
        <el-breadcrumb-item v-if="user"  >{{user.name}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item
          ><a href="" v-if="post && post.title">{{
            post.title
          }}</a></el-breadcrumb-item
        > -->
      </el-breadcrumb>
      <!-- <h2 v-if="post && post.title">{{ post.title }}</h2> -->

      <div  class="row">
        <div class="col-lg-8">
          <router-view></router-view>
        </div>

        <div class="col-lg-4">
          <div class="sideBar">
            <h5>جميع المحادثات</h5>

            <p v-if="!messages">لا يوجد محادثات بعد</p>

            <div class="" v-if="messages">
              <div
                class="allMassages pointer"
                v-for="item in messages"
                :key="item.user_id"
              >
                <router-link :to="`/chat/${item.mention}`" >
                  <div class="userMassageId d-flex">
                    <div class="img-box">
                      <img :src="item.image" alt="" />
                    </div>

                    <div class="item-info">
                      <h4>{{ item.user_name }}</h4>
                      <p>{{ item.user_type }}</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- <div class="markerter-item">
              <div class="img-cover">
                <img src="../assets/back.png" alt="" />
                <img :src="post.user_info.image" class="img-man" alt="" />
              </div>

              <div class="item-body">
                <h5 v-if="post && post.user_info.name">
                  {{ post.user_info.name }}
                </h5>
                <div class="stars">
                  <el-rate
                    v-model="post.user_info.rate"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div>
                <div class="info">
                  <div class="massege">
                    <i class="fa-regular fa-message"></i>
                  </div>

                  <div class="user">
                    <i class="fa-regular fa-user"></i>
                  </div>

                  <div class="star">
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import appNavInner from "@/components/navComponentInner.vue";
import axios from "axios";


export default {
  data() {
    return {
      user: null,
      all_message: undefined,
      messages: undefined,
    };
  },

  components: {
    appNavInner,
  },



  mounted() {
   axios
      .get("https://dashboard.arabicreators.com/api/all_message", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res2) => {
        this.messages = res2.data.data;
      });


  },

};
</script>



<style lang="scss" scoped>
.sideBar {
  height: 700px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 15px;

  h5 {
    margin-bottom: 20px;
    text-align: right;
  }

  .pointer {
    cursor: pointer;
  }

  .userMassageId {
    display: flex;
    margin-bottom: 10px;
    border: 1px solid rgb(226, 226, 226);
    padding: 15px;
    border-radius: 10px;
    align-items: center;

    .img-box {
      width: 50px;
      height: 50px;
      border: 2px solid black;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .item-info {
      text-align: right;
      margin-right: 10px;
      h4 {
        margin-bottom: 0px;
        font-size: 20px;
      }

      p {
      }
    }
  }
}

.blogItem {
  direction: rtl;
  font-family: "Tajawal", sans-serif;
  background-color: rgb(243, 243, 243);

  h2 {
    text-align: right;
    font-size: 40px;
    color: var(--darkColor);
    margin-bottom: 30px;
    font-weight: 600;
    position: relative;
  }

  .el-breadcrumb {
    display: flex;
    justify-content: start;
    margin-bottom: 15px;
    padding-top: 20px;

    .el-breadcrumb__item {
      font-size: 18px;
    }
  }

  .markerter-item {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 10px;
    border-radius: 15px;
    width: 70%;
    .img-cover {
      position: relative;
      top: 0;
      height: 200px;
      width: 100%;
      margin-bottom: 15px;

      img {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        filter: sepia(1);
      }

      .img-man {
        right: 10%;
        width: 75%;
        filter: sepia(0);
      }
    }

    .item-body {
      h5 {
        font-weight: 700;
        margin-bottom: 15px;
      }

      .stars {
        margin-bottom: 15px;
        .fa-star {
          color: gold;
          margin-left: 6px;
        }
      }

      .info {
        display: flex;
        justify-content: center;
        align-items: center;

        div {
          color: white;
          background: var(--darkColor);
          border-radius: 2px;
          padding: 6px 16px;
          margin: 8px;
        }
      }
    }
  }

  .comments {
    // background-color: #fdfdfd;
    border-radius: 5px;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin-bottom: 20px;
    background: white;

    .el-form-item {
      .el-form-item__content {
        margin-left: unset !important;
      }
    }
    button {
      width: 100%;
      background: transparent !important;
      border: none !important;
      height: 50px;
      // margin: 30px auto;

      img {
        width: 30px;
        height: 26px;
        margin-top: 0;
        transform: rotate(180deg);
      }
    }

    .allComments {
      display: flex;

      .sort {
        display: flex;
      }
    }

    .massage {
      margin-bottom: 10px;

      .sender {
        display: flex;
        justify-content: start;
        align-items: center;

        .img-box {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        span {
          font-weight: 700;
          color: var(--darkColor);
          font-size: 16px;
        }

        h6 {
          font-size: 13px;
        }
      }
    }
    h3{
      margin-bottom: 40px;
      font-weight: 700;
      font-size: 20px;
      text-align: right;
    }
    .scroll::-webkit-scrollbar {
      display: none;

    }

    .scroll{
      height: auto;
      overflow: unset;
      overflow-x: auto;
    }
    .massages {
      //   height: 400px;
      //   overflow-y: auto;
      margin-bottom: 20px;

      .massage {
        width: 100%;
        margin-bottom: 20px;
      }

      .massageBox {
        display: flex;
        justify-content: space-between;
        background: #5fa5eb;
        padding: 8px;
        border-radius: 19px;
        color: white;
        text-indent: 10px;
      }

      .massageContent {
        padding: 0;
        margin-bottom: 0 !important;
        font-weight: 700;
        p {
          margin-bottom: 0 !important;
        }
      }
    }
  }
}

a {
  text-decoration: none;
  color: #535151;
}

.userInfo {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 30px;
  background: white;

  .img-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
.el-form-item__content {
  margin-left: unset !important;
}

.ck.ck-editor {
  width: 95%;
}
</style>