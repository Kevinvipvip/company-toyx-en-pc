<template>
  <div class="contact page">

    <!--联系方式-->
    <div class="contact-cont w-1200">
      <ul>
        <li>
          <h3>Address</h3>
          <p>{{us.address}}</p>
        </li>
        <li>
          <h3>Phone</h3>
          <p>{{us.tel}}</p>
        </li>
        <li>
          <h3>E-mail</h3>
          <p>{{us.email}}</p>
        </li>
        <li>
          <h3>Fax</h3>
          <p>{{us.fax}}</p>
        </li>
      </ul>

      <!--百度地图-->
      <div class="map">
        <baidu-map class="baidu-map" :zoom="15" :scroll-wheel-zoom="true" :center="location"
                   @ready="map_init"></baidu-map>
      </div>
    </div>

  </div>
</template>

<script>

  // import BaiduMap from 'vue-baidu-map/components/map/Map'
  // import BmView from 'vue-baidu-map/components/map/MapView'
  // import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
  import icon_address from '../assets/icon-map.png'

  export default {
    // components: {
    //   BaiduMap,
    //   BmView,
    //   BmLocalSearch
    // },
    data() {
      return {
        us: {},

        // 百度地图
        location: {
          lng: 117.416798,
          lat: 39.95455
        }
      }
    },
    mounted() {
      this.getUsData();
    },
    methods: {
      getUsData() {
        this.utils.ajax(this, 'aboutUs').then(res => {
          this.us = res;
        })
      },

      map_init({ BMap, map }) {
        this.$nextTick(() => {
          // 初始化地图,设置中心点坐标
          var point = new BMap.Point(this.location.lng, this.location.lat);
          map.centerAndZoom(point, 15);

          // 添加鼠标滚动缩放
          map.enableScrollWheelZoom();
          // 添加缩略图控件
          // map.addControl(new BMap.OverviewMapControl({ isOpen: false, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));
          // 添加缩放平移控件
          // map.addControl(new BMap.NavigationControl());
          //添加比例尺控件
          // map.addControl(new BMap.ScaleControl());
          //添加地图类型控件
          //map.addControl(new BMap.MapTypeControl());

          //设置标注的图标
          var icon = new BMap.Icon(icon_address, new BMap.Size(32, 43), { anchor: new BMap.Size(16, 43) });
          //设置标注的经纬度
          var marker = new BMap.Marker(new BMap.Point(this.location.lng, this.location.lat), { icon: icon });
          //把标注添加到地图上
          map.addOverlay(marker);
          this.utils.ajax(this, 'aboutUs').then(us => {
            var content = "<table>";
            // content = content + "<tr><td> 编号：001</td></tr>";
            content = content + "<tr><td style='text-align: center;line-height: 25px'>" + us.name + "</td></tr>";
            content = content + "<tr><td> address：" + us.address + "</td></tr>";
            content = content + "<tr><td style='text-align: center;font-size: 18px;line-height: 30px'><a style='background: #50a7ec;color: #ffffff;padding: 2px 10px' href='http://api.map.baidu.com/marker?location=" + this.location.lat + "," + this.location.lng + "&title=天津同缘兴科技股份有限公司&content=" + us.address + "&output=html&src=webapp.baidu.openAPIdemo' target='_blank'>to here</a></td></tr>";
            content += "</table>";
            var infowindow = new BMap.InfoWindow(content);
            // 图标点击的时候显示标注
            marker.addEventListener("click", function () {
              this.openInfoWindow(infowindow);
            });
          });

          // 标注默认显示
          // var infoWindow = new BMap.InfoWindow(content) // 创建信息窗口对象
          // map.openInfoWindow(infoWindow, point)
        });
      },
      toHere() {
        console.log(111);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .contact {
    border-top: 1px solid #e6e6e6;
    box-sizing: border-box;

    .contact-cont {
      margin-top: 40px;
      margin-bottom: 100px;

      ul {

        li {
          display: flex;
          flex-flow: column;
          align-items: center;
          margin-bottom: 49px;

          h3 {
            color: #3f83cc;
            font-size: 30px;
            margin-bottom: 20px;
          }

          p {
            font-size: 16px;
            color: #666666;
            margin: 0 10px;
            text-align: center;
          }
        }
      }

      /*百度地图*/
      .map {
        margin-top: 50px;
        height: 425px;
        background-color: #ffffff;

        .baidu-map {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
