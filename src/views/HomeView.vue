

<template>
  <div class="home" id="HomeView">
          <div v-if="show" class="loader">
      <img
        src="../assets/logo.gif"
        width="300"
        height="200"
        style="margin-top: 17%"
        alt="404 image"
      />

   
    </div>
    <header v-if="!auth">
      <div class="innerHeader">
        <div class="container">
          <h1 v-if="first_sectionNotAuth.title">
            {{ first_sectionNotAuth.title }}
          </h1>
          <p
            v-if="first_sectionNotAuth.body"
            v-html="first_sectionNotAuth.body"
          ></p>
          <form action="">
            <div class="input">
              <input
                class="form-control"
                type="search"
                placeholder="ادخل البريد الالكتروني "
                aria-label="Search"
                v-model="emailHome"

              />
              <button @click.prevent="homeRegister" v-on:keyup.enter="homeRegister" class="btn btn-outline-success" type="submit">
                تسجيل
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>

    <header v-if="auth" class="headerAuth">
      <div class="innerHeader">
        <div class="container">
          <p v-if="first_sectionAuth.title">{{ first_sectionAuth.title }}</p>
          <p v-if="first_sectionAuth.body" v-html="first_sectionAuth.body"></p>
          <form action="">
            <div class="input">
              <input
                class="form-control"
                type="search"
                placeholder="ابحث عن خدمتك"
                aria-label="Search"
                v-model="searchInput"
              />
              <button @click.prevent="SearchMethod" v-on:keyup.enter="SearchMethod" class="btn btn-outline-success" type="submit">
                <i class="el-icon-search"></i>
              </button>
            </div>
          </form>
          
          <div class="d-flex justify-content-end align-items-center text-white" style="max-width:89%">
         <el-tag v-for="item in top_search" :key="item.id" effect="plain" >{{item.title}}</el-tag> : الشائع  
          </div>

        </div>
      </div>
    </header>

    <div class="marketers">
      <div class="container">
        <h2>صناع المحتوى</h2>

        <div class="row">
          <div class="col-lg-3 showAllMarketers">
            <div class="img m-lg-2">
              <router-link to="/marketers" class="" style="position:unset;">
              <img v-if="imageMarketer" :src="imageMarketer" alt="" />
              <router-link to="/marketers" class="btn m-auto mt-4 allMarketers"
                >عرض جميع صناع المحتوى</router-link
              >
              <i class="el-icon-circle-plus-outline icon"></i>
              </router-link>
            </div>
          </div>

          <div class="col-lg-9">
            <carousel
              v-if="markter.length > 0"
              :autoplay="true"
              :items="3"
              :nav="false"
              :dots="false"
              :responsive="{
                0: { items: 1, nav: false },
                600: { items: 2, nav: false },
                1000: { items: 4, nav: false },
              }"
            >
              <div
                class="markerter-item m-2"
                v-for="item in markter"
                :key="item.id"
              >
                <router-link
                  :to="`/marketers/${item.mention}`"
                  style="border: none; color: inherit; text-decoration: none"
                >
                  <div class="img-cover">
                    <img src="../assets/background.jpg" loading="lazy" alt="" />
                    <img :src="item.image" class="img-man" alt="" />
                  </div>

                  <div class="item-body">
                    <h5>{{ item.name }}</h5>
                  </div>
                </router-link>
              </div>
            </carousel>

            <carousel
              v-if="markter2.length > 0"
              :autoplay="true"
              :items="3"
              :nav="false"
              :dots="false"
              :responsive="{
                0: { items: 1, nav: false },
                600: { items: 2, nav: false },
                1000: { items: 4, nav: false },
              }"
            >
              <div
                class="markerter-item m-2"
                v-for="item in markter2"
                :key="item.id"
              >
                <router-link
                  :to="`/marketers/${item.mention}`"
                  style="border: none; color: inherit; text-decoration: none"
                >
                  <div class="img-cover">
                    <img src="../assets/background.jpg" loading="lazy" alt="" />
                    <img :src="item.image" class="img-man" alt="" />
                  </div>

                  <div class="item-body">
                    <h5>{{ item.name }}</h5>
                  </div>
                </router-link>
              </div>
            </carousel>
          </div>
        </div>
      </div>
    </div>

    <div class="about text-center" v-if="!auth">
      <div class="container">
        <h2 v-if="about.title">{{ about.title }}</h2>
        <p v-if="about.body">
          {{ about.body }}
        </p>
      </div>
    </div>

    <div class="howToUse" v-if="!auth">
      <div class="container">
        <h2>ألية استخدم الموقع</h2>

        <div class="innerContent">
          <div class="line">
            <div class="item" v-if="(howItWorks.id = 1)">
              <div class="item-content">
                <div class="img-item">
                  <img :src="howItWorks[0].images" alt="" loading="lazy" />
                </div>
                <h4 v-if="howItWorks[0].title">{{ howItWorks[0].title }}</h4>
                <p>
                  {{ howItWorks[0].body }}
                </p>
              </div>
              <span class="numActive">01</span>
            </div>

            <div class="item" v-if="(howItWorks.id = 2)">
              <div class="item-content">
                <div class="img-item">
                  <img :src="howItWorks[1].images" alt="" loading="lazy" />
                </div>
                <h4 v-if="howItWorks[1].title">{{ howItWorks[1].title }}</h4>
                <p>
                  {{ howItWorks[1].body }}
                </p>
              </div>
              <span>02</span>
            </div>

            <div class="item" v-if="(howItWorks.id = 3)">
              <span>03</span>

              <div class="item-content">
                <div class="img-item">
                  <img :src="howItWorks[2].images" alt="" loading="lazy" />
                </div>
                <h4 v-if="howItWorks[2].title">{{ howItWorks[2].title }}</h4>
                <p>
                  {{ howItWorks[2].body }}
                </p>
              </div>
            </div>

            <div class="item" v-if="(howItWorks.id = 4)">
              <span>04</span>
              <div class="item-content">
                <div class="img-item">
                  <img :src="howItWorks[3].images" alt="" loading="lazy" />
                </div>
                <h4 v-if="howItWorks[3].title">{{ howItWorks[3].title }}</h4>
                <p>
                  {{ howItWorks[3].body }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fields">
      <div class="container">
        <h2>المجالات</h2>

        <carousel
          :autoplay="true"
          :items="6"
          :dots="false"
          v-if="all_scope"
          :responsive="{
            0: { items: 2, nav: false },
            700: { items: 3, nav: false },
            1000: { items: 5, nav: true },
          }"
        >
          <div class="item" v-for="item in all_scope" :key="item.id">
            <div class="img-item">
              <h4 v-if="item.title">{{ item.title }}</h4>
              <img :src="item.image" alt="" loading="lazy" />
            </div>
          </div>
        </carousel>
      </div>
    </div>

    <div class="allServices" v-if="auth">
      <div class="container">
        <h3>كافة الخدمات الإبداعية والاحترافية</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane label="كافة الخدمات" name="first">
            <div class="OurServices">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-12"
                  v-for="item in service"
                  :key="item.id"
                >
                  <div class="OurServices-item">
                    <router-link :to="`/OurServices/${item.id}`">
                      <div class="img-box">
                        <img :src="item.thumb_image" alt=" " loading="lazy" />
                        <div class="img-user">
                          <router-link :to="`/Marketers/${item.user_info.mention}`">
                            <img
                              :src="item.user_info.image"
                              alt=""
                              loading="lazy"
                            />
                          </router-link>
                        </div>
                      </div>

                      <div class="item-body">
                        <div class="title d-flex justify-content-between">
                          <h5 v-if="item.title">{{ item.title }}</h5>
                          <span>{{item.type}}</span>
                        </div>
                        <p
                          v-if="item.description.length < 38"
                          v-html="item.description"
                        ></p>
                        <p
                          v-if="item.description.length > 38"
                              v-html="item.description.replace(/<\/?[^>]+>/ig, '').substr(0, 38) + '...'"
                        ></p>

                        <div class="bottom-card d-flex justify-content-between">
                          <span
                            >سعر : <span>${{ item.price }}</span></span
                          >
                          <span>
                            <span> {{ item.number_of_view }}</span>
                            <i class="fa-solid fa-star"></i> <span> 987 </span>
                            <i class="fa-solid fa-user-large"></i
                          ></span>
                        </div>
                      </div>
                    </router-link>

                    <div class="btn">
                      <button @click.prevent="addToCart(item.id)">
                        اشتري الان
                      </button>
                      <button>
                        <router-link :to="`/OurServices/${item.id}`"
                          >عرض الخدمة</router-link
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <router-link to="/OurServices" class="all" type="primary">
                الكل
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="أحدث الخدمات " name="second">
            <div class="OurServices">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-6"
                  v-for="item in serviceNew"
                  :key="item.id"
                >
                  <div class="OurServices-item">
                    <router-link :to="`/OurServices/${item.id}`">
                      <div class="img-box">
                        <img :src="item.thumb_image" alt="" loading="lazy" />
                        <div class="img-user">
                          <router-link :to="`/Marketers/${item.user_info.mention}`">
                            <img
                              :src="item.user_info.image"
                              alt=""
                              loading="lazy"
                            />
                          </router-link>
                        </div>
                      </div>

                      <div class="item-body">
                        <div class="title d-flex justify-content-between">
                          <h5 v-if="item.title">{{ item.title }}</h5>
                          <span>{{item.type}}</span>
                        </div>
                        <p
                          v-if="item.description.length < 38"
                          v-html="item.description"
                        ></p>
                        <p
                          v-if="item.description.length > 38"
                              v-html="item.description.replace(/<\/?[^>]+>/ig, '').substr(0, 38) + '...'"
                        ></p>

                        <div class="bottom-card d-flex justify-content-between">
                          <span
                            >سعر : <span>${{ item.price }}</span></span
                          >
                          <span>
                            <span> {{ item.number_of_view }}</span>
                            <i class="fa-solid fa-star"></i> <span> 987 </span>
                            <i class="fa-solid fa-user-large"></i
                          ></span>
                        </div>
                      </div>
                    </router-link>

                    <div class="btn">
                      <button @click.prevent="addToCart(item.id)">
                        اشتري الان
                      </button>
                      <button>
                        <router-link :to="`/OurServices/${item.id}`"
                          >عرض الخدمة</router-link
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <router-link to="/OurServices" class="all" type="primary">
                الكل
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="أفضل الخدمات " name="third">
            <div class="OurServices">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-6"
                  v-for="item in serviceBest"
                  :key="item.id"
                >
                  <div class="OurServices-item">
                    <router-link :to="`/OurServices/${item.id}`">
                      <div class="img-box">
                        <img :src="item.thumb_image" alt="" loading="lazy" />
                        <div class="img-user">
                          <router-link :to="`/Marketers/${item.user_info.mention}`">
                            <img
                              :src="item.user_info.image"
                              alt=""
                              loading="lazy"
                            />
                          </router-link>
                        </div>
                      </div>

                      <div class="item-body">
                        <div class="title d-flex justify-content-between">
                          <h5 v-if="item.title">{{ item.title }}</h5>
                          <span>{{item.type}}</span>
                        </div>
                        <p
                          v-if="item.description.length < 38"
                          v-html="item.description"
                        ></p>
                        <p
                          v-if="item.description.length > 38"
                              v-html="item.description.replace(/<\/?[^>]+>/ig, '').substr(0, 38) + '...'"
                        ></p>

                        <div class="bottom-card d-flex justify-content-between">
                          <span
                            >سعر : <span>${{ item.price }}</span></span
                          >
                          <span>
                            <span> {{ item.number_of_view }}</span>
                            <i class="fa-solid fa-star"></i> <span> 987 </span>
                            <i class="fa-solid fa-user-large"></i
                          ></span>
                        </div>
                      </div>
                    </router-link>

                    <div class="btn">
                      <button @click.prevent="addToCart(item.id)">
                        اشتري الان
                      </button>
                      <button>
                        <router-link :to="`/OurServices/${item.id}`"
                          >عرض الخدمة</router-link
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <router-link to="/OurServices" class="all" type="primary">
                الكل
              </router-link>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

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

    <div class="allBlogs">
      <div class="container">
        <div class="heading d-flex justify-content-between mb-2">
          <h3>المقالات</h3>
        </div>
        <el-tabs v-model="activeName2">
          <el-tab-pane label="أفضل المقالات" name="first">
            <div class="OurArticles mt-4">
              <div class="row" v-if="blogBest">
                <div
                  class="col-lg-4 col-md-6 col-sm-6"
                  v-for="item in blogBest"
                  :key="item.id"
                >
                  <router-link :to="`/blog/${item.user_mention}/${item.slug}`">
                    <div class="atical-item">
                      <div class="img-box">
                        <img :src="item.image" alt="" loading="lazy" />
                        <!-- <img
                          src="../assets/img-overlay.png"
                          alt=""
                          loading="lazy"
                        /> -->
                         <div class="overLay"></div>

                      </div>
                      <div class="item-body">
                        <p v-if="item.title">{{ item.title.substr(0, 38) + '...' }}</p>
                        <span>
                          <span>{{ item.user_info.name }}</span>
                          <i class="fa-solid fa-user ms-2"></i>
                          <span>تعليق {{ item.comment_number }} </span
                          ><i class="fa-solid fa-message ms-2"></i>
                        </span>
                      </div>
                    </div>
                  </router-link>
                </div>
                <router-link to="/blog" class="all" type="primary">
                  الكل
                </router-link>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="أحدث المقالات" name="second">
            <div class="OurArticles mt-4">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-6"
                  v-for="item in blogNew"
                  :key="item.id"
                >
                  <router-link :to="`/blog/${item.user_mention}/${item.slug}`">
                    <div class="atical-item">
                      <div class="img-box">
                        <img :src="item.image" alt="" loading="lazy" />
                        <!-- <img
                          src="../assets/img-overlay.png"
                          alt=""
                          loading="lazy"
                        /> -->
                                                 <div class="overLay"></div>

                      </div>
                      <div class="item-body">
                        <p v-if="item.title">{{ item.title.substr(0, 38) + '...' }}</p>
                        <span>
                          <span>{{ item.user_info.name }}</span>
                          <i class="fa-solid fa-user ms-2"></i>
                          <span>تعليق {{ item.comment_number }} </span
                          ><i class="fa-solid fa-message ms-2"></i>
                        </span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <a href="/blog" class="all" type="primary"> الكل </a>
            </div>
          </el-tab-pane>
          <el-tab-pane label="كافة المقالات" name="third">
            <div class="OurArticles mt-4">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-6"
                  v-for="item in blogBest"
                  :key="item.id"
                >
                  <router-link :to="`/blog/${item.user_mention}/${item.slug}`">
                    <div class="atical-item">
                      <div class="img-box">
                        <img :src="item.image" alt="" loading="lazy" />
                        <!-- <img
                          src="../assets/img-overlay.png"
                          alt=""
                          loading="lazy"
                        /> -->
                                                 <div class="overLay"></div>

                      </div>
                      <div class="item-body">
                        <p v-if="item.title">{{ item.title.substr(0, 38) + '...' }}</p>
                        <span>
                          <span>{{ item.user_info.name }}</span>
                          <i class="fa-solid fa-user ms-2"></i>
                          <span>تعليق {{ item.comment_number }} </span
                          ><i class="fa-solid fa-message ms-2"></i>
                        </span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <a href="/blog" class="all" type="primary"> الكل </a>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="marketers">
      <div class="container">
        <h2>ادوات التسويق</h2>
        <p>
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم توليد هذا
          النص من مولد النص العربي
        </p>
        <div class="row justify-content-center">
          <div
            class="col-lg-4 col-md-6 col-sm-6"
            v-for="item in home_tools"
            :key="item.id"
          >
            <div class="markerter-item m-2">
              <router-link
                :to="`/tool/${item.id}`"
                style="border: none; color: inherit; text-decoration: none"
              >
                <div class="img-cover">
                  <!-- <img src="../assets/back.png"  alt="" /> -->
                  <img
                    :src="item.image"
                    loading="lazy"
                    alt=""
                    style="filter: sepia(0) !important"
                  />
                </div>

                <div class="item-body">
                  <h5 v-if="item.title">{{ item.title }}</h5>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="JoinPodcast bg-white" v-if="auth">
      <div class="podcast-part">
        <div class="container">
          <div class="heading d-flex justify-content-between mb-2">
            <h3 class="text-end mb-3">مقاطع البودكاست</h3>
            <router-link to="/Podcasts">عرض الكل </router-link>
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-6 col-sm-6"
              v-for="item in Podcast"
              :key="item.id"
            >
              <div class="podcast-item">
                <router-link :to="`/Podcasts/${item.id}`">
                  <div class="img-box">
                    <img :src="item.image" alt="" loading="lazy" />
                    <div class="time">
                      <i class="fa-regular fa-clock ms-1"></i>
                      <span>{{ item.count_item }} sounds</span>
                    </div>
                  </div>

                  <div class="item-body">
                    <h3 v-if="item.title">{{ item.title }}</h3>
                    <p v-html="item.description"></p>
                  </div>
                  <div class="item-bottom">
                    <div class="icons">
                      <img src="../assets/apple.png" alt="" loading="lazy" />
                      <img
                        src="../assets/soundCloud.png"
                        alt=""
                        loading="lazy"
                      />
                      <img src="../assets/podcast.png" alt="" loading="lazy" />
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="Consulting" v-if="auth">
      <div class="container">
        <div class="heading d-flex justify-content-between mb-2">
          <h3 class="text-end fw-bold mb-2">الاستشارات</h3>
          <router-link to="/Consulting">عرض الكل </router-link>
        </div>

        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-6 col-12"
            v-for="item in consuliong"
            :key="item.id"
          >
            <div class="Consulting-item" @click.prevent="update">
              <router-link :to="`/Consulting/${item.id}`">
                <div class="img-box">
                  <img :src="item.user_info.image" alt="" loading="lazy" />
                </div>
                <h3>{{ item.user_info.name }}</h3>
                <p v-html="item.description"></p>

                <div class="info">
                  <div class="time">
                    <i class="fa-regular fa-clock ms-1"></i>
                    <!-- <span>{{item.hour || 0}} <span>ساعة</span> و {{item.minutes || 0}} <span>دقيقة</span></span> -->
                    <span>{{ item.hour || 0 }} ساعة</span>
                  </div>
                  <span
                    >USD <span>{{ item.price }}</span></span
                  >
                </div>

                <button @click.prevent="book(item.id)">احجز</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="OurServices" v-if="!auth">
      <div class="container">
        <div class="heading d-flex justify-content-between mb-2">
          <h2>خدماتنا</h2>
          <a href="/OurServices">عرض الكل </a>
        </div>

        <carousel
          :autoplay="true"
          :items="3"
          :nav="false"
          v-if="service"
          :responsive="{
            0: { items: 1, nav: false },
            600: { items: 2, nav: false },
            1000: { items: 3, nav: false },
          }"
        >
          <div class="OurServices-item" v-for="item in service" :key="item.id">
            <router-link :to="`/OurServices/${item.id}`">
              <div class="img-box">
                <img :src="item.thumb_image" alt="" loading="lazy" />
              </div>

              <div class="item-body">
                <div class="title d-flex justify-content-between">
                  <h5 v-if="item.title">{{ item.title }}</h5>
                  <span>{{item.type}}</span>
                </div>
                        <p
                          v-if="item.description.length < 38"
                          v-html="item.description"
                        ></p>
                        <p
                          v-if="item.description.length > 38"
                          v-html="item.description.substr(0, 38) + '...'"
                        ></p>                <div class="bottom-card d-flex justify-content-between">
                  <span
                    >سعر : <span>${{ item.price }}</span></span
                  >
                  <span>
                    <span> {{ item.number_of_view }}</span>
                    <i class="fa-solid fa-star"></i> <span> 987 </span>
                    <i class="fa-solid fa-user-large"></i
                  ></span>
                </div>
              </div>
            </router-link>

            <div class="btn">
              <button @click.prevent="addToCart(item.id)">اشتري الان</button>
              <button>
                <router-link :to="`/OurServices/${item.id}`"
                  >عرض الخدمة</router-link
                >
              </button>
            </div>
          </div>
        </carousel>
      </div>
    </div>

    <div class="LearnWithUs">
      <div class="container">
        <div class="heading d-flex justify-content-between mb-4">
          <h2>تعلم معنا</h2>
          <router-link to="/videos">عرض الكل </router-link>
        </div>
        <div class="row justify-content-center">
          <div
            class="col-lg-3 col-md-6 col-sm-6 col-10"
            v-for="item in video"
            :key="item.id"
          >
            <div class="item">
              <router-link :to="`/videos/${item.id}`">
                <div class="img-cover">
                  <img :src="item.thum_image" alt="" loading="lazy" />
                  <img src="../assets/learn-cover.png" alt="" loading="lazy" />
                  <img src="../assets/video.png" class="video-img" alt="" />
                </div>
                <div class="item-body">
                  <p v-html="item.description.substr(0, 26) + '...'"></p>
                  
                  <div class="auther">
                    <div class="img-box">
                      <img style="border-radius:50%;" :src="item.user_info.image" alt="" loading="lazy" />
                    </div>
                    <span>{{ item.user_info.name }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="JoinPodcast" v-if="!auth">
      <div class="row">
        <div class="col-lg-9">
          <carousel
            :autoplay="false"
            :items="4"
            :dots="false"
            class="podcast-part"
            v-if="Podcast"
            :responsive="{
              0: { items: 2, nav: false },
              700: { items: 3, nav: false },
              1000: { items: 4, nav: true },
            }"
          >
            <div class="podcast-item" v-for="item in Podcast" :key="item.id">
              <router-link :to="`/Podcasts/${item.id}`">
                <div class="img-box">
                  <img :src="item.image" alt="" loading="lazy" />
                  <div class="time">
                    <i class="fa-regular fa-clock ms-1"></i>
                    <span>{{ item.count_item }} sounds</span>
                  </div>
                </div>

                <div class="item-body">
                  <h3>{{ item.title }}</h3>
                  <p>
                    {{ item.description }}
                  </p>
                </div>
                <div class="item-bottom">
                  <div class="icons">
                    <img src="../assets/apple.png" alt="" loading="lazy" />
                    <img src="../assets/soundCloud.png" alt="" loading="lazy" />
                    <img src="../assets/podcast.png" alt="" loading="lazy" />
                  </div>
                </div>
              </router-link>
            </div>
          </carousel>
        </div>

        <div class="col-lg-3">
          <div class="text-part">
            <h2>انضم الى غندور بودكاست</h2>
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم توليد
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="statistics" v-if="!auth">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-3 col-md-6 col-sm-6 col-10">
            <div class="percentegeItem">
              <PercentageCircle :percent="55" :animate="true" size="huge" />
              <p>55+</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6 col-10">
            <div class="percentegeItem">
              <PercentageCircle :percent="70" :animate="true" size="huge" />
              <p>70+</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6 col-10">
            <div class="percentegeItem">
              <PercentageCircle :percent="88" :animate="true" size="huge" />
              <p>88+</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6 col-10">
            <div class="percentegeItem">
              <PercentageCircle :percent="90" :animate="true" size="huge" />
              <p>90+</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <footerSec/> -->
  </div>
