import { useEffect, useState } from "react";
import {
  Map,
  Marker,
  MarkerDragEvent,
  ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CoordinatesType } from "./AdressForm";
import { MapPinHouse } from "lucide-react";
import { env } from "@/env";

interface MapboxTypes {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  handlesetCoordinates: ({ latitude, longitude }: CoordinatesType) => void;
}

export default function Mapbox({
  coordinates,
  handlesetCoordinates,
}: MapboxTypes) {
  const [viewport, setViewport] = useState({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    zoom: 14,
    width: "100%",
    height: "100%",
  });

  const [marker, setMarker] = useState({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  });

  const handleSetViewport = (e: ViewStateChangeEvent) => {
    setViewport((state) => ({
      ...state,
      latitude: e.viewState.latitude,
      longitude: e.viewState.longitude,
      zoom: e.viewState.zoom,
    }));
  };

  const handleMarkerDragEnd = (event: MarkerDragEvent) => {
    const { lng, lat } = event.lngLat;

    setMarker({
      latitude: lat,
      longitude: lng,
    });

    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat,
      longitude: lng,
    }));
  };

  useEffect(() => {
    handlesetCoordinates({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    });
  }, [handlesetCoordinates, viewport]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center">
        Ajuste o ponteiro para melhor precisão de localização
      </h1>
      <Map
        {...viewport}
        onMove={(e) => handleSetViewport(e)}
        style={{ width: "100%", height: "38vh", borderRadius: ".8rem" }}
        mapStyle={env.VITE_MAP_STYLE}
        mapboxAccessToken={env.VITE_MAPBOX_ACESS_TOKEN}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        >
          <div style={{ color: "red", fontSize: "20px" }}>
            <MapPinHouse />
          </div>
        </Marker>
      </Map>
    </div>
  );
}
