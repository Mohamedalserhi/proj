<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->
    <!-- <div v-if="show"  class="loader">
      <scale-loader :loading="loading" :color="color" :height="height" :width="width"></scale-loader>
    </div> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>تعديل مقال</h2>
          <p>ستتم مراجعة مقالك فور انشاءه واعلامك باشعار اذا كان متاح لنشر</p>
        </div>

        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            :rules="rules"
            method="post"
            @submit="postData"
          >
            <el-form-item prop="title">
              <i class="el-icon-edit blogIcon"></i>
              <!-- <i class="fa-regular fa-text"></i> -->

              <el-input
                v-model="form.title"
                class="blogInput"
                placeholder="أدخل العنوان "
                value=""
              >
                <!-- <template slot="prepend" ><i class="el-icon-edit"></i></template> -->
              </el-input>
            </el-form-item>

            <el-form-item prop="category">
              <i class="el-icon-menu blogIcon"></i>
              <el-select
                v-model="form.category"
                multiple
                placeholder="اختر التصنيف"
                class="blogInput"
              >
                <el-option
                  v-for="item in selectItems"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                  class="blogInput"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 
            <el-switch v-model="editorDisabled"   active-color="#13ce66" inactive-color="#ff4949">>
            </el-switch> -->
            <el-form-item class="flex-direction-column">
              <i class="el-icon-circle-plus-outline blogIcon"></i>

              <!-- <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 14 }"
                v-model="form.description"
                placeholder="ادخل الوصف"
              >
              </el-input> -->
              <!-- <el-checkbox v-model="editorDisabled" >تفعيل</el-checkbox> -->

              <el-switch
                v-model="readonly"
                active-color="#13ce66"
                inactive-color="#ff4949"
                >>
              </el-switch>

              <!-- <ckeditor prop="description"
                :editor="editor"
                v-model="form.description"
                :config="editorConfig"
                :readonly="editorDisabled" 
                :disabled="editorDisabled" 
                 placeholder="ادخل الوصف"
                
                >
              </ckeditor> -->

              <editor
                api-key="lq78n5tuhbwnunb6moxdzq6d2cyx8o895bfzepnwbw3mc29e"
                :init="{
                  height: 500,
                  menubar: 'false',
                  plugins: [
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  ],
                  toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                  toolbar_sticky: true,
                  image_caption: true,
                  toolbar_mode: 'sliding',
                }"
                :disabled="readonly"
                v-model="form.description"
                style="width: 100%"
              />
            </el-form-item>
            <p class="mb-1 me-5">
              (<span>{{
                form.description
                  .trim(form.description.replace(/ +(?= )/g, ""))
                  .split(" ").length
              }}</span
              >/600)
            </p>

            <!-- <el-slider v-model="form.sliderVal" :marks="marks">
              <el-slider v-model="form.sliderVal"></el-slider>
            </el-slider> -->

            <!-- <p class="text-end mb-4  me-5">
              في حالة زادت كلمات المقال عن 600 كلمة سيتم دفع 5 دولار
            </p> -->

            <el-form-item prop="description">
              <i class="el-icon-document blogIcon"></i>
              <!-- <i class="fa-regular fa-text"></i> -->

              <el-input
                v-model="form.meta_description"
                class="blogInput"
                placeholder="أدخل وصف مختصر "
              >
                <!-- <template slot="prepend" ><i class="el-icon-edit"></i></template> -->
              </el-input>
            </el-form-item>

            <!-- <span class="text-end d-block fw-bold mb-3">صورة المقال</span> -->
            <!-- <el-upload
              class="upload-demo"
              drag
              action="http://arabicreators.com/api/add_blog"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="image"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">ارفاق صورة المقال</div>
            </el-upload> -->

            <!-- <el-upload
              class="upload-demo"
              action="http://arabicreators.com/api/add_blog"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.image"
              list-type="picture"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">Click to upload</el-button>
              <div slot="tip" class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </el-upload> -->

            <!-- <el-upload
              class="upload-demo"
              ref="upload"
              action="http://arabicreators.com/api/add_blog"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >select file</el-button
              >
              <el-button
                style="margin-left: 10px"
                size="small"
                type="success"
                @click="submitUpload"
                >upload to server</el-button
              >
              <div class="el-upload__tip" slot="tip">
                jpg/png files with a size less than 500kb
              </div>
            </el-upload> -->
            <span class="text-end d-block mb-1 me-5"
              >صورة التدوينة الرئيسية</span
            >

            <el-form-item class="">
              <i class="el-icon-picture blogIcon"></i>

              <!-- <input type="file" id="fileUpload" @change="onfileSelected" /> -->
              <!-- 
                <button style="display:block; height:35px;" class="fileInput1" @click.prevent="$refs.fileInput.click()">اضغط هنا لتحميل الصورة الرئيسية للتدوينة</button>
                <input type='file' style="display:none" ref="fileInput" @change="onfileSelected"> -->

              <button
                type="button"
                class="fileInput1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                اضغط هنا لتحميل الصورة الرئيسية للتدوينة
              </button>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                      <div class="btns">
                        <!-- <button type="button" class="btn btn-primary">select files</button> -->
                      </div>
                    </div>
                    <div class="modal-body">
                      <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected="true"
                          >
                            رفع صورة
                          </button>
                        </li>
                        <li
                          class="nav-item"
                          @click.prevent="imagehandel"
                          role="presentation"
                        >
                          <button
                            class="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected="false"
                          >
                            عرض الصور
                          </button>
                        </li>
                      </ul>
                      <div class="tab-content" id="myTabContent">
                        <div
                          class="tab-pane fade show active"
                          id="home-tab-pane"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                          tabindex="0"
                        >
                          <form
                            action=""
                            class="mt-4 mb-4"
                            style="text-align: center"
                          >
                            <p>رفع ملفات</p>
                            <input
                              type="file"
                              multiple
                              @change="onfileSelectedModel"
                            />
                            <img
                              class="img-preview"
                              v-if="url"
                              :src="url"
                              alt=""
                            />
                          </form>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="profile-tab-pane"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                          tabindex="0"
                          style="display: flex"
                        >
                          <div class="main-content">
                            <div class="row">
                              <div
                                class="col-lg-3"
                                v-for="image in imagesModel"
                                :key="image.id"
                                :class="{ active: isActive }"
                              >
                                <div
                                  :class="'item ' + 'img' + image.id"
                                  @click="clickFun(image.id)"
                                >
                                  <div class="img-box">
                                    <img :src="image.image" alt="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            class="img-info"
                            style="width: 20%"
                            :style="{ opacity: displayStyle }"
                            :class="{ active: isActive }"
                          >
                            <h5>image info</h5>
                            <p>{{ image.imgTitle }}</p>
                            <form action="">
                              <label for="" class="mb-2">Alt iamge</label>
                              <input
                                type="text"
                                name=""
                                class="form-control mb-3"
                                v-model="image.Alt"
                                id=""
                              />
                              <label for="" class="mb-2">Title</label>
                              <input
                                type="text"
                                name=""
                                class="form-control mb-3"
                                v-model="image.imgTitle"
                                id=""
                              />
                              <label for="" class="mb-2">Description</label>
                              <textarea
                                name=""
                                id=""
                                cols="30"
                                class="form-control mb-3"
                                rows="10"
                                v-model="image.imgDescription"
                              ></textarea>

                              <button
                                class="btn btn-primary"
                                @click.prevent="storeData"
                              >
                                حفظ
                              </button>

                              <!-- <label for=""></label> <input type="text" name="" placeholder="Title" id=""> -->
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="showData"
                      >
                        حفظ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>

            <el-form-item prop="keywords">
              <i class="el-icon-link blogIcon"></i>

              <input-tag
                v-model="form.keywords"
                placeholder="أدخل الكلمة المفتاحية "
                add-tag-on-keys="13"
                class="blogInput"
              ></input-tag>
            </el-form-item>

            <el-form-item prop="keywords">
              <i class="el-icon-link blogIcon"></i>

              <input-tag
                v-model="form.tags"
                placeholder="أدخل Tags "
                add-tag-on-keys="13"
                class="blogInput"
              ></input-tag>
            </el-form-item>

            <el-form-item>
              <i class="el-icon-time blogIcon"></i>

              <el-date-picker
                v-model="form.scheduledDate"
                value-format="yyyy-MM-dd HH-mm-ss"
                type="datetime"
                placeholder="حدد وقت معين لنشر المقال"
              >
              </el-date-picker>
            </el-form-item>

            <el-button class="btnBlog" type="primary" @click="postData('form')"
              >تعديل التدوينة</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";

