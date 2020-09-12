import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import InfoWindow from './InfoWindow';
import { MapContext } from './KakaoMap';

class Marker extends React.Component {
    static contextType = MapContext;
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const {
            latitude,
            longitude,
            details,
            markerImgSrc,
            markerImgWidth,
            markerImgHeight,
        } = this.props;

        const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latitude, longitude),
            image:
                markerImgSrc && markerImgWidth && markerImgHeight
                    ? this.createMarkerImg(
                          markerImgSrc,
                          markerImgWidth,
                          markerImgHeight
                      )
                    : '',
        });
        if (details) {
            this.createCustomOverlay(this.context, marker, details);
        }
        marker.setMap(this.context);
    }

    createMouseClickListener = (map, customOverlay) => {
        let overlay = false;
        const toggle = () => (overlay = !overlay);
        return () => {
            toggle();
            customOverlay.setMap(overlay ? map : null);
        };
    };

    createCustomOverlay = (map, marker, details) => {
        let CustomIw = this.props.iwComponent;
        let content = CustomIw ? (
            <CustomIw details={details} />
        ) : (
            <InfoWindow details={details} />
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

    render() {
        return null;
    }
}

Marker.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    details: PropTypes.object,
    markerImgSrc: PropTypes.string,
    markerImgWidth: PropTypes.number,
    markerImgHeight: PropTypes.number,
    iwComponent: PropTypes.func,
};

export default Marker;
