const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '68d4d59d71a738b80cd8646e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:  `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium repellendus ipsam in iste dolores, error a soluta quis! Officiis odio voluptate nemo nostrum modi ab ipsam error eligendi, harum voluptatibus?',
            price,
            geometry: { 
                type: "Point", 
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dcbthvnv4/image/upload/v1759000906/YelpCamp/spn1j7zzgwxuulvodwlg.jpg',
                    filename: 'YelpCamp/spn1j7zzgwxuulvodwlg',
                },
                {
                    url: 'https://res.cloudinary.com/dcbthvnv4/image/upload/v1759000906/YelpCamp/r6vbfgyx5n937dyuxnuj.jpg',
                    filename: 'YelpCamp/r6vbfgyx5n937dyuxnuj',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

