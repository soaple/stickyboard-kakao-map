import React from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './KakaoMap';

class Polygon extends React.Component {
    static contextType = MapContext;
    constructor(props) {
        super(props);

        this.state = {
            polygon: {},
        };
    }

    componentDidMount() {
        const {
            polygonPath,
            strokeWeight,
            strokeColor,
            strokeOpacity,
            strokeStyle,
            fillColor,
            fillOpacity,
        } = this.props;

        const polygon = new kakao.maps.Polygon({
            path: this.createPolygonPath(polygonPath),
            strokeWeight: strokeWeight,
            strokeColor: strokeColor,
            strokeOpacity: strokeOpacity,
            strokeStyle: strokeStyle,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
        });
        polygon.setMap(this.context);
        this.setState({ polygon });
    }

    componentWillUnmount() {
        this.state.polygon.setMap(null);
    }

    createPolygonPath(polygonPath) {
        return polygonPath.map(
            (point) => new kakao.maps.LatLng(point.latitude, point.longitude)
        );
    }

    render() {
        return null;
    }
}

Polygon.propTypes = {
    polygonPath: PropTypes.arrayOf(
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        })
    ).isRequired,
    strokeWeight: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeOpacity: PropTypes.number,
    strokeStyle: PropTypes.string,
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
};

export default Polygon;
