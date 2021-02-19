export interface AddBandRequestTemplate {
    name: string,
    genres: string[],
    active: string,
    members: string[],
    samplevids: string[],
    exmembers: string[]
    imagedata: string,
}

export interface BandDetail {
    id: number,
    name: string,
    genres: string,
    active: string,
    members: string,
    imglink: string,
    exmembers: string
}

export interface BandDetailResponse {
    id: number,
    name: string,
    genres: string[],
    active: string,
    members: string[],
    samplevids: string[],
    imgid: string,
    exmembers: string[]
}

export interface BandItem {
    id: number,
    name: string,
    imglink: string
}