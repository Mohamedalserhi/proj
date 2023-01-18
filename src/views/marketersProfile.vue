
<template>
  <div class="marketerProfile">
    <div class="header">
      <div class="img-cover">
        <img :src="profile.cover" alt="" />
      </div>
      <div class="overlay"></div>
    </div>

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="sideBar">
              <div class="profile">

                <div class="img-profile">
                  <img v-if="profile.image" :src="profile.image" alt="" />
                  <img src="../assets/star.png" class="star" alt="" />

                </div>


              <div class="soial" v-if="profile.social">

              <a
                :href="profile.social.instagram"
                v-if="profile.social.instagram "
                target="_blank"
                ><i class="fa-brands fa-instagram"></i
              ></a>

                <a                
                :href="profile.social.twitter"
                v-if="profile.social.twitter "
                target="_blank"
                ><i class="fa-brands fa-twitter"></i
              ></a>
              
              <a
                :href="profile.social.facebook"
                v-if="profile.social.facebook "
                target="_blank"
                ><i class="fa-brands fa-facebook-f"></i
              ></a>
              <a
                :href="profile.social.pinterest"
                v-if="profile.social.pinterest "
                target="_blank"
                ><i class="fa-brands fa-pinterest"></i
              ></a>
              <a
                :href="profile.social.website"
                v-if="profile.social.website "
                target="_blank"
                ><i class="fa-solid fa-globe"></i
              ></a>
              <a
                :href="profile.social.snapchat"
                v-if="profile.social.snapchat "
                target="_blank"
                ><i class="fa-brands fa-snapchat"></i
              ></a>
              <a
                :href="profile.social.podcast"
                v-if="profile.social.podcast "
                target="_blank"
                ><i class="fa-solid fa-podcast"></i
              ></a>
              <a
                :href="profile.social.linkedin"
                v-if="profile.social.linkedin "
                target="_blank"
                ><i class="fa-brands fa-linkedin"></i
              ></a>


            </div>



                <h2 v-if="profile.name">{{ profile.name }}</h2>
                <h5 v-if="profile.mention">{{ profile.mention }}</h5>

                 <h5 v-if="profile.type == 'marketer'" class="text-success">صانع محتوى</h5>
                 <h5 v-if="profile.type == 'user'" class="text-success">مستقل</h5>

                <p v-if="profile.country">
                  <i class="el-icon-location-outline"></i
                  >{{ profile.country.title || " غير معروف" }}
                  <img
                    v-if="profile.country.flag"
                    :src="profile.country.flag"
                    alt=""
                    style="width: 30px"
                  />
                </p>


                <div class="d-flex justify-content-around mt-4">
                <p v-if="profile.followe_number"> المتابعون : <i class="el-icon-user"></i>
                    {{profile.followe_number}}</p>
                <p v-if="profile.following_number"> المتابعين : <i class="el-icon-user"></i>
                    {{ profile.following_number }} </p>
              </div>



              <div class="mb-2" v-if="profile.type == 'marketer'">
                <el-button class="m-2"  @click.prevent="followUser(profile.id)" type="primary" plain>{{followLabel}}</el-button>
              <el-button class="m-2" v-if="followStatus == 1" @click.prevent="Unfollow(profile.id)" type="danger" plain>الغاء المتابعة</el-button>

                <el-button @click.prevent="sendMassge(profile.mention)"  class="mt-3 mb-2" v-if="profile.name != myAcc && marketerServices">تواصل مع البائع <i class="el-icon-s-promotion"></i></el-button>


              </div>

                <i v-if="profile.name != myAcc" class="el-icon-s-tools edit"></i>

                <el-divider></el-divider>
              </div>



              <div class="myReats">
                <!-- <div class="myReat">
                  <span>تقييماتي</span>
                  <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div> -->

                <div class="reatItem">
                  <span>معدل الإستشارات</span>
                  <el-button type="info">لم يحسب بعد</el-button>
                </div>

                <div class="reatItem">
                  <span>معدل المقالات</span>
                  <el-button type="info">لم يحسب بعد</el-button>
                </div>

                <div class="reatItem">
                  <span>معدل الخدمات</span>
                  <el-button type="info">لم يحسب بعد</el-button>
                </div>
              </div>

              <div class="whoIam">
                <h2>من أنا !</h2>
                <p v-if="profile.pio">
                  {{ profile.pio || "عن المسوق..." }}
                </p>
              </div>

               <!-- <router-link
                to="/CreateService"
                class="text-decoration-none"
                v-if="profile.name == myAcc"
              >
                <el-link icon="el-icon-plus" class="border rounded p-2" style="font-size:20px;margin-top:30px;" type="primary"> اضافة خدمة  </el-link>

              </router-link> -->

                <router-link
                to="/add"
                class="text-decoration-none"
                v-if="profile.name == myAcc && profile.type == 'marketer'"
              >
                <el-link icon="el-icon-plus" class="border rounded p-2" style="font-size:20px;margin-top:30px;" type="primary" 
                  >اضافة محتوى</el-link
                >
              </router-link>

              <router-link
                to="/CreateService"
                class="text-decoration-none"
                v-if="profile.name == myAcc && profile.type == 'user'"
              >
                <el-link icon="el-icon-plus" class="border rounded p-2" style="font-size:20px;margin-top:30px;" type="primary">اضافة خدمة</el-link>
              </router-link>


              <!-- <div class="soial">
                <h4 class="text-end mb-2">منصات اخرى:</h4>

                <p v-if="!profile.social">لا يوجد اي منصات</p>

                <a
                  v-if="profile.social && profile.social.instagram"
                  :href="profile.social.instagram"
                  ><i class="fa-brands fa-instagram"></i
                ></a>
                <a
                  v-if="profile.socia && profile.social.twitter"
                  :href="profile.social.twitter"
                  ><i class="fa-brands fa-twitter"></i
                ></a>
                <a
                  v-if="profile.socia && profile.social.facebook"
                  :href="profile.social.facebook"
                  ><i class="fa-brands fa-facebook-f"></i
                ></a>

                <a
                  v-if="profile.socia && profile.social.pinterest"
                  :href="profile.social.pinterest"
                  ><i class="fa-brands fa-pinterest"></i
                ></a>
              </div> -->
            </div>
          </div>

          <div class="col-lg-8">
            <div class="content">
              <div class="tabs">
                <template>
                  <el-tabs type="card" stretch=true @tab-click="handleClick">
                    <el-tab-pane
                      label="الخدمات"
                      v-if="marketerServices.length > 0"
                    >
                      <div class="inner-content">
                        <div class="pageBanner">
                          <div class="overlay"></div>
                        </div>

                        <div class="itemsFilters">
                          <div class="row">
                            <div class="col-lg-6">
                              <el-input
                                placeholder="ابحث عن خدمة"
                                prefix-icon="el-icon-search"
                                v-model="input2"
                              >
                              </el-input>
                            </div>

                            <div class="col-lg-6 d-flex justify-content-end">
                              <el-button
                                type="success"
                                plain
                                icon="el-icon-sort"
                                >فلتر</el-button
                              >

                              <el-dropdown>
                                <el-button type="primary">
                                  الاحدث
                                  <i
                                    class="el-icon-arrow-down el-icon--right"
                                  ></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>Action 1</el-dropdown-item>
                                  <el-dropdown-item>Action 2</el-dropdown-item>
                                  <el-dropdown-item>Action 3</el-dropdown-item>
                                  <el-dropdown-item>Action 4</el-dropdown-item>
                                  <el-dropdown-item>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="services">
                        <div class="container">
                          <p
                            v-if="marketerServices.length == 0"
                            class="mt-4 fw-bold"
                          >
                            لم يضيف اي خدمات بعد
                          </p>

                          <div
                            class="row justify-content-start"
                            v-if="marketerServices.length > 0"
                          >
                            <div
                              class="col-lg-6"
                              v-for="item in marketerServices"
                              :key="item.id"
                            >
                              <div
                                class="OurServices-item"
                                v-if="marketerServices"
                              >
                                <router-link :to="`/OurServices/${item.id}`">
                                  <div class="img-box">
                                    <img
                                      :src="item.images[0]"
                                      alt=""
                                    />
                                  </div>

                                  <div class="item-body">
                                    <div
                                      class="
                                        title
                                        d-flex
                                        justify-content-between
                                      "
                                    >
                                      <h5>{{ item.title }}</h5>
                                      <span>{{item.type}}</span>
                                    </div>
                                    <p
                              v-html="item.description.replace(/<\/?[^>]+>/ig, '').substr(0, 38) + '...'"
                                    ></p>
                                    <div
                                      class="
                                        bottom-card
                                        d-flex
                                        justify-content-between
                                      "
                                    >
                                      <span
                                        >سعر :
                                        <span>${{ item.price }}</span></span
                                      >
                                      <span>
                                        <span> 152</span>
                                        <i class="fa-solid fa-star"></i>
                                        <span> 987 </span>
                                        <i class="fa-solid fa-user-large"></i
                                      ></span>
                                    </div>
                                    <!-- <div class="btn">
                                      <button
                                        @click.prevent="addToCart(item.id)"
                                      >
                                        اضف الى السلة
                                      </button>
                                    </div> -->
                                                            <div class="btn">
                          <button class="" @click.prevent="addToCart(item.id)">
                            اضف الى السلة
                          </button>
                          <button @click.prevent="payNow">اشتري الان</button>
                        </div>
                                  </div>
                                </router-link>
                              </div>
                            </div>
                          </div>


                            <router-link v-if="profile.name == myAcc" to="/CreateService" class="addBtn"
                                >اضف خدمة <i class="el-icon-plus"></i
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
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane
                      label="الاستشارات"
                      v-if="marketerConsuliton.length > 0"
                    >
                      <div class="inner-content">
                        <div class="pageBanner">
                          <div class="overlay"></div>
                        </div>

                        <div class="itemsFilters">
                          <div class="row">
                            <div class="col-lg-6">
                              <el-input
                                placeholder="ابحث عن مقالة"
                                prefix-icon="el-icon-search"
                                v-model="input2"
                              >
                              </el-input>
                            </div>

                            <div class="col-lg-6 d-flex justify-content-end">
                              <el-button
                                type="success"
                                plain
                                icon="el-icon-sort"
                                >فلتر</el-button
                              >

                              <el-dropdown>
                                <el-button type="primary">
                                  الاحدث
                                  <i
                                    class="el-icon-arrow-down el-icon--right"
                                  ></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>Action 1</el-dropdown-item>
                                  <el-dropdown-item>Action 2</el-dropdown-item>
                                  <el-dropdown-item>Action 3</el-dropdown-item>
                                  <el-dropdown-item>Action 4</el-dropdown-item>
                                  <el-dropdown-item>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                          </div>
                        </div>

                        <div class="Consulting">
                          <div class="container">
                            <p
                              v-if="marketerConsuliton.length == 0"
                              class="mt-4 fw-bold"
                            >
                              لم يضيف اي استشارات بعد
                            </p>

                            <div
                              class="row"
                              v-if="marketerConsuliton.length > 0"
                            >
                              <div
                                class="col-lg-6"
                                v-for="item in marketerConsuliton"
                                :key="item.id"
                              >
                                <div
                                  class="Consulting-item"
                                  v-if="marketerConsuliton"
                                >
                                  <router-link :to="`/Consulting/${item.id}`">
                                    <div class="itemHead">
                                      <div class="img-item">
                                        <img
                                          :src="item.user_info.image"
                                          alt=""
                                        />
                                      </div>
                                      <h3>
                                        {{ item.title }}
                                      </h3>
                                      <i class="el-icon-caret-left"></i>
                                    </div>
                                    <p v-html="item.description"></p>
                                  </router-link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane
                      label="المقالات"
                      v-if="marketerBolg.length > 0"
                    >
                      <div class="inner-content">
                        <div class="pageBanner">
                          <div class="overlay"></div>
                        </div>

                        <div class="itemsFilters">
                          <div class="row">
                            <div class="col-lg-6">
                              <el-input
                                placeholder="ابحث عن مقالة"
                                prefix-icon="el-icon-search"
                                v-model="input2"
                              >
                              </el-input>
                            </div>

                            <div class="col-lg-6 d-flex justify-content-end">
                              <el-button
                                type="success"
                                plain
                                icon="el-icon-sort"
                                >فلتر</el-button
                              >

                              <el-dropdown>
                                <el-button type="primary">
                                  الاحدث
                                  <i
                                    class="el-icon-arrow-down el-icon--right"
                                  ></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>Action 1</el-dropdown-item>
                                  <el-dropdown-item>Action 2</el-dropdown-item>
                                  <el-dropdown-item>Action 3</el-dropdown-item>
                                  <el-dropdown-item>Action 4</el-dropdown-item>
                                  <el-dropdown-item>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="blog">
                        <div class="container">
                          <p
                            v-if="marketerBolg.length == 0"
                            class="mt-4 fw-bold"
                          >
                            لم يضيف اي مقالات بعد
                          </p>

                          <div class="row justify-content-start">
                            <div
                              class="col-lg-6"
                              v-for="item in marketerBolg"
                              :key="item.id"
                            >
                              <div class="atical-item">
                                <router-link
                                  :to="`/blog/${item.user_mention}/${item.slug}`"
                                >
                                  <div class="img-box">
                                    <img :src="item.image" alt="" />
                                    <img
                                      src="../assets/img-overlay.png"
                                      alt=""
                                    />
                                  </div>
                                  <div class="item-body">
                                    <p>
                                      {{ item.title }}
                                    </p>
                                    <span>
                                      <span>{{ item.user_info.name }}</span>
                                      <i class="fa-solid fa-user ms-2"></i>
                                      <span>{{ item.comments.body }} تعليق</span
                                      ><i class="fa-solid fa-message ms-2"></i>
                                    </span>
                                  </div>
                                </router-link>
                              </div>
                            </div>
                          </div>

                          
                            <router-link v-if="profile.name == myAcc" to="/CreateBlog" class="addBtn"
                                >اضف مقال <i class="el-icon-plus"></i
                            ></router-link>
                        </div>
                      </div>
                    </el-tab-pane>

                    <el-tab-pane
                      label="البودكاست"
                      v-if="marketerPods.length > 0"
                    >
                      <div class="inner-content">
                        <div class="pageBanner">
                          <div class="overlay"></div>
                        </div>

                        <div class="itemsFilters">
                          <div class="row">
                            <div class="col-lg-6">
                              <el-input
                                placeholder="ابحث عن مقالة"
                                prefix-icon="el-icon-search"
                                v-model="input2"
                              >
                              </el-input>
                            </div>

                            <div class="col-lg-6 d-flex justify-content-end">
                              <el-button
                                type="success"
                                plain
                                icon="el-icon-sort"
                                >فلتر</el-button
                              >

                              <el-dropdown>
                                <el-button type="primary">
                                  الاحدث
                                  <i
                                    class="el-icon-arrow-down el-icon--right"
                                  ></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>Action 1</el-dropdown-item>
                                  <el-dropdown-item>Action 2</el-dropdown-item>
                                  <el-dropdown-item>Action 3</el-dropdown-item>
                                  <el-dropdown-item>Action 4</el-dropdown-item>
                                  <el-dropdown-item>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                          </div>
                        </div>

                        <div class="podcasts">
                          <div class="container">
                            <p
                              v-if="marketerPods.length == 0"
                              class="mt-4 fw-bold"
                            >
                              لم يضيف اي بودكاست بعد
                            </p>
                            <div class="row justify-content-start">
                              <div
                                class="col-lg-6"
                                v-for="item in marketerPods"
                                :key="item.id"
                              >
                                <div class="podcast-item">
                                  <div class="img-box">
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
                                      <img
                                        src="../assets/soundCloud.png"
                                        alt=""
                                      />
                                      <img src="../assets/podcast.png" alt="" />
                                    </div>

                                    <div class="btn">
                                      <a href="" class="">استمع</a>
                                      <img src="../assets/run.png" alt="" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>

                    <el-tab-pane
                      label="الفيديوهات"
                      v-if="marketerVids.length > 0"
                    >
                      <div class="inner-content">
                        <div class="pageBanner">
                          <div class="overlay"></div>
                        </div>

                        <div class="itemsFilters">
                          <div class="row">
                            <div class="col-lg-6">
                              <el-input
                                placeholder="ابحث عن فيديو"
                                prefix-icon="el-icon-search"
                                v-model="input2"
                              >
                              </el-input>
                            </div>

                            <div class="col-lg-6 d-flex justify-content-end">
                              <el-button
                                type="success"
                                plain
                                icon="el-icon-sort"
                                >فلتر</el-button
                              >

                              <el-dropdown>
                                <el-button type="primary">
                                  الاحدث
                                  <i
                                    class="el-icon-arrow-down el-icon--right"
                                  ></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>Action 1</el-dropdown-item>
                                  <el-dropdown-item>Action 2</el-dropdown-item>
                                  <el-dropdown-item>Action 3</el-dropdown-item>
                                  <el-dropdown-item>Action 4</el-dropdown-item>
                                  <el-dropdown-item>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                          </div>
                        </div>

                        <div class="videos">
                          <div class="container">
                            <p
                              v-if="marketerVids.length == 0"
                              class="mt-4 fw-bold"
                            >
                              لم يضيف اي فيديوهات بعد
                            </p>
                            <div class="row justify-content-start">
                              <div
                                class="col-lg-6"
                                v-for="item in marketerVids"
                                :key="item.id"
                              >
                                <div class="item">
                                  <router-link :to="`/videos/${item.id}`">
                                    <div class="img-cover">
                                      <img :src="item.thum_image" alt="" />
                                      <img
                                        src="../assets/learn-cover.png"
                                        alt=""
                                      />
                                      <img
                                        src="../assets/video.png"
                                        class="video-img"
                                        alt=""
                                      />
                                    </div>
                                    <div class="item-body">
                                      <p v-html="item.description"></p>
                                      <div class="auther">
                                        <div class="img-box">
                                          <img
                                            :src="item.user_info.image"
                                            alt=""
                                          />
                                        </div>
                                        <span>{{ item.user_info.name }}</span>
                                      </div>
                                    </div>
                                  </router-link>
                                </div>
                              </div>
                            </div>

                             <router-link v-if="profile.name == myAcc" to="/CreateVideo" class="addBtn"
                                >اضف فيديو <i class="el-icon-plus"></i
                            ></router-link>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>

                  <div
                    class=""
                    v-if="
                      marketerServices.length == 0 &&
                      marketerConsuliton.length == 0 &&
                      marketerBolg.length == 0 &&
                      marketerPods.length == 0 &&
                      marketerVids.length == 0
                      && profile.name != myAcc
                    "
                  >
                    <p class="fw-bold fs-5">تواصل مع  <span style="color:blue;cursor:pointer;"  @click.prevent="sendMassge(profile.mention)" > {{profile.name}} </span> </p>
                    <img src="../assets/chat.png" alt="" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <footerSec/> -->

        <el-dialog title="اشعار" :visible.sync="dialogVisible" width="30%">
      <span style="font-size: 17px">تم إضافة الخدمة الى سلة المشتريات</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="p-2 m-1" type="primary"
          ><router-link @click="dialogVisible = false" to="/Cart"
            >ادفع الان</router-link
          ></el-button
        >
        <el-button class="p-2 m-1" @click="dialogVisible = false"
          >تصفح المزيد</el-button
        >
      </span>
    </el-dialog>
  </div>

  
