require('dotenv').config();
const mongoose = require('mongoose');
const Campground = require('../models/campground.js');
const Reviews = require('../models/review.js');
const cities = require('./cities.js');
const axios = require('axios');
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

const seedImg = async () => {
  const client_id = process.env.UNSPLASH_AKEY;
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: client_id,
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
    const sampleIMG =
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
    return sampleIMG;
  }
};

const description =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, deserunt soluta? Quisquam deserunt voluptate corporis nemo explicabo ea itaque rem mollitia fuga beatae ex officia qui molestias, atque vel similique?';

let price = Math.floor(Math.random() * 20) + 10;

const seedDB = async () => {
  await Campground.deleteMany({});
  await Reviews.deleteMany({});
  console.log('Deleted all old DB entries.');
  console.log('Adding new DB entries, this will take a few seconds.');
  for (let i = 0; i < 20; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: '63663aa76b4749b0aaf72834',
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dbzea2vok/image/upload/v1668891543/YelpCamp/yd44otlpsxib42l8fjyv.png',
          filename: 'YelpCamp/yd44otlpsxib42l8fjyv',
        },
      ],
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description,
      price,
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.clear();
  console.log('Seeding completed!');
});
