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

  // Estado para armazenar as coordenadas do marcador
  const [marker, setMarker] = useState({
    latitude: coordinates.latitude, // Latitude inicial
    longitude: coordinates.longitude, // Longitude inicial
  });

  const handleSetViewport = (e: ViewStateChangeEvent) => {
    setViewport((state) => ({
      ...state,
      latitude: e.viewState.latitude,
      longitude: e.viewState.longitude,
      zoom: e.viewState.zoom,
    }));
  };

  // Função para lidar com o movimento do marcador e atualizar as coordenadas
  const handleMarkerDragEnd = (event: MarkerDragEvent) => {
    const { lng, lat } = event.lngLat; // Acessando longitude (lng) e latitude (lat) diretamente

    // Atualiza as coordenadas do marcador no estado
    setMarker({
      latitude: lat, // Atualiza a latitude
      longitude: lng, // Atualiza a longitude
    });

    // Atualiza o estado do viewport para centralizar o mapa na nova posição
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat, // Atualiza a latitude no viewport
      longitude: lng, // Atualiza a longitude no viewport
    }));
  };

  useEffect(() => {
    handlesetCoordinates({
      latitude: viewport.latitude, // Atualiza a latitude
      longitude: viewport.longitude, // Atualiza a longitude
    });
  }, [handlesetCoordinates, viewport]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center">
        Ajuste o ponteiro para melhor precisão de localização
      </h1>
      <Map
        {...viewport} // Passando diretamente o estado do viewport
        onMove={(e) => handleSetViewport(e)} // Atualiza o estado do mapa com o movimento
        style={{ width: "100%", height: "38vh", borderRadius: ".8rem" }}
        // O mapa ocupa 80% da largura e altura da tela
        mapStyle="mapbox://styles/chromepix/cm40h8gny00ja01qrgi5jbhpg" // Estilo do mapa
        mapboxAccessToken="pk.eyJ1IjoiY2hyb21lcGl4IiwiYSI6ImNtNDBka2c2ZDJhZmUydm85bmhub3VwMXEifQ.TLlqRcumaEHTyHv0PERWQQ" // Substitua pelo seu token válido
      >
        {/* Marker arrastável */}
        <Marker
          latitude={marker.latitude} // Usando a latitude atualizada
          longitude={marker.longitude} // Usando a longitude atualizada
          draggable={true} // Torna o marcador arrastável
          onDragEnd={handleMarkerDragEnd} // Atualiza as coordenadas ao soltar o marcador
        >
          <div style={{ color: "red", fontSize: "20px" }}>
            <MapPinHouse />
          </div>
        </Marker>
      </Map>
    </div>
  );
}
