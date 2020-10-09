<template>
  <div class="news-detail page">
    <!--面包屑加tab-->
    <div class="crumb-tab">
      <div class="w-1200">
        <div class="crumb">
          <p>
            <router-link :to="{path:'/news',query:{nav:4,on:1}}">News</router-link>
            >
            <router-link :to="{path:'/news',query:{nav:4,on:type}}">{{type===1?'Company news':'Industry trends'}}</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="news-detail-content">
      <div class="news-cont">
        <div class="detail-cont">
          <div class="detail-title">
            <h3>{{detail.title}}</h3>
            <p><span>Tianjin Lucky Toy Co.,Ltd</span>{{detail.create_time}}</p>
          </div>
          <div class="rich-text" v-html="detail.content"></div>

          <div class="btn-box" v-if="new_list.length>0">
            <div class="p-box">
              <p v-if="prev_i === new_list.length-1" @click="prev_pages(new_list[prev_i].id)">
                Prev：No previous</p>
              <p v-else @click="prev_pages(new_list[prev_i].id)">Prev：{{new_list[prev_i].title}}</p>

              <p v-if="next_i===0" @click="next_pages(new_list[next_i].id)">Next：There is no next article</p>
              <p v-else @click="next_pages(new_list[next_i].id)">Next：{{new_list[next_i].title}}</p>
            </div>
            <!--<div class="share">-->
              <!--<p><span>可分享到</span><span>FEN XIANG DAO</span></p>-->
              <!--<p @click="share_wb" class="img"><img :src="weibo"/></p>-->
              <!--<p class="img share-wx">-->
                <!--<img :src="weCate"/>-->
                <!--<span><img :src="share_code_url"/></span>-->
              <!--</p>-->
            <!--</div>-->
          </div>

        </div>
        <!--<div class="news-list">-->
          <!--<ul>-->
            <!--<li class="news-list-title">-->
              <!--<p>{{detail.type===1?'公司动态':'行业动态'}}</p>-->
              <!--<span>{{detail.type===1?'COMPANY NEWS':'INDUSTRY TRENDS'}}</span>-->
            <!--</li>-->
            <!--<li v-for="(v,index) in new_list"-->
                <!--:key="index"-->
                <!--:class="id === v.id?'on':''"-->
                <!--ref="clickItem"-->
                <!--@click="look_detail(v.id)">-->
              <!--{{v.title}}-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  // import weCate from '../assets/wx-icon.png'
  // import weibo from '../assets/wb-icon.png'

  export default {
    name: "NewsDetail",
    data() {
      return {
        id: 0,

        type: 1,//1代表公司，2代表行业
        detail: {},
        new_list: [],
        prev_i: 0,
        next_i: 2,

        // 延展阅读
        read_arr: [],

        // 分享图标
        // weibo: weibo,
        // weCate: weCate,
        // share_code_url: ''
      }
    },
    // 跳转本页是参数变化后重新调取商品详情数据
    beforeRouteUpdate(to, from, next) {
      this.type = parseInt(to.query.on);
      this.id = parseInt(to.query.id);
      this.getNewsDetail();
      next()
    },
    created() {
      this.type = parseInt(this.$route.query.on);
      this.id = parseInt(this.$route.query.id);
      this.getNewsDetail();
      // this.getNewsList();
      // this.utils.getBanner(this, 4, (res) => {
      //   // console.log(res, res.title);
      //   this.banner = res.pic
      // }, () => {
      //   this.getData(this.id);
      // });
    },
    methods: {
      // // 上一篇新闻
      prev_pages(id) {
        this.id = id;
        if (this.prev_i !== this.new_list.length - 1) {
          this.$router.replace({
            name: 'newDetail',
            query: {
              nav: 4,
              id: id,
              on: this.type
            }
          });
        } else {
          this.$alert('No previous')
        }
      },
      // // 下一篇新闻
      next_pages(id) {
        this.id = id;
        if (this.next_i !== 0) {
          this.$router.replace({
            name: 'newDetail',
            query: {
              nav: 4,
              id: id,
              on: this.type
            }
          });
        } else {
          this.$alert('There is no next article')
        }
      },

      // 点击分享到微博
      // share_wb() {
      //   // console.log('进来了');
      //   var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + this.detail.title + '&url=' + window.location.href + '&content=utf-8&sourceUrl=' + this.detail.desc + '&pic=' + this.detail.pic;
      //   window.open(sharesinastring);
      // },

      look_detail(id) {
        this.id = id;
        this.$router.replace({
          name: 'newDetail',
          query: {
            nav: 4,
            id: id,
            on: this.type
          }
        })
      },

      // // 获取延展阅读数据
      // getNewsExtendList() {
      //   this.utils.ajax(this, 'api/getNewsExtendList', { id: this.id }).then((res) => {
      //     // console.log(res);
      //     this.read_arr = res.list;
      //   });
      // },

      // 获取新闻或者公告最新15条数据列表；perpage可以改变请求多少条数据
      getNewsList() {
        let post = {
          page: 1,
          perpage: 10,
          type: this.type
        };
        this.utils.ajax(this, 'newsList', post).then(res => {
          this.new_list = res.list;
        }).then(() => {
          let obj = this.new_list;
          for (let i = 0; i < obj.length; i++) {
            if (obj[i].id === this.id) {
              if ((i + 1) === obj.length) {
                this.prev_i = i - 1;
                this.next_i = 0;
              } else if (i === 0) {
                this.prev_i = obj.length - 1;
                this.next_i = i + 1;
              } else {
                this.prev_i = i - 1;
                this.next_i = i + 1;
              }
            }
          }
        })
      },
      getNewsDetail() {
        let post = {
          id: this.id
        };
        this.utils.ajax(this, 'newsDetail', post).then((res) => {
          res.create_time = this.utils.date_format(res.create_time, 'yyyy-MM-dd hh:mm:ss');
          res.content = res.content.replace(/\/ueditor\/php\/upload\//g, this.config.url + 'ueditor/php/upload/');
          this.detail = res;
        }).then(() => {
          this.getNewsList();
          //
          // let url = 'http://www.tjluckytoy.com/#/newdetail?id=' + this.id;
          // this.share_code_url = this.config.api + 'zh.index/qrcode?url=' + encodeURIComponent(url);
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .news-detail {
    /*background-color: rgba(75, 140, 213, 0.1);*/

    /*面包屑加tab样式*/
    .crumb-tab {
      background: #3f83cc;
      border-top: 1px solid rgba(0, 0, 0, 0.03);

      .w-1200 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
      }

      .crumb {
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: 16px;

        a {
          color: #ffffff;
          font-size: 16px;

          &:hover {
            color: #e6e6e6;
          }
        }
      }

    }

    .news-detail-content {
      width: 1200px;
      overflow: hidden;
      margin: 0 auto;

      .news-cont {
        margin-bottom: 70px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;

        .detail-cont {
          background: #ffffff;
          padding-top: 60px;
          /*margin-right: 10px;*/
          flex-grow: 1;
          overflow: hidden;

          .detail-title {
            width: 90%;
            margin: 0 auto 40px;

            h3 {
              font-size: 20px;
              font-weight: normal;
              color: #000000;
              opacity: 0.7;
            }

            p {
              margin-top: 10px;
              font-size: 14px;
              color: #999999;
              /*opacity: 0.5;*/

              span {
                margin-right: 10px;
                font-size: 14px;
                color: #50a8ec;
              }
            }
          }

          .rich-text {
            width: 90%;
            margin: 0 auto;
            line-height: 27px;
            font-size: 18px;
            text-align: justify;

            /deep/ img {
              max-width: 100%;
              height: auto;
            }
          }

          .btn-box {
            /*padding-top: 30px;*/
            /*background-color: rgba(75, 140, 213, 0.1);*/

            .p-box {
              height: 45px;
              justify-content: space-between;
              align-items: center;
              display: flex;
              padding: 15px 0;
              margin: 0 auto;

              p {
                font-weight: bold;
                color: #999;
                text-align: right;
                cursor: pointer;
                font-size: 16px;
                width: 35%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }

              p:first-child {
                text-align: left;
              }

              p:hover {
                color: #50a8ec;
              }
            }

            .share {
              margin-top: 30px;
              display: flex;
              justify-content: flex-start;
              align-items: center;

              p {
                font-size: 12px;
                color: #000000;
                opacity: 0.4;
                display: flex;
                justify-content: center;
                flex-flow: column;
                margin-right: 30px;

                span:first-child {
                  font-size: 18px;
                  color: #000000;
                  opacity: 0.9;
                }
              }

              .img {
                cursor: pointer;
                width: 41px;
                height: 41px;
                opacity: 1;
                margin-right: 20px;

                img {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }

              .share-wx {
                position: relative;

                span {
                  display: none;
                  position: absolute;
                  bottom: 41px;
                  left: 0;
                  transition: 2s;
                  width: 200px;
                  height: 200px;
                }
              }

              .share-wx:hover span {
                display: block;
              }
            }
          }

          /*.extended-reading {*/
          /*margin: 44px auto 53px;*/
          /*width: 70%;*/

          /*.title {*/
          /*p {*/
          /*font-size: 18px;*/
          /*color: #000000;*/
          /*opacity: 0.9;*/
          /*}*/

          /*span {*/
          /*font-size: 12px;*/
          /*color: #000000;*/
          /*opacity: 0.4;*/
          /*}*/
          /*}*/

          /*.reading-list {*/

          /*p {*/
          /*cursor: pointer;*/
          /*display: flex;*/
          /*justify-content: space-between;*/
          /*align-items: center;*/
          /*margin: 17px 0;*/

          /*span {*/
          /*font-size: 14px;*/
          /*color: #999;*/
          /*}*/

          /*span:first-child {*/
          /*display: block;*/
          /*text-overflow: ellipsis;*/
          /*white-space: nowrap;*/
          /*overflow: hidden;*/
          /*width: 40%;*/
          /*}*/
          /*}*/
          /*}*/
          /*}*/
        }

        .news-list {
          width: 356px;
          flex-shrink: 0;
          padding-left: 20px;
          box-sizing: border-box;

          ul {
            background: #ffffff;

            .news-list-title {
              height: 90px;
              background-color: #546c81;
              padding-top: 20px;
              padding-left: 17px;
              line-height: unset;

              p {
                font-size: 20px;
                color: #fffefe;
                opacity: 0.8;
              }

              span {
                font-size: 18px;
                display: block;
                color: #fffefe;
                opacity: 0.4;
              }
            }

            li {
              height: 60px;
              padding: 0 30px;
              line-height: 60px;
              border: solid 1px rgba(0, 0, 0, 0.1);
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              cursor: pointer;
            }

            li:hover, .on {
              color: #50a8ec;
            }
          }
        }
      }
    }
  }
</style>
