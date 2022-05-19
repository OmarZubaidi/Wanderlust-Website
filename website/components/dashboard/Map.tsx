import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
import {
  createMarker,
  createTileLayer,
  eventMarker,
  flightMarker,
  hotelMarker,
  restaurantMarker,
} from '../../utils/mapUtils';
import { EventType } from '../../types/event.type';
import { TripProps } from '../../types/tripProp';

type MapProps = TripProps & {
  events: EventType[];
};

const Map = ({ events, trip }: MapProps) => {
  useEffect(() => {
    const map: L.Map = L.map('map').setView(
      [trip.latitude, trip.longitude],
      14
    );
    createTileLayer(map);
    const bcnIcon = eventMarker();
    const hotelIcon = hotelMarker();
    const restaurantIcon = restaurantMarker();
    const flightIcon = flightMarker();
    const popup = L.popup();
    events.forEach((eventItem: EventType) => {
      if (eventItem.type === 'RESTAURANT') {
        createMarker(eventItem, restaurantIcon, map);
      } else if (eventItem.type === 'FLIGHT') {
        createMarker(eventItem, flightIcon, map);
      } else if (eventItem.type === 'HOTEL') {
        createMarker(eventItem, hotelIcon, map);
      } else {
        createMarker(eventItem, bcnIcon, map);
      }
    });

    return () => {
      map.remove();
    };
  }, [trip]);

  return <div id='map'></div>;
};

export default Map;
