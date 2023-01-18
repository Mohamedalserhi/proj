

<template>
  <div class="createTicket">
    <!-- <navbar /> -->
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">الدعم </a></el-breadcrumb-item>
        <el-breadcrumb-item>انشاء تذكرة</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <h2>البروفايل</h2>

        <el-tabs :tab-position="tabPosition" style="height: 200px">
          <el-tab-pane>
            <span slot="label"
              >معلومات البروفايل <i class="el-icon-user-solid ms-2"></i
            ></span>
            <div class="profile">
              <div class="img-box">
                <img :src="profile.image" alt="" />
              </div>

              <h3 v-if="profile">{{ profile.name }}</h3>
              <span>{{ profile.country.title }}</span>

              <p v-html="profile.pio"></p>

              <el-tabs
                v-model="activeName"
                class="profileNav"
                @tab-click="handleClick"
              >
                <el-tab-pane label="الخدمات" name="first">
                  <div class="services">
                    <div class="container">
                      <div class="row justify-content-start">
                        <div
                          class="col-lg-6"
                          v-for="item in Services"
                          :key="item.id"
                        >
                          <div class="OurServices-item">
                            <div class="img-box">
                              <img :src="item.thumb_image" alt="" />
                            </div>

                            <div class="item-body">
                              <div class="title d-flex justify-content-between">
                                <h5>{{ item.title }}</h5>
                                <span>كتاب</span>
                              </div>
                              <p v-html="item.description"></p>
                              <div
                                class="
                                  bottom-card
                                  d-flex
                                  justify-content-between
                                "
                              >
                                <span
                                  >سعر : <span>${{ item.price }}</span></span
                                >
                                <span>
                                  <span> 152</span>
                                  <i class="fa-solid fa-star"></i>
                                  <span> 987 </span>
                                  <i class="fa-solid fa-user-large"></i
                                ></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p v-if="myOrders.length == 0" class="text-center">
                        لا يوجد اي خدمات مشترا
                      </p>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="الاستشارات" name="second">
                  <div class="Consulting">
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="Consulting-item">
                            <div class="itemHead">
                              <div class="img-item">
                                <img src="../assets/consult-img.png" alt="" />
                              </div>
                              <h3>
                                احجز 4 جلسات تعليم بودكاست من الصفر الى الاحتراف
                              </h3>
                              <i class="el-icon-caret-left"></i>
                            </div>
                            <p>
                              احجز 4 جلسات تعليمية للبودكاست ستحصل من هذه
                              الجلسات على : * كيف تبدأ البودكاست؟ * محتوى البود
                              كاست ؟ * كيف تبدأ بالتسجيل بصوتك * كيف تضبط صوتك؟
                              * كيف تجعل الكل يسم…
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
        </el-tabs>

        <h2>الدعم الفني</h2>
        <el-tabs :tab-position="tabPosition" style="height: 200px">
          <el-tab-pane>
            <span slot="label"
              ><i class="el-icon-circle-plus-outline"></i> انشاء تذكرة</span
            >

            <div class="">
              <h3>معلومات التذكرة</h3>

              <div class="ticketInfo">
                <div class="ticketInfoCrad">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="name">
                        <h5>الاسم</h5>
                        <p>mohammed mohammed</p>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="email">
                        <h5>البريد الالكتروني</h5>
                        <p>mohammedmohammed@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="massage">
                <h2>نص الرسالة</h2>
                <div class="innerMassage">
                  <el-form
                    ref="form"
                    :model="form"
                    label-position="top"
                    label-width="120px"
                  >
                    <div class="textMassage">
                      <el-form-item label="موضوع التذكرة ">
                        <el-input v-model="form.title"></el-input>
                      </el-form-item>

                      <h2>نص الرسالة</h2>
                      <ckeditor
                        :editor="editor"
                        v-model="form.description"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>

                    <h2>المرفقات</h2>
                    <div class="attchMassage">
                      <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture"
                      >
                        <el-button
                          plain
                          size="small"
                          icon="el-icon-plus
"
                        >
                          اختر ملف
                        </el-button>

                        <div slot="tip" class="el-upload__tip">
                          إمتدادات الملفات المرفقة المسموح بها: .jpg, .gif,
                          .jpeg, .png, .doc, .docx, .pdf, .zip, .rar, .mp4 (Max
                          file size: 25MB)
                        </div>
                      </el-upload>
                    </div>

                    <el-form-item>
                      <el-button
                        type="primary"
                        class="send"
                        @click.prevent="postTicket"
                        >أرسل
                      </el-button>
                      <el-button>الغاء</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"
              ><i class="el-icon-s-ticket"></i> تذاكر الدعم الفني</span
            >
            <div class="">
              <el-select v-model="value" placeholder="اختر">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <div class="table-row">
                <div class="row">
                  <div class="col">
                    <span>رقم التذكرة</span>
                  </div>

                  <div class="col">
                    <span>موضوع التذكرة </span>
                  </div>

                  <div class="col">
                    <span>الحالة </span>
                  </div>

                  <div class="col">
                    <span>اخر تحديث</span>
                  </div>
                </div>
              </div>

              <div class="table-row" v-for="item in tickets" :key="item.id">
                <a :href="`/Ticket/${item.id}`">
                  <div class="row">
                    <div class="col">
                      <span>{{ item.code }}</span>
                    </div>

                    <div class="col">
                      <span v-html="item.body"></span>
                    </div>

                    <div class="col">
                      <span>{{ item.status }}</span>
                    </div>

                    <div class="col">
                      <span>{{ item.last_update }}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>





