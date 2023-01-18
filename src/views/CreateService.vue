<template>
  <div class="createConsultaion ser">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>انشاء خدمة</h2>
          <p>ستتم مراجعة خدمتك فور انشاءه واعلامك باشعار اذا كان متاح لنشر</p>
        </div>




        <div class="form">
          <!-- <div class="switch">
            <el-switch
              class="mt-4 mb-4 text-end"
              style="display: block"
              v-model="form.type_service"
              active-color="#13ce66"
              inactive-color="#13ce66"
              inactive-text="منتج رقمي"
              active-text="خدمة"
            >
            </el-switch>
          </div> -->


              <nav class="navbar navbar-expand-lg mb-4">
       

        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <div class="mode-container mt-2">
                        <span
                            @click="switchMode(mode)"
                            ref="ModeInfo"
                            class="mode-info"
                            :class="{ 'dark-mode': modestyle }"
                        >
                            <img :src="modesrc"/>
                            <strong>{{ mode }}</strong>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </nav>

          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            :rules="rules"
            @submit="addServise"
          >
            <el-form-item label="عنوان الخدمة  " prop="title">
              <el-input
                v-model="form.title"
                placeholder="أدخل العنوان "
              ></el-input>
            </el-form-item>
            <p class="tip">
              أدخل عنواناً واضحاً باللغة العربية يصف الخدمة التي تريد أن تقدمها.
              لا تدخل رموزاً أو كلمات مثل "حصرياً"، "لأول مرة"، "لفترة محدود"..
              الخ.
            </p>
            <el-form-item label="التصنيف">
              <el-select
                v-model="form.specialties"
                placeholder="اختر التصنيف"
                @change="serviceCategory"
              >
                <el-option
                  v-for="item in get_specialty"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <p class="tip">
              أدخل عنواناً واضحاً باللغة العربية يصف الخدمة التي تريد أن تقدمها.
              لا تدخل رموزاً أو كلمات مثل "حصرياً"، "لأول مرة"، "لفترة محدود"..
              الخ.
            </p>

            <el-form-item label="نوع الخدمة ">
              <el-select
                v-model="form.types"
                multiple
                placeholder="اختر الخدمة"
              >
                <el-option
                  v-for="item in serviceCategories"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="الوصف" prop="description">
              <editor
                api-key="lq78n5tuhbwnunb6moxdzq6d2cyx8o895bfzepnwbw3mc29e"
                :init="{
                  directionality: 'rtl',
                  language: 'ar',
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
                v-model="form.description"
                style="width: 100%"
              />
            </el-form-item>
            <p class="tip">
              أدخل عنواناً واضحاً باللغة العربية يصف الخدمة التي تريد أن تقدمها.
              لا تدخل رموزاً أو كلمات مثل "حصرياً"، "لأول مرة"، "لفترة محدود"..
              الخ.
            </p>

            <!-- <el-switch v-model="form.has_file"> </el-switch> -->

            <span class="text-end d-block fw-bold mb-3">صور الخدمة</span>
            <!-- <input type="file" @change="onfileSelected"  /> -->

            <button
              style="display: block; height: 35px; margin-bottom: 10px"
              class="fileInput1"
              @click.prevent="$refs.fileInput.click()"
            >
              اضغط هنا لتحميل صور الخدمة الرئيسية
            </button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              multiple
              @change="onfileSelected"
            />

            <img class="img-preview" v-if="url" :src="url" alt="" />
            <img class="img-preview" v-if="url2" :src="url2" alt="" />

            <el-switch
              class="mt-4 mb-1 text-start"
              style="display: block"
              v-model="type2"
              active-color="#13ce66"
              @change="hideImage"
            >
            </el-switch>

            <div class="" :class="{ hide2: hide2 }">
              <span class="text-end d-block fw-bold mb-3">ملفات الخدمة </span>

              <button
                style="display: block; height: 35px; margin-bottom: 10px"
                class="fileInput1"
                @click.prevent="$refs.fileInput1.click()"
                :class="{ hide2: hide2 }"
              >
                اضغط هنا لتحميل ملفات الخدمة الرئيسية
              </button>
              <input
                type="file"
                style="display: none"
                ref="fileInput1"
                multiple
                @change="onfileSelected2"
              />
            </div>

            <el-switch
              class="mt-4 mb-1 text-start"
              style="display: block"
              v-model="type"
              active-color="#13ce66"
              @change="hideEffect"
            >
            </el-switch>

            <el-form-item label="رابط الخدمة " :class="{ hide: hide }">
              <el-input
                v-model="form.url"
                placeholder="أدخل رابط الخدمة  "
                :disabled="disabel"
              ></el-input>
            </el-form-item>

            <div class="d-flex">
              <div class="dvide">
                <el-form-item class="" label=" سعر الخدمة " prop="price">
                  <el-select v-model="form.price" placeholder="اختر التصنيف">
                    <el-option
                      v-for="item in price_for_servcie"
                      :key="item.price"
                      :label="item.price"
                      :value="item.price"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="dvide">
                <el-form-item class="" label="مدة التسليم" prop="price">
                  <el-select v-model="form.time" placeholder="اختر التصنيف">
                    <el-option
                      v-for="item in time_for_servcie"
                      :key="item.day"
                      :label="item.title"
                      :value="item.day"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <p class="tip">
                  أدخل عنواناً واضحاً باللغة العربية يصف الخدمة .. الخ.
                </p>
              </div>
            </div>

            <el-form-item label="كلمات مفتاحية " prop="title">
              <input-tag
                v-model="form.keywords"
                placeholder="أدخل الكلمة المفتاحية "
                add-tag-on-keys="13"
                class="blogInput"
              ></input-tag>
            </el-form-item>

            <el-form-item class="mt-4" label="تعليمات للمشتري">
              <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 14 }"
                v-model="form.buyer_instructions"
              ></el-input>
            </el-form-item>
            <p class="tip">
              أدخل عنواناً واضحاً باللغة العربية يصف الخدمة التي تريد أن تقدمها.
              لا تدخل رموزاً أو كلمات مثل "حصرياً"، "لأول مرة"، "لفترة محدود"..
              الخ.
            </p>

          

            <div class="service-item" v-for="item in addmore" :key="item">
              <div class="">
                <div @click.prevent="reomveForm(item)" class="remove">
                  <i class="fa-solid fa-xmark del"></i>
                </div>

                <div class="ser-item-inner">
                  <el-form-item label="عنوان الاضافة">
                  <input
                    type="text"
                    v-model="item.title"
                    class="form-control"
                    style="height: 50px !important"
                  />
                </el-form-item>

                <el-form-item label="سعر الاضافة">
                  <el-select v-model="item.price" placeholder="اختر سعر ">
                    <el-option
                      v-for="item in price_for_exta_servcie"
                      :key="item.price"
                      :label="item.title"
                      :value="item.price"
                    ></el-option>
                  </el-select>
                </el-form-item>
                </div>

                <div class="ser-item-inner">
                  <el-form-item>
                    <el-select
                      v-model="item.has_time"
                      placeholder="هل سيزيد من مدة التنفيذ"
                    >
                      <el-option
                        v-for="item in has_time"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item v-if="item.has_time == 1">
                    <el-select v-model="item.time" placeholder="مدة الزيادة">
                      <el-option
                        v-for="item in time_for_exta_servcie"
                        :key="item.day"
                        :label="item.title"
                        :value="item.day"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>

              <a @click.prevent="addForm" class="btn mt-4 w-25 me-auto addSer">
              أضف تطويراً لهذه الخدمة +
            </a>

            <el-button type="primary" @click.prevent="addServise('form')"
              >اضافة</el-button
            >
          </el-form>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <pulse-loader
        :loading="loading"
        :color="color"
        :size="size"
      ></pulse-loader>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";

