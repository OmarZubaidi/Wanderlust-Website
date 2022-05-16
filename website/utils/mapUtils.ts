import L from 'leaflet';
import { EventType } from '../types/event.type';
import { Hotel } from '../types/hotel.type';

export const barcelonaMarker = () => {
  return L.icon({
    iconUrl: '/assets/Barcelona.png',
    iconSize: [40, 60], // size of the icon
    iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
};

export const hotelMarker = () => {
  return L.icon({
    iconUrl: '/assets/hotelMarker.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
};

export const createTileLayer = (map: L.Map) => {
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoiYXNkYXdlcSIsImEiOiJjbDJyZHF6a3EwNTFsM2xwZ3lnMG54OGcwIn0.SM5YMAIJYOM6d2Q6jTxhZw',
    }
  ).addTo(map);
};

export const onMapClick = (
  e: any,
  icon: L.Icon,
  map: L.Map,
  popup: L.Popup
) => {
  console.log(e.latlng);
  var marker = L.marker([e.latlng.lat, e.latlng.lng], {
    icon,
  }).addTo(map);
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  popup
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(map);
};

export const createMarker = (
  eventItem: EventType,
  icon: L.Icon,
  map: L.Map
) => {
  const marker = L.marker([eventItem.latitude, eventItem.longitude], {
    icon,
  }).addTo(map);
  marker.bindPopup(eventItem.title);
};

export const createHotelMarker = (hotel: Hotel, icon: L.Icon, map: L.Map) => {
  const marker = L.marker([hotel.latitude, hotel.longitude], {
    icon,
  }).addTo(map);
  marker.bindPopup(hotel.name);
};
