const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i < 50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '602bd9ab2bc49cbeb3ed8232',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam officia voluptatum corporis quasi deleniti ea earum cupiditate, dignissimos ratione quas ipsum unde temporibus labore quidem, et est, doloremque accusantium incidunt.',
            price,
            geometry: {
                type: "Point",
                coordinates: [-11.1331,47.0202]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dzyq7y0og/image/upload/v1613579115/YelpCamp/vfazndncge6glscy2rz5.jpg',
                  filename: 'YelpCamp/vfazndncge6glscy2rz5'
                },
                {
                  url: 'https://res.cloudinary.com/dzyq7y0og/image/upload/v1613579115/YelpCamp/xtigfyk6xsnwbfvigmd4.jpg',
                  filename: 'YelpCamp/xtigfyk6xsnwbfvigmd4'
                }
              ]
        });
        await camp.save();
    };
}

seedDB().then(() => {
    mongoose.connection.close();
})