/**
 * Pinpoint Map
 * Map used in /addmemory , so user can locate memory
 *
 */

// --- IMPORTS ---
import React, {useEffect, useState} from 'react';
import { InteractiveMap, Marker, NavigationControl } from 'react-map-gl';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';

// --- ICON INFO ---
const selectedIcon: string = '/images/marker-icon-red.png';
const iconSize: any = { width: 25, height: 41 };

// --- STYLES ---
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selectedMarker: {
            backgroundImage: `url(${selectedIcon})`,
            backgroundSize: '',
            width: `${iconSize.width}px`,
            height: `${iconSize.height}px`,
            //border-radius: 50%,
            cursor: 'pointer',
            backgroundRepeat: 'no-repeat',
        },
    }),
);

// --- COMPONENT ---
interface IPinpointMap {
    startPosition: number[];
    handleClickPositionCallback(position: number[]): void;
}

const PinpointMap: React.FC<IPinpointMap> = ({
    startPosition,
    handleClickPositionCallback,
}) => {
    //Contexts
    const classes = useStyles();

    //States
//    const [latitude, setLatitude] = React.useState( (originalPosition[0]));
//    const [longitude, setLongitude] = React.useState((originalPosition[1]));
    const [latitude, setLatitude] = React.useState( startPosition[0] | 60.455);
    const [longitude, setLongitude] = React.useState(startPosition[1] | 22.26);
//    const [marker, setMarker] = React.useState(null);
    const [marker, setMarker] = React.useState({
        longitude: longitude,
        latitude: latitude,
        offsetLeft: -iconSize.width / 2,
        offsetTop: -iconSize.height,
    });
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: 13,
        bearing: 0,
        pitch: 0,
    });

/*    useEffect(() => {
        if (originalPosition!=null){
            setMarker({
                longitude: originalPosition[0],
                latitude: originalPosition[1],
                offsetLeft: -iconSize.width / 2,
                offsetTop: -iconSize.height,
            });
        }
            //setMarkerPosition([memory.position[0], memory.position[1]]);
 //           setMarkerPosition([memory.position.coordinates[0], memory.position.coordinates[1]]);
            //setMarkerPosition([60.455, 22.26]);
            //latitude: memory.position.coordinates[0],
            //    longitude: memory.position.coordinates[1],
    }, []);
*/
    //Vars

    const mapStyle = {
        "version": 8,
        "name": "OSM",
        "metadata": {},
        "sources": {
            "osm": {
                type: 'raster',
                tiles: ["https://maptiles.turku.fi/styles/hel-osm-bright/{z}/{x}/{y}.png"],
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

    //Functions
    const handleClick = ({ lngLat: [longitude, latitude] }) => {
        setMarker({
            longitude,
            latitude,
            offsetLeft: -iconSize.width / 2,
            offsetTop: -iconSize.height,
        });
        handleClickPositionCallback([longitude, latitude]); //Callback
    };

    return (
        <InteractiveMap
            onClick={handleClick}
            {...viewport}
            mapStyle={mapStyle}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            width="40vw"
            height="40vh"
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
            {/* Marker */}
            {marker !== null ? (
                <Marker {...marker} className={classes.selectedMarker} />
            ) : null}
        </InteractiveMap>
    );
};

export default PinpointMap;