</template>

<script>
// @ is an alias to /src

import Vue from "vue";
import carousel from "vue-owl-carousel";
import PercentageCircle from "vue-css-percentage-circle";
import { mapGetters } from "vuex";

import appNav from "@/components/navComponent";
import appNavUser from "@/components/navComponentInner.vue";
import footerSec from "@/components/footer.vue";

export default {
  name: "HomeView",
  components: {
    carousel,
    PercentageCircle,
    appNav,
    appNavUser,
    footerSec,
  },
  data() {
    return {
      userAuth: localStorage.getItem("user"),

      activeName: "third",
      activeName2: "third",
      show: true,

      acc: null,
      user: null,
      userAuth: null,

      auth: false,
      homeData: null,
      about: null,
      howItWorks: null,
      service: null,
      all_scope: null,
      markter: null,
      video: null,
      Podcast: null,
      blog: null,
      blogMraketing: null,
      blogPodcast: null,
      blogContentCreator: null,
      blogMarketingTools: null,
      blogSells: null,
      blogWebsite: null,
      blogServices: null,
      consuliong: null,

      serviceNew: null,
      serviceBest: null,

      blogNew: null,
      blogBest: null,

      profile: undefined,

      contentCreators: undefined,

      home_tools: undefined,

      imageMarketer: undefined,

      first_sectionAuth: undefined,
      first_sectionNotAuth: undefined,

      // acc:null,
      // user:null,

      rescount: "",

      sound: [],
      listn: false,

      audioFile: "",

      markter2: undefined,
      dialogVisible: false,

      searchInput:'',
      emailHome:null,
      top_search:undefined
    };
  },

  computed: {
    ...mapGetters(["count"]),
  },

  mounted() {

            setTimeout(() => this.show=! this.show, 2500);

            // alert(this.show)
            


              this.axios
              .get("https://dashboard.arabicreators.com/api/check_login",{
                  headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
              })
              .then((r) => {
                if (r.data.data.is_login == 1){
                  // this.$router.push('/');

                } else if (r.data.data.is_login == 0) {
                  localStorage.removeItem("token");
                  // this.$router.push('/signIn');
                }
              });




           if (localStorage.getItem('requiredChangePassword') == 1) {
              setTimeout(
                () =>
                  this.$message({
                    message: "يجب عليك تغيير كلمة المرور",
                  }),
                4000
              );
            }


    this.$store.dispatch("count", localStorage.getItem("itemCount"));


        Vue.axios
      .get("https://dashboard.arabicreators.com/api/top_search",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        this.top_search = res.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/home_markter",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        this.markter = res.data.data.markter;
        this.markter2 = res.data.data.markter2;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        this.profile = res.data.data;
        localStorage.setItem("userId", res.data.data.id);

        localStorage.setItem("first_name", res.data.data.first_name);
        localStorage.setItem("last_name", res.data.data.last_name);
        localStorage.setItem("email", res.data.data.email);
        localStorage.setItem("country", res.data.data.country.title);

        localStorage.setItem("profileType", res.data.data.type);

        if (this.profile.status == 1) {
        } else if (this.profile.status == 0) {
        }
      });

    if (localStorage.getItem("token")) {
      this.auth = true;
    } else if (!localStorage.getItem("token")) {
      this.auth = false;
    }

    if (!this.auth) {
      Vue.axios
        .get("https://dashboard.arabicreators.com/api/get_about_home",{
           headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.about = res.data.data.about;
          this.howItWorks = res.data.data.howItWorks;
        });

      Vue.axios
        .get("https://dashboard.arabicreators.com/api/home_service",{
           headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.service = res.data.data.service.home;
        });
    }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/get_all_scope_home",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        this.all_scope = res.data.data.all_scope;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/home_tools",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        this.home_tools = res.data.data.all_tools;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/first_section",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        this.first_sectionAuth = res.data.data.auth;
        this.first_sectionNotAuth = res.data.data.not_auth;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/home_podcasts",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {

        if(res.data.data.Podcast){

          this.Podcast = res.data.data.Podcast;

          if(this.Podcast[0].sound_item){
          this.sounds = this.Podcast[0].sound_item;
       }
        }

        // alert(this.sounds)
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/home_video",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        this.video = res.data.data.video;
      });

    setTimeout(
      () =>
        Vue.axios
          .get("https://dashboard.arabicreators.com/api/home_blog",{
             headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          })
          .then((res) => {
            this.blog = res.data.data.blog.category;
            this.blogNew = res.data.data.blog.new;
            this.blogBest = res.data.data.blog.best;

            // this.show = !this.show;
          }),
      1000
    );

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/main_images",{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        this.imageMarketer = res.data.data.markert_image_page;
      });

    if (this.auth) {
      Vue.axios
        .get("https://dashboard.arabicreators.com/api/home_consulting",{
           headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.consuliong = res.data.data.consuliong;
        });

      Vue.axios
        .get("https://dashboard.arabicreators.com/api/home_service",{
           headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.service = res.data.data.service.home;
          this.serviceNew = res.data.data.service.new;
          this.serviceBest = res.data.data.service.best;
        });
    }
  },

  methods: {

    homeRegister(){

    this.$router.push(`/createAccount`)

    localStorage.setItem('email',this.emailHome)


    },

    SearchMethod(){
    
        let WordInput =this.searchInput
        this.$router.push(`HomeSearch/${WordInput}`)

    },
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
        .then((res2) => {
          // if(res2.data.code == 400){
          //  console.log('cart'+res2.data)

          // }

          if (res2.data.message == "added") {
            // this.$message({
            //   message: "اضفيت الى السلة",
            //   type: "success",
            // });
            this.dialogVisible = true;

            this.$store.dispatch("count", res.data.data.count);
            // alert(this.$store.state.count)
            localStorage.setItem("itemCount", res.data.data.count);

            // this.$router.go()
          } else if (res2.data.message == "you need to login") {
            this.$message.error("تحتاج الى تسجيل الدخول");

            setTimeout(() => this.$router.push("/signIn"), 2000);
          }
        });
    },

    book(id) {
      this.$router.push(`/registration/${id}`);
    },
  },
};
</script>




