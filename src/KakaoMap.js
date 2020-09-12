/*global kakao*/
// src/KakaoMap.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
    height: 100%;
`;

let MapContext = React.createContext(null);

class KakaoMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    
    componentDidMount() {
        this.mapScript();
    }
    
    mapScript = () => {
        const {
            appKey,
            latitude,
            longitude,
            level,
            zoomable
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
                let map = new window.kakao.maps.Map(container, options);
                map.setZoomable(zoomable !== undefined ? zoomable : true);
                this.setState({map});
            });
        };
    };

    render() {
        const { map } = this.state;
        return (
            <Root id="map">
                {map ? (
                <MapContext.Provider value={map}>
                    {this.props.children}
                </MapContext.Provider>
                ) : null}
            </Root>
        );
    }
}

KakaoMap.propTypes = {
    level: PropTypes.number,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    appKey: PropTypes.string.isRequired,
    zoomable: PropTypes.bool,
};

export { KakaoMap, MapContext };