<script>
import Vue from "vue";
import navbar from "@/components/navComponentInner.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    navbar,
  },
  data() {
    return {
      tabPosition: "right",
      activeName: "first",

      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],

      form: {
        title: "",
        description: "",
      },

      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "",

      myOrders: null,
      Services: null,
      Consultions: null,
      profile: null,
      tickets: null,
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/my_orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.myOrders = res.data.data;
        this.Services = res.data.data.orderDetiles.service;

        if (res.data.data.length > 0) {
        }
        // console.log(res.data.data);
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.profile = res.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/tickets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.tickets = res.data.data.data;
      });
  },
  methods: {
    postTicket() {
      //  this.$refs[e].validate((valid) => {
      //   if (valid) {
      //     console.log('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // })

      const dataForm = new FormData();

      dataForm.append("title", this.form.title);
      dataForm.append("body", this.form.description);

      this.axios
        .post("https://dashboard.arabicreators.com/api/add_ticket", dataForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);

          if (res.data.code == 400) {
            this.$message.error("حدث خطأ");
          } else if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تمت الاضافة بنجاح",
              type: "success",
            });
          }
        });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>



<style lang="scss">
.createTicket {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  margin-bottom: 100px;

  .el-breadcrumb {
    display: flex;
    justify-content: start;
    margin-bottom: 80px;
    margin-top: 40px;

    .el-breadcrumb__item {
      font-size: 20px;
    }
  }

  .content {
    h2 {
      text-align: right;
      margin-bottom: 30px;
      font-size: 20px;
      font-weight: 700;
    }

    h3 {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 20px;
    }

    .el-tabs {
      height: unset !important;

      .el-tabs__header {
        width: 20% !important;
      }

      .el-tabs__nav-wrap::after,
      .el-tabs__active-bar {
        display: none;
      }

      .el-tabs__item {
        text-align: right;

        &:hover {
          color: #70d644;
        }
        span {
          font-size: 18px;
        }
      }

      .el-tabs__item.is-active {
        color: #70d644;
      }
      .el-tab-pane {
        height: 100%;
        text-align: right;

        .profile {
          text-align: center;
          padding: 20px;
          .img-box {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin: auto;
            margin-bottom: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          h3 {
          }

          span {
          }

          p {
          }

          .profileNav .el-tabs__header {
            width: 100% !important;
            text-align: center;

            .el-tabs__nav {
              float: unset !important;
            }

            .el-tabs__item.is-active {
              color: rgb(14, 168, 130) !important;
            }
          }
        }

        .ticketInfo {
          text-align: right;
          background-color: #f5f5f5;
          border-radius: 5px;

          padding: 30px;
          margin-bottom: 15px;

          .ticketInfoCrad {
            .name {
              h5 {
                margin-bottom: 15px;
              }

              p {
              }
            }

            .email {
              h5 {
                margin-bottom: 15px;
              }

              p {
              }
            }
          }
        }

        .massage {
          h2 {
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 10px;
          }

          .innerMassage {
            .el-form {
              .textMassage {
                background-color: #f5f5f5;
                padding: 30px;
                margin-top: 15px;
                margin-bottom: 15px;
                border-radius: 5px;
                .ck.ck-editor {
                  margin-bottom: 20px;
                }
              }
            }

            h2 {
            }

            .attchMassage {
              background-color: #f5f5f5;
              padding: 30px;
              margin-top: 15px;
              margin-bottom: 15px;

              border-radius: 5px;
              .el-upload {
              }
            }

            .send {
              background: linear-gradient(
                239.11deg,
                #70d644 -31.67%,
                #567a46 95.86%
              );
              border-radius: 4px;
              margin-left: 10px;
            }

            .el-form-item__content {
              text-align: left;
            }
          }
        }

        .el-select {
          margin-bottom: 10px;
        }

        .el-table {
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }

        .el-table .cell {
          text-align: right;
        }
        .el-table td.el-table__cell {
          text-align: right;
        }

        thead {
        }

        th.el-table__cell {
          background-color: #f5f5f5;
        }
      }
    }
  }
}

.table-row {
  direction: rtl;
  padding: 14px;
  border-bottom: 2px solid #e4e4e4;
  background: #fafafa;

  a {
    text-decoration: none;
    color: inherit;
  }
}

.OurServices-item {
  border: 1px solid #c0c0c0;
  border-radius: 15px;
  direction: rtl;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;

  .img-box {
    width: 100%;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .item-body {
    padding: 10px;

    .title {
      margin: 10px 0 10px 0;
      h5 {
        color: #302d2d;
        font-size: 18px;
        font-weight: 700;
      }

      span {
        color: white;
        background-color: #677a5f;
        border-radius: 6px;
        padding: 5px 8px;
      }
    }

    p {
      margin-bottom: 10px;
      text-align: right;
      font-weight: 500;
    }

    .bottom-card {
      span {
        margin-left: 6px;
      }
    }

    .btn {
      width: 100%;
      margin-top: 10px;
      a {
        background: var(--darkColor);
        border-radius: 8px;
        padding: 8px 20px;
        color: white;
        text-decoration: unset;
        display: inline-block;
        width: 100%;
        margin: auto;
      }
    }
  }
}
</style>