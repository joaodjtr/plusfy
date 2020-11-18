import { IDisabledTracks } from "../../../common/api/disabledTracks/types";

export const DISABLED_TRACKS = 'DISABLED_TRACKS'

export interface IDisabledTracks_action{
    type: string
    payload: IDisabledTracks
}