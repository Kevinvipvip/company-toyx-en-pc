<template>
  <div class="about page" ref="page">
    <div class="about-cont w-1200">
      <!--页面导航-->
      <div class="nav-box" :style="'min-height: '+nav_height+'px'">
        <!--<div class="nav-bg" :style="new_nav" ref="new_nav">-->
        <div class="nav-bg" ref="new_nav">
          <div class="nav-title">The story goes</div>
          <div class="nav">
            <div class="nav-item">
              <h3 @click="tab(1)"><span>Profile</span><i :style="'background-image: url('+bg_icon1+')'"></i>
              </h3>
            </div>
            <div class="nav-item">
              <h3 @click="tab(2)"><span>History</span><i :style="'background-image: url('+bg_icon2+')'"></i>
              </h3>
            </div>
            <div class="nav-item">
              <h3 @click="tab(3)"><span>Culture</span><i :style="'background-image: url('+bg_icon3+')'"></i>
              </h3>
            </div>
            <div class="nav-item">
              <h3 class="none_border" @click="tab(4)"><span>Honor</span><i
                      :style="'background-image: url('+bg_icon4+')'"></i></h3>
            </div>
          </div>
        </div>
      </div>

      <div class="about-content">
        <!--公司介绍 Company profile-->
        <div class="company" ref="scroll_one">
          <div class="title ">Company profile</div>
          <div class="cp-box">
            <p>Tianjin Lucky Toy Co.,Ltd, founded in 1993, is expert in idea designing, developing and manufacturing
              of plush toys. It exports to North America, Europe, Australia etc for over 20 years with strong products
              development, whole manufacturing system and strict QC system. Now we are engaged in supplying all-age
              products, owning two labels, which are “Unicorn” and “One Happy Family”, and hope we can be your good
              partner on your way to good life. Our target is: put goodness to your life and make your life
              better.</p>
            <div class="cp-pics-box">
              <swiper v-if="cp_image.pics.length>0" :options="cp_option" class="swiper-cp" ref="cpSwiper">
                <swiper-slide class="swiper-cp-item" v-for="(item,index) in cp_image.pics" :key="'cp-'+index">
                  <div class="cp-img" :style="'background-image: url('+item+')'">
                  </div>
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

        <!--发展历程 development history-->
        <div class="development" ref="scroll_two">
          <div class="title ">Company profile</div>
          <div class="dh-box">
            <div class="height-line">
              <p v-for="(v,i) in Math.ceil(dh_data.length/2)" :key="'line'+i">
                <i></i>
              </p>
            </div>
            <ul>
              <li :class="hover_on ===v.id?'on':''" @mouseenter="hover_dh(v.id)"
                  v-for="v in dh_data_left" :key="v.id">
                <div class="item left">
                  <div class="event"><span>{{v.event}}</span></div>
                  <p>{{v.year}}</p>
                </div>
              </li>
            </ul>
            <ul>
              <li :class="hover_on ===v.id?'on':''" @mouseenter="hover_dh(v.id)"
                  v-for="v in dh_data_right" :key="v.id">
                <div class="item right">
                  <p>{{v.year}}</p>
                  <div class="event"><span>{{v.event}}</span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!--企业团队 Enterprise team-->
        <div class="corporate" ref="scroll_three">
          <div class="title ">Corporate culture</div>
          <div class="et-box">
            <div class="et-cont">
              <div class="item">
                <h3>Our advantages</h3>
                <p>27 years experience in plush toy production</p>
                <p>Vigorous staff</p>
                <p>Improve the lean management system</p>
              </div>
              <div class="item">
                <h3>Our principles</h3>
                <p>Excellent quality</p>
                <p>Customer first</p>
                <p>Be honest and trustworthy</p>
              </div>
              <div class="item">
                <h3>Our goal</h3>
                <p>External achievement customers</p>
                <p>Internal achievement of employees</p>
                <p>Give back to the society sincerely</p>
                <p>Realize the dream together</p>
              </div>
            </div>
            <div class="et-cont">
              <div class="item">
                <h3>Production team</h3>
                <p>A vigorous and continuous staff team,</p>
                <p>And a set of perfect and capable, the pursuit of</p>
                <p>excellence management system.</p>
              </div>
              <div class="item">
                <h3>Design team</h3>
                <p>An experienced, professional, dedicated and</p>
                <p>innovative team.</p>
              </div>
            </div>
          </div>
        </div>

        <!--荣誉资质 Honor and qualification-->
        <div class="honor" ref="scroll_four">

          <div class="title ">Honor and qualification</div>

          <ul>
            <li v-for="(item,index) in hq_data.honor" :key="index">
              <div class="img-box">
                <div class="img" :style="'background-image: url('+item.pic+')'"></div>
              </div>
              <el-tooltip placement="top" effect="light">
                <div slot="content"><p style="font-size: 16px">{{item.title}}</p></div>
                <p class="two-line-ellipsis">{{item.title}}</p>
              </el-tooltip>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import 'swiper/dist/css/swiper.css'// 这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import { swiper, swiperSlide } from 'vue-awesome-swiper' // 引入slider组件

  import img_left from '../assets/icons/icon-left.png'
  import img_right from '../assets/icons/icon-right.png'

  export default {
    name: 'About',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        bg_icon1: '',
        bg_icon2: '',
        bg_icon3: '',
        bg_icon4: '',

        cp_image: {
          pics: [
            this.config.aliyun + 'static/cp-image1.jpg',
            this.config.aliyun + 'static/cp-image2.jpg',
            this.config.aliyun + 'static/cp-image3.jpg',
            this.config.aliyun + 'static/cp-image4.jpg',
            this.config.aliyun + 'static/cp-image5.jpg']
        }, // 公司介绍在阿里云oss中的图片
        dh_data: this.config.history,//发展历程
        dh_data_left: [],//发展历程
        dh_data_right: [],//发展历程

        hq_data: this.config.hq_data,

        hover_on: 1,//tab的选择项

        cp_option: {
          slidesPerView: 4,
          spaceBetween: 14,
          loop: true,
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

        nav_height: 0,
      }
    },
    beforeRouteUpdate(to) {
      this.index = parseInt(to.query.on);
      this.my_load(this.index);
      window.scrollTo(0, 0);
      this.nav_height = this.$refs.new_nav.offsetHeight + 30;
    },
    mounted() {
      this.handle_dh_data();
      this.index = parseInt(this.$route.query.on);
      this.my_load(this.index);
      this.nav_height = this.$refs.new_nav.offsetHeight + 30;

      window.addEventListener("scroll", this.scroll_tap);//添加监听事件，添加页面滚动事件的监听
    },
    destroyed() {
      window.removeEventListener('scroll', this.scroll_tap)
    },
    methods: {
      // hover展示该年份发生的事件
      hover_dh(index) {
        this.hover_on = index;
      },

      // 页面滚动时执行的事件
      scroll_tap() {
        this.$nextTick(() => {
          let ele = this.$refs.new_nav;
          let scroll = document.documentElement.scrollTop || document.body.scrollTop;
          let body = this.$refs.page.offsetHeight;
          let top = scroll - 59;
          if (body - 1 > this.nav_height) {
            if (scroll > 60) {
              if (body - top <= this.nav_height) {
                ele.style.bottom = '30px';
              } else {
                ele.style.top = top + 'px';
                ele.style.bottom = 'unset';
              }
            } else {
              ele.style.top = '0';
            }
          }
        });
      },

      tab(on) {
        this.index = on;
        this.my_load(on);
      },
      my_load(index) {
        this.$nextTick(() => {
          // console.log(this.$refs)
          switch (index) {
            case 1:
              // window.scrollTo(0, this.$refs.scroll_one.offsetTop);
              window.scrollTo({
                top: this.$refs.scroll_one.offsetTop,
                behavior: "smooth"
              });
              this.bg_icon1 = img_right;
              this.bg_icon2 = img_left;
              this.bg_icon3 = img_left;
              this.bg_icon4 = img_left;
              break;
            case 2:
              this.bg_icon1 = img_left;
              this.bg_icon2 = img_right;
              this.bg_icon3 = img_left;
              this.bg_icon4 = img_left;
              window.scrollTo({
                top: this.$refs.scroll_two.offsetTop,
                behavior: "smooth"
              });
              break;
            case 3:
              this.bg_icon1 = img_left;
              this.bg_icon2 = img_left;
              this.bg_icon3 = img_right;
              this.bg_icon4 = img_left;
              window.scrollTo({
                top: this.$refs.scroll_three.offsetTop,
                behavior: "smooth"
              });
              break;
            case 4:
              this.bg_icon1 = img_left;
              this.bg_icon2 = img_left;
              this.bg_icon3 = img_left;
              this.bg_icon4 = img_right;
              window.scrollTo({
                top: this.$refs.scroll_four.offsetTop,
                behavior: "smooth"
              });
              break;
          }
        });
      },

      // 将发展历程根据数组长度分别放在左右两个数组中
      handle_dh_data() {
        let arr = this.config.history, left = [], right = [], id = 0;
        for (let i = 0; i < arr.length; i++) {
          let num = i % 2;
          id++;
          arr[i].id = id;
          if (num === 0) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        }
        this.dh_data_left = left;
        this.dh_data_right = right;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .about {
    /*padding-bottom: 80px;*/

    .about-cont {
      display: flex;
      justify-content: space-between;

      .about-content {
        flex-grow: 1;
        width: 915px;

        .title {
          font-weight: bold;
          color: #333333;
          font-size: 28px;
          padding: 24px 0;
        }

        /*公司介绍*/
        .company {
          .cp-box {
            p {
              font-size: 16px;
              color: #666666;
              text-align: justify;
              line-height: 32px;
            }

            .cp-pics-box {
              height: 166px;
              margin: 27px auto 0;
              display: flex;
              justify-content: space-between;
              position: relative;

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
                outline: none !important;
              }

              &:hover {
                .mine-btn {
                  display: block;
                }
              }

              .swiper-cp {
                flex: 1;
                height: 100%;

                .swiper-cp-item {

                  .cp-img {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }
              }
            }
          }
        }

        /*发展历程*/
        .development {
          .dh-box {
            height: 950px;
            position: relative;

            display: flex;
            justify-content: space-between;

            .height-line {
              position: absolute;
              width: 4px;
              height: 100%;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              background-color: #c5d9ee;

              p {
                width: 100%;
                height: 14.2857%;
                position: relative;

                i {
                  position: absolute;
                  top: 50%;
                  left: 0;
                  transform: translate(-5px, -50%);
                  background-color: #c5d9ee;
                  border-radius: 50%;
                  display: block;
                  width: 14px;
                  height: 14px;
                }
              }
            }

            ul {
              width: 50%;
              display: flex;
              flex-flow: column;
              justify-content: space-between;

              li {
                width: 100%;
                height: 14.2857%;
                cursor: pointer;
                background-color: #eaf4ff;
                overflow: hidden;

                &.on, &:hover {
                  height: 34%;
                  transition: 1s;

                  .item {
                    .event {
                      opacity: 1;
                      transition: 0.5s;
                    }
                  }
                }

                &:nth-child(2n) {
                  background-color: #f7fbff;
                }

                .item {
                  display: flex;
                  height: 100%;

                  .event {
                    opacity: 0;
                    flex-grow: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 20px;
                    font-size: 14px;
                    color: #666666;
                    text-align: justify;

                    span {
                      /*display: -webkit-box;*/
                      /*overflow: hidden;*/
                      /*text-overflow: ellipsis;*/
                      /*word-wrap: break-word;*/
                      /*white-space: normal !important;*/
                      /*-webkit-line-clamp: 5;*/
                      /*-webkit-box-orient: vertical;*/
                    }
                  }

                  p {
                    height: 100%;
                    width: 100px;
                    flex-shrink: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 28px;
                    color: #3f83cc;
                  }

                  &.left {
                    p {
                      border-left: 1px solid #c5d9ee;
                    }
                  }

                  &.right {
                    p {
                      border-right: 1px solid #c5d9ee;
                    }
                  }
                }
              }
            }
          }
        }

        /*企业团队*/
        .corporate {
          margin-top: 20px;

          .et-box {
            .et-cont {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;

              .item {
                margin-bottom: 49px;
                width: 50%;

                h3 {
                  font-size: 18px;
                  font-weight: normal;
                  color: #3f83cc;
                  margin-bottom: 24px;
                }

                p {
                  font-size: 18px;
                  line-height: 30px;
                  color: #666666;
                }
              }
            }
          }
        }

        /*荣誉资质*/
        .honor {
          margin-top: 20px;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              width: 186px;
              margin-right: 54px;
              margin-bottom: 31px;

              &:nth-child(4n) {
                margin-right: 0;
              }

              .img-box {
                width: 100%;
                height: 120px;
                background: rgb(65, 65, 44);
                display: flex;
                justify-content: center;
                align-items: center;

                .img {
                  width: 95%;
                  height: 95%;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain;
                }
              }

              p {
                font-size: 14px;
                color: #666666;
                text-align: center;
                margin-top: 18px;
                user-select: none;
              }
            }
          }
        }
      }
    }

  }
</style>
