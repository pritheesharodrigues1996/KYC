const KYC = require("../../../models/Kyc");
const userService = require('../../../services/user.service');
const kycService = require('../../../services/kyc.service');

exports.submitKyc = async (req, res) => {
  const { name, email } = req.body;
  try {
    const id = req.user.userId;
    let user = await userService.findUser(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const existingKYC = await kycService.findKycDetails(id)
    if (existingKYC) {
      return res.status(400).json({ message: 'KYC already submitted.' });
    }
    else {
      const kyc = new KYC({
        user: id,
        name,
        email,
        idDocument: req.file.path,
      });

      await kyc.save();

      res.status(200).json({
        message: 'KYC submitted successfully.',
        kycDetails: kyc,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

