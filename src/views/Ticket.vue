

<template>
  <div class="createTicket Ticket">
    <!-- <navbar /> -->
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">الدعم </a></el-breadcrumb-item>
        <el-breadcrumb-item>تذكرة #DSC-957409 </el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div class="row">
          <div class="col-lg-2">
            <div class="aside">
              <h3>معلومات التذكرة</h3>
              <div class="infoBox">
                <h4>المرسل</h4>
                <p>mohammed mohammed</p>
              </div>

              <div class="infoBox">
                <h4>مقدمة في</h4>
                <p>15/06/2022 (12:45)</p>
              </div>

              <div class="infoBox">
                <h4>أخر تحديث</h4>
                <p>منذ 3 أسابيع</p>
              </div>

              <div class="infoBox">
                <h4>الحالة / الاهمية</h4>
                <p>تم الرد</p>
              </div>

              <el-button class="addReply" @click="onSubmit">أضف رد </el-button>
              <el-button class="close" plain>إغلاق تذكرة </el-button>

              <h3>الدعم الفني</h3>
              <el-link icon="el-icon-s-ticket" class="active">
                تاذكر الدعم الفني
              </el-link>
              <el-link icon="el-icon-circle-plus-outline">
                انشاء تذكرة
              </el-link>
            </div>
          </div>

          <div class="col-lg-10">
            <div class="main-content">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="أضف رد : " name="1">
                  <div class="massage">
                    <h2>نص الرسالة</h2>
                    <div class="innerMassage">
                      <el-form
                        ref="form"
                        :model="form"
                        label-position="top"
                        label-width="120px"
                      >
                        <div class="form-item">
                          <el-form-item label="الاسم">
                            <el-input
                              v-model="form.name"
                              placeholder="أدخل العنوان "
                            ></el-input>
                          </el-form-item>

                          <el-form-item label="البريد الالكتروني ">
                            <el-input
                              v-model="form.email"
                              placeholder="أدخل العنوان "
                            ></el-input>
                          </el-form-item>
                        </div>

                        <div class="textMassage">
                          <h2>نص الرسالة</h2>
                          <ckeditor
                            :editor="editor"
                            v-model="editorData"
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
                            <el-button plain size="small" icon="el-icon-plus">
                              اختر ملف
                            </el-button>

                            <div slot="tip" class="el-upload__tip">
                              إمتدادات الملفات المرفقة المسموح بها: .jpg, .gif,
                              .jpeg, .png, .doc, .docx, .pdf, .zip, .rar, .mp4
                              (Max file size: 25MB)
                            </div>
                          </el-upload>
                        </div>

                        <el-form-item class="btns">
                          <el-button class="send" @click="onSubmit"
                            >أرسل
                          </el-button>
                          <el-button>الغاء</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>

              <div class="support">
                <div class="head">
                  <p>م. صالحه الفهمي <span>( الدعم ) </span></p>
                  <p>22/08/2022 (12:43)</p>
                </div>

                <div class="body">
                  <p>عزيزنا عميل مركز الخوادم الرقمية /Mohammed Ghandour</p>
                  <p>تم عمل اللازم و توجيه النطاق لـ DNS المرسل</p>
                  <p>سعداء بخدمتك</p>
                  <p>م.صالحه الفهمي</p>
                  <p>مركز الخوادم الرقمية</p>
                </div>

                <div class="bottom">
                  <el-rate v-model="value1"></el-rate>
                </div>
              </div>

              <div class="support">
                <div class="head">
                  <p>mohammed mohammed <span>( المالك ) </span></p>
                  <p>22/08/2022 (12:43)</p>
                </div>

                <div class="body">
                  <p>السلام عليكم اي تحديث جديد ؟</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import navbar from "@/components/navComponentInner.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    navbar,
  },
  data() {
    return {
      value1: null,
      value2: null,
      activeName: ["1"],
      tabPosition: "right",
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
        name: "mohammed mohammed",
        email: "mohammedmohammed@gmail.com",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },

      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  methods: {
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
      margin-top: 10px;
    }

    h3 {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 20px;
    }

    .el-tabs {
      height: unset !important;

      .el-tabs__header {
        width: 30%;
      }

      .el-tabs__nav-wrap::after,
      .el-tabs__active-bar {
        display: none;
      }

      .el-tabs__item {
        text-align: right;
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
            margin-top: 10px;
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

            .el-form-item__content {
              text-align: left;
            }
          }
        }
      }
    }
  }
}

.Ticket {
  .content {
    .aside {
      h3 {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 30px;
        margin-top: 30px;
        text-align: right;
      }

      .infoBox {
        text-align: right;
        padding: 15px;
        border: 1px solid rgb(213, 210, 210);
        h4 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        p {
          font-weight: 700;
          font-size: 18px;
        }
      }

      a {
        display: block;
        margin-bottom: 15px;
        text-align: right;
        font-size: 18px;

        &:hover {
          color: #70d644;
          border: unset;
        }

        &::after {
          display: none;
        }
      }

      .active {
        color: #70d644;
      }

      .addReply {
        background: linear-gradient(239.11deg, #70d644 -31.67%, #567a46 95.86%);
        border-radius: 4px;
        margin-left: 10px;
        width: 100%;
        color: white;
        margin-top: 10px;
      }

      .close {
        border-radius: 4px;
        margin-left: 10px;
        width: 100%;
        color: #70d644;
        margin-top: 10px;
      }
    }

    .main-content {
      .el-collapse {
        margin-bottom: 70px;
        border: unset;

        .massage {
          h2 {
          }
        }

        .el-collapse-item__arrow {
          margin: unset;
          margin-right: auto;
        }

        .form-item {
          display: flex;
          width: 100%;
        }

        .el-form-item__content {
          display: flex;
          // justify-content: space-between;
        }

        .el-form-item {
          width: 49%;
        }

        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 98%;
        }

        .el-input {
          margin: 1%;
        }

        .el-input__inner {
          height: 50px;
          border-radius: 5px;
          background-color: #f5f5f5;
          border: none;
        }

        .el-form-item__label {
          display: block;
          text-align: right;
        }

        .el-collapse {
          border: unset !important;
          border-top: unset;
          border-bottom: unset;
        }

        .el-collapse-item {
          border: 1px solid #ded4d4;
          border-radius: 10px;
        }

        .el-collapse-item__header {
          background-color: #f5f5f5;
          padding: 15px;
        }

        .el-collapse-item__content {
          padding: 15px;
        }

        .el-form-item {
          justify-content: end;
        }

        .el-upload-list--picture .el-upload-list__item-status-label {
          background: #70d644;
        }
      }

      .btns {
        margin-top: 15px;
      }

      .send {
        background: linear-gradient(239.11deg, #70d644 -31.67%, #567a46 95.86%);
        border-radius: 4px;
        margin-left: 10px;
        color: white;
      }
    }

    .support {
      width: 100%;
      border: 1px solid #ded4d4;
      border-radius: 10px;
      margin-bottom: 20px;
      margin-top: 20px;
      text-align: right;
      border-left: 4px solid #70d644;

      .head {
        padding: 15px;
        background-color: #f5f5f5;
        display: flex;
        justify-content: space-between;
        p {
          font-weight: 700;

          span {
            font-weight: 600;
          }
        }
      }

      .body {
        padding: 15px;
      }

      .bottom {
        padding: 15px;
        .el-rate {
          text-align: left;
        }
      }
    }
  }
}
</style>