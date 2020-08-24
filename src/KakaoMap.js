/*global kakao*/
// src/KakaoMap.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { renderToString } from 'react-dom/server';

const Root = styled.div`
    height:100%;
`;

const Content = styled.div`
    padding:6px;
    margin: 4px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-radius: 16px;
    background-color: ${(props) => props.iwBackgroundColor || "#fff"};
    color: ${(props) => props.iwFontColor || "#000"};
    font-size: ${(props) => props.iwFontSize || "14px"};
`;

const Detail = styled.div`
    padding: 2px;
`;

class KakaoMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.mapScript();
    }

    createMouseClickListener = (map, customOverlay) => {
        let overlay = false;
        const toggle = () => overlay = !overlay;        
        return () => {
            toggle();
            overlay ? customOverlay.setMap(map) : customOverlay.setMap(null);
        }
    }

    wrapDetails = (details) => {
        let result = [];
        for (let detail in details) {
            let temp = <Detail key={detail}>{detail} : {details[detail]}</Detail>;
            result.push(temp);
        }
        return result;
    }

    createCustomOverlay = (map, marker, data) => {
        const { 
            iwBackgroundColor,
            iwFontColor,
            iwFontSize
         } = this.props;

        let content = <Content 
                        iwBackgroundColor={iwBackgroundColor}
                        iwFontColor={iwFontColor}
                        iwFontSize={iwFontSize}
                        >
                        {this.wrapDetails(data.details)}
                      </Content>;

        let customOverlay = new kakao.maps.CustomOverlay({
            content: renderToString(content),
            position: marker.getPosition(),
            xAnchor: 0.5,
            yAnchor: 0
        });

        kakao.maps.event.addListener(
            marker,
            'click',
            this.createMouseClickListener(map, customOverlay)
        );
    }

    mapScript = () => { 
        const { 
            appKey,
            latitude,
            longitude,
            level,
            dataList
         } = this.props;

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let container = document.getElementById("map");
                let options = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: level ? level : 3
                };
                const map = new window.kakao.maps.Map(container, options);

                dataList.forEach((data) => {
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(data.latitude, data.longitude)
                    });
                    data.details ? this.createCustomOverlay(map, marker, data) : '';
                });

            });
        };
    };
      
    render() {
        return <Root id="map"/>;
    }
}

KakaoMap.propTypes = {
    level: PropTypes.number,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    dataList: PropTypes.arrayOf(
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            details: PropTypes.object
        })
    ).isRequired,
    appKey: PropTypes.string.isRequired,
    iwBackgroundColor: PropTypes.string,
    iwFontColor: PropTypes.string,
    iwFontSize: PropTypes.string
};

export default KakaoMap;