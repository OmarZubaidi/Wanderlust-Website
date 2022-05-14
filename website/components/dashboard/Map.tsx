import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
import {
  barcelonaMarker,
  createMarker,
  createTileLayer,
  onMapClick,
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
    const bcnIcon = barcelonaMarker();
    const popup = L.popup();
    // map.on('click', (e: any) => onMapClick(e, bcnIcon, map, popup));
    events.forEach((eventItem: EventType) => {
      createMarker(eventItem, bcnIcon, map);
    });

    return () => {
      map.remove();
    };
  }, [trip]);

  return <div id='map'></div>;
};

export default Map;
