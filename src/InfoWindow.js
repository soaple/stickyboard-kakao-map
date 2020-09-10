import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Content = styled.div`
    padding: 6px;
    margin: 4px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 16px;
    background-color: #fff;
    color: #000;
    font-size: 14px;
`;

const Detail = styled.div`
    padding: 2px;
`;

class InfoWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    wrapDetails = (details) => {
        let result = [];
        for (let detail in details)
            result.push(
                <Detail key={detail}>
                    {detail} : {details[detail]}
                </Detail>
            );
        return result;
    };

    render() {
        return <Content>{this.wrapDetails(this.props.details)}</Content>;
    }
}

InfoWindow.propTypes = {
    details: PropTypes.object.isRequired,
};

export default InfoWindow;
