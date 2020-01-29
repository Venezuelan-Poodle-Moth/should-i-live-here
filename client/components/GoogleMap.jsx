import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '80%',
    height: '60%'
};

export class MapContainer extends Component {
    render() {
        const latitude = parseFloat(this.props.location.latitude);
        const longitude = parseFloat(this.props.location.longitude);
        return (
            <Map google={this.props.google}
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                initialCenter={{ lat: latitude, lng: longitude }} >
                <Marker position={{ lat: latitude, lng: longitude}} />
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAbYDUDtfCr6YNmR9nrPYCq5KxBSCDeYek'
})(MapContainer);
  