import React from 'react';
import {Icon} from 'semantic-ui-react'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const GET_HOUSE_DATA = gql`
    query queryMapHouseData($lng: Float, $lat: Float, $zoom: Int) {
        MapHouseData(lng:$lng, lat: $lat, zoom: $zoom) {
            list {
                x
                y
            }
        }
    }
`;

const client = new ApolloClient({
    uri: "http://127.0.0.1:18080/graphql"
});

// 百度地图API功能
const BMap = window.BMap;
const BMapLib = window.BMapLib;

const showMapMarker = (xy, map) => {
    let markers = [];
    let pt = null;
    for (let i in xy) {
        pt = new BMap.Point(xy[i].x, xy[i].y);
        markers.push(new BMap.Marker(pt));
    }
    // 地图上覆盖物的聚合效果
    let markerClusterer = new BMapLib.MarkerClusterer(map, {
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
    markerClusterer.setGridSize(50);
}

class MapHouse extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let defaultX = 121.48130241985999;
        let defaultY = 31.235156971414239;
        let defaultZoom = 12;


        // 创建Map实例
        let map = new BMap.Map("allmap");
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(defaultX, defaultY), defaultZoom);
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

        let showInfo = () => {
            let cp = map.getCenter();
            let zoom = map.getZoom(); //缩放级别
            client.query({
                query: GET_HOUSE_DATA, variables: {
                    "lng": cp.lng,
                    "lat": cp.lat,
                    "zoom": zoom
                }
            }).then(result => {
                let xy = result.data.MapHouseData.list;
                showMapMarker(xy, map);
            });
        };
        //拖动开始事件
        map.addEventListener("dragstart", () => {
            map.clearOverlays();
        });
        // 拖动结束事件
        map.addEventListener("dragend", showInfo);
        //缩放开始事件
        map.addEventListener("zoomstart", () => {
            map.clearOverlays();
        });
        //缩放结束事件
        map.addEventListener("zoomend", showInfo);
        // 测试数据
        // let xy = [{
        //   'x': 116.43244,
        //   'y': 39.929986
        // }, {
        //   'x': 116.424355,
        //   'y': 39.92982
        // }, {
        //   'x': 116.423349,
        //   'y': 39.935214
        // }, {
        //   'x': 116.350444,
        //   'y': 39.931645
        // }, {
        //   'x': 116.351684,
        //   'y': 39.91867
        // }, {
        //   'x': 116.353983,
        //   'y': 39.913855
        // }, {
        //   'x': 116.357253,
        //   'y': 39.923152
        // }, {
        //   'x': 116.349168,
        //   'y': 39.923152
        // }, {
        //   'x': 116.354954,
        //   'y': 39.935767
        // }, {
        //   'x': 116.36232,
        //   'y': 39.938339
        // }, {
        //   'x': 116.374249,
        //   'y': 39.94625
        // }, {
        //   'x': 116.380178,
        //   'y': 39.953053
        // }];
        //初始化
        client.query({
            query: GET_HOUSE_DATA, variables: {
                "lng": defaultX,
                "lat": defaultY,
                "zoom": defaultZoom
            }
        }).then(result => {
            let xy = result.data.MapHouseData.list;
            showMapMarker(xy, map);
        });
    }


    render() {
        return (
            <div className='map-house'>
                <div className="map-house-title">
                    <Icon onClick={this.props.hideMap} name='angle left' size='large'/> 地图找房
                </div>
                <div className="map-house-content" id='allmap'></div>
            </div>
        );
    }
}

export default MapHouse;
