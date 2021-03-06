export interface IWebAPIRequest{
    accessToken: string
}

export interface Playlists{
    items: Array<Playlist>
    limit: number
    next?: string
    offset: number
    previous?: string
    total: number
}

export interface Playlist{
    collaborative: boolean
    description: string
    external_urls: {
        spotify: string
    }
    followers: {
        href: string
        total: number
    }
    href: string
    id: string
    images: Array<Image>
    name: string
    owner: IUser
    public: boolean
    snapshot_id: string
    tracks: PlaylistTracks
    uri: string
}

export interface PlaylistTracks{
    href: string
    limit: number,
    next?: string
    previous?: string
    offset: number
    total: number
    items: Array<PlaylistTrack>
}

export interface PlaylistTrack{
    added_at: string
    added_by: IUser
    is_local: boolean
    track: Track
}

export interface Tracks{
    href: string
    limit: number,
    next?: string
    previous?: string
    offset: number
    total: number
    items: Array<Track>
}

export type Track = {
    album: IAlbum
    artists: Array<Artist>
    available_markets: Array<string>
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_urls: {
        spotify: string
    } 
    href: string
    id: string
    is_playlable: string
    name: string
    popularity: number
    preview_url?: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
} | null

export interface SavedTracks{
    href: string
    items: Array<ISavedTrack>
    limit: number
    next: string
    offset: number
    previous: string | null
    total: number
}

export interface ISavedTrack{
    added_at: string
    track: Track
}

export interface Artists{
    href: string
    items: Array<Artist>
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
}

export interface Artist{
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
    popularity: number
    genres: string[]
    images: Image[]
}

export interface Albums{
    href: string
    items: Array<IAlbum>
    limit: 20
    next: string | null
    offset: number
    previous: string | null
    total: number
}

export interface IAlbum{
    album_group?: string
    album_type: string
    artists: Array<Artist>
    available_markets: Array<string>
    external_urls:{
        spotify: string
    } 
    href: string
    id: string
    images: Array<Image>
    name: string
    release_date: string
    release_date_precision: string
    type: string
    uri: string
}

interface Shows{
    href: string
    items: Array<Show>
    limit: number
    next: string | null
    offset: number
    previous: string | null 
    total: number
}

export interface Show{
    available_markets: Array<string>
    copyrights: Array<{text: string, type: string}>
    description: string
    explicit: boolean
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: Array<Image>
    is_externally_hosted: boolean
    languages: Array<string>
    media_type: string
    name: string
    publisher: string
    type: 'show'
    uri: string
}

export interface Episodes{
    href: string
    items: Array<Episode>
    limit: number
    next: string | null
    offset: number
    previous: string | null 
    total: number
}

export interface Episode{
    audio_preview_url: string
    description: string
    duration_ms: number
    explicit: boolean
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: Array<Image>
    is_externally_hosted: boolean
    is_playable: boolean
    languages: Array<string>
    name: string
    release_date: string
    release_date_precision: string
    type: "episode"
    uri: string
}

export interface IUser{
    display_name?: string
    externals_urls: {spotify: string}
    followers: {}
    href: string
    id: string
    images: Array<Image>
    type: string
    uri: string
}

export interface Image{
    height: number
    width: number
    url: string
}

export interface IPlayer{
    timestamp?: number
    progress_ms?: number | null
    is_playing?: boolean
    currently_playing_type?: string
    actions?: {
        disallows: {
            interrupting_playback?: boolean
            resuming?: boolean
            pausing?: boolean
            seeking?: boolean
            skipping_next?: boolean
            skipping_prev?: boolean
            toggling_repeat_context?: boolean
            toggling_shuffle?: boolean
            toggling_repeat_track?: boolean
            transferring_playback?: boolean
        }
    }
    item?: Track
    shuffle_state?: boolean
    repeat_state?: "off" | "track" | "context" 
    context?: {
        external_urls: {
            spotify: string
        }
        href: string
        type: 'album' | 'artist' | 'playlist'
        uri: string
    }
    device?: Device
    devices?: Array<Device>
}

export interface Device{
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: "Computer" | "Tablet" | "Smartphone" | "Speaker" | "TV" | "AVR" | "STB" | "AudioDongle" | "GameConsole" | "CastVideo" | "CastAudio" | "Automobile" | "Unknown"
    volume_percent: number
}


