<template>
  <div class="blogItem">
    <!-- <app-nav-inner /> -->

    <appNavUser v-if="userAuth" :imageSrc="acc.image" />
    <appNav v-if="!userAuth" />

    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
        <el-breadcrumb-item
          ><router-link to="/blog">المقالات </router-link></el-breadcrumb-item
        >
        <el-breadcrumb-item
          ><router-link to="" v-if="post && post.title">{{
            post.title
          }}</router-link></el-breadcrumb-item
        >
      </el-breadcrumb>
      <h2 v-if="post && post.title">{{ post.title }}</h2>

      <div v-if="post" class="row">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="main-content">
            <div class="atical-item">
              <div class="img-box">
                <!-- <img src="../assets/blog-img.png" alt="" /> -->
                <img :src="post.image" :alt="post.image_info.alt" />
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

            <el-tag class="m-1 mb-4" v-for="tag in slug" :key="tag.id">{{
              tag
            }}</el-tag>

            <div class="comments">
              <el-form ref="form" :model="form" label-width="120px">
                <h3>التعليقات</h3>

                <el-divider></el-divider>

                <div v-if="allComments" class="Comments text-end">
                  <h3>جميع التعليقات:</h3>
                  <!-- <p class="comment" >

                  </p> -->
                  <div class="" v-for="item in allComments" :key="item.id">
                    <div class="info comment d-flex" v-if="item.is_show == 1">
                      <div class="comment-img">
                        <img :src="item.user_info.image" width="30px" alt="" />
                      </div>
                      <div class="">
                        <h3 class="mb-1">{{ item.user_info.name }}</h3>
                        <p v-html="item.body" class="mb-0"></p>
                        <span class="" style="font-size: 13px"
                          >{{ item.time }} <i class="el-icon-time"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>

                <p v-if="!allComments">
                  لا توجد تعليقات حتى الأن . لم لا تكن اول من يكتب تعليق ؟
                </p>

                <el-input
                  id="textarea"
                  type="textarea"
                  :autosize="{ minRows: 10, maxRows: 14 }"
                  v-model="body"
                ></el-input>

                <el-form-item>
                  <el-button type="primary" @click.prevent="sendComment"
                    >أرسل</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-10 col-sm-12">
          <div class="sideBar">
            <div class="markerter-item">
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
                  <router-link :to="`/chat/${post.user_info.mention}`">
                    <div class="massege">
                      <i class="fa-regular fa-message"></i>
                    </div>
                  </router-link>

                  <router-link :to="`/marketers/${post.user_info.mention}`">
                    <div class="user">
                      <i class="fa-regular fa-user"></i>
                    </div>
                  </router-link>

                  <div class="star">
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="another-blogs">
              <h2>مقالات ذات صلة</h2>

              <div class="" v-for="blog in RealetedBlog" :key="blog.id">
                <a :href="`/blog/${blog.user_mention}/${blog.slug}`">
                  <div class="blog-item">
                    <div class="row">
                      <div class="col-4">
                        <div class="img-item">
                          <img :src="blog.image" class="img-man" alt="" />
                        </div>
                      </div>
                      <div class="col-8">
                        <div class="txt">
                          <h3>{{ blog.title }}</h3>
                          <div class="info">
                            <div class="item">
                              <i class="fa-regular fa-message"></i
                              ><span>
                                <span>{{ blog.comment_number }}</span>
                                تعليق</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div class="share-blog">
              <p>شارك المقال</p>
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

      // selected:this.form.country_id,

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
    const itemSlug = this.$route.params.slug;
    const mention = this.$route.params.mention;
    let url = `https://dashboard.arabicreators.com/api/single_blog/${mention}/${itemSlug}`;

    axios.get(url).then((res) => {
      const postData = res.data.data;
      this.post = postData;
      this.plogId = postData.id;
      this.meatDesc = this.post.meta_description;
      this.meatTitle = this.post.meta_title;
      this.slug = JSON.parse(this.post.tags);

      // alert(this.plogId)

      this.post.keywords.forEach((item) => {
        this.keywords.push(item);
      });

      // this.keywords

      this.realtedBlog(this.plogId);
      this.commentsBlog(this.plogId);

      // this.tags=this.post.tags;

      // console.log(postData);

      // alert('meta title '+this.meatTitle)
    });

    // alert('meta title '+this.meatTitle)
  },

  methods: {
    realtedBlog(RealetedID) {
      // const RealetedID = this.plogId;
      // alert(RealetedID)
      const itemRealetedSlug = this.$route.params.slug;
      const Realetedmention = this.$route.params.mention;
      let urlRealted = `https://dashboard.arabicreators.com/api/related_blogs/${RealetedID}`;

      axios.get(urlRealted,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      }).then((res2) => {
        const RealetedBlogData = res2.data.data;
        this.RealetedBlog = RealetedBlogData;

        console.log(RealetedBlogData);
      });
    },

    commentsBlog(CommentID) {
      // const CommentID = this.$route.params.id;
      let urlComment = `https://dashboard.arabicreators.com/api/get_comments_for_blog/${CommentID}`;

      axios
        .get(urlComment, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res3) => {
          const postComments = res3.data.data;
          this.allComments = postComments;
          // this.showComment=postComments.is_show
          // console.log(postData);
        });
    },

    onSubmit() {},

    update() {
      this.$router.go();
    },

    sendComment() {
      // console.log(this.$refs.textarea)
      const comment = new FormData();
      comment.append("body", this.body);
      comment.append("blog_id", this.plogId);

      this.axios
        .post("https://dashboard.arabicreators.com/api/add_comment", comment, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((resComment) => {
          if (resComment.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تمت الاضافة بنجاح",
              type: "success",
            });
          } else if (resComment.data.code == 400) {
            this.$message.error("حدث خطأ !");
          }
        });

      this.body = "";
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
      background-color: white;
      padding: 15px;
      border-radius: 5px;
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
    width: 70%;
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
        display: flex;
        justify-content: start;
        position: relative;

        p {
          margin-bottom: 0 !important;
        }

        .comment-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 5px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        span {
          position: absolute;
          top: 10px;
          left: 10px;
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

.el-tag {
  display: block !important;
  width: max-content !important;
  margin-left: auto;
}
</style>



<style>
@media (max-width: 970px) {
  .blogItem .el-breadcrumb .el-breadcrumb__item {
    font-size: 12px !important;
  }

  .blogItem h2 {
    font-size: 28px !important;
  }

  .blogItem .atical-item {
    height: 400px !important;
    margin-bottom: 15px;
  }

  .blogItem .descripion {
    margin-top: 20px;
  }

  .blogItem .markerter-item {
    width: 100% !important;
    margin-top: 20px;
    display: flex;
  }

  .blogItem .markerter-item .img-cover {
    width: 40% !important;
    height: 150px !important;
    margin-bottom: 0 !important;
  }

  .blogItem .markerter-item .item-body {
    width: 60% !important;
    padding: 15px;
  }

  .blogItem .another-blogs h2 {
    margin-top: 20px !important;
  }

  .blogItem .another-blogs {
    width: 100% !important;
  }

  .blogItem .share-blog {
    width: 100% !important;
    margin-bottom: 15px;
  }

  .blogItem .another-blogs .blog-item .img-item {
    height: 100px !important;
  }

  .blogItem .another-blogs .blog-item .txt h3 {
    margin-bottom: 15px !important;
  }
}

@media (max-width: 557px) {
  .blogItem .el-breadcrumb .el-breadcrumb__item {
    font-size: 10px !important;
  }

  .blogItem h2 {
    font-size: 24px !important;
  }

  .blogItem .atical-item {
    height: 300px !important;
    margin-bottom: 15px;
  }

  .blogItem .descripion {
    margin-top: 20px;
  }

  .blogItem .markerter-item {
    width: 100% !important;
    margin-top: 20px;
  }

  .blogItem .another-blogs h2 {
    margin-top: 20px !important;
  }

  .blogItem .another-blogs {
    width: 100% !important;
  }

  .blogItem .share-blog {
    width: 100% !important;
    margin-bottom: 15px;
  }
}
</style>