import { Model, DataTypes, Sequelize } from "sequelize";

export class Bands extends Model {}

export function init_bands (sequelizeInstance: Sequelize) {
    Bands.init({
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Genres: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Active: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Members: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Samplevids: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imgid: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Exmembers: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize: sequelizeInstance,
        modelName: 'Bands',
        timestamps: false
    });
}