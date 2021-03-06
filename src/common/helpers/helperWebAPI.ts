import { nextPlayer } from "../api/webapi/player";
import { Device } from "../api/webapi/types";

export const getHeaders = (accessToken: string) => {
    return {headers: {'Content-Type': 'application/json','Authorization': `Bearer ${accessToken}`}}
}

export const defineActiveDevice = (devices?: Array<Device>): Device | null => (
    devices ? devices.find(device => device.is_active) || devices[0] : null
)

// let skippedURI = ''

export const skipTrack = (uri: string, accessToken: string) => {
    nextPlayer({accessToken})

    // if(uri && uri !== skippedURI){
    //     nextPlayer({accessToken})
    //     skippedURI = ''
    // }
}

export const encodeSpaces = (string: string) => string.replace(' ', '%20')