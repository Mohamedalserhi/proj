<template>
  <div class="advisorProfile">
    <div class="pageContent">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">

            <div class="profile">

              <div class="img-cover">

                <img :src="profile.cover" alt="" />

                <div
                  class="edit edit3"
                  @click.prevent="$refs.fileInput.click()">
                  <div class="">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                </div>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  @change="uploadImage"
                />
              </div>
              <!-- <el-badge :value="0" class=""> -->
              <div class="img-profile">
                <img v-if="profile" :src="profile.image" alt="" />
                <img
                  v-if="type == 'marketer'"
                  src="../assets/star.png"
                  class="star"
                  alt=""
                />
              </div>

              <div class="edit edit4" @click.prevent="$refs.fileInput2.click()">
                <div class="">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
              </div>

              <input
                type="file"
                style="display: none"
                ref="fileInput2"
                @change="uploadImagePro"
              />

            





              <!-- </el-badge> -->
              <h2 v-if="profile">{{ profile.first_name +' '+ profile.last_name   }}</h2>
              <p v-if="this.profile.email_verified == 1" class="text-success">
                حساب موثق
              </p>
              <p v-if="type == 'marketer'" class="text-success">صانع محتوى</p>
              


              <h5 v-if="profile">
                {{ profile.mention }}

                <el-form v-show="show2" ref="form" label-width="120px">
                  <el-form-item>
                    <el-input
                      class="mt-2"
                      placeholder="ادخل المنشن"
                      v-model="mention"
                      @input="checkMen"
                    ></el-input>
                    <span class="text-danger d-block text-start">{{
                      msg
                    }}</span>
                  </el-form-item>

                  <el-button type="primary" @click="editMention">حفظ</el-button>
                </el-form>

                <div class="edit edit2" @click="show2 = !show2">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
              </h5>

              <div class="d-flex justify-content-around mt-4">
                <p v-if="profile.followe_number"> المتابعون : <i class="el-icon-user"></i>
                    {{profile.followe_number}}</p>
                <p v-if="profile.following_number"> المتابعين : <i class="el-icon-user"></i>
                    {{ profile.following_number }} </p>
              </div>

              <h6 class="mt-3" style="font-size: 13px">
                sub.arabicreators.com/marketers/{{ profile.mention }}
              </h6>

              <div class="d-flex mb-4 justify-content-center align-items-center">
              <el-tag v-for="item in profile.types" :key="item.id" >{{item.title}}</el-tag>
              </div>


                <router-link :to="`/marketers/${profile.mention}`
                " class="mt-4"><el-button>عرض البروفايل <i class="el-icon-view
"></i>
</el-button></router-link>


              <el-divider></el-divider>

              <router-link to="/editProfile">تعديل الملف الشخصي </router-link>
            </div>

            <div class="accoutStatus" v-if="this.profile.status">
              <p>
                حالة الحساب :
                <span class="text-danger" v-if="this.profile.status == 0"
                  >{{ state }}

                  <el-popover
                    placement="top-start"
                    width="30"
                    trigger="hover"
                    v-if="profile.message"
                    :content="profile.message"
                  >
                    <i slot="reference" class="el-icon-question"></i>
                  </el-popover>

                  <el-button plain
                    ><router-link
                      class="text-decoration-none"
                      to="/createUserProfile"
                      >عدل الطلب</router-link
                    ></el-button
                  >
                </span>

                <span v-if="this.profile.status == 1" class="text-warning" >{{
                  state
                }}
                                  <el-button type="primary me-3" plain @click="alremStuts"
                    >تذكير</el-button
                  >
                
                </span>
                <span v-if="this.profile.status == 2" class="text-success"
                  > صانع محتوى


                </span>
              </p>
            </div>

            <div class="whoIam" style="position: relative">
              <h2>من أنا !</h2>
              <p v-if="profile.pio === null">
                '' 
              </p>
              <p v-if="profile.pio != null">
                {{ profile.pio  }}
              </p>
              <el-form v-show="show" ref="form" label-width="120px">
                <el-form-item>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="ادخل السيرة الذاتية"
                    v-model="pio"
                  >
                  </el-input>
                </el-form-item>

                <el-button type="primary" @click.prevent="editPio"
                  >حفظ</el-button
                >
              </el-form>

              <div class="edit" @click="show = !show">
                <i class="fa-solid fa-pen-to-square"></i>
              </div>

              <!-- <el-button type="info" icon="el-icon-edit"
                >تعديل الملف الشخصي <i class="fa-solid fa-pen-to-square"></i></el-button
              > -->
            </div>

            <div class="soial" v-if="type == 'marketer'">

