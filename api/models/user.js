'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A name is required'
                },
                notEmpty: {
                    msg: 'Please provide name'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A name is required'
                },
                notEmpty: {
                    msg: 'Please provide name'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email already exists'
            },
            validate: {
                notNull: {
                    msg: 'A email is required'
                },
                isEmail: {
                    msg: 'Please provide email'
                }
            }
        },
        password: {
            type: DataTypes.STRING, // set a virtual field
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide password'
                },
                // len: {
                //     args: [8, 40],
                //     msg: 'Must be in range of 8-20 characters'
                // }
            },
            // confirmedPassword: { // new attribute
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     set(val) {
            //         if (val === this.password) {
            //             const hashedPassword = bcrypt.hashSync(val, 10);
            //             this.setDataValue('confirmedPassword', hashedPassword);
            //         }
            //     },
            //     validate: {
            //         notNull: {
            //             msg: 'Both passwords must match'
            //         }
            //     }
            // }
        }
    },{ sequelize });
    User.associate = (models) => {
        User.hasMany(models.Course, { foreignKey: 'userId' });
    };

    return User;
};
