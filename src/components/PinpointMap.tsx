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
    const [latitude, setLatitude] = React.useState( 60.455);
    const [longitude, setLongitude] = React.useState(22.26);
    const [marker, setMarker] = React.useState({
        longitude: longitude,
        latitude: latitude,
        offsetLeft: 0,
        offsetTop: 0,
    });
//    const [marker, setMarker] = React.useState({
//        longitude: longitude,
//        latitude: latitude,
//        offsetLeft: -iconSize.width / 2,
//        offsetTop: -iconSize.height,
//    });


//    const [marker, setMarker] = React.useState(null);
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: 13,
        bearing: 0,
        pitch: 0,
    });

    useEffect(() => {
        if (startPosition!=null){
            setLatitude(startPosition[0]);
            setLongitude(startPosition[1]);
        }
        /*if (startPosition!=null){
            setMarker({
                longitude: startPosition[1],
                latitude: startPosition[0],
                offsetLeft: -iconSize.width / 2,
                offsetTop: -iconSize.height,
            });*/
    }, []);


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
