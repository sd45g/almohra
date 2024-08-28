//الديكورات التي يمكن إضافتها من قبل المدير.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const decorationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    classification:
    {
        type: String,
        enum: ['birth', 'graduation', 'wedding'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    picture: {
        type: String,
        required: true,
    }, // URL or image path
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Admin reference
   
},{
    timestamps: true,
  });

module.exports = mongoose.model('Decoration', decorationSchema);
