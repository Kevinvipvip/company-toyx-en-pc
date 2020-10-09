<template>
  <div class="home page">
    <div class="swiper">
      <swiper v-if="slide_list.length>0" :options="swiperOption" class="swiper-wrap" ref="mySwiper">
        <swiper-slide class="swiper-item" v-for="(v,index) in slide_list" :key="'home'+index">
          <div class="swiper-img" @click="to_slide_detail(v.url)" :style="'background-image: url('+v.pic+')'"></div>
        </swiper-slide>
        <!--分页器-->
        <div class="swiper-pagination mine-page" v-for="(item,index) in slide_list" :key="index"
             slot="pagination"></div>
      </swiper>
    </div>

    <div class="content">
      <div class="home-one">
        <div class="w-1200">
          <!--tab-->
          <div class="tab-junp">
            <div class="tab">
              <p :class="tab_on === 1?'active':''" @click="tab(1)">About Us</p>
              <p :class="tab_on === 2?'active':''" @click="tab(2)">R&D Center</p>
              <p :class="tab_on === 3?'active':''" @click="tab(3)"> Incubation Centres</p>
              <p :class="tab_on === 4?'active':''" @click="tab(4)">Custom Services</p>
            </div>
            <div class="junp">
              <p>Jump to:</p>
              <p>
                <router-link :to="{path:'server',query:{nav:2,on:1}}">Domestic</router-link>
                <span>|</span>
                <router-link :to="{path:'server',query:{nav:2,on:2}}">Foreign</router-link>
              </p>
            </div>
          </div>

          <!--cont-->
          <div class="tab-cont">
            <h3>{{tab_cont.title}}</h3>
            <p>{{tab_cont.cont}}</p>
            <div class="tab-swiper" v-if="tab_cont.pics">
              <swiper v-if="tab_cont.pics.length>0" :options="swiperTab" class="swiper-tab" ref="tabSwiper">
                <swiper-slide class="swiper-tab-item" v-for="(v,index) in tab_cont.pics" :key="'tab'+index">
                  <div class="pic" :style="'background-image: url('+v+')'"></div>
                </swiper-slide>
              </swiper>
              <!--上一页和下一页-->
              <div class="mine-btn next">
                <div class="swiper-button-next swiper-button-white"></div>
              </div>
              <div class="mine-btn prev">
                <div class="swiper-button-prev swiper-button-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="home-two">
        <div class="cate-box w-1200">
          <ul>
            <li v-for="(item,index) in cate_list" :key="'home_cate'+index"
                @mouseenter="hover_cate(item.id)"
                @mouseleave="hover_cate(-1)"
                @click="to_sercer(item.id)">
              <div class="img"><img :src="cate_cative === item.id?item.icon2:item.icon"/></div>
              <p class="one-line-ellipsis">{{item.cate_name}}</p>
            </li>
          </ul>
        </div>
      </div>

      <!--合作伙伴-->
      <div class="partner">
        <div class="w-1200">
          <h3>Our Partner</h3>
          <div class="partner-cont">
            <div class="partner-item" v-for="(item,index) in partner" :key="'partner'+index">
              <div class="img" :style="'background-image: url('+item.icon+')'"></div>
              <div class="item-title">
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content"><p style="max-width:300px;font-size: 14px">{{item.partner_name}}</p></div>
                  <p class="one-line-ellipsis">{{item.partner_name}}</p>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'// 这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import { swiper, swiperSlide } from 'vue-awesome-swiper' // 引入slider组件

  export default {
    name: 'Home',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        // 轮播图
        slide_list: [],
        swiperOption: {
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          speed: 800,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets"
          },
          direction: 'horizontal'
        },

        tab_on: 1,//切换tab
        tab_cont: {},//tab内容数据
        swiperTab: {
          slidesPerView: 4,
          // slidesPerView: 'auto',
          spaceBetween: 20,
          loop: true,
          loopedSlides: 10,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
            prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
          }
        },

        cate_list: [],//分类列表
        cate_length: 6,//首页分类显示个数
        cate_cative: -1,

        partner: [],//合作伙伴数据
      }
    },
    mounted() {
      this.tab_cont = this.config.home_tab_cont[0];
      let promise1 = new Promise(resolve => {
        this.getSlideList(() => {
          resolve();
        });
      });
      let promise2 = new Promise(resolve => {
        this.getCateList(() => {
          resolve();
        });
      });
      let promise3 = new Promise(resolve => {
        this.getPartnerList(() => {
          resolve();
        });
      });
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      Promise.all([promise1, promise2, promise3]).then(() => {
        loading.close();
      });
    },
    methods: {
      // 切换tab栏
      tab(on) {
        this.tab_on = on;
        if (on === 4) {
          this.$router.push({ path: 'server', query: { nav: 2, on: 3 } })
        } else {
          this.tab_cont = this.config.home_tab_cont[on - 1]
        }
      },
      // 分类hover效果
      hover_cate(active) {
        this.cate_cative = active;
      },
      // 点击跳转服务全球
      to_sercer(id) {
        this.$router.push({ path: '/server', query: { nav: 2, on: 2, cate: id } });
      },
      // 点击轮播图进详情
      to_slide_detail(url) {
        if (url) {
          if (url.indexOf('http') === 0) {
            window.open(url, "_blank");
          } else {
            let page = url.split('?');
            let query = page[1].split('=');
            switch (page[0]) {
              case 'newDetail':
                this.$router.push({
                  path: page[0],
                  query: {
                    nav: 4,
                    id: query[1]
                  }
                });
                break;
              // case 'productDetail':
              //   this.$router.push({
              //     path: page[0],
              //     query: {
              //       nav: 2,
              //       id: query[1]
              //     }
              //   });
              //   break;
            }
          }
        }
      },
      // 获取分类列表
      getCateList(complete) {
        this.utils.ajax(this, 'cateList').then(res => {
          this.utils.aliyun_format(res, 'icon');
          this.utils.aliyun_format(res, 'icon2');
          this.cate_list = res;
          if (complete) {
            complete();
          }
        })
      },
      getPartnerList(complete) {
        this.utils.ajax(this, 'partnerList').then(res => {
          this.utils.aliyun_format(res, 'icon');
          this.partner = res;
          if (complete) {
            complete();
          }
        })
      },

      // 获取轮播图列表
      getSlideList(complete) {
        this.utils.ajax(this, 'slideList').then(res => {
          this.utils.aliyun_format(res, 'pic');
          this.slide_list = res;
          if (complete) {
            complete();
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    min-width: 1400px;

    .swiper {
      height: 730px;

      .swiper-wrap {
        height: 100%;

        .swiper-img {
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .mine-page {
          bottom: 41px;

          /deep/ span {
            border-radius: unset;
            width: 48px;
            height: 8px;
            background-color: #ffffff;
            opacity: 0.4;

            &.swiper-pagination-bullet-active {
              opacity: 1;
            }
          }
        }
      }
    ;
    }

    .content {
      .home-one {

        .tab-junp {
          margin-top: 44px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .tab {
            display: flex;

            p {
              cursor: pointer;
              padding: 0 15px;
              height: 34px;
              border: solid 1px transparent;
              line-height: 34px;
              font-size: 14px;
              color: #333;
              text-align: center;

              &.active, &:hover {
                background-color: #3f83cc;
                border-color: #ededed;
                color: #ffffff;
              }
            }

          }

          .junp {
            display: flex;

            p {
              margin-left: 10px;
              font-size: 14px;
              color: #b3b3b3;
              display: flex;
              align-items: center;

              span {
                display: block;
                margin: 0 10px;
                height: 90%;
                overflow: hidden;
              }

              a {
                color: #b3b3b3;

                &:hover {
                  color: #3f83cc;
                }
              }
            }
          }
        }

        .tab-cont {
          margin: 60px 0;

          h3 {
            font-weight: normal;
            font-size: 34px;
            color: #333;
            margin-bottom: 40px;
          }

          p {
            color: #666666;
            font-size: 16px;
            line-height: 28px;
            text-align: justify;
          }

          .tab-swiper {
            margin-top: 55px;
            height: 216px;
            position: relative;

            .swiper-tab {
              height: 100%;

              .swiper-tab-item {
                .pic {
                  height: 100%;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover;
                }
              }
            }

            .mine-btn {
              display: none;
              z-index: 10;
              position: absolute;
              top: 0;
              height: 100%;
              width: 50px;
              background-color: rgba(0, 0, 0, 0.3);

              &.next {
                right: 0;
              }
            }

            .swiper-button-next, .swiper-button-prev, .swiper-button-white {
              outline: none;
            }

            &:hover {
              .mine-btn {
                display: block;
              }
            }
          }
        }
      }

      .home-two {
        background-color: #f7f9fb;
        overflow: hidden;

        .cate-box {
          padding: 65px 48px;
          box-sizing: border-box;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              width: 300px;
              display: flex;
              flex-flow: column;
              align-items: center;
              margin-top: 65px;
              cursor: pointer;
              margin-right: 102px;

              &:nth-child(-n+3) {
                margin-top: 0;
              }

              &:nth-child(3n) {
                margin-right: 0;
              }

              .img {
                height: 218px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                  height: 100%;
                  width: auto;
                }
              }

              p {
                width: 100%;
                font-size: 28px;
                color: #333333;
                text-align: center;
              }
            }
          }
        }
      }

      .partner {
        padding: 52px 0 86px;

        h3 {
          font-size: 34px;
          color: #333;
        }

        .partner-cont {
          margin-top: 60px;
          display: flex;

          .partner-item {
            box-sizing: border-box;
            width: calc(25% - 19px);
            background-color: #e5e5e5;
            border: solid 1px #333333;
            margin-right: 26px;

            &:last-child {
              margin-right: 0;
            }

            .img {
              width: 100%;
              height: 225px;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }

            .item-title {
              display: flex;
              height: 98px;
              justify-content: center;
              align-items: center;
              background-color: #333;

              p {
                margin: 0 15px;
                font-size: 24px;
                color: #fff;
              }
            }

            &:hover {
              .item-title {
                background-color: #3f83cc;
              }
            }
          }
        }
      }
    }
  }
</style>
