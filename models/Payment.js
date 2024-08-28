//سجل الدفع الذي يتعلق بالحجوزات.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true,
      },
    method: { type: String, enum: ['cash', 'card'], required: true },
    amountPaid: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    paymentDate: { type: Date, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);

