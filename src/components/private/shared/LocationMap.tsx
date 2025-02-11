'use client'
import { LatLng } from 'leaflet'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

type LocationMapProps = {
   onLocationSelect?: (lat: number, lng: number) => void;
   currentPosition: {
      lat: number,
      lng: number,
   }
   formField?: {
      value: {
         latitude: number,
         longitude: number,
      }
      onChange: (location: LatLng) => void
   }
};

const LocationMap = ({ formField, currentPosition }: LocationMapProps) => {
   const [position, setPosition] = useState<{ lat: number; lng: number; name?: string }>(
      currentPosition || { lat: 51.505, lng: -0.09 }
   )
   useEffect(() => {
      if (position.lat && position.lng) {
         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`)
            .then((res) => res.json())
            .then((data) => {
               const placeName = data.display_name || "Unknown Location";
               setPosition((prev) => ({ ...prev, name: placeName }));
               // formField?.onChange({ ...position, name: placeName });
            })
            .catch((error) => console.error("Reverse Geocoding Error:", error));
      }
   }, [position.lat, position.lng]);
   console.log(currentPosition);


   function LocationMarker() {
      const map = useMapEvents({
         click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            formField?.onChange(e.latlng)
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
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%", borderRadius: "10px" }}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <LocationMarker />
         <Marker position={position}>
            <Popup>
               A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
         </Marker>
      </MapContainer>
   )
}

export default LocationMap
