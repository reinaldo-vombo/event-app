import { LatLng } from 'leaflet'
import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, } from 'react-leaflet'
type LocationMapProps = {
   onLocationSelect: (lat: number, lng: number) => void;
};
const LocationMap = ({ onLocationSelect }: LocationMapProps) => {
   const [position, setPosition] = useState<LatLng | null>(null);
   function LocationMarker() {
      const map = useMapEvents({
         click(e) {
            const { lat, lng } = e.latlng;
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            onLocationSelect(lat, lng);
         },
      });

      return position === null ? null : (
         <Marker position={position}>
            <Popup>
               Selected Location: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
            </Popup>
         </Marker>
      );
   }
   return (
      <div>
         <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: 80, width: 80 }}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <Marker position={[51.505, -0.09]}>
               <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
            </Marker>
         </MapContainer>
      </div>
   )
}

export default LocationMap
