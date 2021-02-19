const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = require('mongoose');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
});

const options = { toJSON: { virtuals: true }};

const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
},options);

campgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>`;
});

campgroundSchema.post('findOneAndDelete', async function(doc){
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', campgroundSchema);