<template>
    <div v-if="loading">
        ...جار التحميل
    </div>
    <div v-else class="main-content">
        <div class="userInfo">
          <div class="img-box">
            <img v-if="user" :src="user.image" alt="" />
          </div>
          <div class="text-end">
            <p v-if="user" v-html="user.pio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h4 v-if="user">{{ user.name }}</h4>
            <h4 v-if="user">{{ user.country.title }}</h4>
            <h4 v-if="user">{{ user.name }}</h4>
            <h4 v-if="user">{{ user.email }}</h4>
          </div>
        </div>
        <div class="comments">
          <form action="">
            <!-- <h3>الرسائل</h3>        
            <el-divider></el-divider> -->

            <h3>جميع الرسائل:</h3>

            <div class="scroll">
              <div v-if="allMassages" class="massages text-end">
                <div
                  class="massage text-end"
                  v-for="item in allMassages"
                  :key="item.id"
                >
                  <div class="d-flex">
                    <div class="sender">
                      <div class="img-box">
                        <img :src="item.sender.image" alt="" />
                      </div>
                      <div class="">
                        <!-- <h6>{{ item.type }}</h6> -->
                      </div>
                    </div>

                    <div class="">
                      <span style="font-size: 12px">{{
                        item.sender.name
                      }}</span>
                      <div class="massageBox">
                        <p class="massageContent" v-html="item.message"></p>
                      </div>
                      <span style="font-size: 12px; display: block">{{
                        item.time
                      }}</span>
                    </div>
                  </div>

                  <!-- <p v-html="msg"></p> -->

                  <!-- <el-divider></el-divider> -->
                </div>
              </div>
            </div>

            <div class="massages">
              <div class="massage text-end" v-for="item in chatObj" :key="item.id">
                <div class="d-flex">
                  <div class="sender">
                    <div class="img-box">
                      <img :src="item.image" alt="" />
                    </div>
                    <div class="">
                      <!-- <h6>{{ item.type }}</h6> -->
                    </div>
                  </div>

                  <div class="">
                    <span style="font-size: 12px">{{ item.name }}</span>
                    <div class="massageBox">
                      <p class="massageContent" v-html="item.message"></p>
                    </div>
                    <span style="font-size: 12px; display: block">{{
                      item.time
                    }}</span>
                  </div>
                </div>

                <!-- <p v-html="msg"></p> -->
              </div>
            </div>

            <p v-if="!allMassages">لا توجد رسائل حتى الأن ؟</p>


              <el-divider></el-divider>

            <div class="d-flex">
              <button
                class=""
                style="width: 70px"
                type="submit"
                @click.prevent="send"
                v-on:keyup.enter="send"

                
                ><img src="@/assets/send-message-1.png" alt="">
              </button>
              <input
                type="text"
                class="form-control rounded-pill"
                placeholder="كتابة رسالة"
                v-model="body"
                style="height: 50px"
              />
            </div>
          </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'ChatChennelPage',
        data() {
            return {
                chatObj: [],
                value: 5,
                body: null,
                RealetedBlog: {},
                plogId: null,
                user: null,
                msg: null,
                html: "",
                loading: true,
                allMassages: []
            }
        },
        watch: {
            '$route.params.mentionUser'(mentionUser) {
                this.initChat()
            }
        },
        methods: {
            send() {
                const receiver_id = localStorage.getItem("mainIdNew");

                const comment = new FormData();
                comment.append("message", this.body);
                comment.append("receiver_id", receiver_id);

                this.axios
                    .post(
                    "https://dashboard.arabicreators.com/api/send_messsage",
                    comment,
                    {
                        headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                    )
                    .then((resComment) => {
                    this.msg = resComment.data.data.message;


                    });

                this.body = "";

            },
            initChat() {
                this.loading = true;
                this.channel = this.$pusher.subscribe("chat-user");
                this.channel.bind("chat_user", (data) => {
                console.log(`data: ${data.data}`);

                this.chatObj.push({
                    message: data.message,
                    time: data.time,
                    id: data.id,
                    name: data.user_name,
                    image: data.user_image,
                });
                });



                const receiver_id = this.$route.params.mentionUser;

                axios
                .get(
                    `https://dashboard.arabicreators.com/api/get_markter/${receiver_id}`,
                    {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    }
                )
                .then((res) => {
                    this.user = res.data.data;        
                    localStorage.setItem("mainIdNew", this.user.id);
                        this.getMessages();

                });
            },
            getMessages() {
                this.allMassages = [];
                let urlMassage = `https://dashboard.arabicreators.com/api/all_message_between_user/${localStorage.getItem(
                    "mainIdNew"
                )}/${localStorage.getItem("userId")}`;

                axios.get(urlMassage, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }).then((res3) => {
                    this.allMassages = res3.data.data;
                    this.loading = false;
                });
            },

        },
        mounted() {
            this.initChat()
        }
    }
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