import navbar from "@/components/navComponentInner.vue";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    navbar,

    editor: Editor,
  },

  data() {
    return {
      radio1: "red",
      textXlac: "0",
      // editor: ClassicEditor,
      // editorData: "<p>Content of the editor.</p>",
      // editorConfig: {},
      readonly: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "Yesterday",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "A week ago",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      form: {
        title: localStorage.getItem("itemTitle"),
        category: [localStorage.getItem("categories")],
        description: localStorage.getItem("itemDes"),
        keywords: [localStorage.getItem("keywords")],
        meta_description: localStorage.getItem("meta_description"),
        alt: "",
        tags: [localStorage.getItem("tags")],
        slug: "",
        metaTitle: "",
        scheduledDate: "",
      },

      rules: {
        title: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        description: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        keywords: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        category: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
      },

      image: {
        Alt: "",
        imgTitle: "",
        imgDescription: "",
      },
      isActive: false,
      // borderStyle:'none',
      // displayStyle:'0',
      url: null,

      marks: {
        100: "0",
        0: "5000",
      },

      alert: "",
      alert2: "",
      alert3: "",
      alert4: "",

      show: false,
      show2: false,
      show3: false,
      show4: false,

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      imageSelcteed: null,
      selectItems: undefined,

      imageSelcteedModel: [],

      imagesModel: undefined,

      image_id: undefined,
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/blog_category")
      .then((rr) => {
        console.log(rr);
        this.selectItems = rr.data.data;
      });
  },

  methods: {
    onfileSelected(event) {
      this.imageSelcteed = event.target.files[0];
    },

    postData(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      const dataForm = new FormData();
      dataForm.append("image", this.image_id);
      // dataForm.append("image", this.imageSelcteed, this.imageSelcteed.name);
      dataForm.append("title", this.form.title);
      dataForm.append("category", JSON.stringify(this.form.category));
      dataForm.append("description", this.form.description);
      dataForm.append("keywords", this.form.keywords);
      dataForm.append("meta_description", this.form.meta_description);
      // dataForm.append("alt", this.form.alt);
      dataForm.append("tags", JSON.stringify(this.form.tags));
      dataForm.append("slug", this.form.slug);
      dataForm.append("meta_title", this.form.metaTitle);
      dataForm.append("blog_id", localStorage.getItem("blogID"));
      dataForm.append("publish_time", this.form.scheduledDate);

      this.axios
        .post("https://dashboard.arabicreators.com/api/update_blog", dataForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          if (res) {
            this.$message({
              showClose: true,
              message: "تم التعديل بنجاح",
              type: "success",
            });

            this.$router.push("/blog");
          }
        });
    },

    onSubmit() {
      console.log("submit!");
    },

    clickFun(id) {
      const element = this.$el.querySelector(`.img${id}`);

      element.classList.toggle("isActive");
      this.$el.querySelector(".item").style.border = "none";

      if (element.classList.contains("isActive")) {
        this.$el.querySelector(`.img${id}`).style.border = "3px solid #00b4ff";

        this.displayStyle = "1";
      } else {
        this.$el.querySelector(`.img${id}`).style.border = "none";

        this.displayStyle = "0";
      }

      localStorage.setItem("iamgeId", id);

      // alert(localStorage.getItem('iamgeId'))
      this.showData(id);
      // this.storeData(id)

      // alert(`img${id}`)
    },
    onFileChange(e) {},

    addImageInfo(imageId) {},

    onfileSelectedModel($event) {
      this.imageSelcteedModel = [...$event.target.files];
      const file = $event.target.files[0];
      this.url = URL.createObjectURL(file);
      this.sendImage();
    },

    imagehandel() {
      this.getImages();
      // this.alert('ok')
    },

    sendImage() {
      const data = new FormData();

      this.imageSelcteedModel.forEach((item, index) => {
        data.append(`image[${index}]`, item);
      });

      this.axios
        .post("https://dashboard.arabicreators.com/api/upload_images", data, {
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

    getImages() {
      Vue.axios
        .get("https://dashboard.arabicreators.com/api/get_all_media", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("iamges" + res.data.data);
          this.imagesModel = res.data.data;
        });
    },

    showData(imgId) {
      this.imagesModel.forEach((element) => {
        if (element.id == imgId) {
          this.image.Alt = element.alt;
          this.image.imgTitle = element.title;
          this.image.imgDescription = element.description;
          // alert(imgId)

          this.image_id = element.id;
        }
      });
    },

    async storeData() {
      let imgId = localStorage.getItem("iamgeId");
      const data2 = new FormData();
      data2.append("title", this.image.imgTitle);
      data2.append("alt", this.image.Alt);
      data2.append("description", this.image.imgDescription);

      await this.axios
        .post(
          `https://dashboard.arabicreators.com/api/update_media/${imgId}`,
          data2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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

      // this.$router.go()

      this.getImages();
    },
  },
};
</script>

<style lang="scss">
.createConsultaion {
  position: relative !important;
  padding-top: 50px;
  position: relative;
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;
  padding-bottom: 50px;
  .content {
    padding-top: 50px;
    padding-bottom: 50px;
    margin-top: 0 !important;
    .header {
      text-align: right;
      h2 {
        font-weight: 700;
      }

      p {
      }
    }

    .form {
      max-width: 60%;
      margin: auto;

      .el-form-item__label {
        display: block;
        text-align: right;
        padding-bottom: 0;
        font-weight: 700;
      }

      .el-select {
        width: 100%;
      }

      .el-input__inner {
        height: 50px;
        border-radius: 10px;
      }

      .el-button-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 60px;
      }

      .el-button-group > .el-button {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }

      .el-upload-dragger {
        width: 100%;
        height: 200px;
      }

      .el-upload {
        width: 100%;
        margin-bottom: 30px;
      }

      .el-slider__runway {
        background: linear-gradient(
          270.1deg,
          rgba(227, 0, 0, 0.99) 10.15%,
          #66b345 69.1%
        );
      }
    }

    .el-tag .el-icon-close {
      right: unset;
      left: 0;
    }

    .el-select .el-tag {
      margin: unset;
      margin-right: 6px;
    }
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #ff4040;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .el-form .el-form-item .blogInput .el-input__inner {
    text-align: right !important;
    background-color: transparent !important;
  }

  .blogInput {
    background-color: transparent !important;
  }

  .vue-input-tag-wrapper {
    width: 100%;
    // background-color: #fafafa;

    border-radius: 5px;
    height: 45px;
    border: none;
  }
}

.ck.ck-editor {
  width: 100%;
  margin-right: 10px;
}

.ck.ck-editor__editable_inline > :first-child {
  height: 200px;
}

.el-input-group__prepend {
  border: none !important;
  border-left: 2px solid #dcdfe6 !important;
  background-color: transparent !important;
}

// .el-textarea__inner {
//   border: none !important;
// }

.blogIcon {
  font-size: 20px !important;
  border-left: 2px solid #dbdbdb !important;
  padding: 8px;
  margin: 5px;
}

.fileInput1 {
  border: var(--darkColor) 2px solid;
  padding: 6px;
  background-color: transparent;
  color: var(--darkColor);
  margin-left: 10px;
  font-weight: 600;
  margin-top: 5px;
}

.btnBlog {
  display: inline-block !important;
  width: unset !important;
  padding: 0px 28px !important;
  background: var(--darkColor) !important;
  border-radius: 5px !important;
  color: white;
  height: 44px !important;
  margin-bottom: 10px;
  margin-top: 40px;
  margin-left: 10px !important;
  border: none;
}

.loader {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 50;
}

.v-spinner {
  margin-top: 20%;
}

.el-switch {
  display: block !important;
  text-align: left;
  margin-bottom: 10px;
}
</style>


<style scoped>
.modal-dialog {
  max-width: 1200px;
}

.modal {
}

.modal .head {
}

.modal .head form {
  display: flex;
  justify-content: space-between;
}

.modal form .selects {
  display: flex;
}

.modal .main-content {
  height: 540px;
  width: 75%;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 10px;
}

.modal .img-info {
  width: 25% !important;
  padding: 10px;
  margin: 10px;
  padding-top: 20px;
  background-color: #f6f6f6;
}

.modal .main-content .item {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  /* padding: 10px; */
  border-radius: 5px;
  margin: 10px;
  text-align: right;
  overflow: hidden;
  width: 100%;
  height: 208px;
  cursor: pointer;
}

.modal .main-content .item .img-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.modal .main-content .item .img-box img {
  width: 100%;
  height: 100%;
}

.modal .main-content .item p {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
}

.modal .main-content .item span {
  font-size: 12px;
}

.modal-footer {
  justify-content: space-between;
}

.modal-header .btn-close {
  margin: 0;
}

.btn-close:focus {
  box-shadow: none;
}
.form-control:focus {
  box-shadow: none;
}

.img-preview {
  width: 150px;
  height: 150px;
  display: block;
  margin: auto;
  margin-top: 30px;
}
</style>