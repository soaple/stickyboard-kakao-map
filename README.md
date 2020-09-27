
# stickyboard-kakao-map
Kakao map component for StickyBoard

[![Version](https://img.shields.io/npm/v/@stickyboard/kakao-map.svg)](https://npmjs.org/package/@stickyboard/kakao-map)
[![Downloads/week](https://img.shields.io/npm/dw/@stickyboard/kakao-map.svg)](https://npmjs.org/package/@stickyboard/kakao-map)
[![License](https://img.shields.io/npm/l/@stickyboard/kakao-map.svg)](https://github.com/soaple/@stickyboard/kakao-map/blob/master/package.json)

# Webpack watch
```bsh
$ npm start
```

# Build
```bsh
$ npm run build
```

# Publish to npm
```bsh
$ npm run publish
```

# Usage
1. [props](#props)
2. [example of simple use](#example-of-simple-use)
3. [customizing marker image](#customizing-marker-image)
4. [customizing infowindow](#customizing-infowindow)
5. [circle component](#circle-component)
6. [line component](#line-component)
7. [polygon component](#polygon-component)
### props
- KakaoMap

| props     | description       | value             |
|-----------|-------------------|-------------------|
| level     | zoom level        | 1~14              |
| latitude  | central latitude of map | ex) 37.2479       |
| longitude | central longitude of map | ex) 127.0781      |
| appKey    | your kakao appkey | your kakao appKey |
| zoomable  | zoomable option   | true \| false     |
- Marker

| props           | description                     | value           |
|-----------------|---------------------------------|-----------------|
| latitude        | marker latitude                 | ex) 37.2494     |
| longitude       | marker longitude                | ex) 127.0781    |
| details         | marker details                  | object          |
| markerImgSrc    | custom marker image source      | path of image   |
| markerImgWidth  | custom marker image width (px)  | number          |
| markerImgHeight | custom marker image height (px) | number          |
| iwComponent     | custom infowindow component     | React component |
- Circle

| props         | description                 | value                                                                   |
|---------------|-----------------------------|-------------------------------------------------------------------------|
| latitude      | central latitude of circle  | ex) 37.2492                                                             |
| longitude     | central longitude of circle | ex) 127.0781                                                            |
| radius        | radius of circle (meter)    | number                                                                  |
| strokeWeight  | stroke weight (px)          | number                                                                  |
| strokeColor   | stroke color                | ex) '#F10000'                                                           |
| strokeOpacity | stroke opacity              | 0~1                                                                     |
| strokeStyle   | stroke style                | [Reference](https://apis.map.kakao.com/web/documentation/#StrokeStyles) |
| fillColor     | fill color                  | ex) '#F10000'                                                           |
| fillOpacity   | fill opacity                | 0~1                                                                     |
- Line

| props         | description          | value                                                                   |
|---------------|----------------------|-------------------------------------------------------------------------|
| linePath      | array of coordinates that make up line | array                                                                   |
| strokeWeight  | stroke weight (px)   | number                                                                  |
| strokeColor   | stroke color         | ex) '#F10000'                                                           |
| strokeOpacity | stroke opacity       | 0~1                                                                     |
| strokeStyle   | stroke style         | [Reference](https://apis.map.kakao.com/web/documentation/#StrokeStyles) |
- Polygon

| props         | description                               | value                                                                   |
|---------------|-------------------------------------------|-------------------------------------------------------------------------|
| polygonPath   | array of coordinates that make up polygon | array                                                                   |
| strokeWeight  | stroke weight (px)                        | number                                                                  |
| strokeColor   | stroke color                              | ex) '#F10000'                                                           |
| strokeOpacity | stroke opacity                            | 0~1                                                                     |
| strokeStyle   | stroke style                              | [Reference](https://apis.map.kakao.com/web/documentation/#StrokeStyles) |
| fillColor     | fill color                                | ex) '#F10000'                                                           |
| fillOpacity   | fill opacity                              | 0~1                                                                     |
### example of simple use
- Data list with details
```javascript
import React from 'react';
import { KakaoMap, Marker } from '@stickyboard/kakao-map';

const dataListWithDetails = [
  {
    latitude: 37.2479104,
    longitude: 127.0781385,
    details: {
      NAME: "Subway",
      TYPE: "fastfood",
      MENU: "sandwich"
    }
  },
  {
    latitude: 37.2479733442,
    longitude: 127.0776020771,
    details: {
      NAME: "McDonald",
      TYPE: "fastfood",
      MENU: "hamburger",
    }
  },
  {
    latitude: 37.2479113250,
    longitude: 127.0766958899,
    details: {
      NAME: "Starbucks",
      TYPE: "cafe",
      MENU: "beverage, coffee",
    }
  }
];

const App = () => {
  return (
    <KakaoMap
      level={2}
      longitude={127.0776020771}
      latitude={37.2479733442}
      appKey='your_appKey'
    >
      {dataListWithDetails.map((data) => 
        <Marker
          latitude={data.latitude}
          longitude={data.longitude}
          details={data.details}
        />
      )}
    </KakaoMap>
  );
}

export default App;
```
![datalistwidthdetails](https://user-images.githubusercontent.com/53550707/92702097-c4718880-f38b-11ea-80d1-ec220fcb62d1.png)
- Data list without details
```javascript
import React from 'react';
import { KakaoMap, Marker } from '@stickyboard/kakao-map';

const dataListWithoutDetails = [
  {
    latitude: 37.2479104,
    longitude: 127.0781385
  },
  {
    latitude: 37.2479733442,
    longitude: 127.0776020771
  },
  {
    latitude: 37.2479113250,
    longitude: 127.0766958899
  }
];

const App = () => {
  return (
    <KakaoMap
      level={2}
      longitude={127.0776020771}
      latitude={37.2479733442}
      appKey='your_appKey'
    >
      {dataListWithoutDetails.map((data) => 
        <Marker
          latitude={data.latitude}
          longitude={data.longitude}
        />
      )}
    </KakaoMap>
  );
}

export default App;
```
![datalistwithoutdetails](https://user-images.githubusercontent.com/53550707/92702788-8fb20100-f38c-11ea-885b-a5370e88a1b5.png)

### customizing marker image
- Use markerImgSrc, markerImgWidth and markerImgHeight.
```javascript
import React from 'react';
import { KakaoMap, Marker } from '@stickyboard/kakao-map';

const App = () => {
  return (
    <KakaoMap
      level={3}
      longitude={127.09598}
      latitude={37.54699}
      appKey='your_appKey'
    >
      <Marker
        latitude={37.54699}
        longitude={127.09598}
        markerImgSrc='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
        markerImgWidth={64}
        markerImgHeight={69}
      />
    </KakaoMap>
  );
}

export default App;
```
![custom-marker-img](https://user-images.githubusercontent.com/53550707/92704410-e53add80-f38d-11ea-8a0c-e33e593c2912.png)

### customizing infowindow
- Use iwComponent. Custom infowindow component should have "details" props.
```javascript
import React from 'react';
import { KakaoMap, Marker } from '@stickyboard/kakao-map';

const CustomIW = ({details}) => {
  return (
    <div className="customoverlay">
      <a href="https://map.kakao.com/link/map/11394059">
        <span className="title">{details.title}</span>
      </a>
    </div>
  )
}

const App = () => {
  return (
    <KakaoMap
      level={3}
      longitude={127.09598}
      latitude={37.54699}
      appKey='your_appKey'
    >
      <Marker
        latitude={37.54699}
        longitude={127.09598}
        details={{
          title: '구의야구공원'
        }}
        markerImgSrc='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
        markerImgWidth={64}
        markerImgHeight={69}
        iwComponent={CustomIW}
      />
    </KakaoMap>
  );
}

export default App;
```
```css
/*style.css*/
.customoverlay {
        position:relative;
        bottom:120px;
        right:5px;
        border-radius:6px;
        border: 1px solid #ccc;
        border-bottom:2px solid #ddd;
      }
.customoverlay:nth-of-type(n) {
  border:0; 
  box-shadow:0px 1px 2px #888;
}
.customoverlay a {
  display:block;
  text-decoration:none;
  color:#000;
  text-align:center;
  border-radius:6px;
  font-size:14px;
  font-weight:bold;
  overflow:hidden;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}
.customoverlay .title {
  display:block;
  text-align:center;
  background:#fff;
  margin-right:35px;
  padding:10px 15px;
  font-size:14px;
  font-weight:bold;
}
.customoverlay:after {
  content:'';
  position:absolute;
  margin-left:-12px;
  left:50%;
  bottom:-12px;
  width:22px;
  height:12px;
  background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
}
```
![custom-iw](https://user-images.githubusercontent.com/53550707/92713166-9abd5f00-f395-11ea-96b0-44873425060d.png)

### circle component
- example of 'Circle' component
```javascript
import React from 'react';
import { KakaoMap, Circle } from '@stickyboard/kakao-map';

const App = () => {
  return (
    <>
    <KakaoMap
      level={3}
      longitude={127.09598}
      latitude={37.54699}
      appKey='your_appKey'
    >
      <Circle
        longitude={127.09598}
        latitude={37.54699}
        radius={50}
        strokeWeight={5}
        strokeColor='#75B8FA'
        strokeOpacity={1}
        strokeStyle='dashed'
        fillColor='#CFE7FF'
        fillOpacity={0.7} 
      />
    </KakaoMap>
    </>
  );
}

export default App;
```
![circle](https://user-images.githubusercontent.com/53550707/94360468-62818480-00e8-11eb-9764-08f180eb76bd.png)

### line component
- example of 'Line' component
```javascript
import React from 'react';
import { KakaoMap, Line } from '@stickyboard/kakao-map';

const linePath = [
  {
    latitude: 37.2479104,
    longitude: 127.0781385
  },
  {
    latitude: 37.2479733442,
    longitude: 127.0776020771
  },
  {
    latitude: 37.2479113250,
    longitude: 127.0766958899
  }
]

const App = () => {
  return (
    <>
    <KakaoMap
      level={1}
      latitude={37.2479733442}
      longitude={127.0776020771}
      appKey='your_appKey'
    >
      <Line
        linePath={linePath}
        strokeWeight={5}
        strokeColor='#FFAE00'
        strokeOpacity={0.7}
        strokeStyle='solid'
      />
    </KakaoMap>
    </>
  );
}

export default App; 
```
![line](https://user-images.githubusercontent.com/53550707/94360475-6c0aec80-00e8-11eb-8bec-ded43a2f1802.png)

### polygon component
- example of 'Polygon' component
```javascript
import React from 'react';
import { KakaoMap, Polygon } from '@stickyboard/kakao-map';

const polygonPath = [
  {
    latitude: 33.45133510810506,
    longitude: 126.57159381623066
  },
  {
    latitude: 33.44955812811862,
    longitude: 126.5713551811832
  },
  {
    latitude: 33.449986291544086,
    longitude: 126.57263296172184
  },
  {
    latitude: 33.450682513554554,
    longitude: 126.57321034054742
  },
  {
    latitude: 33.451346760004206,
    longitude: 126.57235740081413
  }
]

const App = () => {
  return (
    <>
    <KakaoMap
      level={2}
      latitude={33.449986291544086}
      longitude={126.57263296172184}
      appKey='your_appKey'
    >
      <Polygon
        polygonPath={polygonPath}
        strokeWeight={3}
        strokeColor='#39DE2A'
        strokeOpacity={0.8}
        strokeStyle='longdash'
        fillColor='#A2FF99'
        fillOpacity={0.7}
      />
    </KakaoMap>
    </>
  );
}

export default App;
```
![polygon](https://user-images.githubusercontent.com/53550707/94360483-7c22cc00-00e8-11eb-93a4-cacfa996ae4d.png)

# License
This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).
