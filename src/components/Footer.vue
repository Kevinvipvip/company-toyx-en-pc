<template>
  <div class="footer" ref="footer">
    <div class="logo-box">
      <div class="logo">
        <router-link to="/"><img src="../assets/logo-footer.png" alt=""></router-link>
      </div>
    </div>
    <div class="q-nav">
      <div class="nav-item">
        <h3>About Us</h3>
        <ul>
          <router-link :to="{path:'/about',query:{nav:3,on:1}}" tag="li">About</router-link>
          <router-link :to="{path:'/about',query:{nav:3,on:2}}" tag="li">History</router-link>
          <router-link :to="{path:'/about',query:{nav:3,on:3}}" tag="li">Culture</router-link>
          <router-link :to="{path:'/about',query:{nav:3,on:4}}" tag="li">Honor</router-link>
        </ul>
      </div>
      <div class="nav-item">
        <h3>Service Globalization</h3>
        <ul class="server">
          <router-link :to="{path:'/server',query:{nav:2,on:1}}" tag="li">Domestic product</router-link>
          <router-link :to="{path:'/server',query:{nav:2,on:3}}" tag="li">Toys custom</router-link>
          <router-link :to="{path:'/server',query:{nav:2,on:2}}" tag="li">Foreign product</router-link>
        </ul>
      </div>
      <div class="nav-item">
        <h3>Quick Entry</h3>
        <ul>
          <router-link :to="{path:'contact'}" tag="li">Contact</router-link>
          <router-link :to="{path:'news',query:{nav:4}}" tag="li">News</router-link>
          <router-link :to="{path:'server',query:{nav:2,on:3}}" tag="li">Message</router-link>
        </ul>
      </div>
    </div>
    <!--<div class="copyright">-->
    <!--<div class="w-1200">-->
    <!--<p>-->
    <!--<span><a href="https://www.wcip.net" target="_blank">山海文化有限公司</a>提供技术支持</span>-->
    <!--<span>备案许可证号<a href="http://beian.miit.gov.cn/" target="_blank">津ICP备20006105号-1</a></span>-->
    <!--</p>-->
    <!--<p>-->
    <!--<router-link to="/">免责声明</router-link>-->
    <!--|-->
    <!--<router-link to="/">版权声明</router-link>-->
    <!--&lt;!&ndash;|&ndash;&gt;-->
    <!--&lt;!&ndash;<router-link to="/">网站地图</router-link>&ndash;&gt;-->
    <!--</p>-->
    <!--</div>-->
    <!--</div>-->

    <!--全局悬浮框-->
    <div class="fixed-windown">
      <!--<div class="icon-box"><img src="../assets/icon-mp.png" alt="微信小程序">-->
      <!--<p>小程序</p>-->
      <!--<div class="QR-code"><img src="../assets/mp-code.jpg"></div>-->
      <!--</div>-->
      <!--<div class="icon-box"><img src="../assets/icon-wx.png" alt="微信公众号">-->
      <!--<p>公众号</p>-->
      <!--<div class="QR-code"><img src='../assets/wx-code.jpg'></div>-->
      <!--</div>-->
      <!--<div class="icon-box can-click">-->
      <!--<a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+footer.qq+'&site=qq&menu=yes'">-->
      <!--<img src="../assets/icon-qq.png" alt="在线咨询">-->
      <!--<p>在线咨询</p>-->
      <!--</a>-->
      <!--</div>-->
      <div class="icon-box can-click" @click="return_top"><img src="../assets/top-icon.png" alt="返回顶部"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
        footer: {},
        scrollTop: null
      };
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
      this.utils.ajax(this, 'aboutUs').then(res => {
        this.footer = res;
      });
    },

    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      return_top() {
        let timer = null, that = this;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
          if (that.scrollTop > 0) {
            that.scrollTop -= 200;
            document.body.scrollTop = document.documentElement.scrollTop = that.scrollTop;
            timer = requestAnimationFrame(fn)
          } else {
            cancelAnimationFrame(timer);
            that.visiable = false;
          }
        })
      },

      handleScroll() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .footer {
    height: 333px;
    background: #546c81;

    .logo-box {
      height: 113px;
      background-color: #3f83cc;
      border-bottom-right-radius: 100%;

      .logo {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;

        a {
          display: block;
          width: 378px;
        }
      }
    }

    .q-nav {
      flex-grow: 1;
      display: flex;
      width: 1200px;
      margin: 49px auto 0;
      justify-content: space-between;

      .nav-item {
        width: 32%;

        h3 {
          width: 100%;
          font-size: 28px;
          color: rgba(255, 255, 255, 0.8);
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          &.server {
            li {
              width: auto;
            }
          }

          li {
            margin-right: 49px;
            width: calc(33.333% - 49px);
            margin-top: 30px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 18px;
            cursor: pointer;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              color: #cccccc;
              font-size: 14px;
            }


            &:hover {
              color: #50a8ec;

              a {
                color: #50a8ec;
              }
            }
          }
        }
      }
    }

    /*.copyright {*/
    /*flex-shrink: 0;*/
    /*height: 65px;*/
    /*border-top: 4px solid #64798c;*/

    /*.w-1200 {*/
    /*height: 100%;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/

    /*p {*/
    /*text-align: center;*/
    /*color: #999999;*/

    /*span {*/
    /*margin-right: 10px;*/
    /*font-size: 14px;*/
    /*color: #999;*/

    /*a {*/
    /*margin: 0 5px;*/
    /*}*/
    /*}*/

    /*a {*/
    /*color: #999;*/

    /*&:hover {*/
    /*color: #cccccc;*/
    /*}*/
    /*}*/
    /*}*/
    /*}*/
    /*}*/

    .fixed-windown {
      width: 60px;
      padding-left: 20px;
      background-color: #50a8ec;
      position: fixed;
      z-index: 9999;
      right: 0;
      top: 90%;
      transform: translate(80%, -50%);
      display: flex;
      flex-flow: column;
      align-items: center;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;

      &:hover {
        transform: translate(0, -50%);
        transition: 0.5s;
        padding: 0;
      }

      .icon-box {
        position: relative;
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #ffffff;
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;

        .QR-code {
          position: absolute;
          display: none;
          top: -15px;
          left: -140px;
          width: 115px;
          height: 109px;
          background-color: #50a8ec;
          justify-content: center;
          align-items: center;

          img {
            width: 85%;
            height: 85%;
            display: block;
          }
        }

        .QR-code:after {
          content: '';
          position: absolute;
          border-left: 7.5px solid #50a8ec;
          border-top: 7.5px solid transparent;
          border-bottom: 7.5px solid transparent;
          right: -7.5px;
          top: 47px;
        }

        img {
          display: block;
          width: 38px;
          height: 38px;
        }

        p {
          font-size: 16px;
          color: #ffffff;
          margin-top: 5px;
        }
      }

      .icon-box:last-child {
        border: none;
      }

      .icon-box:hover .QR-code {
        display: flex;
      }

      .can-click {
        cursor: pointer;

        a {
          display: flex;
          justify-content: center;
          flex-flow: column;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
