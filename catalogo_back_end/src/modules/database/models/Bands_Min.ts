import { DataTypes, Model, Sequelize } from "sequelize";

export class Bands_Min extends Model {}

export function init_bands_min(sequelizeInstance: Sequelize) {
    Bands_Min.init({
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imgid: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize: sequelizeInstance,
        modelName: 'Bands_Min',
        timestamps: false
    })
}