import { DataTypes, Model, Sequelize } from "sequelize";

export class Users extends Model {}

export function init_users(sequelizeInstance: Sequelize) {
    Users.init({
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        pwdhash: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        sequelize: sequelizeInstance,
        modelName: 'Users',
        timestamps: false
    });
}