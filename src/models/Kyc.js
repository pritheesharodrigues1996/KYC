
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const kycSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,

    },
    idDocument: {
        type: String,
        required: true,
    },
    kycStatus: {
        type: String,
        enum: ['submitted','approved', 'rejected'],
        default: 'submitted'
    }

}, {
    timestamps: true
});

kycSchema.plugin(mongoosePaginate);
const KYC = mongoose.model('Kyc', kycSchema);

module.exports = KYC