<!-- 
              <div class="" v-if="social.length == 0">
                    <p>لا يوجد حسابات سوشايل ميديا</p>
              </div> -->

              <div class="edit" @click="show3 = !show3">
                <i class="fa-solid fa-pen-to-square"></i>
              </div>
              <a
                :href="profile.social.instagram"
                v-if="profile.social.instagram"
                target="_blank"
                ><i class="fa-brands fa-instagram"></i
              ></a>
              <a
                :href="profile.social.twitter"
                v-if="profile.social.twitter"
                target="_blank"
                ><i class="fa-brands fa-twitter"></i
              ></a>
              <a
                :href="profile.social.facebook"
                v-if="profile.social.facebook"
                target="_blank"
                ><i class="fa-brands fa-facebook-f"></i
              ></a>
              <a
                :href="profile.social.pinterest"
                v-if="profile.social.pinterest"
                target="_blank"
                ><i class="fa-brands fa-pinterest"></i
              ></a>
              <a
                :href="profile.social.website"
                v-if="profile.social.website"
                target="_blank"
                ><i class="fa-solid fa-globe"></i
              ></a>
              <a
                :href="profile.social.snapchat"
                v-if="profile.social.snapchat"
                target="_blank"
                ><i class="fa-brands fa-snapchat"></i
              ></a>
              <a
                :href="profile.social.podcast"
                v-if="profile.social.podcast"
                target="_blank"
                ><i class="fa-solid fa-podcast"></i
              ></a>
              <a
                :href="profile.social.linkedin"
                v-if="profile.social.linkedin"
                target="_blank"
                ><i class="fa-brands fa-linkedin"></i
              ></a>

              <el-form v-show="show3" ref="form" label-width="120px">
                <el-form-item label="facebook">
                  <el-input
                    class="mt-2"
                    placeholder=""
                    v-model="facebook"
                  ></el-input>
                </el-form-item>

                <el-form-item label="instagram">
                  <el-input
                    class="mt-2"
                    placeholder=""
                    v-model="instagram"
                  ></el-input>
                </el-form-item>

                <el-form-item label="twitter">
                  <el-input
                    class="mt-2"
                    placeholder=""
                    v-model="twitter"
                  ></el-input>
                </el-form-item>

                <el-form-item label="pinterst">
                  <el-input
                    class="mt-2"
                    placeholder=""
                    v-model="pinterst"
                  ></el-input>
                </el-form-item>

                <el-button type="primary" @click="editSoial">حفظ</el-button>
              </el-form>
            </div>

            <div class="myReats" v-if="type == 'marketer'">
              <div class="myReat">
                <span>تقييماتي</span>
                <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
              </div>

              <div class="reatItem">
                <el-switch v-model="ConsRate"> </el-switch>
                <span>معدل الإستشارات</span>
                <el-button type="info">لم يحسب بعد</el-button>
              </div>

              <div class="reatItem">
                <el-switch v-model="ConsRep"> </el-switch>
                <span> معدل الرد على الإستفسارات</span>
                <el-button type="info">لم يحسب بعد</el-button>
              </div>

              <div class="reatItem">
                <el-switch v-model="RepSpeed"> </el-switch>
                <span> متوسط سرعة الرد</span>
                <el-button type="info">لم يحسب بعد</el-button>
              </div>

              <div class="reatItem">
                <span>مجموع المقالات </span>
                <el-button class="num" type="info" v-if="profile">{{
                  profile.number_of_blogs
                }}</el-button>
              </div>
              <div class="reatItem">
                <span>مجموع الخدمات </span>
                <el-button class="num" type="info" v-if="profile">{{
                  profile.number_of_services
                }}</el-button>
              </div>

              <div class="reatItem">
                <span>مجموع الفيديوهات </span>
                <el-button class="num" type="info" v-if="profile">{{
                  profile.number_of_videos
                }}</el-button>
              </div>

              <div class="reatItem">
                <span>مجموع البودكاست </span>
                <el-button class="num" type="info" v-if="profile">{{
                  profile.number_of_podcasts
                }}</el-button>
              </div>

              <div class="reatItem">
                <span>مجموع الاستشارات </span>
                <el-button class="num" type="info" v-if="profile">{{
                  profile.number_of_consutiong
                }}</el-button>
              </div>
            </div>

            <div class="myServices">
              <h2>خدماتي</h2>
              <span v-if="profile">{{ profile.number_of_services }}</span>
              <el-divider></el-divider>

              <router-link
                to="/add"
                class="text-decoration-none"
                v-if="type == 'marketer'"
              >
                <el-link icon="el-icon-plus" type="success"
                  >اضافة محتوى</el-link
                >
              </router-link>

              <router-link
                to="/CreateService"
                class="text-decoration-none"
                v-if="type == 'user'"
              >
                <el-link icon="el-icon-plus" type="success">اضافة خدمة</el-link>
              </router-link>
            </div>

            <div class="myServices" v-if="profile.number_of_consutiong">
              <h2>استشاراتي</h2>
              <span v-if="profile">{{ profile.number_of_consutiong }}</span>
              <el-divider></el-divider>

              <router-link
                to="/CreateConsultation"
                class="text-decoration-none"
              >
                <el-link icon="el-icon-plus" type="success"
                  >اضافة استشارة</el-link
                >
              </router-link>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="balance-info" v-if="profile.finance.total > 0">
              <div class="row">
                <div class="balance">
                  <div class="col-lg-6">
                    <div class="allbalance">
                      <h3>الرصيد الكلي</h3>
                      <p>
                        USD
                        <span v-if="profile">{{ profile.finance.total }}</span>
                      </p>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="WithdrawBalance">
                      <h3>الرصيد القابل لسحب</h3>
                      <p>
                        USD
                        <span v-if="profile">{{
                          profile.finance.available
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <el-divider></el-divider>

                <div class="row">
                  <div class="col-lg-6">
                    <div class="avilableBalance">
                      <p>
                        الرصيد المتاح <span>USD</span>
                        <span v-if="profile">{{
                          profile.finance.available
                        }}</span>
                      </p>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="bandBalance">
                      <p>
                        الرصيد المعلق <span>USD</span
                        ><span v-if="profile">{{
                          profile.finance.pending
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tabs">
              <el-tabs
                stretch="true"
                v-model="activeName"
                @tab-click="handleClick"
              >
                <div
                  class=""
                  v-if="
                    !get_videos &&
                    !my_podcasts &&
                    !my_blogs &&
                    !get_consultations &&
                    !my_services
                  "
                >
                  <p class="fs-3 fw-bold">لم تقم باضافة اي خدمات بعد</p>
                  <router-link to="/CreateService" class="addBtn"
                    >اضف خدمة <i class="el-icon-plus"></i
                  ></router-link>
                </div>

                <el-tab-pane label="الفيديوهات" name="five" v-if="get_videos">
                  <div class="search">
                    <form action="" class="d-flex align-items-center">
                      <span>
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </span>
                      <input
                        class="form-control"
                        type="search"
                        @keyup="getVideos"
                        v-on:keyup.enter="getVideos"
                        v-model="search"
                        name=""
                        id=""
                        placeholder="ابحث عن فيديو"
                      />
                    </form>
                  </div>
                  <div class="videos">
                    <div class="container">
                      <p
                        v-if="get_videos && get_videos.length == 0"
                        class="fw-bold m-3"
                      >
                        لا يوجد اي محتوى
                      </p>

                      <div
                        class="row justify-content-center"
                        v-if="get_videos && get_videos.length > 0"
                      >
                        <div
                          class="col-lg-4"
                          v-for="item in get_videos"
                          :key="item.id"
                        >
                          <div class="item">
                            <router-link :to="`/videos/${item.id}`">
                              <div class="img-cover">
                                <div class="dropdown arrow">
                                  <i
                                    class="
                                      fa-solid fa-gear
                                      dropdown-toggle
                                      text-white
                                    "
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  ></i>

                                  <ul class="dropdown-menu">
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        

                                        @click.prevent="editVideo(item.title,item.description,item.id)"
                                      >
                                        تعديل <i class="fa-solid fa-pen"></i
                                      ></a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        @click.prevent="deleteVideo(item.id)"
                                        href="#"
                                      >
                                        حذف <i class="fa-solid fa-trash"></i
                                      ></a>
                                    </li>
                                  </ul>
                                </div>
                                <img :src="item.thum_image" alt="" />
                                <img src="../assets/learn-cover.png" alt="" />
                                <img
                                  src="../assets/video.png"
                                  class="video-img"
                                  alt=""
                                />
                              </div>
                              <div class="item-body">
                                <p>
                                  {{ item.title }}
                                </p>
                                <div class="auther">
                                  <div class="img-box">
                                    <img src="../assets/auther.png" alt="" />
                                  </div>
                                  <span>{{ item.user_info.name }}</span>
                                </div>
                              </div>
                            </router-link>
                          </div>

                          <el-dialog :visible.sync="dialogVisible">
                            <vue-plyr>
                              <div
                                data-plyr-provider="youtube"
                                allowfullscreen
                                allow="autoplay"
                                :data-plyr-embed-id="item.url"
                              ></div>
                            </vue-plyr>
                          </el-dialog>
                        </div>
                      </div>
                    </div>
                    <router-link class="addBtn" to="/CreateVideo"
                      >اضف فيديو <i class="el-icon-plus"></i
                    ></router-link>
                  </div>

                  <div
                    v-if="paginationInfo2"
                    class="el-pagination is-background"
                  >
                    <ul class="el-pager">
                      <li
                        v-for="(page, index) in pageLinks2"
                        :key="index"
                        class="number"
                        :class="{ active: page.active }"
                        @click="updatePage(page)"
                      >
                        <button
                          v-if="page.label === 'prev'"
                          class="btn-prev"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-left"></i>
                        </button>
                        <button
                          v-else-if="page.label === 'next'"
                          class="btn-next"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-right"></i>
                        </button>
                        <span v-else>{{ page.label }}</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="البودكاست" name="fourth" v-if="my_podcasts">
                  <div class="podcasts">
                    <div class="container">
                      <p
                        v-if="my_podcasts && my_podcasts.length == 0"
                        class="fw-bold m-3"
                      >
                        لا يوجد اي محتوى
                      </p>

                      <div
                        class="row justify-content-center"
                        v-if="my_podcasts && my_podcasts.length > 0"
                      >
                        <div
                          class="col-lg-6"
                          v-for="item in my_podcasts"
                          :key="item.id"
                        >
                          <div class="podcast-item">
                            <router-link :to="`/Podcasts/${item.id}`">
                              <div class="img-box">
                                <i
                                  class="
                                    fa-solid
                                    dropdown-toggle
                                    fa-gear
                                    text-white
                                  "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  style="
                                    position: absolute !important;
                                    top: 10px;
                                    left: 10px;
                                  "
                                ></i>

                                <ul class="dropdown-menu">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      :href="`/EditPodcast/${item.id}`"
                                    >
                                      تعديل <i class="fa-solid fa-pen"></i
                                    ></a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      @click.prevent="deletePodcast(item.id)"
                                      href="#"
                                    >
                                      حذف <i class="fa-solid fa-trash"></i
                                    ></a>
                                  </li>
                                </ul>
                                <img :src="item.image" alt="" />
                                <div class="time">
                                  <i class="fa-regular fa-clock ms-1"></i>
                                  <span>25 <span>دقيقة</span></span>
                                </div>
                              </div>

                              <div class="item-body">
                                <h3>{{ item.title }}</h3>
                                <p v-html="item.description"></p>
                              </div>
                              <div class="item-bottom">
                                <div class="icons">
                                  <img src="../assets/apple.png" alt="" />
                                  <img src="../assets/soundCloud.png" alt="" />
                                  <img src="../assets/podcast.png" alt="" />
                                </div>
                              </div>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <router-link to="/CreatePodcast" class="addBtn">
                      اضف بودكاست <i class="el-icon-plus"></i
                    ></router-link>
                  </div>

                  <div
                    v-if="paginationInfo"
                    class="el-pagination is-background"
                  >
                    <ul class="el-pager">
                      <li
                        v-for="(page, index) in pageLinks"
                        :key="index"
                        class="number"
                        :class="{ active: page.active }"
                        @click="updatePage(page)"
                      >
                        <button
                          v-if="page.label === 'prev'"
                          class="btn-prev"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-left"></i>
                        </button>
                        <button
                          v-else-if="page.label === 'next'"
                          class="btn-next"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-right"></i>
                        </button>
                        <span v-else>{{ page.label }}</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="المقالات" name="third" v-if="my_blogs">
                  <div class="search">
                    <form action="" class="d-flex align-items-center">
                      <span>
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </span>
                      <input
                        class="form-control"
                        type="search"
                        @keyup="blogs"
                        v-on:keyup.enter="blogs"
                        v-model="search"
                        name=""
                        id=""
                        placeholder="ابحث عن مقال"
                      />
                    </form>
                  </div>
                  <div class="blog">
                    <div class="container">
                      <p
                        v-if="my_blogs && my_blogs.length == 0"
                        class="fw-bold m-3"
                      >
                        لا يوجد اي محتوى
                      </p>

                      <div
                        class="row justify-content-center"
                        v-if="my_blogs && my_blogs.length > 0"
                      >
                        <div
                          class="col-lg-4"
                          v-for="item in my_blogs"
                          :key="item.id"
                        >
                          <div class="atical-item">
                            <router-link
                              :to="`/blog/${item.user_mention}/${item.slug}`"
                            >
                              <div class="dropdown arrow">
                                <i
                                  class="
                                    fa-solid fa-gear
                                    dropdown-toggle
                                    text-white
                                  "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                ></i>

                                <ul class="dropdown-menu">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      @click.prevent="
                                        editBlog(
                                          item.title,
                                          item.description,
                                          item.slug,
                                          item.keywords,
                                          item.tags,
                                          item.categories,
                                          item.meta_description,
                                          item.id
                                        )
                                      "
                                    >
                                      تعديل <i class="fa-solid fa-pen"></i
                                    ></a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      @click.prevent="deleteBlog(item.id)"
                                      href="#"
                                    >
                                      حذف <i class="fa-solid fa-trash"></i
                                    ></a>
                                  </li>
                                </ul>
                              </div>
                              <div class="img-box">
                                <img :src="item.image" alt="" />
                                <img src="../assets/img-overlay.png" alt="" />
                              </div>
                              <div class="item-body">
                                <p>{{ item.title }}</p>

                                <span>
                                  <span>{{ item.user_info.name }}</span>
                                  <i class="fa-solid fa-user ms-2"></i>
                                  <span>تعليق {{ item.comment_number }} </span
                                  ><i class="fa-solid fa-message ms-2"></i>
                                </span>
                              </div>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <router-link to="/CreateBlog" class="addBtn"
                      >اضف مقال <i class="el-icon-plus"></i
                    ></router-link>
                  </div>

                  <div
                    v-if="paginationInfo3"
                    class="el-pagination is-background"
                  >
                    <ul class="el-pager">
                      <li
                        v-for="(page, index) in pageLinks3"
                        :key="index"
                        class="number"
                        :class="{ active: page.active }"
                        @click="updatePage5(page)"
                      >
                        <button
                          v-if="page.label === 'prev'"
                          class="btn-prev"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-left"></i>
                        </button>
                        <button
                          v-else-if="page.label === 'next'"
                          class="btn-next"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-right"></i>
                        </button>
                        <span v-else>{{ page.label }}</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane
                  label="الاستشارات"
                  name="second"
                  v-if="get_consultations"
                >
                  <div class="search">
                    <form action="" class="d-flex align-items-center">
                      <span>
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </span>
                      <input
                        class="form-control"
                        type="search"
                        @keyup="getConsultations"
                        v-on:keyup.enter="getConsultations"
                        v-model="search"
                        name=""
                        id=""
                        placeholder="ابحث عن استشاراة"
                      />
                    </form>
                  </div>
                  <div class="container">
                    <p
                      v-if="get_consultations && get_consultations.length == 0"
                      class="fw-bold m-3"
                    >
                      لا يوجد اي محتوى
                    </p>

                    <div
                      class="row"
                      v-if="get_consultations && get_consultations.length > 0"
                    >
                      <div
                        class="col-lg-6"
                        v-for="item in get_consultations"
                        :key="item.id"
                      >
                        <div class="consult-item">
                          <div class="itemHead">
                            <el-checkbox v-model="checked"></el-checkbox>

                            <div class="dropdown">
                              <i
                                class="fa-solid fa-gear dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              ></i>
                              <ul class="dropdown-menu">
                                <li>
                                  <a
                                    class="dropdown-item"
                                    :href="`/EditConsultation/${item.id}`"
                                  >
                                    تعديل <i class="fa-solid fa-pen"></i
                                  ></a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    حذف <i class="fa-solid fa-trash"></i
                                  ></a>
                                </li>

                                <li class="p-2">
                                  ON/OF
                                  <el-switch
                                    v-model="showConslut"
                                    class="d-inline"
                                  ></el-switch>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <h3>{{ item.title }}</h3>
                          <p v-html="item.description"></p>
                          <span> {{ item.type.title }} </span>
                          <div class="cons-marketing">
                            <div class="item">
                              <img src="../assets/zoom.png" alt="" />
                              <span>{{ item.place.title }}</span>
                            </div>

                            <p>
                              <span>{{ item.minutes }}</span> دقيقة
                            </p>
                          </div>

                          <el-divider></el-divider>

                          <div class="copyLink">
                            <div class="item">
                              <i class="el-icon-document-copy"></i>

                              <a href="">نسخ الرابط </a>
                            </div>

                            <div class="item">
                              <el-button type="success">مشاركة</el-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <router-link to="/CreateConsultation" class="addBtn">
                    اضف استشارة <i class="el-icon-plus"></i
                  ></router-link>

                  <div
                    v-if="paginationInfo"
                    class="el-pagination is-background"
                  >
                    <ul class="el-pager">
                      <li
                        v-for="(page, index) in pageLinks"
                        :key="index"
                        class="number"
                        :class="{ active: page.active }"
                        @click="updatePage3(page)"
                      >
                        <button
                          v-if="page.label === 'prev'"
                          class="btn-prev"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-left"></i>
                        </button>
                        <button
                          v-else-if="page.label === 'next'"
                          class="btn-next"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-right"></i>
                        </button>
                        <span v-else>{{ page.label }}</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="الخدمات" name="first" v-if="my_services">
                  <div class="services">
                    <div class="search">
                      <form action="" class="d-flex align-items-center">
                        <span>
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                          class="form-control"
                          type="search"
                          @keyup="myServices"
                          v-on:keyup.enter="myServices"
                          v-model="search"
                          name=""
                          id=""
                          placeholder="ابحث عن خدمة"
                        />
                      </form>
                    </div>
                    <div class="container">
                      <div
                        v-if="my_services && my_services.length == 0"
                        class="mb-4 mt-4"
                      >
                        <img width="100" src="../assets/delete.png" alt="" />

                        <p class="fw-bold m-3">لا يوجد اي محتوى</p>
                      </div>
                      <div
                        class="row justify-content-center"
                        v-if="my_services && my_services.length > 0"
                      >
                        <div
                          class="col-lg-4"
                          v-for="item in my_services"
                          :key="item.id"
                        >
                          <div class="OurServices-item">
                            <router-link :to="`/OurServices/${item.id}`">
                              <div class="img-box">
                                <i
                                  class="
                                    fa-solid
                                    dropdown-toggle
                                    fa-gear
                                    text-white
                                  "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  style="
                                    position: absolute !important;
                                    top: 15px;
                                    left: 15px;
                                  "
                                ></i>

                                <ul class="dropdown-menu">
                                  <li>
                                    <a

                                    @click.prevent="editService(item.id,item.title,
                                      item.description,item.url,item.price,item.time,item.type_service
                                      ,item.buyer_instructions,item.has_file,item.keywords,item.types,
                                      item.specialties[0].title,item.thumb_image)"

                                      class="dropdown-item"
                                      
                                    >
                                      تعديل <i class="fa-solid fa-pen"></i
                                    ></a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      @click.prevent="deleteService(item.id)"
                                      href="#"
                                    >
                                      حذف <i class="fa-solid fa-trash"></i
                                    ></a>
                                  </li>
                                </ul>
                                <img :src="item.thumb_image" alt="" />
                              </div>

                              <div class="item-body">
                                <div
                                  class="title d-flex justify-content-between"
                                >
                                  <h5>{{ item.title }}</h5>
                                  <span>{{item.type}}</span>
                                </div>
                                <p                               v-html="item.description.replace(/<\/?[^>]+>/ig, '').substr(0, 22) + '...'"></p>
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
                                    <span> {{ item.number_of_view }}</span>
                                    <i class="fa-solid fa-star"></i>
                                    <span> 987 </span>
                                    <i class="fa-solid fa-user-large"></i
                                  ></span>
                                </div>
                              </div>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <router-link to="/CreateService" class="addBtn"
                      >اضف خدمة <i class="el-icon-plus"></i
                    ></router-link>
                  </div>

                  <div
                    v-if="paginationInfo"
                    class="el-pagination is-background"
                  >
                    <ul class="el-pager">
                      <li
                        v-for="(page, index) in pageLinks"
                        :key="index"
                        class="number"
                        :class="{ active: page.active }"
                        @click="updatePage4(page)"
                      >
                        <button
                          v-if="page.label === 'prev'"
                          class="btn-prev"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-left"></i>
                        </button>
                        <button
                          v-else-if="page.label === 'next'"
                          class="btn-next"
                          :disabled="!page.number"
                        >
                          <i class="el-icon el-icon-arrow-right"></i>
                        </button>
                        <span v-else>{{ page.label }}</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import appNavInner from "@/components/navComponentInner.vue";
import Vue from "vue";

export default {
  components: {
    appNavInner,
  },

  data() {
    return {
      myAcc:localStorage.getItem('name'),
      input1: "",
      show: true,
      icon: <i class="fa-solid fa-filter"></i>,
      value: 3.7,
      checked: false,
      activeName: "first",
      dialogVisible: false,
      pagination: null,
      pagination2: null,
      pagination3: null,

      profile: undefined,
      state: "",
      get_videos: undefined,
      get_consultations: undefined,
      my_podcasts: undefined,
      my_services: undefined,
      my_blogs: undefined,

      pio: "",
      show: false,
      mention: "",
      show2: false,
      show3: false,
      show4: false,
      facebook: "",
      instagram: "",
      twitter: "",
      pinterst: "",
      msg: "",
      ConsRate: true,
      ConsRep: true,
      RepSpeed: true,
      email_verified: "",

      type: "",
      search: null,
      url: null,
      imageSelcteedCover: null,
      imageSelcteed: null,
      url2: null,
    };
  },

  computed: {
    paginationInfo() {
      if (!this.pagination) return null;

      return this.pagination;
    },
    pageLinks() {
      const p = this.pagination;
      if (!p) return [];

      let links = JSON.parse(JSON.stringify(p.links));

      return links.map((link, i) => {
        link.number = link.url ? parseInt(link.url.split("=")[1]) : 0;

        if (i === 0) {
          link.label = "prev";
        }
        if (i === links.length - 1) {
          link.label = "next";
          if (p.current_page >= p.last_page) {
            link.number = 0;
          } else {
            link.number = p.current_page + 1;
          }
        }

        return link;
      });
    },
    currentPage() {
      if (!this.pagination) return 0;

      return this.pagination.current_page;
    },
    pageTotal() {
      const p = this.pagination;
      if (!p) return 0;

      return p.last_page;
    },

    paginationInfo2() {
      if (!this.pagination2) return null;

      return this.pagination2;
    },
    pageLinks2() {
      const p = this.pagination2;
      if (!p) return [];

      let links = JSON.parse(JSON.stringify(p.links));

      return links.map((link, i) => {
        link.number = link.url ? parseInt(link.url.split("=")[1]) : 0;

        if (i === 0) {
          link.label = "prev";
        }
        if (i === links.length - 1) {
          link.label = "next";
          if (p.current_page >= p.last_page) {
            link.number = 0;
          } else {
            link.number = p.current_page + 1;
          }
        }

        return link;
      });
    },
    currentPage2() {
      if (!this.pagination2) return 0;

      return this.pagination2.current_page;
    },
    pageTotal2() {
      const p = this.pagination2;
      if (!p) return 0;

      return p.last_page;
    },

    paginationInfo3() {
      if (!this.pagination3) return null;

      return this.pagination3;
    },
    pageLinks3() {
      const p = this.pagination3;
      if (!p) return [];

      let links = JSON.parse(JSON.stringify(p.links));

      return links.map((link, i) => {
        link.number = link.url ? parseInt(link.url.split("=")[1]) : 0;

        if (i === 0) {
          link.label = "prev";
        }
        if (i === links.length - 1) {
          link.label = "next";
          if (p.current_page >= p.last_page) {
            link.number = 0;
          } else {
            link.number = p.current_page + 1;
          }
        }

        return link;
      });
    },
    currentPage3() {
      if (!this.pagination3) return 0;

      return this.pagination3.current_page;
    },
    pageTotal3() {
      const p = this.pagination3;
      if (!p) return 0;

      return p.last_page;
    },
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }
    this.profileData();
    this.getVideos();
    this.getConsultations();
    this.getPodcasts();
    this.myServices();
    this.blogs();
  },

  methods: {
    profileData() {
      Vue.axios
        .get("https://dashboard.arabicreators.com/api/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          this.profile = res.data.data;
          this.type = this.profile.type;

          // alert(this.type)

          if (this.profile.status == 1) {
            this.state = "معلق";
          } else if (this.profile.status == 0) {
            this.state = "مرفوض";
          } else if (this.profile.status == 2) {
            this.state = "مقبول";
          }

          if (this.profile.email_verified == 1) {
            this.email_verified = "موثق";
          } else if (this.profile.email_verified == 0) {
            this.email_verified = "غير موثق";
          }

          localStorage.setItem("userName", this.profile.name);
          localStorage.setItem("email", this.profile.email);
          this.mention = this.profile.mention;
          this.pio = this.profile.pio;
          this.facebook = this.profile.social.facebook;
          this.instagram = this.profile.social.instagram;
          this.twitter = this.profile.social.twitter;
          this.pinterst = this.profile.social.pinterest;

          // this.show = !this.show;
        });
    },

    editBlog(
      itemTitle,
      itemDes,
      itemSlug,
      keywords,
      tags,
      categories,
      meta_description,
      id
    ) {
      this.$router.push(`/EditBlog/${itemSlug}`);0
      localStorage.setItem("itemTitle", itemTitle);
      localStorage.setItem("itemDes", itemDes);
      localStorage.setItem("keywords", JSON.parse(keywords));
      localStorage.setItem("tags", JSON.parse(tags));
      localStorage.setItem("categories", categories[0].title);
      localStorage.setItem("meta_description", meta_description);
      localStorage.setItem("blogID", id);
      // alert(localStorage.getItem('categories'))
    },


    editService(
      id,
      title,
      description,
      url,
      price,
      time,
      type_service,
      buyer_instructions,
      has_file,
      keywords,
      types,
      specialties,
      thumb_image
    ) {
      localStorage.setItem("SerId", id);
      localStorage.setItem("SerTitle", title);
      localStorage.setItem("SerKeywords", JSON.stringify(keywords));
      localStorage.setItem("SerTags", JSON.stringify(types));
      localStorage.setItem("SerDescription", description);
      localStorage.setItem("SerUrl", url);
      localStorage.setItem("SerPrice", price);
      localStorage.setItem("SerTime", time);
      localStorage.setItem("SerType", type_service);
      localStorage.setItem("SerInstructions", buyer_instructions);
      localStorage.setItem("SerHas_file", has_file);
      localStorage.setItem("SerSpecialties",JSON.stringify(specialties));
      localStorage.setItem("Serthumb_image", thumb_image);

            this.$router.push(`/EditService/${id}`);

      // alert(localStorage.getItem('categories'))
    },


        editVideo(
      itemTitle,
      itemDes,
      id
    ) {
      this.$router.push(`/EidtVideo/${id}`);
      localStorage.setItem("itemVTitle", itemTitle);
      localStorage.setItem("itemVDes", itemDes);
      localStorage.setItem("VideoID", id);
      // alert(localStorage.getItem('categories'))
    },

    getVideos(page = 1) {
      let urlVideo = `https://dashboard.arabicreators.com/api/get_videos?page=${page}`;

      let user_id = localStorage.getItem("userId");

      if (this.search) {
        urlVideo = `https://dashboard.arabicreators.com/api/video_profile_search/${user_id}?title=${this.search}`;
      }

      Vue.axios
        .get(urlVideo, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((resVid) => {
          console.log(resVid);
          const response = resVid.data.data;
          this.get_videos = response.data;
          this.pagination2 = response.meta;
        });
    },

    getConsultations(page = 1) {
      const ConstID = this.$route.params.id;
      localStorage.setItem("ConstID", ConstID);
      let urlConsultations = `https://dashboard.arabicreators.com/api/get_consultations?page=${page}`;

      let user_id = localStorage.getItem("userId");

      if (this.search) {
        urlConsultations = `https://dashboard.arabicreators.com/api/consultation_profile_search/${user_id}?title=${this.search}`;
      }

      // alert(localStorage.getItem('ConstID'))

      Vue.axios
        .get(urlConsultations, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("const" + res.data);
          this.get_consultations = res.data.data.data;
          const response = res.data.data;
          this.pagination = response.meta;
        });
    },

    getPodcasts(page = 1) {
      let urlPodcasts = `https://dashboard.arabicreators.com/api/my_podcasts?page${page}`;

      let user_id = localStorage.getItem("userId");

      if (this.search) {
        urlPodcasts = `https://dashboard.arabicreators.com/api/podcast_profile_search/${user_id}?title=${this.search}`;
      }

      Vue.axios
        .get(urlPodcasts, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((resPodcast) => {
          console.log(resPodcast);
          this.my_podcasts = resPodcast.data.data.data;
          const response = resPodcast.data.data;
          this.pagination = response.meta;
        });
    },

    myServices(page = 1) {
      let urlServices = `https://dashboard.arabicreators.com/api/my_services?page${page}`;

      let user_id = localStorage.getItem("userId");

      if (this.search) {
        urlServices = `https://dashboard.arabicreators.com/api/service_profile_search/${user_id}?title=${this.search}`;
      }

      Vue.axios
        .get(urlServices, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((resService) => {
          console.log(resService);
          this.my_services = resService.data.data.data;
          const response = resService.data.data;
          this.pagination = response.meta;
        });
    },

    blogs(page = 1) {
      let urlBlogs = `https://dashboard.arabicreators.com/api/my_blogs?page${page}`;

      let user_id = localStorage.getItem("userId");

      if (this.search) {
        urlBlogs = `https://dashboard.arabicreators.com/api/blog_search_in_profile/${user_id}?title=${this.search}`;
      }

      Vue.axios
        .get(urlBlogs,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((resBlogs) => {
          console.log(resBlogs);
          this.my_blogs = resBlogs.data.data.data;
          const response = resBlogs.data.data;
          this.pagination3 = response.meta;
        });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    updatePage(page) {
      if (page.number) {
        this.getVideos(page.number);
      }
    },

    updatePage2(page) {
      if (page.number) {
        this.getConsultations(page.number);
      }
    },

    updatePage3(page) {
      if (page.number) {
        this.getPodcasts(page.number);
      }
    },

    updatePage4(page) {
      if (page.number) {
        this.myServices(page.number);
      }
    },

    updatePage5(page) {
      if (page.number) {
        this.blogs(page.number);
      }
    },

    deleteBlog(id) {
      this.axios
        .delete(`https://dashboard.arabicreators.com/api/delete_blog/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.go();
        });
    },

    deleteVideo(id) {
      this.axios
        .delete(`https://dashboard.arabicreators.com/api/delete_video/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.go();
        });
    },

    deletePodcast(id) {
      this.axios
        .delete(
          `https://dashboard.arabicreators.com/api/delete_podcast/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.go();
        });
    },

      deleteService(id) {
      this.axios
        .delete(
          `https://dashboard.arabicreators.com/api/delete_service/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.go();
        });
    },

    editMention() {
      const data = new FormData();
      data.append("mention", this.mention);

      Vue.axios
        .post(
          "https://dashboard.arabicreators.com/api/check_mention_name",
          data,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if ((res.data.code = 200)) {
            this.$message({
              message: "تم التعديل بنجاح",
              type: "success",
            });
            this.profileData();

            this.show2 = !this.show2;
          }
        });
    },

    checkMen() {
      if (!this.mention.includes("@")) {
        this.msg = "قم باضافة @ مع الاسم";
      } else if (this.mention.includes("@")) {
        this.msg = " ";
      }
    },

    editPio() {
      const data = new FormData();
      data.append("pio", this.pio);

      Vue.axios
        .post("https://dashboard.arabicreators.com/api/edit_pio", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if ((res.data.code = 200)) {
            this.$message({
              message: "تم التعديل بنجاح",
              type: "success",
            });

            this.show = !this.show;

            this.profileData();
          }
        });
    },

    editSoial() {
      const data = new FormData();

      data.append("facebook", this.facebook);
      data.append("instagram", this.instagram);
      data.append("twitter", this.twitter);
      data.append("pinterest", this.pinterst);

      Vue.axios
        .post("https://dashboard.arabicreators.com/api/edit_soical", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if ((res.data.code = 200)) {
            this.$message({
              message: "تم التعديل بنجاح",
              type: "success",
            });
            this.show3 = !this.show3;

            this.profileData();
          }
        });
    },

    alremStuts() {
      const d = "";
      Vue.axios
        .post("https://dashboard.arabicreators.com/api/remmeber_markter", d, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "تم ارسال تذكير بنجاح",
              type: "success",
            });
          } else {
            this.$message.error("لم يتم الارسال حدث خطأ");
          }
        });
    },

    blogSearch() {
      // if(this.search){
      // let url =

      // }

      Vue.axios
        .get(
          `https://dashboard.arabicreators.com/api/get_markter/blog_search?title=${this.search}`
        )
        .then((res) => {
          // this.marketerBolg = res.data;
          console.log(res.data);
        });
    },

    uploadImage(event) {
      this.imageSelcteedCover = event.target.files[0];
      // this.img=this.imageSelcteedCover
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);

      this.EditCover();
    },

    uploadImagePro(event) {
      this.imageSelcteed = event.target.files[0];
      // this.img=this.imageSelcteedCover
      const file = event.target.files[0];
      this.url2 = URL.createObjectURL(file);

      this.EditImage();
    },

    EditCover() {
      const dataImg = new FormData();
      dataImg.append(
        "cover",
        this.imageSelcteedCover,
        this.imageSelcteedCover.name
      );

      Vue.axios
        .post(
          "https://dashboard.arabicreators.com/api/upload_profile_cover",
          dataImg,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code == 400) {
            this.$message.error("قم باضافة صورة");
          } else if (res.data.code == 200) {

                        this.profileData();

            this.$message({
              message: "تم تعديل صورة الغلاف بنجاح",
              type: "success",
            });
          }
        });
    },

    EditImage() {
      const dataStep = new FormData();
      dataStep.append("image", this.imageSelcteed, this.imageSelcteed.name);

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/upload_profile_image",
          dataStep,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code == 400) {
            this.$message.error("قم باضافة صورة");
          } else if (res.data.code == 200) {
                        this.profileData();

            this.$message({
              message: "تم تعديل الصورة الشخصية بنجاح",
              type: "success",
            });
          }
        });
    },

    command() {},
  },
};
</script>


