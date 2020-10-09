<template>
  <div class="header">
    <div class="header-box">
      <div class="logo">
        <router-link to="/"><img src="../assets/logo.png" alt="天津同缘兴科技股份有限公司"></router-link>
      </div>
      <div class="nav">
        <ul>
          <li v-for="(item,index) in nav_data" :key="'header'+index">
            <p :class="active === item.id?'active':''" @click="nav_click(item.id,item.url,1)">{{item.name}}</p>
            <i v-if="item.s_nav" class="icon-nav"></i>
            <div class="second-nav" v-if="item.s_nav">
              <div class="second-nav-item" v-for="(v,i) in item.s_nav" @click="nav_click(item.id,v.url,v.index)"
                   :key="'header-s'+i">
                <p>{{v.name}}</p></div>
            </div>
          </li>
        </ul>
        <div class="language" @click="click_flag = !click_flag">
          <p class="span-parent">
            <span class="text-language">{{language}}</span>
            <span class="span-parent"><i :class="click_flag?'active':''"></i></span></p>
          <div class="lang-box" :class="click_flag?'active':''">
            <span @click="change_language('CN')">CN</span>
            <span @click="change_language('EN')">EN</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        language: 'EN',
        active: 1,
        nav_data: this.config.nav,

        click_flag: false
      }
    },
    watch: {
      $route(to) {
        this.active = parseInt(to.query.nav) || 1;
      }
    },
    mounted() {
      document.addEventListener('click', (e) => {
        if (this.click_flag) {
          let class_name = e.target.parentElement.className;
          if (class_name !== 'lang-box' && class_name !== 'span-parent') {
            this.click_flag = false;
          }
        }
      });
    },
    methods: {
      nav_click(id, url, index) {
        this.active = id;
        let query = {
          nav: id,
          on: index
        };
        if (url === this.$route.path) {
          if (index !== parseInt(this.$route.query.on)) {
            this.$router.push({ name: 'center', query: query });
          }
        } else {
          this.$router.push({ path: url, query: query });
        }
      },
      change_language(language) {
        if (language === 'CN') {
          window.open('http://www.tjluckytoy.com', "_blank");
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    height: 60px;
    position: relative;
    z-index: 9;

    .header-box {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        width: 374px;
        height: 44px;
        flex-shrink: 0;
      }

      .nav {
        flex-grow: 1;
        display: flex;

        .language {
          width: 86px;
          height: 31px;
          flex-shrink: 0;
          margin-left: 50px;
          cursor: pointer;
          position: relative;
          user-select: none;

          .lang-box {
            position: absolute;
            top: 31px;
            left: 0;
            display: none;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
            width: 100%;

            &.active {
              display: flex;
            }

            span {
              width: 100%;
              display: flex;
              padding: 0 15px;
              flex-flow: column;
              line-height: 40px;
              font-size: 16px;
              color: #50a8ec;
              box-sizing: border-box;

              &:hover {
                background-color: #89ccff;
                color: #ffffff;
              }
            }

          }

          p {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 8px;
            overflow: hidden;

            span {
              flex-shrink: 0;
              display: flex;
              width: 31px;
              height: 31px;
              background-color: #ededed;
              justify-content: center;
              align-items: center;

              i {
                display: block;
                width: 12px;
                height: 7px;
                background-image: url("../assets/icons.png");
                background-repeat: no-repeat;
                background-position: -132px -62px;

                &.active {
                  background-position: -156px -62px;
                }
              }

              &.text-language {
                font-size: 16px;
                color: #333;
                background: #f7f7f7;
                flex-grow: 1;
              }
            }
          }
        }

        ul {
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          li {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 0 25px;

            p {
              position: relative;
              z-index: 9;
              color: #666666;
              font-size: 16px;

              &.active, &:hover {
                color: #50a8ec;
              }
            }

            .icon-nav {
              display: block;
              width: 8px;
              height: 8px;
              margin-left: 5px;
              background: url("../assets/icons.png") 0 0 no-repeat;
              background-position: -92px -60px;
            }

            .second-nav {
              padding-top: 40px;
              position: absolute;
              top: 0;
              left: 0;
              display: none;
              min-width: 100%;
              width: auto;

              .second-nav-item {
                background-color: #ebf6ff;

                p {
                  white-space: nowrap;
                  line-height: 40px;
                  font-size: 16px;
                  color: #50a8ec;
                  padding: 0 15px;
                  box-sizing: border-box;
                }

                &:hover {
                  background-color: #89ccff;

                  p {
                    color: #ffffff;
                  }
                }
              }
            }

            &:hover {
              .second-nav {
                display: block;
              }

              .icon-nav {
                background-position: -112px -60px;
              }
            }
          }
        }
      }
    }
  }
</style>
