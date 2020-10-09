<template>
  <div class="server-world page" ref="page">
    <div class="server w-1200">

      <!--页面导航-->
      <div class="nav-box" :style="'min-height: '+nav_height+'px'">
        <div class="nav-bg" :style="nav_top" ref="nav">
          <div class="nav-title">Display all selections</div>
          <div class="nav">
            <div class="nav-item">
              <h3 @click="tab(1)"><span>Domestic product</span><i :style="'background-image: url('+bg_icon1+')'"></i>
              </h3>
              <ul :class="internal === 1?'on':''">
                <li @click="domestic_cate()" ref="on">
                  <div class="icon"><img :src="domestic_cate_id===0?icons[5]:icons[4]"/></div>
                  <span>All</span>
                </li>
                <li v-for="(item,index) in domestic_cate_list" :key="'domestic' + index"
                    @click="domestic_cate(item.id,item.cate_name)">
                  <div class="icon"><img :src="domestic_cate_id===item.id?icons[5]:icons[4]"/></div>
                  <span>{{item.cate_name}}</span>
                </li>
              </ul>
            </div>
            <div class="nav-item">
              <h3 @click="tab(2)"><span>Foreign product</span><i :style="'background-image: url('+bg_icon2+')'"></i>
              </h3>
              <ul :class="internal === 2?'on':''">
                <li @click="foreign_cate()" ref="on">
                  <div class="icon"><img :src="foreign_cate_id===0?icons[5]:icons[4]"/></div>
                  <span>All</span>
                </li>
                <li v-for="(item,index) in foreign_cate_list" :key="'foreign' + index"
                    @click="foreign_cate(item.id,item.cate_name)">
                  <div class="icon"><img :src="foreign_cate_id===item.id?icons[5]:icons[4]"/></div>
                  <span>{{item.cate_name}}</span>
                </li>
              </ul>
            </div>
            <div class="nav-item">
              <h3 class="none_border" @click="tab(3)"><span>Toys custom</span><i
                      :style="'background-image: url('+bg_icon3+')'"></i></h3>
            </div>
          </div>
        </div>
      </div>
      <!--国内外产品展示-->
      <div class="internal" v-if="internal !== 3">

        <div class="product-title">{{cate_title}}</div>
        <!--产品列表-->
        <div class="product-list" v-loading="loading">
          <ul v-if="product_list.length">
            <li v-for="item in product_list" :key="item.id" @click="look_detail(item.id)">
              <div class="icon"><img src="../assets/icons/icon-look-detail.png"/></div>
              <div class="pic-box" :style="'background-image:url('+item.pic+')'"></div>
              <p class="two-line-ellipsis">{{item.name}}</p>
            </li>
          </ul>

          <div class="page-box" v-if="nodata">{{btn_text}}</div>
          <div class="page-box" @click="load_more" v-else>Load More</div>
        </div>
      </div>

      <!--玩具定制-->
      <div class="customized" v-else>
        <div class="customize-title">Toy custom</div>

        <div class="customized-banner"><img :src="customized_banner"/></div>
        <!--定制产品-->
        <div class="customized-one">
          <h3>We can customize the following products:</h3>
          <ul>
            <li v-for="item in customized" :key="item.id">
              <div class="img"><img :src="item.pic"/></div>
              <el-tooltip placement="bottom" effect="light">
                <div slot="content"><p style="font-size: 16px">{{item.title}}</p></div>
                <p class="one-line-ellipsis">{{item.title}}</p>
              </el-tooltip>
            </li>
          </ul>
        </div>

        <div class="customized-banner2"><img :src="customized_banner2"></div>

        <!--定制流程-->
        <ul class="customized-two">
          <li v-for="item in customized_liucheng" :key="item.id">
            <div class="liucheng-img" :style="'background-image: url('+item.pic+')'"></div>
            <div class="line"><i></i></div>
            <el-tooltip placement="top" effect="light">
              <div slot="content"><p style="font-size: 18px">{{item.name}}</p></div>
              <p class="one-line-ellipsis">{{item.name}}</p>
            </el-tooltip>
          </li>
        </ul>

        <!--Custom Message-->
        <div class="message">
          <h3>Custom Message</h3>
          <div class="form">
            <div class="ipt-tip" :style="btn_no_cilck?'color: #ff4c4c;':'color: #50a8ec;'">{{ipt_tip}}</div>
            <div class="input">
              <div class="ipt-box"><input type="text" v-model="name" placeholder="Name"></div>
              <div class="ipt-box"><input type="text" v-model="phone" placeholder="Phone" maxlength="11"
                                          @blur="blur_reg_tel" oninput="value=value.replace(/[^\d]/g,'')"></div>
            </div>
            <div class="input textarea"><textarea v-model="desc" placeholder="Message contents..."></textarea></div>
            <div class="btn-submit" @click="submit_message" v-if="btn_no_cilck">Submit</div>
            <div class="btn-submit" style="opacity: 0.6;cursor: auto" v-else>Submit</div>
          </div>
        </div>
      </div>
    </div>

    <!--遮罩显示产品详情-->
    <div class="mask-porduct" @click="show_mask = false" v-if="show_mask">
      <div class="mask" @click.stop>
        <div class="change-box">
          <div class="btn-box">
            <p @click="change_detail('prev')">← Prev</p>
            <span>|</span>
            <p @click="change_detail('next')">Next →</p>
          </div>
        </div>
        <div class="mask-swiper">
          <!-- swiper1 -->
          <swiper :options="swiperOption" class="swiper product-swiper" ref="swiperTop">
            <swiper-slide class="swiper-item" v-for="(item,index) in detail.pics" :key="index">
              <div class="img-box" :style="'background-image: url('+item+')'"></div>
            </swiper-slide>
          </swiper>
          <!--swiper2 Thumbs-->
          <swiper :options="swiperOptionThumbs" class="swiper product-thumbs" ref="swiperThumbs">
            <swiper-slide class="swiper-item" v-for="(item,index) in detail.pics" :key="index">
              <div class="img-box" :style="'background-image: url('+item+')'"
                   :class="swiper_hove_on === index?'on':''"
                   @mouseenter="swiper_hover(index)"></div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="mask-cont">
          <h3>{{detail.name}}</h3>
          <p>${{detail.price}}</p>
          <div class="btn-buy"><a target="_blank" :href="detail.alibaba_url">BUY IT NOW</a></div>
          <div class="desc">{{detail.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'// 这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import { swiper, swiperSlide } from 'vue-awesome-swiper' // 引入slider组件
  var _self;

  import icon1 from '../assets/icons/icon-add.png'
  import icon2 from '../assets/icons/icon-reduce.png'
  import icon3 from '../assets/icons/icon-left.png'
  import icon4 from '../assets/icons/icon-right.png'
  import icon5 from '../assets/icons/icon-checkbox.png'
  import icon6 from '../assets/icons/icon-checked.png'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        icons: [icon1, icon2, icon3, icon4, icon5, icon6],
        customized_banner: this.config.aliyun + 'static/customized-banner-en.jpg',//玩具定制banner图
        customized_banner2: this.config.aliyun + 'static/customized-banner2-en.png',//玩具定制..中间banner图
        customized_before: this.config.aliyun + 'static/customized-before.png',//玩具定制..成品图

        internal: 0,
        bg_icon1: '',
        bg_icon2: '',
        bg_icon3: '',
        page: 1,
        total: 0,

        cate_id: 0,//请求数据时传到后台的分类id，国内分类和国外分类均可用
        cate_title: 'All',//选中分类的名称
        domestic_cate_id: 0,//选择国内分类的活动项
        foreign_cate_id: 0,//选择国外分类的活动项
        domestic_cate_list: [],// 分类
        foreign_cate_list: [],// 分类

        product_list: [],//产品列表数据
        product_limit: 16,//每页请求的产品数量

        btn_text: 'Load More',
        loading: true,
        nodata: true,

        show_mask: false,
        detail: {},
        // 轮播图配置
        swiper_hove_on: 0,
        swiperOption: {
          loopedSlides: 5, // looped slides should be the same
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          on: {
            slideChange() {
              _self.swiper_hove_on = this.activeIndex;
            }
          }
        },
        swiperOptionThumbs: {
          loop: true,
          loopedSlides: 4, // looped slides should be the same
          spaceBetween: 40,
          slidesPerView: 4,
          touchRatio: 0.2,
          slideToClickedSlide: true
        },

        customized: this.config.customized,
        customized_liucheng: this.config.customized_liucheng,

        // 留言中心
        name: '',
        phone: '',
        desc: '',
        ipt_tip: '',
        btn_no_cilck: true,

        scroll: 0,
        nav_top: 0,
        nav_height: 0,
      };
    },
    beforeRouteUpdate(to) {
      this.internal = parseInt(to.query.on);
      this.cate_id = parseInt(to.query.cate) || 0;
      this.my_load(this.internal, this.cate_id);
      window.scrollTo(0, 0);
      this.getCateList((length) => {
        if (this.internal === 3) {
          this.nav_height = this.$refs.nav.offsetHeight + 30;
        } else {
          this.nav_height = (this.$refs.nav.offsetHeight + (this.$refs.on.offsetHeight * length)) + 30;
        }
      });
    },
    mounted() {
      _self = this;
      this.internal = parseInt(this.$route.query.on);
      this.cate_id = parseInt(this.$route.query.cate) || 0;
      this.getCateList((length) => {
        if (this.internal === 3) {
          this.nav_height = this.$refs.nav.offsetHeight + 30;
        } else {
          this.nav_height = (this.$refs.nav.offsetHeight + (this.$refs.on.offsetHeight * length)) + 30;
        }
      });
      this.my_load(this.internal, this.cate_id);

      window.addEventListener("scroll", this.scroll_tap);
    },
    destroyed() {
      window.removeEventListener('scroll', this.scroll_tap)
    },
    methods: {
      scroll_tap() {
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        this.$nextTick(() => {
          let body = this.$refs.page.offsetHeight;
          let top = this.scroll - 59;
          if (body - 1 > this.nav_height) {
            if (this.scroll > 60) {
              if (body - top <= this.nav_height) {
                this.nav_top = 'bottom: 30px';
              } else {
                this.nav_top = 'top:' + top + 'px';
              }
            } else {
              this.nav_top = 'top: 0px';
            }
          }
        });
      },

      tab(on) {
        if (on !== this.internal) {
          this.internal = on;
          this.cate_id = 0;
          this.cate_title = 'All';
          this.my_load(on);
          this.$nextTick(() => {
            this.nav_height = this.$refs.nav.offsetHeight + 30;
            window.scrollTo(0, 0);
            this.nav_top = 'top: 0px';
          });
        }
      },

      // 点击国内产品分类
      domestic_cate(cate_id, name) {
        this.domestic_cate_id = cate_id || 0;
        this.cate_id = cate_id || 0;
        this.cate_title = name || 'All';
        this.page = 1;
        this.getProductList();
      },
      // 点击国外产品分类
      foreign_cate(cate_id, name) {
        this.foreign_cate_id = cate_id || 0;
        this.cate_id = cate_id || 0;
        this.cate_title = name || 'All';
        this.page = 1;
        this.getProductList();
      },

      // 点击产品看详情
      look_detail(id) {
        this.show_mask = true;
        this.getProductDetail(id);
      },

      // 点击切换详情
      change_detail(type) {
        let product = this.product_list;
        if (product.length === 1) {
          this.$alert('There is currently only one product and cannot switch to the next one');
        } else {
          switch (type) {
            case 'prev':
              this.each_arr(product, index => {
                if (index === 0) {
                  this.getProductDetail(product[product.length - 1].id)
                } else {
                  this.getProductDetail(product[index - 1].id)
                }
              });
              break;
            case 'next':
              this.each_arr(product, index => {
                if (index === product.length - 1) {
                  this.getProductDetail(product[0].id)
                } else {
                  this.getProductDetail(product[index + 1].id)
                }
              });
              break;
          }
        }
      },
      // 循环查找当前详情所在数组中的index
      each_arr(arr, succ) {
        let id = this.detail.id;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) {
            succ(i)
          }
        }
      },

      // 点击加载更多
      load_more() {
        this.page++;
        console.log(this.page)
        this.getProductList();
      },

      my_load(index, cate_id) {
        switch (index) {
          case 1:
            this.bg_icon1 = this.icons[1];
            this.bg_icon2 = this.icons[0];
            this.bg_icon3 = this.icons[2];
            this.page = 1;
            this.domestic_cate_id = cate_id || 0;
            this.getProductList();
            break;
          case 2:
            this.bg_icon1 = this.icons[0];
            this.bg_icon2 = this.icons[1];
            this.bg_icon3 = this.icons[2];
            this.page = 1;
            this.foreign_cate_id = cate_id || 0;
            this.getProductList();
            break;
          case 3:
            this.bg_icon1 = this.icons[0];
            this.bg_icon2 = this.icons[0];
            this.bg_icon3 = this.icons[3];
            break;
        }
      },
      getCateList(complete) {
        this.utils.ajax(this, 'cateList').then(res => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].id === this.cate_id) {
              this.cate_title = res[i].cate_name;
            }
          }
          this.domestic_cate_list = res;
          this.foreign_cate_list = res;
          if (complete) {
            complete(res.length);
          }
        })
      },
      getProductList() {
        let arr = this.product_list;
        if (this.page === 1) {
          arr = []
        }
        let post = {
          page: this.page,
          perpage: this.product_limit,
          cate_id: this.cate_id,
          internal: this.internal
        };
        this.loading = true;
        this.utils.ajax(this, 'productList', post).then(res => {
          if (!res.list.length) {
            this.nodata = true;
            this.btn_text = 'no data';
          } else {
            if (res.list.length < this.product_limit) {
              this.nodata = true;
              this.btn_text = 'There is no more';
            } else {
              this.nodata = false;
            }
          }
          this.utils.aliyun_format(res.list, 'pic');
          for (let i = 0; i < res.list.length; i++) {
            arr.push(res.list[i]);
          }
          this.product_list = arr;
          this.total = res.count;
          this.loading = false;
        })
      },

      // 下方是显示详情的相关操作
      swiper_hover(index) {
        this.swiper_hove_on = index;
        this.$nextTick(() => {
          const top = _self.$refs.swiperTop.swiper;
          top.slideTo(index);
        });
      },
      getProductDetail(id) {
        this.utils.ajax(this, 'productDetail', { id: id }).then(res => {
          this.utils.aliyun_format(res.pics);
          this.detail = res;
        })
      },
      // 点击提交信息到后台
      submit_message() {
        if (!this.desc.trim()) {
          this.ipt_tip = 'Please enter the content and submit it';
          // this.$message('请输入内容后提交');
        } else if (!this.name.trim()) {
          this.ipt_tip = 'Please enter your name';
          // this.$message('请输入你的姓名');
        } else if (!this.phone.trim()) {
          this.ipt_tip = 'Please enter your contact information';
          // this.$message('请输入你的联系方式');
        } else if (!this.config.tel_reg.test(this.phone)) {
          this.ipt_tip = 'Please enter the correct mobile phone number';
          // this.$message('请输入内容后提交');
        } else {
          let post = {
            name: this.name,
            tel: this.phone,
            message: this.desc
          };
          // console.log(post);
          this.utils.ajax(this, 'leaveMessage', post).then(() => {
            this.$alert('Your message information has been submitted to the background. Thank you for your message.', 'success', {
              confirmButtonText: 'confirm',
              callback: () => {
                this.desc = '';
                this.name = '';
                this.phone = '';
                this.btn_no_cilck = false;
                this.ipt_tip = 'Your message information has been submitted to the background. Thank you for your message.';
              }
            });
          })
        }
      },
      // 验证电话号码
      blur_reg_tel() {
        if (!this.phone.trim()) {
          this.ipt_tip = '';
        } else {
          if (!this.config.tel_reg.test(this.phone)) {
            this.ipt_tip = 'Please enter the correct mobile phone number';
          } else {
            this.ipt_tip = '';
          }
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .server-world {
    border-top: 1px solid #e6e6e6;
    box-sizing: border-box;

    .server {
      display: flex;
      justify-content: space-between;

      /*国内外产品展示样式*/
      .internal {
        flex-grow: 1;

        .product-title {
          font-size: 28px;
          color: #333;
          font-weight: bold;
          margin: 30px 0;
        }

        /*产品列表样式*/
        .product-list {
          padding-bottom: 80px;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              position: relative;
              cursor: pointer;
              width: 200px;
              margin-top: 30px;
              margin-right: 38px;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;

              &:nth-child(-n+4) {
                margin-top: 0;
              }

              .icon {
                position: absolute;
                top: 0;
                right: 0;
                z-index: 99;
              }

              .pic-box {
                width: 100%;
                padding-bottom: 100%;
                height: 0;
                overflow: hidden;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
              }

              &:hover {
                .pic-box {
                  transform: scale(1.1);
                  transition: 0.5s;
                }
              }

              p {
                margin: 50px 15px 27px;
                text-align: center;
                font-size: 14px;
                color: #666666;
              }

              &:nth-child(4n) {
                margin-right: 0;
              }
            }
          }

          .page-box {
            width: 213px;
            height: 54px;
            background-color: #3f83cc;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 40px auto 0;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
          }
        }
      }

      /*玩具定制样式*/
      .customized {
        /*margin-bottom: 100px;*/
        flex-grow: 1;
        overflow: hidden;

        .customize-title {
          font-size: 28px;
          color: #333;
          font-weight: bold;
          margin: 30px 0;
        }

        .customized-banner {
          width: 100%;
          margin-top: 24px;
        }

        /*定制产品样式*/
        .customized-one {
          h3 {
            font-size: 24px;
            color: #3f83cc;
            font-weight: normal;
            margin-top: 38px;
          }

          ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;


            li {
              width: 160px;
              margin-top: 60px;

              .img {
                margin: 0 auto 40px;
                width: 109px;
                height: 138px;
              }

              p {
                padding: 0 8px;
                text-align: center;
                color: #3f83cc;
                font-size: 18px;
                height: 44px;
                line-height: 44px;
                user-select: none;
              }

              &:hover {
                p {
                  background-color: #3f83cc;
                  color: #ffffff;
                }
              }
            }
          }
        }

        .customized-banner2 {
          margin-top: 50px;
        }

        /*定制流程样式*/
        .customized-two {
          margin-top: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          li {
            width: 14%;
            position: relative;
            display: flex;
            flex-flow: column;
            align-items: center;


            .liucheng-img {
              width: 32px;
              height: 32px;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
            }

            .line {
              margin: 15px 0;
              height: 4px;
              width: 100%;
              background-color: #c5d9ee;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;

              i {
                background-color: #c5d9ee;
                display: block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                position: relative;
                z-index: 3;
              }
            }

            &:first-child {
              width: 8%;

              .line:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 50%;
                height: 100%;
                background-color: #fff;
                z-index: 2;
              }
            }

            &:last-child {
              width: 8%;

              .line:after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 50%;
                height: 100%;
                background-color: #fff;
                z-index: 2;
              }
            }

            p {
              text-align: center;
              font-size: 18px;
              color: #3f83cc;
              user-select: none;
              width: 100%;
            }
          }
        }

        /*Custom Message*/
        .message {
          margin-top: 50px;
          margin-bottom: 65px;
          height: 482px;
          border: solid 1px #c0c0c0;

          h3 {
            font-size: 23px;
            color: #3f83cc;
            text-align: center;
            font-weight: normal;
            margin-top: 27px;
          }

          .form {
            position: relative;
            margin: 45px 24px 30px;

            .ipt-tip {
              position: absolute;
              color: #ff4c4c;
              font-size: 16px;
              left: 0;
              top: -25px;
            }

            .input {
              margin: 30px 0 24px;
              display: flex;
              justify-content: space-between;

              .ipt-box {
                width: calc(50% - 16px);
                height: 46px;
                border-radius: 4px;
                border: solid 1px #89ccff;
                padding: 0 14px;
                box-sizing: border-box;

                input {
                  display: flex;
                  align-items: center;
                  height: 100%;
                  width: 100%;
                  border: none;
                  outline: none;
                  font-size: 14px;
                  color: #999999;
                  background: unset;

                  &::placeholder {
                    color: #999999;
                    opacity: 0.6;
                    font-size: 14px;
                  }
                }
              }

              &.textarea {
                margin: 0;
                border: 1px solid #89ccff;
                border-radius: 4px;
                height: 140px;
                padding: 16px 14px;

                textarea {
                  display: block;
                  width: 100%;
                  height: 100%;
                  outline: none;
                  border: none;
                  background: unset;
                  font-size: 14px;
                  color: #999999;
                  resize: none;
                  overflow: hidden;
                  line-height: 20px;
                  text-align: justify;

                  &::placeholder {
                    color: #999999;
                    opacity: 0.6;
                    font-size: 14px;
                  }
                }
              }
            }

            .btn-submit {
              cursor: pointer;
              margin: 45px auto 0;
              width: 160px;
              height: 44px;
              background-color: #3f83cc;
              font-size: 18px;
              color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }

    /*产品详情遮罩显示*/
    .mask-porduct {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999999;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;

      .mask {
        width: 1200px;
        height: 800px;
        background-color: #ffffff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 30px;
        box-sizing: border-box;
        position: relative;

        .change-box {
          position: absolute;
          top: 30px;
          right: 31px;

          .btn-box {
            display: flex;
            align-items: center;

            span {
              display: block;
              overflow: hidden;
              margin: 0 15px;
              line-height: 15px;
            }

            p {
              font-size: 14px;
              color: #666666;
              user-select: none;
              cursor: pointer;

              &:hover {
                color: #3f83cc;
              }
            }
          }
        }

        .mask-swiper {
          width: 600px;
          margin-right: 44px;
          flex-shrink: 0;

          .swiper {
            .swiper-item {
              .img-box {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
              }
            }

            &.product-swiper {
              height: 600px;

            }

            &.product-thumbs {
              height: 120px;
              margin-top: 10px;

              .swiper-item {
                width: 20%;
                cursor: pointer;

                .img-box {
                  border: 2px solid rgb(248, 248, 248);
                  box-sizing: border-box;

                  &.on {
                    border-color: rgb(153, 153, 153);
                  }
                }
              }
            }
          }
        }

        .mask-cont {
          flex-grow: 1;
          height: 100%;
          padding-top: 74px;
          box-sizing: border-box;

          h3 {
            font-size: 22px;
            color: #333;
          }

          p {
            font-size: 18px;
            color: #333;
            margin: 38px 0;
          }

          .btn-buy {
            width: 200px;
            height: 44px;
            background-color: #50a7ec;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;

            a {
              color: #fff;
              font-size: 16px;
            }
          }

          .desc {
            margin-top: 30px;
            border-top: 2px solid #e6e6e6;
            font-size: 16px;
            color: #666;
            padding: 25px 0;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
