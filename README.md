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
### 1. props
- KakaoMap
  * level : zoom level
  * longtitude : central longtitude
  * latitude : central latitude
  * appKey : your kakao appkey
  * zoomable : zoomable option

- Marker
  * latitude : marker latitude
  * longitude : marker longitude
  * details : marker details
  * markerImgSrc : custom marker image source
  * markerImgWidth : custom marker image width
  * markerImgHeight : custom marker image height
  * iwComponent : custom infowindow component

### 2. Example of simple use
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

### 3. Customizing marker image
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

### 4. Customizing infowindow
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

# License
This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).
