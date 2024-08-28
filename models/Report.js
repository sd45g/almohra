//التقارير التي يمكن إنشاؤها لإدارة المعلومات المالية المتعلقة بالحجوزات.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true,
    },
    recipient_name: {
        type: String,
        required: true,
    },
    amountPaid: {
        type: Boolean,
        default: false,
    },
    total_amount: {
        type: Number,
        required: true,
      },
      
    paymentMethod:
    {
        type: String,
        enum: ['cash', 'card'],
        required: true
    },
   
    remainingAmount: {
        type: Number,
        required: true
    },
    finalPaymentDate: {
        type: Date,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }, // Admin reference
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
  });

module.exports = mongoose.model('Report', reportSchema);


  

  
 