<style lang="scss">
.tabs {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
}
.el-tabs {
  direction: ltr !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  padding: 10px;
}
.el-tabs__header {
  background-color: white;
  margin-bottom: 30px !important;
}

.el-tabs__item.is-active {
  border-radius: 10px;
  color: var(--darkColor) !important;
}

.el-tabs__active-bar {
  background-color: var(--darkColor) !important;
}

.el-tabs__item {
  font-size: 18px !important;
  font-weight: 700 !important;
  &:hover {
    color: unset !important;
  }
}

.el-tabs__nav-wrap::after {
  display: none;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: unset !important;
}

.el-tab-pane {
  .atical-item {
    position: relative;
    width: 100%;
    height: 400px;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    color: black;
    .img-box {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
    .overLay{
    width: 100%;
    height: 100%;
    background: linear-gradient(to top , #f3f3f3e3,transparent);
    position: absolute;
    z-index: 3;
          }
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
      width: 100%;
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
    a {
      color: inherit !important;
    }
  }

  .height-short {
    height: 195px !important;
  }
}

.fill {
  border: 0.08em solid var(--darkColor) !important ;
}

.bar {
  border: 0.08em solid var(--darkColor) !important ;
}

.allServices {
  padding: 20px;
  h3 {
    font-size: 22px;
    text-align: right;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .el-tabs__nav {
    float: right;
  }
}

.allBlogs {
  padding: 20px;
  .heading {
    direction: rtl;
    margin: 20px;
    margin-bottom: 50px !important;
    h3 {
      font-size: 40px;
      color: var(--darkColor);
      font-weight: 700;
      position: relative;

      &::before {
        content: "";
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
        width: 94px;
        height: 5px;
        background-size: contain;
        position: absolute;
        bottom: -11px;
        right: 1%;
      }
    }
  }

  .el-tabs__nav {
    float: right;
  }
}

.JoinPodcast {
  .heading {
    direction: rtl;
    margin: 20px;
    margin-bottom: 50px !important;
    h3 {
      font-size: 40px;
      color: var(--darkColor);
      font-weight: 700;
      position: relative;

      &::before {
        content: "";
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
        width: 122px;
        height: 5px;
        background-size: contain;
        position: absolute;
        bottom: -11px;
        right: 1%;
      }
    }
  }
}

.Consulting {
  .heading {
    direction: rtl;
    margin: 20px;
    margin-bottom: 50px !important;
    h3 {
      font-size: 40px;
      color: var(--darkColor);
      font-weight: 700;
      position: relative;

      &::before {
        content: "";
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
        width: 122px;
        height: 5px;
        background-size: contain;
        position: absolute;
        bottom: -11px;
        right: 1%;
      }
    }

    a {
      color: var(--darkColor) !important;
    }
  }
}

.Consulting-item {
  position: relative;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 10px;
  background: #f9f9f9;
  direction: rtl;
  a {
    text-decoration: none;
  }
  .img-box {
    width: 145px;
    height: 145px;
    margin: auto;
    margin-bottom: 30px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  h3 {
    font-size: 20px;
    color: rgb(129 129 129);
    font-weight: 700;
    margin-top: 13px;
    margin-bottom: 13px;
    text-decoration: none;
  }

  p {
    font-size: 18px;
    color: rgb(46, 46, 46);
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: right;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    span {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 18px;
      color: #000;
    }

    .time {
      position: relative;
      right: -20px;
      background: url(data:image/png;base64,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);
      background-repeat: no-repeat;
      background-size: cover;
      width: 92px;
      height: 29px;
      opacity: 0.8;
      filter: sepia(1) !important;

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

  button {
    background: var(--darkColor);
    border-radius: 8px;
    padding: 8px 20px;
    color: white;
    text-decoration: unset;
    display: inline-block;
    width: 100%;
    margin: auto;
    margin-top: 30px;
  }
}

.loader {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute !important;
  right: 0;
  top: 0;
  z-index: 50;
  background-color: rgb(255, 255, 255) !important;
}

.v-spinner {
  margin-top: 20%;
}

.OurServices {
  direction: rtl;
  a {
    text-decoration: none !important;
    color: inherit !important;
  }
}
</style>

<style lang="scss">
:root {
  --mainColor: #ece5d2;
  --lightColor: #c7c2b2;
  --darkColor: #022d47;
}

.home {
  position: relative;
  display: block !important;
}

.navbar {
  background-color: transparent !important;
}

.home header {
  height: 100vh !important;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  background-image: url("../assets/BG.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .innerHeader {
    max-width: 70%;
    margin: auto;
    position: relative;
    z-index: 2;
    h1 {
      font-size: 55px;
      font-weight: 700;
      margin-bottom: 10px;
      color: white;
    }
    p {
      font-size: 34px;
      font-weight: 500;
      margin-bottom: 0px;
      color: white;
    }

    form {
      display: flex;
      position: relative;
      justify-content: center;
      height: 50px;
      margin-top: 20px;
      .input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: white;
        border-radius: 25px;
        width: 60%;
        direction: rtl;
        height: 100%;
      }

      input {
        height: 100%;
        border: none;
      }

      .form-control {
        &:focus {
          box-shadow: unset !important;
          border: none !important;
        }
      }

      button {
        // position: absolute;
        // right: 10px;
        // top: 0;
        background-color: var(--darkColor);
        color: white;
        height: 100%;
        border: none;
        padding: 6px 26px;
        border-radius: 25px !important;
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.1;
    z-index: 1;
  }
}

.about {
  margin-top: 100px;
  margin-bottom: 100px;
  direction: rtl;
  font-family: "Tajawal", sans-serif;

  h2 {
    font-size: 40px;
    color: var(--darkColor);
    margin-bottom: 30px;
    font-weight: 700;
    position: relative;
    display: inline-block;

    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 150px;
      height: 5px;
      right: 3%;
      position: absolute;
      bottom: -18px;
      background-size: contain;
    }
  }

  p {
    font-size: 22px;
    font-weight: 600;
    max-width: 75%;
    margin: auto;
    color: rgb(45, 44, 44);
    text-align: right;
    line-height: 38px;
  }
}

.howToUse {
  direction: rtl;
  font-family: "Tajawal", sans-serif;

  background-color: var(--mainColor);
  padding: 30px;
  height: 800px;
  h2 {
    font-size: 40px;
    color: var(--darkColor);
    margin-bottom: 80px;
    font-weight: 700;
    position: relative;
    display: inline-block;

    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 153px;
      height: 5px;
      position: absolute;
      bottom: -18px;
      right: 25%;
      background-size: contain;
    }
  }
  .innerContent {
    margin-top: 200px;
    margin-bottom: 300px;
    position: relative;

    .line {
      width: 100%;
      height: 3px;
      background-color: var(--darkColor);
      display: flex;
      justify-content: space-between;
      position: relative;
      top: 100px;

      .item {
        position: absolute;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        border: 1px solid var(--darkColor);

        &:first-child {
          right: 1%;
          top: -270px;
          color: white;
          background: var(--darkColor);

          .item-content .img-item {
            background-color: white !important;
          }

          span {
            bottom: -60%;
          }
        }

        &:nth-child(2) {
          right: 46%;
          top: -270px;

          .item-content .img-item {
            background: var(--darkColor);
          }

          span {
            bottom: -60%;
          }
        }

        &:nth-child(3) {
          left: 46%;
          bottom: -270px;

          .item-content .img-item {
            background: var(--darkColor);
          }

          span {
            top: -65%;
          }
        }

        &:last-child {
          left: 1%;
          bottom: -270px;

          .item-content .img-item {
            background: var(--darkColor);
          }

          span {
            top: -65%;
          }
        }

        .item-content {
          .img-item {
            width: 65px;
            height: 65px;
            padding: 10px;
            border-radius: 50%;
            margin: 0 auto 20px;
            img {
              height: 100%;
              width: 100%;
              filter: sepia(1);
            }
          }
        }

        span {
          position: absolute;
          right: 48%;
          padding: 10px;
          width: 50px;
          height: 50px;
          line-height: 30px;
          font-weight: 700;
          border-radius: 50%;
          background: #fff;
          display: inline-block;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
          border: 1px solid var(--darkColor);
          font-size: 20px;
          color: var(--darkColor);
        }

        .numActive {
          background: var(--darkColor);
          color: white !important;
        }
      }
    }
  }
}

.fields {
  margin-top: 100px;
  margin-bottom: 100px;
  font-family: "Tajawal", sans-serif;

  h2 {
    font-size: 40px;
    color: var(--darkColor);
    font-weight: 700;
    position: relative;
    text-align: right;

    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 146px;
      height: 5px;
      position: absolute;
      bottom: -18px;
      right: 0%;
      background-size: contain;
    }
  }
  .item {
    width: 206px;
    height: 260px;
    border-radius: 1px;
    margin-top: 40px;
    transition: all 0.5s;
    overflow: hidden;
    position: relative;

    .img-item {
      width: 100%;
      height: 100%;
      // border-radius: 50%;
      // margin: 30px auto 20px;
      // background-color: white;
      // border: 1px solid var(--darkColor);
      // padding: 18px;
      transition: all 0.5s;
      box-sizing: content-box;

      img {
        height: 100%;
        width: 100%;
      }
    }

    h4 {
      font-size: 21px;
      color: #ffffff;
      margin-bottom: 20px;
      position: absolute;
      z-index: 5;
      top: 17px;
      font-weight: 600;
      right: 21px;
    }

    &:hover {
      // background-color: white;
      opacity: 0.85;
      // &:hover .img-item {
      //   border-width: 8px;
      // }
    }
  }

  .owl-theme {
    .owl-nav {
      position: absolute;
      top: -60px;

      .owl-prev {
        color: var(--darkColor);
        display: inline-block;
        border-radius: 50%;
        border: 1px solid;
        height: 40px;
        line-height: 27px;
        font-weight: 700;
        background: unset !important;
      }

      .owl-next {
        color: var(--darkColor);
        display: inline-block;
        border-radius: 50%;
        border: 1px solid;
        height: 40px;
        line-height: 27px;
        font-weight: 700;
        background: unset !important;
      }
    }
  }

  .owl-carousel {
    height: 300px;
    .owl-stage-outer {
      height: 100%;
      .owl-stage {
        height: 100%;
        .owl-item {
          height: 100%;

          // img{
          //   filter: sepia(0);
          // }
        }
      }
    }
  }
}

.all {
  border: 2px solid var(--darkColor);
  padding: 2px 2px;
  font-weight: 700;
  font-size: 20px;
  color: var(--darkColor);
  display: inline-block;
  margin: auto;
  width: 100px !important;
  border-radius: 7px;
  text-decoration: none;

  &:hover {
    color: inherit !important;
  }
}

.OurServices {
  font-family: "Tajawal", sans-serif;

  .heading {
    direction: rtl;
    margin: 20px;

    h2 {
      font-size: 40px;
      color: var(--darkColor);
      font-weight: 700;
      position: relative;

      &::before {
        content: "";
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
        width: 86px;
        height: 5px;
        background-size: contain;
        position: absolute;
        bottom: -11px;
        right: 1%;
      }
    }

    a {
      font-size: 20px;
      color: #9a9797;
      font-weight: 700;
      text-decoration: none;
      margin-top: 15px;
    }
  }

  .OurServices-item {
    border: 1px solid #c0c0c0;
    border-radius: 15px;
    margin: 15px;
    direction: rtl;
    height: 460px;

    .img-box {
      width: 100%;
      height: 250px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }

      .img-user {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        bottom: 10px;
        right: 10px;
        border: 2px solid white;

        a {
          width: 100%;
          height: 100%;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .item-body {
      padding: 10px;

      .title {
        margin: 10px 0 10px 0;
        h5 {
          color: #302d2d;
          font-size: 15px;
          font-weight: 500;
          text-align: right;
          padding-left: 3px;
          margin-bottom: 5px;
        }

        span {
          color: white;
          background-color: #677a5f;
          border-radius: 6px;
          padding: 5px 8px;
          height: 30px;
          font-size: 14px;
        }
      }

      p {
        margin-bottom: 5px;
        text-align: right;
        font-weight: 500;
      }

      .bottom-card {
        span {
          margin-left: 6px;
        }
      }
    }

    .btn {
      width: 100%;
      margin-top: 0px;
      border: none !important;
      button {
        background: var(--darkColor);
        border-radius: 8px;
        padding: 8px 20px;
        color: white !important;
        text-decoration: unset;
        display: inline-block;
        width: 48%;
        margin: 1%;
        border: none;
      }
    }
  }

  .owl-dots {
    .owl-dot {
      span {
        width: 15px;
        height: 15px;
        background-color: var(--darkColor) !important;
        opacity: 0.5;
        margin: 3px;
      }
    }

    .active {
      span {
        background-color: var(--darkColor) !important;
        width: 18px;
        height: 18px;
        opacity: 1;
        border-radius: 50%;
      }
    }
  }
}

.OurArticles {
  margin-top: 100px;
  font-family: "Tajawal", sans-serif;

  direction: rtl;

  h2 {
    font-size: 40px;
    color: var(--darkColor);
    margin-bottom: 30px;
    font-weight: 700;
    position: relative;
    display: inline-block;
    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 143px;
      height: 5px;
      position: absolute;
      bottom: -18px;
      background-size: contain;
    }
  }

  .p-top {
    margin-bottom: 40px;
  }

  .nav-tabs {
    justify-content: center;
    margin-bottom: 20px;
    border: none;
    .nav-item {
      .nav-link {
        color: black;
        font-weight: 700;
        border: none;

        &:hover {
          border: none;
          border-bottom: 3px solid var(--darkColor);
          color: var(--darkColor);
        }
      }

      .active {
        border: none;
        border-bottom: 3px solid var(--darkColor);
        color: var(--darkColor);
      }
    }
  }

  .OurArticles {
    .tab-pane {
      .atical-item {
        position: relative;
        width: 100%;
        height: 400px;
        margin: 10px;
        border-radius: 10px;
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

        .item-body {
          position: absolute;
          bottom: 0;
          z-index: 5;
          padding: 10px;
          width: 100% !important;
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

      .height-short {
        height: 195px !important;
      }
    }

    a {
      text-align: left;
      display: block;
      margin-left: 176px;
      text-decoration: none;
      color: var(--darkColor);
    }
  }
}

.marketers {
  margin-top: 100px;
  font-family: "Tajawal", sans-serif;

  .img {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 98%;
    }

    a {
      position: absolute;
      bottom: 24%;
      left: 3%;
      color: white;
      border: none;

      &:hover {
        color: white !important;
        border: none;
      }
    }

    .icon {
      position: absolute;
      bottom: 18%;
      left: 45%;
      color: white;
      font-size: 25px;
    }
  }

  h2 {
    font-size: 40px;
    color: var(--darkColor);
    margin-bottom: 30px;
    font-weight: 700;
    position: relative;
    // display: inline-block;
    // text-align: right;

    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 173px;
      height: 5px;
      position: absolute;
      bottom: -18px;
      right: 43%;
      background-size: contain;
    }
  }

  p {
    margin-bottom: 40px;
  }

  .allMarketers {
    border: 2px solid var(--darkColor);
    padding: 2px 26px;
    font-weight: 700;
    font-size: 20px;
    color: var(--darkColor);

    &:hover {
      color: var(--darkColor) !important;
      border: 2px solid var(--darkColor);
      border-color: var(--darkColor) !important;
    }
  }

  a {
    color: inherit;

    &:hover {
      color: var(--darkColor) !important;
      border: 2px solid var(--darkColor);
    }
  }

  .markerter-item {
    // border: 1px solid #d5d5d5;
    // padding: 10px;
    // border-radius: 15px;
    padding-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    margin-bottom: 10px;
    .img-cover {
      position: relative;
      top: 0;
      height: 240px;
      width: 100%;
      margin-bottom: 15px;

      img {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        // filter: sepia(1);
      }

      .img-man {
        // padding: 15px;
        // right: 10%;
        width: 100%;
        filter: sepia(0);
      }
    }

    .item-body {
      h5 {
        font-weight: 700;
        margin-bottom: 10px;
      }

      .stars {
        margin-bottom: 15px;
        .fa-star {
          color: gold;
          margin-left: 6px;
        }
      }
    }
    .info {
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        color: white;
        background: linear-gradient(
          239.11deg,
          var(--darkColor) -31.67%,
          #567a46 192.97%
        );
        border-radius: 2px;
        padding: 6px 16px;
        margin: 8px;
      }
    }

    a {
      &:hover {
        color: rgb(68, 68, 68) !important;
        border: none !important;
      }
    }
  }

  .owl-theme {
    .owl-nav {
      position: absolute;
      top: -60px;
    }
  }
}

.heading {
  direction: rtl;
  margin: 20px;
  margin-bottom: 50px !important;

  h2 {
    font-size: 40px;
    color: var(--darkColor);
    font-weight: 700;
    position: relative;

    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 122px;
      height: 5px;
      background-size: contain;
      position: absolute;
      bottom: -11px;
      right: 1%;
    }
  }

  a {
    font-size: 20px;
    color: #9e9b9b;
    font-weight: 700;
    text-decoration: none;
    margin-top: 15px;
  }
}

.LearnWithUs {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  margin-bottom: 50px;
  margin-top: 100px;

  a {
    color: var(--darkColor) !important;
  }

  .item {
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
}

.JoinPodcast {
  font-family: "Tajawal", sans-serif;

  margin-bottom: 50px;
  margin-top: 100px;
  background: var(--darkColor);
  padding: 15px;
  position: relative;
  overflow: hidden;
  .text-part {
    color: white;
    margin-top: 100px;
    text-align: right;
    margin-right: 50px;
  }

  .podcast-part {
    margin-left: -30px;

    a {
      color: var(--darkColor) !important ;

      &:hover {
        color: var(--darkColor) !important;
      }
    }
    .podcast-item {
      background-color: white;
      border-radius: 15px;
      overflow: hidden;
      margin: 6px;
      direction: rtl;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      a {
        text-decoration: none;
        color: inherit;
      }
      .img-box {
        width: 100%;
        height: 260px !important;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .time {
          // display: none !important;
          position: absolute;
          bottom: 10px;
          right: 0;
          background: url(data:image/png;base64,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);
          background-repeat: no-repeat;
          background-size: cover;
          width: 92px;
          height: 29px;
          opacity: 0.8;
          filter: sepia(1) !important;

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
          color: black;
          background: var(--mainColor);
          border-radius: 15px;
          padding: 0;
          padding-right: 5px;
          margin: 8px;
          display: flex;
          align-items: center;
          a {
            text-decoration: none;
            color: black;
            margin-left: 5px;
          }
          img {
          }
        }
      }
    }
  }

  .owl-nav {
    position: absolute;
    right: -250px;
    top: 273px;

    .owl-prev {
      font-size: 14px;
      margin: 5px;
      padding: 4px 7px;
      display: inline-block;
      cursor: pointer;
      background: transparent;
      border: 2px solid;
      border-radius: 50%;
      height: 46px;
      width: 47px;
      line-height: 30px;
      text-transform: capitalize;
    }

    .owl-next {
      font-size: 14px;
      margin: 5px;
      padding: 4px 7px;
      display: inline-block;
      cursor: pointer;
      background: transparent;
      border: 2px solid;
      border-radius: 50%;
      height: 46px;
      width: 47px;
      line-height: 32px;
      text-transform: capitalize;
    }
  }
}

.statistics {
  padding-top: 60px;
  padding-bottom: 100px;

  .percentegeItem {
    position: relative;
    span {
      display: none !important;
    }

    p {
      display: inline-block;
      position: absolute;
      top: calc(50% - 30px);
      font-size: 40px;
      font-weight: 700;
      color: var(--darkColor);
      right: calc(50% - 9px);
    }
  }
}

.headerAuth {
  p {
    font-size: 36px !important;
    font-weight: 500 !important;
  }
  form {
    .input {
      width: 80% !important;
    }
  }
}
</style>



<style scoped>
@media (max-width: 986px) {
  header {
    height: 70vh !important;
  }

  header .innerHeader {
    max-width: 100%;
  }

  header .innerHeader h1 {
    font-size: 46px;
  }

  header .innerHeader p {
    font-size: 28px;
  }

  header .innerHeader form .input {
    margin-top: 30px;
    width: 100%;
  }

  .about h2 {
    font-size: 34px;
  }

  .about h2::before {
    width: 108px;
  }

  .fields .item {
    width: 160px;
  }

  .about p {
    font-size: 20px;
    max-width: 100%;
  }

  .howToUse {
    height: 1200px;
  }

  .howToUse h2 {
    font-size: 34px;
  }

  .howToUse .innerContent .line .item {
    width: 100%;
  }

  .howToUse .innerContent .line {
    display: block;
    top: unset;
  }

  .howToUse .innerContent .line .item:first-child,
  .howToUse .innerContent .line .item:nth-child(2),
  .howToUse .innerContent .line .item:nth-child(3),
  .howToUse .innerContent .line .item:last-child {
    right: unset;
    top: unset;
    left: unset;
    bottom: unset;
    position: relative;
    margin-bottom: 15px;
  }

  .howToUse .innerContent {
    margin-top: 0;
  }

  .howToUse .innerContent .line .item span {
    display: none;
  }

  .OurArticles h2,
  .OurServices .heading h2 {
    font-size: 34px;
  }

  .OurServices .OurServices-item {
    margin: 5px;
  }

  .marketers .markerter-item {
    margin-bottom: 20px;
  }

  .item {
    margin-bottom: 20px;
  }

  .JoinPodcast .text-part {
    margin-top: 50px;
  }

  .c100 {
    margin: auto;
    margin-bottom: 20px;
  }

  .statistics .percentegeItem p {
    right: calc(34% - 0px);
  }

  .marketers .img a {
    left: calc(50% - 131px);
  }

  .showAllMarketers {
    display: none;
  }

  .Consulting-item {
    margin-bottom: 15px;
  }

  .OurServices a,
  .all {
    margin-top: 20px;
  }
}

@media (max-width: 557px) {
  header {
    height: 60vh !important;
  }

  header .innerHeader {
    max-width: 100%;
  }

  header .innerHeader h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  header .innerHeader p {
    font-size: 26px;
    margin-bottom: 5px;
  }

  .home header .innerHeader form {
    margin: auto;
    margin-top: 30px;
    height: 40px;
    width: 80%;
  }

  header .innerHeader form .input {
    width: 100%;
  }

  .marketers h2 {
    font-size: 28px;
  }

  .marketers .img a {
    left: calc(50% - 131px);
  }

  .marketers h2::before {
    width: 133px;
    height: 5px;
    position: absolute;
    bottom: -18px;
    right: 29%;
    background-size: contain;
  }

  .about h2 {
    font-size: 28px;
  }

  .about h2::before {
    width: 108px;
    right: 15%;
  }

  .about p {
    font-size: 18px;
    text-align: center;
  }

  .howToUse {
    height: 1200px;
  }

  .howToUse h2 {
    font-size: 28px;
  }

  .howToUse .innerContent .line .item {
    width: 100%;
  }

  .howToUse .innerContent .line {
    display: block;
    top: unset;
  }

  .howToUse .innerContent .line .item:first-child,
  .howToUse .innerContent .line .item:nth-child(2),
  .howToUse .innerContent .line .item:nth-child(3),
  .howToUse .innerContent .line .item:last-child {
    right: unset;
    top: unset;
    left: unset;
    bottom: unset;
    position: relative;
    margin-bottom: 15px;
  }

  .howToUse .innerContent {
    margin-top: 0;
  }

  .howToUse .innerContent .line .item span {
    display: none;
  }

  .fields h2 {
    text-align: center;
  }

  .fields h2::before {
    width: 110px;
    bottom: -11px;
    right: 34%;
  }

  .fields .item {
    width: 160px;
  }

  .allBlogs .heading {
    margin-bottom: 10px !important;
    display: inline-block !important;
  }

  .allBlogs .heading h3 {
    font-size: 28px;
  }

  .el-tab-pane .atical-item {
    height: 320px;
  }

  .marketers {
    margin-bottom: 60px;
  }

  .OurArticles h2,
  .OurServices .heading h2 {
    font-size: 28px;
  }

  .OurServices .OurServices-item {
    margin: 15px;
  }

  .OurServices .OurServices-item .img-box {
    height: 220px;
  }

  .LearnWithUs .item a .img-cover {
    height: 240px;
  }

  .JoinPodcast .heading h3 {
    font-size: 28px;
  }

  .OurServices .heading a {
    font-size: 16px;
  }

  .marketers .markerter-item {
    margin-bottom: 10px;
  }

  .heading h2 {
    font-size: 28px;
  }

  .heading a {
    font-size: 16px;
  }

  .item {
    margin-bottom: 20px;
  }

  .JoinPodcast .podcast-part .podcast-item {
    height: 340px;
  }

  .JoinPodcast .podcast-part .podcast-item .img-box {
    height: 165px !important;
  }

  .JoinPodcast .text-part {
    margin-top: 50px;
  }

  .c100 {
    margin: auto;
    margin-bottom: 20px;
  }

  .statistics .percentegeItem p {
    right: calc(41% - 0px);
  }

  footer .footer-col form .input {
    width: 100%;
  }

  .JoinPodcast .podcast-part {
    margin-left: 0;
  }

  .Consulting-item {
    margin: 20px;
  }

  .Consulting .heading h3 {
    font-size: 28px;
  }

  .el-tab-pane .atical-item {
    width: unset;
  }

  .showAllMarketers {
    order: 2;
  }

  .allServices h3 {
    text-align: center;
  }

  .showAllMarketers {
    display: none;
  }
}
</style>


<style lang="scss">
@media (max-width: 557px) {
  .allServices {
    .el-tabs__nav {
      float: left !important;
    }
  }

  .el-tabs__nav {
    float: left !important;
  }
}

.el-tag{
  margin-left: unset !important;
  margin: 5px !important;
  margin-top: 10px !important;

    height: 28px !important;
    padding: 0 6px !important;
    line-height: 26px !important;
    border-radius: 15px !important;

}

.el-tag--plain{
  background-color: transparent !important;
  color: white !important;
  border-color: #929292 !important;
}
</style>

