require('dotenv').config();
const mongoose = require('mongoose');
const Campground = require('../models/campground.js');
const cities = require('./cities.js');
const { descriptors, places } = require('./seedHelpers.js');

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log('Database connected');
  },
  (error) => {
    console.error.bind(console, 'connection error:');
  }
);

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });

    await camp.save();
  }
  console.log('Seeding completed!');
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('Disconnected from the Database.');
});
