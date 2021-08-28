const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	usecreateIndex: true,
	useUnifiedTopology: true
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
			author: '61298b95edf9623e2806927a',
			location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			image: `https://source.unsplash.com/collection/483251`,
			description:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus ullam optio quisquam excepturi ipsum nisi ab molestias expedita pariatur nostrum mollitia vel, accusamus non voluptatum aperiam aliquam architecto impedit consectetur.',
            price
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
