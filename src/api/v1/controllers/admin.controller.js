const { default: mongoose } = require("mongoose");
const KYC = require("../../../models/Kyc");
const User = require("../../../models/User");

exports.viewKycList = async (req, res) => {
    const { status, page = 1, limit = 10 } = req.query;
    try {
        const filter = {};
        if (status) {
            filter.kycStatus = status;
        }
        console.log(`filter ${filter.kycStatus}`);
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const kycList = await KYC.paginate(filter, options);
        res.status(200).json({
            message: 'KYC records.',
            data: kycList?.docs,
            pagination: {
                totalRecords: kycList.totalDocs,
                currentPage: kycList.page,
                totalPages: kycList.totalPages,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.approveKyc = async (req, res) => {
    const { kycId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(kycId)) {
            return res.status(400).json({ message: 'Invalid KYC ID format' });
        }

        if (!kycId) {
            return res.status(404).json({ message: 'KYC submission is not found' });
        }
        const kyc = await KYC.findById(kycId);

        kyc.kycStatus = 'approved';
        await kyc.save();

        res.status(200).json({
            message: 'KYC submission approved.',
            data: kyc
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


exports.getKPI = async (req, res) => {
    try {
        const [totalUsers, kycStatusCount] = await Promise.all([
            User.countDocuments(),
            KYC.aggregate([
                {
                    $group: {
                        _id: "$kycStatus",
                        count: { $sum: 1 }  
                    }
                }
            ])
        ]);

        res.status(200).json({
            message: 'Compliance KPIs.',
            data: {
                totalUsers,
                kycStatus: kycStatusCount
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

