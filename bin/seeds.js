// Iteration #1

const mongoose = require('mongoose');
const Drones = require('../models/Drone.model');

// require database configuration
require('../configs/db.config');

const drones = [{
        name: 'Creeper XL 500',
        propellers: 3,
        maxSpeed: 12
    },
    {
        name: 'Racer 57',
        propellers: 4,
        maxSpeed: 20
    },
    {
        name: 'Courier 3000i',
        propellers: 6,
        maxSpeed: 18
    }
];

Drones.create(drones).then((dronesFromDB) => {
    console.log('Created ' + dronesFromDB.length + ' drones');
    mongoose.connection.close();
}).catch(e => console.log(`An error occurred while creating drons from the DB: ${e}`));

//npm run bin/seeds.js