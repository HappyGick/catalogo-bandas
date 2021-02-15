import { Sequelize } from 'sequelize';
import { init_bands } from './models/Bands';
import { init_bands_min } from './models/Bands_Min';
import { init_genres } from './models/Genres';

export const catalogDb = new Sequelize({ dialect: 'sqlite', storage: './db/catalog.db', define: { freezeTableName: true }});

export async function InitializeDatabases() {
    try {
        init_bands(catalogDb);
        init_bands_min(catalogDb);
        init_genres(catalogDb);
        await catalogDb.sync();
        console.log('Successfully initialized the database instances.');
    } catch (e) {
        console.log(e);
    }
}