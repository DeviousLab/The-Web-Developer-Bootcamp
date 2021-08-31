const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  usecreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '612d7cf150b56f0c3ce5146c',
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus ullam optio quisquam excepturi ipsum nisi ab molestias expedita pariatur nostrum mollitia vel, accusamus non voluptatum aperiam aliquam architecto impedit consectetur.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/deviouslab/image/upload/v1630363163/YelpCamp/wkdklrmtaviayb2a2d24.jpg',
          filename: 'YelpCamp/wkdklrmtaviayb2a2d24'
        },
        {
          url: 'https://res.cloudinary.com/deviouslab/image/upload/v1630363167/YelpCamp/vua0b2ukksqymqymhxyo.jpg',
          filename: 'YelpCamp/vua0b2ukksqymqymhxyo'
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
