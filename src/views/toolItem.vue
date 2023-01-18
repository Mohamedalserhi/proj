<template>
  <div class="blogItem">
    <!-- <app-nav-inner /> -->

    <appNavUser v-if="userAuth" :imageSrc="acc.image" />
    <appNav v-if="!userAuth" />

    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
        <el-breadcrumb-item
          ><router-link to="" v-if="post && post.title">{{
            post.title
          }}</router-link></el-breadcrumb-item
        >
      </el-breadcrumb>
      <h2 v-if="post && post.title">{{ post.title }}</h2>

      <div v-if="post" class="row">
        <div class="col-lg-8">
          <div class="main-content">
            <div class="atical-item">
              <div class="img-box">
                <img :src="post.image" />
              </div>
              <div class="item-body">
                <p v-if="post && post.title">
                  {{ post.title }}
                </p>
              </div>
            </div>

            <div class="descripion">
              <!-- <h2>الوصف</h2> -->
              <p v-if="post && post.description" v-html="post.description"></p>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="sideBar">
            <div class="share-blog">
              <p>شارك</p>
              <div class="soial">
                <a href=""><i class="fa-brands fa-facebook-f"></i></a>

                <a href=""><i class="fa-brands fa-instagram"></i></a>
                <a href=""><i class="fa-brands fa-twitter"></i></a>

                <a href=""><i class="fa-brands fa-snapchat"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import appNavInner from "@/components/navComponentInner.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export default {
  data() {
    return {
      value: 5,
      body: null,

      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",

      editorConfig: {},
      post: {},
      RealetedBlog: {},
      plogId: null,
      allComments: {},

      meatDesc: undefined,
      meatTitle: undefined,
      slug: undefined,
      keywords: [],
      tags: [],
    };
  },

  metaInfo() {
    return {
      title: this.meatTitle,
      titleTemplate: null,
      htmlAttrs: {
        lang: "ar",
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.meatDesc,
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: this.keywords,
        },
      ],
    };
  },

  components: {
    appNavInner,
  },

  mounted() {
    const id = this.$route.params.id;
    let url = `https://dashboard.arabicreators.com/api/single_tool/${id}`;

    axios.get(url).then((res) => {
      const postData = res.data.data;
      this.post = postData;
      this.plogId = postData.id;
    });
  },

  methods: {
    onSubmit() {},

    update() {
      this.$router.go();
    },
  },
};
</script>



<style lang="scss" scoped>
.blogItem {
  direction: rtl;
  font-family: "Tajawal", sans-serif;

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
    margin-top: 20px;

    .el-breadcrumb__item {
      font-size: 18px;
    }
  }

  .el-rate {
    text-align: start;
    margin-top: 15px;
    margin-bottom: 15px;
    direction: ltr;

    .el-rate__item {
      .el-rate__icon {
        font-size: 25px;
      }
    }
  }

  .atical-item {
    text-align: right;
    position: relative;
    width: 100%;
    height: 600px;
    margin: 10px;
    color: black;
    .img-box {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;

        &:first-child {
          z-index: 3;
        }

        &:last-child {
          z-index: 4;
        }
      }
    }

    .item-body {
      position: absolute;
      bottom: 0;
      z-index: 5;
      padding: 10px;
      p {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 5px;
        color: white;
      }
    }
  }

  .descripion {
    h2 {
      text-align: right;
    }

    p {
      text-align: right;
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

    .el-rate {
      display: flex;
      justify-content: center;
    }
  }

  .another-blogs {
    background-color: #f8f8f8;
    padding: 10px;
    width: 70%;
    margin-top: 40px;
    border-radius: 15px;
    h2 {
      font-size: 16px;
      color: #535151;
    }
    .blog-item {
      width: 100%;
      padding: 8px;
      margin-bottom: 8px;
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      text-decoration: none;
      .txt {
        h3 {
          text-align: right;
          font-size: 16px;
          text-decoration: none;
        }

        .info {
          display: flex;
          justify-content: start;
          .item {
            display: flex;
            span {
              font-size: 12px;
              margin-left: 4px;
              text-decoration: none;
            }

            .fa-message {
              margin-left: 5px;
              color: var(--darkColor);
            }

            .fa-star {
              margin-left: 5px;
              color: gold;
            }

            .rate {
              color: gold;
              text-decoration: none;
            }
          }
        }
      }

      .img-item {
        width: 100%;
        height: 70px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .share-blog {
    padding: 10px;
    width: 80%;
    background-color: #f8f8f8;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    margin-top: 30px;
    border-radius: 15px;
    p {
      text-align: right;
      font-weight: 600;
      font-size: 18px;
      margin-top: 10px;
      display: block;
    }

    .soial {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      margin-bottom: 20px;
      a {
        margin-left: 6px;

        .fa-facebook-f,
        .fa-twitter,
        .fa-instagram,
        .fa-snapchat {
          font-size: 25px;
          color: var(--darkColor);
        }
      }
    }
  }

  .comments {
    background-color: #f8f8f8;
    border-radius: 5px;
    padding: 15px;

    .el-form-item {
      .el-form-item__content {
        margin-left: unset !important;
      }
    }
    .el-button {
      width: 100%;
      background: var(--darkColor);
      height: 50px;
      margin: 30px auto;
    }

    .allComments {
      display: flex;

      .sort {
        display: flex;
      }
    }

    .Comments {
      h3 {
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 20px;
      }
      .comment {
        background-color: #dfdede;
        padding: 8px;
        margin-bottom: 8px;

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
</style>

<style lang="scss">
.el-form-item__content {
  margin-left: unset !important;
}
</style>