<style lang="scss">
.edit {
  position: absolute;
  left: 15px;
  top: 15px;
  cursor: pointer;
}

.edit2 {
  top: 333px;
  font-size: 16px;
}

.edit3 {
    top: 7px;
    background-color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 2;

}

.edit4 {
  top: 237px;
}

.advisorProfile {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;

  .pageContent {
    padding-top: 30px;
    padding-bottom: 200px;

    .profile {
      position: relative;

      .star {
        position: absolute;
        bottom: 13%;
        right: -5%;
        width: 30px;
        height: 30px;
        z-index: 2;
      }

      .img-cover {
        position: relative;
        top: 0;
        right: 0;
        width: 100%;
        height: 200px;

        img{
          width: 100%;
          height: 100%;
        }
      }
    }

    .View{
      position: absolute;
      top: 230px;
      right: 20px;
    }

    .img-profile {
      width: 100px;
      height: 100px;
      margin: auto;
      border: 1px solid #434242;
      border-radius: 50%;
      position: relative;
      top: -60px;
      margin-bottom: 0 !important;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .balance-info {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      background-color: white;
      padding-top: 40px;
    }
    .balance {
      display: flex;
      justify-content: center;

      .allbalance {
        h3 {
          color: var(--darkColor);
          font-size: 18px;
          margin-bottom: 30px;
        }

        p {
          color: var(--darkColor);
          font-size: 24px;
          text-transform: uppercase;
          font-weight: 700;

          span {
          }
        }
      }
    }

    .WithdrawBalance {
      h3 {
        font-size: 18px;
        margin-bottom: 30px;
      }

      p {
        font-size: 24px;
        text-transform: uppercase;
        font-weight: 700;
        span {
        }
      }
    }

    .avilableBalance {
      p {
        font-weight: 600;
        span {
          font-size: 20px;
          text-transform: uppercase;
          font-weight: 700;
          margin-right: 5px;
        }
      }
    }

    .bandBalance {
      p {
        font-weight: 600;

        span {
          font-size: 20px;
          text-transform: uppercase;
          font-weight: 700;
          margin-right: 5px;
        }
      }
    }

    .search {
      // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin: 14px;
      margin-bottom: 20px;
      background-color: white;
      input {
        border-radius: 0 !important;
        height: 40px;
        direction: rtl;
        border-top-right-radius: 5px !important;
        border-bottom-right-radius: 5px !important;

        &:hover {
          box-shadow: none !important;
        }
      }

      .form-control:focus {
        box-shadow: none !important;
      }
      span {
        background: var(--darkColor) !important;
        color: white;
        border-radius: 0;
        height: 40px;
        width: 70px;
        font-size: 20px;
        line-height: 40px;
        border-top-left-radius: 5px !important;
        border-bottom-left-radius: 5px !important;
      }

      .el-input-group {
        direction: ltr;
        height: 56px;
        .el-input__prefix {
          top: 29%;
          left: 2%;
          color: var(--darkColor);

          .fa-filter {
            font-size: 22px;
          }
        }
      }

      .el-input__inner {
        text-align: right;
        height: 100%;
        border: none;
      }

      .el-input-group__append,
      .el-input-group__prepend {
        background: var(--darkColor) !important;
        color: white;
        border-radius: 0;
        width: 70px;
        font-size: 20px;
      }
    }

    // tabs
    .tabs {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      background-color: white;

      .el-tabs {
        direction: ltr;

        .el-tabs__item {
          font-weight: 700;
          font-size: 20px;
          color: #535151;
        }

        .el-tabs__item.is-active {
          color: var(--lightColor);
        }

        .el-tabs__active-bar {
          background-color: var(--lightColor);
        }
      }
    }

    // .el-pagination {
    //   direction: ltr;
    //   margin-top: 40px;
    //   margin-bottom: 60px;
    //   .el-pager li,
    //   .btn-prev,
    //   .btn-next {
    //     color: white;
    //     border-radius: 50%;
    //     height: 40px;
    //     min-width: 40px;
    //     border: 1px solid #4ebb1f;
    //     background-color: white;
    //     line-height: 40px;
    //     color: #4ebb1f;
    //     font-weight: 700;
    //     font-size: 15px;
    //   }

    //   .el-pager li:not(.disabled) {
    //     &:hover {
    //       color: #173b07;
    //     }
    //   }

    //   .el-pager li:not(.disabled).active {
    //     background: linear-gradient(
    //       239.11deg,
    //       #70d644 -31.67%,
    //       #567a46 192.97%
    //     );
    //     color: white;
    //   }
    // }

    .el-pager {
      display: flex;
      justify-content: center;
    }
    .el-pagination .el-pager li {
      height: 40px !important;
      width: 40px !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .profile {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      background-color: white;

      .img-profile {
        img {
        }
      }
      h2 {
        font-size: 24px;
        font-weight: 700;
        text-transform: capitalize;
        color: #222;
        margin-bottom: 15px;
        margin-top: -30px;
      }
      a {
        text-transform: capitalize;
        font-size: 22px;
        color: var(--darkColor);
        text-decoration: unset;
        font-weight: 600;
      }
    }

    .accoutStatus {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      text-align: right;
      background-color: white;

      p {
        font-weight: 600;
        margin-bottom: 0;
        span {
          color: var(--lightColor);
        }
      }
    }

    .whoIam {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      text-align: right;
      background-color: white;

      h2 {
        font-weight: 700;
        margin-bottom: 25px;
        font-size: 22px;
      }

      p {
        margin-bottom: 40px;
        color: #7e7e7e;
        line-height: 2;
      }

      .el-button {
        background-color: var(--lightColor);
        border: none;
        padding: 15px 40px;
      }

      // btn
    }

    .myReats {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      background-color: white;

      .myReat {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        margin-top: 20px;

        span {
          font-weight: 700;
          color: #636363;
        }

        .el-rate {
          direction: ltr;
        }

        // rate

        .el-rate__icon {
          font-size: 25px;
        }
      }

      .reatItem {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        span {
          font-weight: 600;
          font-size: 18px;
        }

        .el-button {
          background-color: var(--lightColor);
          border: none;
          padding: 10px;
        }

        .num {
          color: white;
          background: var(--darkColor);
          border-radius: 4px;
          width: 95px;
        }

        //btn
      }
    }

    .el-badge__content {
      background-color: var(--lightColor);
      right: 28px;
    }

    .myServices {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      background-color: white;

      h2 {
        font-weight: 600;
        color: #3e3b3b;
        margin-bottom: 20px;
      }

      span {
        font-size: 24px;
        font-weight: 700;
      }

      .el-link {
        margin-bottom: 15px;
        font-weight: 600;
        font-size: 20px;
        text-decoration: none;
        color: var(--lightColor);
      }

      //link
    }

    .soial {
      position: relative;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 15px;
      margin-bottom: 20px;
      background-color: white;

      a {
        border: 1px solid #b7b7b7;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin: 10px;
        padding: 10px;
        display: inline-block;
        .fa-facebook-f,
        .fa-pinterest,
        .fa-twitter,
        .fa-instagram,
        .fa-globe,
        .fa-snapchat,
        .fa-podcast,
        .fa-linkedin {
          color: #3e3b3b;
          font-size: 26px;
        }
      }
    }
  }

  .OurServices-item {
    border: 1px solid #c0c0c0;
    border-radius: 15px;
    direction: rtl;
    margin-bottom: 20px;
    height: 320px;
    padding: 10px ;
    position: relative;

    .img-box {
      width: 100%;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .item-body {
      padding: 5px;

      .title {
        margin: 5px 0 5px 0;
        h5 {
          color: #302d2d;
          font-size: 14px;
          font-weight: 700;
          text-align: right;
        }

        span {
          color: white;
          background-color: #677a5f;
          border-radius: 6px;
          padding: 5px 8px;
          height: 34px;
          font-size: 15px;
        }
      }

      p {
        margin-bottom: 5px;
        text-align: right;
        color: black;
        font-weight: 500;
        font-size: 14px;
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
          background: var(--lightColor);
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

  .atical-item {
    position: relative;
    width: 100%;
    height: 270px;
    margin: 10px;
    margin-bottom: 20px;
    border-radius: 13px;
    overflow: hidden;
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

    a {
      color: inherit;
      text-decoration: none;
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
      }

      span {
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }

  .podcast-item {
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    margin: 6px;
    direction: rtl;
    margin-bottom: 20px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    .img-box {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .time {
        position: absolute;
        bottom: 10px;
        right: 0;
        background: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        background-size: cover;
        width: 92px;
        height: 29px;
        opacity: 0.8;
        filter: sepia(1);

        .fa-clock {
          color: white;
          font-size: 14px;
        }

        span {
          font-size: 10px;
          color: white;
        }
      }
    }

    .item-body {
      padding: 10px;
      h3 {
        font-size: 18px;
        margin-bottom: 10px;
      }

      p {
        font-size: 15px;
      }
    }

    .item-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icons {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin: 8px;
        }
      }
      .btn {
        color: white;
        background: var(--lightColor);
        border-radius: 15px;
        padding: 0;
        padding-right: 5px;
        margin: 8px;
        display: flex;
        align-items: center;
        a {
          text-decoration: none;
          color: white;
          margin-left: 5px;
        }
        img {
        }
      }
    }
  }

  .item {
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    a {
      text-decoration: none;
      color: black;

      .img-cover {
        width: 100%;
        height: 300px;
        position: relative;
        img {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .video-img {
          top: 20px;
          right: 15px;
          width: 40px;
          height: 30px;
        }
      }

      .item-body {
        padding: 15px;
        background-color: #f2f2f2a2;
        p {
          font-weight: 600;
        }

        .auther {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #302d2d4c;
          padding-top: 10px;

          .img-box {
            width: 30px;
            height: 30px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          span {
          }
        }
      }
    }
  }

  .consult-item {
    direction: rtl;
    background-color: white;
    border-radius: 10px;
    margin: 10px;
    padding: 15px;
    border-top: var(--darkColor) solid 10px;
    text-align: right;
    margin-bottom: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .itemHead {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .el-dropdown {
        .el-icon-s-tools {
          font-size: 20px;
        }
      }
    }

    h3 {
      margin-bottom: 10px;
      font-size: 22px;
    }

    p {
      color: rgb(159, 150, 150);
      margin-bottom: 15px;
    }

    span {
      font-weight: 600;
      margin-bottom: 8px;
    }

    .cons-marketing {
      display: flex;
      justify-content: start;
      margin-top: 10px;
      .item {
        box-shadow: unset;
        margin-left: 20%;
        img {
          margin-left: 8px;
        }

        span {
        }
      }

      p {
        font-weight: 600;
        color: black;
        margin-bottom: 0;
        span {
          font-weight: 600;
        }
      }
    }

    .copyLink {
      display: flex;
      justify-content: space-between;
      .item {
        box-shadow: unset;
        a {
          margin-right: 5px;
          color: black;
          text-decoration: unset;
        }

        .el-icon-document-copy {
        }

        .el-button {
          padding: 6px 15px;
          background-color: var(--darkColor);
        }
      }
    }
  }

  .footer {
    margin-top: 0;
  }

  .arrow {
    position: absolute !important;
    z-index: 5 !important;
    left: 10px !important;
    top: 10px !important;
  }
}

.addBtn {
  background-color: var(--darkColor);
  padding: 6px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  margin: 10px;
  // margin-left: auto;
  display: inline-block;

  &:hover {
    color: white !important;
  }
}
</style>

<style lang="scss">
.el-pagination {
  direction: ltr;
  margin-top: 40px;
  margin-bottom: 60px;

  .el-pager li,
  .btn-prev,
  .btn-next {
    color: white;
    border-radius: 50% !important;
    height: 40px !important;
    min-width: 40px !important;
    border: 1px solid var(--darkColor) !important;
    background-color: white !important;
    line-height: 40px;
    color: var(--darkColor) !important;
    font-weight: 700 !important;
    font-size: 15px;
  }

  .el-pager li:not(.disabled) {
    &:hover {
      color: #173b07 !important;
    }
  }

  .el-pager li:not(.disabled).active {
    background: var(--darkColor) !important;
    color: var(--mainColor) !important;
  }
}

.el-dialog__body {
  padding: 0 !important;
}
.el-dialog__headerbtn {
  top: 7px !important;
}

// .loader{
//       background-color: white;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     right: 0;
//     top: 0;
//     z-index: 50;
// }

// .loader{
//     display: flex;
//     justify-content: center;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     right: 0;
//     top: 0;
//     z-index: 50;
// }

// .v-spinner{
//   margin-top: 20%;
//   color: var(--darkColor) !important;
// }
</style>