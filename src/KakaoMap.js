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

    createMouseClickListener = (map, customOverlay) => {
        let overlay = false;
        const toggle = () => overlay = !overlay;        
        return () => {
            toggle();
            overlay ? customOverlay.setMap(map) : customOverlay.setMap(null);
        }
    }

    concatenateDetails = (details) => {
        let result = [];
        for (let detail in details) {
            let temp = <Detail key={detail}>{detail} : {details[detail]}</Detail>;
            result.push(temp);
        }
        return result;
    }

    createCustomOverlay = (map, marker, data) => {
        let content = <Content 
                        iwBackgroundColor={this.props.iwBackgroundColor}
                        iwFontColor={this.props.iwFontColor}
                        iwFontSize={this.props.iwFontSize}
                        >
                        {this.concatenateDetails(data.details)}
                    </Content>;

        let customOverlay = new kakao.maps.CustomOverlay({
            content: renderToString(content),
            position: marker.getPosition(),
            xAnchor: 0.5,
            yAnchor: 0,
            overlay: false
        });

        kakao.maps.event.addListener(
            marker,
            'click',
            this.createMouseClickListener(map, customOverlay)
        );
    }

    mapScript = () => { 
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${this.props.appKey}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let container = document.getElementById("map");
                let options = {
                    center: new kakao.maps.LatLng(this.props.latitude, this.props.longitude),
                    level: this.props.level ? this.props.level : 3
                };
                const map = new window.kakao.maps.Map(container, options);
                
                const { dataList } = this.props;
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
      
    componentDidMount() {
        this.mapScript();
    }

    render() {
        return <Root id="map"/>;
    }
}

KakaoMap.propTypes = {
    level: PropTypes.number,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
    appKey: PropTypes.string.isRequired,
    iwBackgroundColor: PropTypes.string,
    iwFontColor: PropTypes.string,
    iwFontSize: PropTypes.string
}; 

export default KakaoMap;