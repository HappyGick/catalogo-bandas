import { DataTypes, Model, Sequelize } from "sequelize";

export class Genres extends Model {}

export function init_genres(sequelizeInstance: Sequelize) {
    Genres.init({
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize: sequelizeInstance,
        modelName: 'Genres',
        timestamps: false
    });
}