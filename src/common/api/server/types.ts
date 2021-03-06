export interface GetNewAccessToken{
        (refreshToken: string): Promise<GetNewAccessTokenResponse>
}

export interface GetNewAccessTokenResponse{
    access_token: string
}

export interface FindTrack{
    (files: Array<File>, callback: (results: Array<FindTrackResult>) => void): void
}

export interface FindTrackResponse{
    results: Array<FindTrackResult>
}

interface MulterFile {
    buffer: {
        type: "Buffer" | string
        data: number[]
    }, 
    encoding: string, 
    fieldname: string, 
    mimetype: string, 
    originalname: string, 
    size: number;
}

export type FindTrackResult = {
    file: MulterFile
    track: {
        id: string;
        name: string;
        artists?: Array<TrackArtist>;
        duration?: number;
    } | null
}

export interface TrackArtist {
    id: string;
    name: string;
    joinphrase?: string;
}