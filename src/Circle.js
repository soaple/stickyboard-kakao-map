import React from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './KakaoMap';

class Circle extends React.Component {
    static contextType = MapContext;
    constructor(props) {
        super(props);

        this.state = {
            circle: {},
        };
    }

    componentDidMount() {
        const {
            latitude,
            longitude,
            radius,
            strokeWeight,
            strokeColor,
            strokeOpacity,
            strokeStyle,
            fillColor,
            fillOpacity,
        } = this.props;

        const circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(latitude, longitude),
            radius: radius,
            strokeWeight: strokeWeight,
            strokeColor: strokeColor,
            strokeOpacity: strokeOpacity,
            strokeStyle: strokeStyle,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
        });
        circle.setMap(this.context);
        this.setState({ circle });
    }

    componentWillUnmount() {
        this.state.circle.setMap(null);
    }

    render() {
        return null;
    }
}

Circle.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    strokeWeight: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeOpacity: PropTypes.number,
    strokeStyle: PropTypes.string,
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
};

export default Circle;
