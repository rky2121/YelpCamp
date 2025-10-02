const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});
const { cloudinary } = require('../cloudinary');
const mongoose = require('mongoose')

module.exports.index = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; 
    const skip = (page - 1) * limit;

    const campgrounds = await Campground.find({})
        .skip(skip)
        .limit(limit);

    const total = await Campground.countDocuments();

    res.render('campgrounds/index', {
        campgrounds,
        mapboxToken: process.env.MAPBOX_TOKEN_CLIENT,
        activePage: 'campgrounds',
        bodyClass: 'campgrounds-page', 
        page,
        total,
        limit,
        totalPages: Math.ceil(total / limit)
    });
};

module.exports.renderNewForm = (req,res) =>{
    res.render('campgrounds/new', { 
        activePage: 'campgrounds',
        bodyClass: 'add-page'
    });
}

module.exports.createCampground = async(req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async(req,res) =>{
    const { id } = req.params;

    // populates both reviews and author of each review
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash('error', 'Invalid Campground ID!');
        return res.redirect('/campgrounds');
    }
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author'); // populates author of the campground
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {
        campground, 
        mapboxToken: process.env.MAPBOX_TOKEN_CLIENT, 
        activePage: 'campgrounds',
        bodyClass: 'campgrounds-page show-page'
    });
}

module.exports.renderEditForm = async(req,res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {
        campground, 
        activePage: 'campgrounds',
        bodyClass: 'campgrounds-page edit-page'
    });
}

module.exports.updateCampground = async (req, res) =>{
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        } 
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}