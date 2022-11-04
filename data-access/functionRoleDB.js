const { Role } = require('../models');
const Sequelize = require('sequelize');

async function findOneRoleByID(id) {
    const role = await Role.findOne({
        where: {
            id: id,
        },
    });
    return role;
}

async function findOneRoleByName(name) {
    const role = await Role.findOne({
        where: {
            roleName: name,
        },
    });
    return role;
}

module.exports = { findOneRoleByID, findOneRoleByName };