export type SearchTypes = 'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode'
type SearchConfigs = {market?: string, limit?: number, offset?: number, include_external?: 'audio'}

export type SearchResult = {
    [key: string]: Albums | Tracks | Playlists | Artists | Shows | Episodes | undefined
    albums?: Albums
    tracks?: Tracks
    playlists?: Playlists
    artists?: Artists
    shows?: Shows
    episodes?: Episodes
}

export type Search = (accessToken: string, query: string, type: SearchTypes, configs?: SearchConfigs) => Promise<SearchResult>

export type SearchNextItems = (accessToken: string, nextURL: string, configs?: SearchConfigs) => Promise<SearchResult>

export type UserTopArtistsAndTracksTimeRange = 'long_term' | 'medium_term' | 'short_term'
export type UserTopArtistsAndTracksType = 'artists' | 'tracks'

export type UserTopArtistsAndTracksConfigs = {
    [key: string]: number | UserTopArtistsAndTracksTimeRange | undefined
    limit?: number,
    offset?: number,
    time_range?: UserTopArtistsAndTracksTimeRange
}

export type GetUserTopArtistsAndTracksResult<T> = {
    (arg: Track | Artist): T
    total: number
    limit: number
    offset: number
    previous: string | null
    href: string
    next: string | null
    items: T[]
}

export interface GetUserTopArtistsAndTracks{
    <T>(accessToken: string, type: UserTopArtistsAndTracksType, configs?: UserTopArtistsAndTracksConfigs): Promise<GetUserTopArtistsAndTracksResult<T> | undefined>
}

export interface GetNextUserTopArtistsAndTracks{
    <T>(accessToken: string, nextURL: string, configs?: UserTopArtistsAndTracksConfigs): Promise<GetUserTopArtistsAndTracksResult<T> | undefined>
}

export interface AudioFeature{
    danceability: number
    energy: number
    key: number
    loudness: number
    mode: number
    speechiness: number
    acousticness: number
    instrumentalness: number
    liveness: number
    valence: number
    tempo: number
    type: "audio_features"
    id: string
    uri: string
    track_href: string
    analysis_url: string
    duration_ms: number
    time_signature: number
}

export interface GetAudioFeatures{
    (accessToken: string, ids: string[]): Promise<{
        audio_features: AudioFeature[]
    }>
}

export interface GetTracks{
    (accessToken: string, ids: string[]): Promise<{
        tracks?: Track[]
    }> 
}

export interface GetRecommendations{
    (accessToken: string, configs: GetRecommendationsConfigs): Promise<GetRecommendationsResponse>
}

export interface GetRecommendationsConfigs{
    limit?: number
    market?: string
    seed_artists: string[]
    seed_tracks: string[]
    min_acousticness?: number
    max_acousticness?: number
    target_acousticness?: number
    min_danceability?: number
    max_danceability?: number
    target_danceability?: number
    min_duration_ms?: number
    max_duration_ms?: number
    target_duration_ms?: number
    min_energy?: number
    max_energy?: number
    target_energy?: number
    min_instrumentalness?: number
    max_instrumentalness?: number
    target_instrumentalness?: number
    min_key?: number
    max_key?: number
    target_key?: number
    min_liveness?: number
    max_liveness?: number
    target_liveness?: number
    min_loudness?: number
    max_loudness?: number
    target_loudness?: number
    min_mode?: number
    max_mode?: number
    target_mode?: number
    min_popularity?: number
    max_popularity?: number
    target_popularity?: number
    min_speechiness?: number
    max_speechiness?: number
    target_speechiness?: number
    min_tempo?: number
    max_tempo?: number
    target_tempo?: number
    min_time_signature?: number
    max_time_signature?: number
    target_time_signature?: number
    min_valence?: number
    max_valenece?: number
    target_valenece?: number
}

export interface GetRecommendationsResponse{
    tracks?: Track[]
    seeds?: Seed[]
}

export interface Seed{
    initialPoolSize: number
    afterFilteringSize: number
    afterRelinkingSize: number
    href: number
    id: number
    type: "track" | "artist"
}