import navbar from "@/components/navComponentInner.vue";
import addOns from "@/components/addOns.vue";

// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    navbar,
    Editor,
    addOns,
    PulseLoader,
  },

  data() {
    return {
                mode: [],
                modesrc:[],
                modestyle: false,
                darkTheme: false,

      loading: false,
      show: false,
      url: null,
      url2: null,
      switchVal: true,
      hide: true,
      hide2: true,
      //       editor: ClassicEditor,
      // editorData: "<p>Content of the editor.</p>",
      // editorConfig: {
      // },

      addbtn: 0,
      isActive: "block",
      addOne: "",
      addTwo: "",
      addThree: "",
      addFour: "",
      value: ["addOne"],
      type: false,
      type2: false,
      disabel: true,
      disabel2: true,

      has_time: [
        {
          value: 1,
          label: "سيزيد من مدة تنفيذ الخدمة",
        },
        {
          value: 0,
          label: "لن يغيّر من مدة تنفيذ هذه الخدمة",
        },
      ],

      form: {
        title: "",
        description: "",
        price: "",
        specialties: [],
        keywords: [],
        has_file: true,
        attach_file: "",
        images: "",
        url: "",
        images: [],
        attach_file: [],
        type_service: true,
        addOnsTitle: "",
        addOnsPrice: "",
        time: "",
        buyer_instructions: undefined,
        id: [],
      },

      addmore1: [],

      imageSelcteed: [],
      fileSelcteed: null,
      files: [],
      get_specialty: undefined,
      service_category: undefined,

      addmore: [],

      id: 0,

      price_for_servcie: undefined,
      time_for_servcie: undefined,
      price_for_exta_servcie: undefined,
      time_for_exta_servcie: undefined,

      rules: {
        title: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        description: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        price: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        keywords: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        url: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        category: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
        types: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
      },

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      serviceCategories: null,

      
        imgSrc:require('../assets/logo.png')
      
    };
  },

  mounted() {



            this.mode = "خدمة";
            this.modesrc = require("../assets/quality-service.png");

    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/time_for_exta_servcie")
      .then((res) => {
        console.log(res);
        this.time_for_exta_servcie = res.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/price_for_servcie")
      .then((res) => {
        console.log(res);
        this.price_for_servcie = res.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/price_for_exta_servcie")
      .then((res) => {
        console.log(res);
        this.price_for_exta_servcie = res.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/time_for_servcie")
      .then((res) => {
        console.log(res);
        this.time_for_servcie = res.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/service_category")
      .then((res) => {
        console.log(res);
        this.service_category = res.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/get_specialty")
      .then((res) => {
        console.log(res);
        this.get_specialty = res.data.data;
      });

    this.serviceCategory();
  },

  methods: {

            switchMode(mode) {
                if (mode == "خدمة") {
                    this.mode = 'منتج '
                    this.modesrc = require('../assets/package.png')
                    this.modestyle = true
                    this.darkTheme = !this.darkTheme;
                    this.value = true
                    this.form.type_service= true
                } else {
                    this.mode = 'خدمة'
                    this.modesrc = require('../assets/quality-service.png')
                    this.modestyle = false
                    this.darkTheme = !this.darkTheme;
                    this.value = false
                    this.form.type_service= false
                }


            },

    serviceCategory() {
      let url = `https://dashboard.arabicreators.com/api/service_category_by_specialty_id/${this.form.specialties}`;
      Vue.axios.get(url).then((res) => {
        this.serviceCategories = res.data.data;
      });
    },

    hideEffect() {
      if (this.type == true) {
        this.hide = !this.hide;
        this.disabel = !this.disabel;
      } else if (this.type == false) {
        this.hide = !this.hide;
        this.disabel = !this.disabel;
      }
    },

    hideImage() {
      if (this.type2 == true) {
        this.hide2 = !this.hide2;
      } else if (this.type2 == false) {
        this.hide2 = !this.hide2;
      }
    },

    loadingMeth() {
      this.loading = !this.loading;
      if (this.show == true) {
        this.loading = !this.loading;
      }
    },

    addForm() {
      this.addmore.push({
        title: "",
        price: "",
        time: "",
        has_time: 0,
        id: this.id,
      });
      this.id++;
    },

    printAdds() {
      console.log(this.addmore);
    },

    reomveForm(item) {
      this.addmore;
      const index = this.addmore.indexOf(item);
      if (index > -1) {
        this.addmore.splice(index, 1);
      }
    },

    printarr() {
      this.addbtn = this.addbtn + 1;
    },

    onfileSelected(event) {
      this.imageSelcteed = [...event.target.files];

      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);

      const file2 = event.target.files[1];
      this.url2 = URL.createObjectURL(file2);
    },

    onfileSelected2(event) {
      //     for (let index = 0; index < event.target.files.length; index++) {
      //   this.fileSelcteed += event.target.files[index];

      // }

      this.files = [...event.target.files];
    },

    addServise(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      this.loadingMeth();

      // if (this.switchVal) {
      //   this.form.has_file = "yes";
      //    alert(this.form.has_file)
      // } else if (this.switchVal == false) {
      //   this.form.has_file = "no";
      //   alert(this.form.has_file)
      // }

      // for (let index = 0; index < this.imageSelcteed.length; index++) {
      //         dataForm.append('images', this.imageSelcteed[i])

      // }

      // for (let index = 0; index < this.fileSelcteed.length; index++) {
      //   this.form.attach_file += this.fileSelcteed[index];
      // }

      if (this.type2 == true) {
        this.type2 = 1;
      } else if (this.type2 == false) {
        this.type2 = 0;
      }

      if (this.form.type_service == true) {
        this.form.type_service = "service";
      } else if (this.form.type_service == false) {
        this.form.type_service = "digital";
      }

      const dataForm = new FormData();

      // Object.keys(null)
      // Object.assign(window.UndefinedVariable, {})

      // for (const i of  Object.keys(this.imageSelcteed)) {
      //           dataForm.append('images', this.imageSelcteed[i])

      //     }
      // alert(dataForm.get('images'))
      // alert(this.imageSelcteed[0])

      // for (const i of Object.keys(this.file || {})) {
      //       // this.files.push(this.fileSelcteed[i])
      //     dataForm.append('attach_file', this.file[i])

      // }
      // alert(dataForm.get('attach_file'))

      // alert(this.files)

      this.files.forEach((item, index) => {
        dataForm.append(`attach_file[${index}]`, item);
      });

      this.imageSelcteed.forEach((item, index) => {
        dataForm.append(`images[${index}]`, item);
      });

      this.addmore.forEach((item, index) => {
        dataForm.append(`addmore[${index}][title]`, item.title);
        dataForm.append(`addmore[${index}][price]`, item.price);
        dataForm.append(`addmore[${index}][time]`, item.time);

        dataForm.append(`addmore[${index}][has_time]`, item.has_time);
      });

      // dataForm.append("images",JSON.stringify(this.imageSelcteed));
      dataForm.append("title", this.form.title);
      dataForm.append("specialties", JSON.stringify(this.form.specialties));
      dataForm.append("types", JSON.stringify(this.form.types));
      dataForm.append("description", this.form.description);
      dataForm.append("url", this.form.url);
      dataForm.append("price", this.form.price);
      dataForm.append("time", this.form.time);
      dataForm.append("type_service", this.form.type_service);
      dataForm.append("buyer_instructions", this.form.buyer_instructions);

      dataForm.append("keywords", JSON.stringify(this.form.keywords));
      // dataForm.append("attach_file",this.files);
      dataForm.append("has_file", this.type2);

      this.axios
        .post("https://dashboard.arabicreators.com/api/add_service", dataForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })

        .then((res) => {
          console.log(res);

          if (res.data.code == 200) {
            this.loading = !this.loading;
            this.$message({
              showClose: true,
              message: "تمت الاضافة بنجاح، سيتم مراجعة طلبك خلال ٢٤ ساعة",
              type: "success",
            });

            this.$router.push("/OurServices");
          } else {
            this.$message.error("حدث خطأ ما");
            this.loading = !this.loading;
          }
        });
    },

    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
};
</script>




<style lang="scss">
// Toggle Light / Dark Mode
// From Scratch
$lightColor: #022d47;
$DarkColor: #022d478c;
$lightColorShadow: #edda4f;
$DarkColorShadow: #fdfad3;
.mode-container {
    animation: DarkTheShadow 0.7s ease-in-out;
    span {
        cursor: pointer;
        background-color: #fff;
        padding: 5px 10px;
        display: inline-block;
        width:160px;
        border-radius: 26px;
        box-shadow: 0 0 5px $lightColorShadow;
        font-size: 17px;
        font-weight: bold;
        color: $lightColor;
        position: relative;
        text-align: center;
    }
    img {
        width: 30px;
        position: relative;
        animation: LightTheMode 0.7s ease-in-out;
        animation-direction: alternate;
        right: 0;
    }
    strong {
        position: relative;
        left: 0;
        animation: LightTheModeText 0.7s ease-in-out;
        animation-direction: alternate;
        outline: unset;
    }
    .dark-mode {
        box-shadow: 0 0 5px $DarkColor;
        color: $DarkColor;
        animation: LightTheShadow 0.7s ease-in-out;
        img {
            position: relative;
            animation: DarkTheMode 0.7s ease-in-out;
            animation-direction: alternate;
            right: -40px !important;
        }
        strong {
            left: -35px;
            position: relative;
            animation: DarkTheModeText 0.7s ease-in-out;
            animation-direction: alternate;
        }
    }
}
@keyframes DarkTheMode {
    from {
        right: 0px;
    }
    to {
        right: -45px;
    }
}
@keyframes DarkTheShadow {
    from {
        box-shadow: 0 0 5px $lightColorShadow;
    }
    to {
        box-shadow: 0 0 5px $DarkColor;
    }
}
@keyframes LightTheShadow {
    from {
        box-shadow: 0 0 5px $DarkColor;
    }
    to {
        box-shadow: 0 0 5px $lightColorShadow;
    }
}
@keyframes DarkTheModeText {
    from {
        color: $lightColor;
        left: 0px;
    }
    to {
        color: $DarkColor;
        left: -35px;
    }
}
@keyframes LightTheMode {
    from {
        right: -45px;
    }
    to {
        right: 0;
    }
}
@keyframes LightTheModeText {
    from {
        color: $DarkColor;
        left: -35px;
    }
    to {
        color: $lightColor;
        left: 0px;
    }
}
</style>


<style lang="scss">
.createConsultaion {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;
  padding-bottom: 50px;

  .content {
    padding-top: 50px;
    padding-bottom: 50px;

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

      .el-form-item {
        margin-bottom: 9px;
      }

      .tip {
        font-size: 13px;
        color: #666;
      }

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

      .el-button--primary {
        display: block;
        width: 100%;
        // background: linear-gradient(
        //   239.11deg,
        //   #70d644 -31.67%,
        //   #567a46 192.97%
        // );
        border-radius: 10px;
        color: white;
        height: 50px;
        margin-bottom: 10px;
        margin-top: 40px;
        border: none;
        font-size: 20px;
      }

      .el-upload-dragger {
        width: 100%;
        height: 200px;
      }

      .el-upload {
        width: 100%;
        margin-bottom: 30px;
      }
    }
  }
}
</style>


<style lang="scss">
.addSer {
  display: block !important;
  background: transparent !important;
  background-color: transparent !important;
  color: var(--darkColor) !important;
  border: 1px solid var(--darkColor) !important;
  padding: 5px !important;
}

.service-item {
  padding: 15px;
  background-color: #f7f9fc;
  margin-top: 20px;

  .ser-item-inner {
    display: flex;

    .el-form-item {
      width: 48%;
      margin: 1%;


      .form-control{
      border-radius: 10px !important;
      border: none !important;
      }
    }
  }
}

.remove {
  cursor: pointer;
  width: 2%;
}

.form-control:focus {
  box-shadow: none !important;
}

.img-preview {
  width: 200px;
  height: 150px;
  display: inline-block;
  margin: 10px;
  margin-top: 30px;
}

.loading {
  display: block;
  width: 300px;
  height: 139px;
  background-color: white;
  // background-color: rgb(234 234 234);
  padding: 5px;
  position: absolute;
  bottom: 18%;
  right: 38%;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>


<style >
.createConsultaion .el-switch__label--right {
  /* margin-left: 10px !important; */
}

/* .createConsultaion .el-switch__label--left{
    margin-right: 10px !important;
  margin-left: 0 !important;
} */

.switch .el-switch__core {
  margin-left: 10px !important;
  margin-right: 10px !important;
}

.ser .vue-input-tag-wrapper .new-tag {
  background-color: #fafafa !important;
}

.ser .vue-input-tag-wrapper {
  height: 50px !important;
  border-radius: 10px !important;
  padding: 0;
  overflow: hidden;
}

.hide {
  opacity: 0.4;
  cursor: not-allowed;
}

.hide2 {
  opacity: 0.4;
  cursor: not-allowed !important;
}

.dvide {
  width: 48%;
  margin: 1%;
}

.service-item .el-input__inner {
  background-color: #fff !important;
}

.vue-input-tag-wrapper .input-tag {
  background-color: var(--darkColor) !important;
  color: white !important;
  border-color: var(--darkColor) !important;
}

.vue-input-tag-wrapper .input-tag .remove {
  color: white !important;
}
</style>