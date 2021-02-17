export interface BandItem {
    id: number,
    name: string,
    imgid: string
}

export interface BandDetail {
    id?: number,
    name: string,
    genres: string[],
    active: string,
    members: string[],
    samplevids: string[],
    imgid: string,
    exmembers: string[]
}