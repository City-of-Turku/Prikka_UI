/**
 * Mapcontainer with mapbox
 * For Home page
 */

// --- IMPORTS ---
import React, { useState, useEffect } from 'react';
import ReactMapGl, {
    Marker,
    NavigationControl,
    FlyToInterpolator,
} from 'react-map-gl';
import { Memories, Memory } from '../types';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { easeCubic } from 'd3-ease';

// --- ICONS PROPERTIES ---
const normalIcon = '/images/marker-icon.png';
const selectedIcon = '/images/marker-icon-red.png';

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        marker: {
            backgroundImage: `url(${normalIcon})`,
            backgroundSize: 'contain',
            width: '25px',
            height: '41px',
            //border-radius: 50%,
            cursor: 'pointer',
            backgroundRepeat: 'no-repeat',
            position: 'absolute'
        },
        selectedMarker: {
            backgroundImage: `url(${selectedIcon})`,
            backgroundSize: 'contain',
            width: '25px',
            height: '41px',
            //border-radius: 50%,
            cursor: 'pointer',
            backgroundRepeat: 'no-repeat',
        },
    }),
);

// --- PROPS ---
interface IMapboxContainer {
    memories: Memories;
    selectedMemory: Memory;
    handleSelectMemory(memory: Memory): void;
}

// --- COMPONENT ---
const MapboxContainer: React.FC<IMapboxContainer> = ({
    memories,
    selectedMemory,
    handleSelectMemory,
}) => {
    //Contexts
    const classes = useStyles();

    //State
    const [viewport, setViewport] = useState({
        latitude: 60.455,
        longitude: 22.26,
        zoom: 13,
        bearing: 0,
        pitch: 0,
    });

    //Vars
    const mapStyle = {
        "version": 8,
        "name": "OSM",
        "metadata": {},
        "sources": {
            "osm": {
                type: 'raster',
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
                attribution: 'Map tiles by <a target="_top" rel="noopener" href="https://tile.openstreetmap.org/">OpenStreetMap tile servers</a>, under the <a target="_top" rel="noopener" href="https://operations.osmfoundation.org/policies/tiles/">tile usage policy</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>'
            }/*,
            "wms": {
                'type': 'raster',
                'tiles':[
                    'https://opaskartta.turku.fi/TeklaOGCWeb/WMS.ashx?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Opaskartta'
                ],
                'tileSize': 256
            }*/
        },
        layers: [
                    {
                        id: 'osm',
                        type: 'raster',
                        source: 'osm',
                    }/*,
            {
                id: 'wms-layer',
                type: 'raster',
                source: 'wms',
            }*/
        ],
    };
    const handleMarkerClick = (e, memory) => {
        e.preventDefault();
        handleSelectMemory(memory);
        setViewport({
            ...viewport,
            latitude: memory.position.coordinates[0],
            longitude: memory.position.coordinates[1],
        });
    };

    const renderMarkers = () => {
        return memories['rows'].map((memory) => {
            const markerClass =
                memory === selectedMemory
                    ? classes.selectedMarker
                    : classes.marker;
            return (
                <Marker
                    key={memory.id}
                    latitude={memory.position.coordinates[0]}
                    longitude={memory.position.coordinates[1]}
                >
                    <div
                        className={markerClass}
                        onClick={(e) => {
                            handleMarkerClick(e, memory);
                        }}
                    />
                </Marker>
            );
        });
    };

    const goToSelectedMemory = () => {
        const newViewport = {
            ...viewport,
            longitude: selectedMemory.position.coordinates[1],
            latitude: selectedMemory.position.coordinates[0],
            zoom: 14,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: easeCubic,
        };
        setViewport(newViewport);
    };

    //trigger on selected memory not null
    useEffect(() => {
        if (selectedMemory) {
            goToSelectedMemory();
        }
    }, [selectedMemory]);

    return (
        <ReactMapGl
            {...viewport}
            mapStyle={mapStyle}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            width="100vw"
            height="100vh"
            onViewportChange={setViewport}
        >
            {/* Controls */}
            <div
                style={{
                    position: 'absolute',
                    right: 30,
                    bottom: 30,
                }}
            >
                <NavigationControl showCompass={false} />
            </div>

            {/* Render markers */}
            {memories && memories.count !== 0 ? renderMarkers() : null}
        </ReactMapGl>
    );
};

export default MapboxContainer;