</template>


<script>
import appNav from "@/components/navComponent.vue";
import Vue from "vue";

import appNavUser from "@/components/navComponentInner.vue";
import footerSec from "@/components/footer.vue";

export default {
  components: {
    appNav,
    appNavUser,
    footerSec,
  },

  data() {
    return {
      userAuth: localStorage.getItem("user"),
      myAcc:localStorage.getItem('name'),
      dialogVisible: false,
      activeName: "first",
      value: 4,
      input2: "",
      profile: undefined,
      get_Services: null,
      get_Consultion: undefined,
      pagination: null,

      show: true,

      marketerServices: undefined,
      marketerConsuliton: undefined,
      marketerBolg: undefined,
      marketerPods: undefined,
      marketerVids: undefined,

      marketerName: undefined,

      followLabel:'تابع',

      followStatus:undefined,
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
  },

  mounted() {



    
        window.scrollTo(0, 0);


      this.getMarkeeter();


  },

  methods: {


    getMarkeeter(){
  const marketerName = this.$route.params.mention;

    Vue.axios
      .get(
        `https://dashboard.arabicreators.com/api/get_markter/${marketerName}`,
        { headers: {
            "Content-Type": "multipart/form-data",
           Authorization: "Bearer " + localStorage.getItem("token"),
          },}
      )
      .then((res) => {
        console.log("ccccccccc" + res);
       
       if(res.data.data ){
           this.profile = res.data.data;

            this.marketerServices = this.profile.services.data;
            this.marketerConsuliton = this.profile.consulting.data;
            this.marketerBolg = this.profile.blogs.data;
            this.marketerPods = this.profile.podcasts.data;
            this.marketerVids = this.profile.videos.data;
            this.followStatus=res.data.data.is_follow

            // alert(this.followStatus)

           if(this.followStatus == 1){
             this.followLabel ='اتابعه' 
            }

            else if(this.followStatus == 0){
              this.followLabel ='تابع' 
            }

          localStorage.removeItem('mainIdNew');
          localStorage.setItem("mainIdNew", res.data.data.id);


       }

        this.show = !this.show;
      });
    },

    sendMassge(mention){

           if (this.userAuth) {
      this.$router.push(`/chat/${mention}`)
      } else if (!this.userAuth) {
        this.$message.error("تحتاج الى تسجيل الدخول");

        setTimeout(() => this.$router.push("/signIn"), 2000);
      }



    },


      getID(event) {
      if (event.target.checked) {
        this.BlogIds.push(event.target.id);
      } else {
        const id = event.target.id;
        for (let data of this.BlogIds) {
          if (data === id) {
            const index = this.BlogIds.indexOf(data);
            this.BlogIds.splice(index, 1);
          }
        }
      }

      this.getData();
    },

    getData() {
      const pars = this.BlogIds.map((str) => {
        return parseInt(str);
      });

      const data = {
        category_id: pars,
      };

      console.log(data.category_id);

      for (let i = 0; i < data.category_id.length; i++) {
        console.log(data.category_id[i]);
      }

      let url1 = `https://dashboard.arabicreators.com/api/type_of_user`;

      Vue.axios.get(url1).then((res) => {
        const response = res.data.data;
        this.ourServices = response.data;
        // this.list = response.data;
        this.pagination = response.meta;
      });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    // addToCart(serviceId) {
    //   const data = new FormData();

    //   data.append("service_id", serviceId);

    //   Vue.axios
    //     .post(`https://dashboard.arabicreators.com/api/add_to_cart`, data, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then((res) => {
    //       if (res.data.message == "added") {
    //         this.$message({
    //           message: "اضفيت الى السلة",
    //           type: "success",
    //         });
    //       } else if (res.data.success == "false") {
    //         this.$message.error("تحتاج الى تسجيل الدخول");
    //       }
    //     });
    // },


        payNow() {
      if (this.userAuth) {
        this.$router.push("/Cart");
      } else if (!this.userAuth) {
        this.$message.error("تحتاج الى تسجيل الدخول");

        setTimeout(() => this.$router.push("/signIn"), 2000);
      }
    },


        addToCart(serviceId) {
      const data = new FormData();

      data.append("service_id", serviceId);

      Vue.axios
        .post(`https://dashboard.arabicreators.com/api/add_to_cart`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.message == "added") {
            // this.$message({
            //   message: "اضفيت الى السلة",
            //   type: "success",
            // });

            this.dialogVisible = true;

            this.$store.dispatch("count", res.data.data.count);
            // alert(this.$store.state.count)
            localStorage.setItem("itemCount", res.data.data.count);
          } else if (res.data.message == "you need to login") {
            this.$message.error("تحتاج الى تسجيل الدخول");

            setTimeout(() => this.$router.push("/signIn"), 2000);
          }
        });
    },

    updatePage(page) {
      if (page.number) {
        this.getServices(page.number);
      }
    },

      Unfollow(id){
        Vue.axios.delete(`https://dashboard.arabicreators.com/api/delete_follow_marketer/${id}`,{
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        }).then((res) =>{

          // if(res.data.code = 200){
          //   this.followLabel='تابع'
          // }
        this.getMarkeeter();
        })
    },

    followUser(id){
      
    Vue.axios.get(`https://dashboard.arabicreators.com/api/followe_markter/${id}`,{
                headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
    }).then((res) => {
        // const response = res.data.data;
        // this.followe_markter = res.data.data.data;
        // this.list = response.data;

        if(res.data.code == 200){
            // this.$message({
            //   message: "تمت المتابعة",
            //   type: "success",
            // });

            this.followLabel ='اتابعه'

            this.getMarkeeter();
        }
        else if(res.data.code == 400){
          //  this.$message.error("حدث خطأ ما");

        }
    });

    },


  
  },
};
</script>




