import React from 'react';
import PropTypes from 'prop-types';
import { MapContext } from './KakaoMap';

class Line extends React.Component {
    static contextType = MapContext;
    constructor(props) {
        super(props);

        this.state = {
            line: {},
        };
    }

    componentDidMount() {
        const {
            linePath,
            strokeWeight,
            strokeColor,
            strokeOpacity,
            strokeStyle,
        } = this.props;

        const line = new kakao.maps.Polyline({
            path: this.createLinePath(linePath),
            strokeWeight: strokeWeight,
            strokeColor: strokeColor,
            strokeOpacity: strokeOpacity,
            strokeStyle: strokeStyle,
        });
        line.setMap(this.context);
        this.setState({ line });
    }

    componentWillUnmount() {
        this.state.line.setMap(null);
    }

    createLinePath(linePath) {
        return linePath.map(
            (point) => new kakao.maps.LatLng(point.latitude, point.longitude)
        );
    }

    render() {
        return null;
    }
}

Line.propTypes = {
    linePath: PropTypes.arrayOf(
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        })
    ).isRequired,
    strokeWeight: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeOpacity: PropTypes.number,
    strokeStyle: PropTypes.string,
};

export default Line;
