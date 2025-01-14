const KYC = require("../models/Kyc");

const findKycDetails = async (id)=>{
    console.log(`userId ${id}`);
    const kycDetails = await KYC.findOne({ user: id});
    return kycDetails;
}

module.exports = {findKycDetails}