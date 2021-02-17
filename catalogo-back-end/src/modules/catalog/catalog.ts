import { BandDetail, BandItem } from "../../interfaces/catalog";
import { SQLRows } from "../../interfaces/general";
import { arrayToSqlStringList, sqlNumberListToArray, sqlStringListToArray } from "../../utils";
import { Bands } from "../database/models/Bands";
import { Bands_Min } from "../database/models/Bands_Min";
import { Genres } from "../database/models/Genres";

export async function getBandList(): Promise<SQLRows<BandItem>> {
    let dblist = await Bands_Min.findAll();

    let parsedlist: SQLRows<BandItem> = {};

    let len = dblist.length;
    for(let i = 0; i < len; ++i) {
        let item = dblist[i].get();
        parsedlist[item.Id] = {
            id: item.Id,
            name: item.Name,
            imgid: item.imgid
        };
    }

    return parsedlist;
}

export async function getBandDetail(id: number): Promise<BandDetail> {
    let detail = (await Bands.findByPk(id))?.get();

    return {
        id: detail.Id,
        name: detail.Name,
        genres: (detail.Genres !== null && detail.Genres !== '') ? await fromGenreSqlList(detail.Genres) : [],
        active: detail.Active,
        members: (detail.Members !== null && detail.Genres !== '') ? sqlStringListToArray(detail.Members) : [],
        samplevids: (detail.Samplevids !== null && detail.Samplevids !== '') ? sqlStringListToArray(detail.Samplevids) : [],
        imgid: detail.imgid,
        exmembers: (detail.Exmembers !== null && detail.Exmembers !== '') ? sqlStringListToArray(detail.Exmembers) : []
    }
}

export function addBand(band: BandDetail) {

}

export function deleteBand(id: number) {

}

async function getGenre(id: number): Promise<string> {
    return (await Genres.findByPk(id))?.get().Name
}

async function getGenreId(genre: string): Promise<number> {
    let genreId = await Genres.findOne({
        where: {
            Name: genre
        }
    });

    if(genreId === null) {
        return (await Genres.create({
            Name: genre
        })).get().Id;
    } else {
        return genreId.get().Id;
    }
}

async function fromGenreSqlList(sqllist: string): Promise<string[]> {
    let genrearray: string[] = [];
    let idlist: number[] = sqlNumberListToArray(sqllist);

    for(let i = 0; i < idlist.length; ++i) {
        genrearray.push(await getGenre(idlist[i]));
    }

    return genrearray;
}

async function toGenreSqlList(genreList: string[]): Promise<string> {
    let idarray: string[] = [];

    for (let i = 0; i < genreList.length; ++i) {
        idarray.push((await getGenreId(genreList[i])).toString());
    }

    return arrayToSqlStringList(idarray);
}