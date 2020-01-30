import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiamFzb25ha2VyIiwiYSI6ImNqcjhiNHhvOTA0amE0YXBnbnNwdGs4a2YifQ.7QF1huDArGAoPP7oLGS7VQ';

const geoJSONGenerator = array => {
  const returnObj = {
    type: 'FeatureCollection',
    features: []
  };

  array.forEach(element => {
    const pushObj = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [Number(element.longitude), Number(element.latitude)]
      },
      properties: {
        Complaint: element.complaint_type
      }
    };

    if (typeof pushObj.geometry.coordinates[0] === 'number') {
      returnObj.features.push(pushObj);
    }
  });

  return returnObj;
};

const Heatmap = () => {
  let mapContainer;

  // This function takes two parameters. The first parameter is a GeoJSON-formatted object. 
  // The second parameter is an array of coordinates for the home icon that is shown on the map.
  const mapbox = (heatmapData, iconCoordinates) => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.908, 40.744],
      zoom: 10.27
    });

    map.on('load', () => {
      map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/500px-Home-icon.svg.png',
        (error, image) => {
          if (error) throw error;

          map.addImage('locationIcon', image);

          map.addSource('locationIconPoint', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: iconCoordinates
                  }
                }
              ]
            }
          });

          map.addLayer({
            id: 'locationIcon',
            type: 'symbol',
            source: 'locationIconPoint',
            layout: {
              'icon-image': 'locationIcon',
              'icon-size': 0.1
            }
          });
        }
      );

      map.addSource('complaints', {
        type: 'geojson',
        data: heatmapData
      });

      map.addLayer(
        {
          id: 'complaints-heat',
          type: 'heatmap',
          source: 'complaints',
          maxzoom: 15,
          paint: {
            // increase weight as diameter height increases
            'heatmap-weight': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [1, 0],
                [62, 1]
              ]
            },
            // increase intensity with zoom
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3]
              ]
            },
            // assign color values based on their density
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(236,222,239,0)',
              0.2,
              'rgb(208,209,230)',
              0.4,
              'rgb(166,189,219)',
              0.6,
              'rgb(103,169,207)',
              0.8,
              'rgb(28,144,153)'
            ],
            // increase radius based on zoom
            'heatmap-radius': {
              stops: [
                [1, 1],
                [15, 15]
              ]
            },
            // decrease opacity to transition into the circles
            'heatmap-opacity': {
              default: 1,
              stops: [
                [14, 1],
                [15, 0]
              ]
            }
          }
        },
        'waterway-label'
      );

      map.addLayer(
        {
          id: 'complaints-circle',
          type: 'circle',
          source: 'complaints',
          minzoom: 14,
          paint: {
            // increase the radius of the circle as the zoom level increases
            'circle-radius': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [{ zoom: 15, value: 1 }, 5],
                [{ zoom: 15, value: 62 }, 10],
                [{ zoom: 22, value: 1 }, 20],
                [{ zoom: 22, value: 62 }, 50]
              ]
            },
            'circle-color': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [0, 'rgba(236,222,239,0)'],
                [10, 'rgb(236,222,239)'],
                [20, 'rgb(208,209,230)'],
                [30, 'rgb(166,189,219)'],
                [40, 'rgb(103,169,207)'],
                [50, 'rgb(28,144,153)'],
                [60, 'rgb(1,108,89)']
              ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': {
              stops: [
                [14, 0],
                [15, 1]
              ]
            }
          }
        },
        'waterway-label'
      );
    });
  };

  useEffect(() => {
    window
      .fetch('https://data.cityofnewyork.us/resource/erm2-nwe9.json')
      .then(res => res.json())
      .then(data => {
        const heatmapData = geoJSONGenerator(data);
        const iconCoordinates = [-73.986, 40.758];

        mapbox(heatmapData, iconCoordinates);
      })
  }, []);

  return (
    <div
      ref={el => {
        mapContainer = el;
      }}
      className="mapContainer"
    />
  );
};

export default Heatmap
