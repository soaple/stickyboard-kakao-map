/*global kakao*/
// src/KakaoMap.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { renderToString } from 'react-dom/server';
import InfoWindow from './InfoWindow';

const Root = styled.div`
    height: 100%;
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
        const toggle = () => (overlay = !overlay);
        return () => {
            toggle();
            overlay ? customOverlay.setMap(map) : customOverlay.setMap(null);
        };
    };

    createCustomOverlay = (map, marker, data) => {
        let CustomIw = this.props.iwComponent;
        let content = CustomIw ? (
            <CustomIw details={data.details} />
        ) : (
            <InfoWindow details={data.details} />
        );

        let customOverlay = new kakao.maps.CustomOverlay({
            content: renderToString(content),
            position: marker.getPosition(),
            xAnchor: 0.5,
            yAnchor: 0,
        });

        kakao.maps.event.addListener(
            marker,
            'click',
            this.createMouseClickListener(map, customOverlay)
        );
    };

    createMarkerImg = (markerImgSrc, markerImgWidth, markerImgHeight) => {
        const markerImgSize = new kakao.maps.Size(
            markerImgWidth,
            markerImgHeight
        );
        return new kakao.maps.MarkerImage(markerImgSrc, markerImgSize);
    };

    mapScript = () => {
        const {
            appKey,
            latitude,
            longitude,
            level,
            dataList,
            markerImgSrc,
            markerImgWidth,
            markerImgHeight,
        } = this.props;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let container = document.getElementById('map');
                let options = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: level ? level : 3,
                };
                const map = new window.kakao.maps.Map(container, options);

                dataList.forEach((data) => {
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(
                            data.latitude,
                            data.longitude
                        ),
                        image:
                            markerImgSrc && markerImgWidth && markerImgHeight
                                ? this.createMarkerImg(
                                      markerImgSrc,
                                      markerImgWidth,
                                      markerImgHeight
                                  )
                                : '',
                    });
                    data.details
                        ? this.createCustomOverlay(map, marker, data)
                        : '';
                });
            });
        };
    };

    render() {
        return <Root id="map" />;
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
            details: PropTypes.object,
        })
    ).isRequired,
    appKey: PropTypes.string.isRequired,
    markerImgSrc: PropTypes.string,
    markerImgWidth: PropTypes.number,
    markerImgHeight: PropTypes.number,
    iwComponent: PropTypes.func,
};

export default KakaoMap;
