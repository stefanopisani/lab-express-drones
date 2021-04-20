const express = require('express');
const Drone = require('../models/Drone.model');

// require the Drone model here

const router = express.Router();

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const dronesFromDB = await Drone.find();
    res.render('drones/list', {
      dronesFromDB
    });
  } catch (e) {
    res.render('error');
    console.log(`An error occurred ${e}`);
  }
});

router.get('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    res.render('drones/create-form');
  } catch (e) {
    res.render('error');
    console.log(`An error occurred ${e}`);
  }
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const {
      name,
      propellers,
      maxSpeed
    } = req.body;
    await Drone.create({
      name,
      propellers,
      maxSpeed
    });
    res.redirect('/drones');
  } catch (e) {
    res.render('error');
    console.log(`An error occurred ${e}`);
  }

});

router.get('/drones/:droneId/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const drone = await Drone.findById(req.params.droneId);
    res.render('drones/update-form', {
      drone
    });
  } catch (e) {
    res.render('error');
    console.log(`An error occurred ${e}`);
  }
});

router.post('/drones/:droneId/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const droneId = req.params.droneId;
    const {
      name,
      propellers,
      maxSpeed
    } = req.body;
    await Drone.findByIdAndUpdate(droneId, {
      name,
      propellers,
      maxSpeed
    });
    console.log('updated drone with id:' + droneId);
    res.redirect('/drones');
  } catch (e) {
    res.render('error');
    console.log(`An error occurred ${e}`);
  }
});

router.post('/drones/:droneId/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  const droneId = req.params.droneId;
  await Drone.findByIdAndDelete(droneId);
  console.log('deleted drone with id:' + droneId);
  res.redirect('/drones');
});

module.exports = router;