<style lang="scss">
.marketerProfile {
  font-family: "Tajawal", sans-serif;
  position: relative;
  direction: rtl;
  background-color: #f0efef;

  .header {
    width: 100%;
    height: 500px;
    position: relative;

    .overlay {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.6;
    }
    .img-cover {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .sideBar {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: white;
    padding: 15px;
    margin-bottom: 15px;
    position: relative;
    top: -200px;
    border-radius: 10px;

    a{
      text-decoration: none;
      color:inherit;
    }
    .profile {
      position: relative;

      .img-profile {
        width: 100px;
        border-radius: 50%;
        border: 2px solid #bca2a2;
        margin: auto;
        height: 100px;
        margin-bottom: 15px;
        position: relative;
        overflow: unset !important ;
      .star{
    position: absolute;
    bottom: 10%;
    right: -6%;
    width: 30px;
    height: 30px;
    z-index: 5;
      }
        img {
          width: 100%;
          height: 100%;
                  border-radius: 50%;

        }
      }

      h2 {
        font-size: 24px;
        font-weight: 700;
        text-transform: capitalize;
        color: #222;
        margin-bottom: 15px;
      }

      h5 {
      }

      p {
        //icon
      }

          .edit{
  position: absolute;
  top: 30%;
  right: 5px;
}
    }

    .myReats {
      margin-bottom: 20px;

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
          background-color: #b6b6b6;
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

    .whoIam {
      margin-bottom: 20px;
      text-align: right;

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
        background-color: #b6b6b6;
        border: none;
        padding: 15px 40px;
      }

      // btn
    }

    .soial {
      margin-bottom: 20px;

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
        .fa-snapchat,
        .fa-linkedin {
          color: #3e3b3b;
          font-size: 26px;
        }
      }
    }


  }

  .content {
    margin-bottom: 30px;
    .tabs {
      .el-tabs--card > .el-tabs__header .el-tabs__nav {
        padding: 10px;
      }
      .el-tabs__header {
        background-color: white;
      }

      .el-tabs__item.is-active {
        background: var(--darkColor);
        border-radius: 10px;
        color: white;
      }

      .el-tabs__item {
        &:hover {
          color: unset !important;
        }
      }

      .el-tabs--card > .el-tabs__header .el-tabs__item {
        border: unset !important;
      }
    }

    .inner-content {
      padding-bottom: 50px;
    }

    .pageBanner {
      width: 100%;
      height: 230px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;
      background-image: url("../assets/marketerBanner.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      .overlay {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.5;
      }
    }

    .itemsFilters {
      .el-input {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));

        .el-icon-search {
          color: var(--darkColor);
          font-weight: 700;
          font-size: 20px;
        }

        ::placeholder {
          font-size: 17px;
        }

        .el-input__inner {
          border: none;
          border-radius: 9px;
        }
      }

      .el-button--primary {
        background: var(--darkColor);
        border-radius: 10px;
        color: white;
        margin-right: 15px;
      }

      .el-button {
        font-weight: 700;
      }

      .el-dropdown {
      }
    }
  }

  .OurServices-item {
    border: 1px solid #c0c0c0;
    border-radius: 15px;
    direction: rtl;
    margin-bottom: 20px;
    background-color: white;
    height: 480px;
    a {
      color: inherit;
      text-decoration: none;
    }
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
        text-align: right;
        h5 {
          color: #302d2d;
          font-size: 17px;
          font-weight: 700;
        }

        span {
          color: white;
          background-color: #677a5f;
          border-radius: 6px;
          padding: 5px 8px;
          height: 32px;
        }
      }

      p {
        margin-bottom: 10px;
        text-align: right;
        color: black;
        font-weight: 500;
      }

      .bottom-card {
        span {
          margin-left: 6px;
        }
      }

    .btn {
      width: 100%;
      margin-top: 0px;
      display: flex;
      align-items: center;
      button {
        background: var(--darkColor);
        border-radius: 8px;
        padding: 8px 14px;
        color: white;
        text-decoration: unset;
        display: inline-block;
        width: 50%;
        margin: 1%;
        /* margin: auto; */
        border: none;
        font-size: 13px;
        border-radius: 5px;
      }
    }
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

  .atical-item {
    position: relative;
    width: 100%;
    height: 350px;
    margin: 10px;
    color: black;
    border-radius: 13px;
    overflow: hidden;
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
      padding: 14px;
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
    margin-top: 30px !important;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    margin: 6px;
    direction: rtl;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    .img-box {
      width: 100%;
      height: 270px;
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
        background: var(--darkColor);
        border-radius: 15px;
        padding: 0;
        padding-right: 5px;
        margin: 8px;
        display: flex;
        align-items: center;

        button {
          background: var(--darkColor);
          border-radius: 8px;
          padding: 8px 20px;
          color: white !important;
          text-decoration: unset;
          display: inline-block;
          width: 100%;
          margin: auto;
        }
        img {
        }
      }
    }
  }

  .item {
    margin-top: 30px;
    border-radius: 10px;
    overflow: hidden;
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
        background-color: white;
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

  .Consulting {
    margin-top: 40px;
    .Consulting-item {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      margin: 10px;
      text-align: right;
      border-top: 1px solid black;
      .itemHead {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .img-item {
          margin-left: 10px;
          width: 50px;
          height: 50px;
          border-radius: 50%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        h3 {
          font-size: 19px;
          font-weight: 700;
        }

        .el-icon-caret-left {
          font-size: 25px;
        }

        p {
        }
      }
    }
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
//     background-color: white;
// }

// .v-spinner{
//   margin-top: 20%;
// }
</style>


<style>
    @media (max-width:570px){
        .marketerProfile .header{
          height: 300px !important;
        }
    }
</style>