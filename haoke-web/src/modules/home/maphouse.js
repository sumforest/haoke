import React from 'react';
import { Icon} from 'semantic-ui-react'
class MapHouse extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 百度地图API功能
    var BMap = window.BMap;
    var BMapLib = window.BMapLib;
    // 创建Map实例
    var map = new BMap.Map("allmap"); 
    // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(new BMap.Point(116.43244, 39.929986), 12); 
    // 添加地图类型控件
    map.addControl(new BMap.MapTypeControl()); 
    // 设置地图缩放
    map.addControl(new BMap.ScaleControl({
      anchor: window.BMAP_NAVIGATION_CONTROL_ZOOM
    }));
    // 设置地图导航
    map.addControl(new BMap.NavigationControl({
      enableGeolocation: true
    }));
    // 设置缩略图控件。
    map.addControl(new BMap.OverviewMapControl());
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity("北京"); 
    // 开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true); 
    // 测试数据
    var xy = [{
      'x': 116.43244,
      'y': 39.929986
    }, {
      'x': 116.424355,
      'y': 39.92982
    }, {
      'x': 116.423349,
      'y': 39.935214
    }, {
      'x': 116.350444,
      'y': 39.931645
    }, {
      'x': 116.351684,
      'y': 39.91867
    }, {
      'x': 116.353983,
      'y': 39.913855
    }, {
      'x': 116.357253,
      'y': 39.923152
    }, {
      'x': 116.349168,
      'y': 39.923152
    }, {
      'x': 116.354954,
      'y': 39.935767
    }, {
      'x': 116.36232,
      'y': 39.938339
    }, {
      'x': 116.374249,
      'y': 39.94625
    }, {
      'x': 116.380178,
      'y': 39.953053
    }];
    var markers = [];
    var pt = null;
    for (var i in xy) {
      pt = new BMap.Point(xy[i].x, xy[i].y);
      markers.push(new BMap.Marker(pt));
    }
    // 地图上覆盖物的聚合效果
    var markerClusterer = new BMapLib.MarkerClusterer(map, {
      markers: markers,
      girdSize: 100,
      styles: [{
        background: 'rgba(12,181,106,0.9)',
        size: new BMap.Size(92, 92),
        textSize: '16',
        textColor: '#fff',
        borderRadius: 'true'
      }],
    });
    markerClusterer.setMaxZoom(50);
    markerClusterer.setGridSize(10);
  }
  render() {
    return ( 
      <div className = 'map-house' >
        <div className = "map-house-title">
          <Icon onClick = {this.props.hideMap} name = 'angle left' size = 'large'/> 地图找房 
        </div> 
        <div className = "map-house-content" id='allmap'></div>
      </div>
    );
  }
}
export default MapHouse;
