const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('image', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        dream_world: {
            type: DataTypes.STRING,
            allowNull: false
        },
        home: {
            type: DataTypes.STRING
        },
        artwork: {
            type: DataTypes.STRING
        }
    }, {timestamps: false})
}