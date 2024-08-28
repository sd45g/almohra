
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const advertisementSchema = new Schema({
    
    adImage: {
        type: String,// URL or image path
        required: true,
    }, 
    admin_id: {
        type: Schema.Types.ObjectId,// Admin reference
        ref: 'User',
        required: true
    }, 
    
}, {
    timestamps: true,
  });

module.exports = mongoose.model('Advertisement', advertisementSchema);
