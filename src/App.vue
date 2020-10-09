<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
  }

  a {
    color: #333333;
    font-size: 14px;
    text-decoration: none;

  }

  ul, li {
    list-style: none;
  }

  img {
    display: block;
    width: 100%;
  }

  .page {
    min-height: calc(100vh - 60px - 333px);
    position: relative;
    z-index: 1;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
  }

  body {
    min-width: 1200px;
    overflow-y: scroll;
  }


  .w-1200 {
    width: 1200px;
    margin: 0 auto;
  }

  /* 超出省略 start */
  .one-line-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: nowrap;
  }

  .two-line-ellipsis {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /* 超出省略 end */
  .nodata {
    font-size: 16px;
    color: #999;
    text-align: center;
  }

  /*服务全球和关于我们页的页面导航*/
  .nav-box {
    width: 240px;
    flex-shrink: 0;
    margin-right: 45px;
    position: relative;

    .nav-bg {
      position: absolute;
      left: 0;
      width: 100%;
      z-index: 99;
      box-sizing: border-box;
      padding: 0 10px;
      background-color: #3f83cc;

      .nav-title {
        display: flex;
        align-items: center;
        color: #e6e6e6;
        font-size: 14px;
        padding: 15px 0;
        border-bottom: 1px solid #e6e6e6;
        box-sizing: border-box;
      }

      .nav {
        .nav-item {
          height: 100%;
          font-size: 16px;
          color: #333;

          h3 {
            cursor: pointer;
            font-weight: normal;
            font-size: 18px;
            color: #ffffff;
            padding: 15px 0;
            box-sizing: border-box;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            justify-content: space-between;
            align-items: center;

            i {
              display: block;
              width: 15px;
              height: 15px;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            }

            &.none_border {
              border-bottom: none;
            }
          }

          ul {
            height: 0;
            overflow: hidden;
            /*transition: 2s;*/

            li {
              padding-bottom: 15px;
              box-sizing: border-box;
              display: flex;
              cursor: pointer;
              align-items: center;

              .icon {
                width: 12px;
                height: 12px;
                margin-right: 15px;
                flex-shrink: 0;
              }

              span {
                flex-grow: 1;
                color: #ffffff;
                font-size: 14px;
                display: block;
              }
            }

            &.on {
              height: auto;
              padding-top: 20px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }

</style>
