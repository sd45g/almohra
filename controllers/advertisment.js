// controllers/advertisementController.js
const Advertisement = require('../models/Advertisement');

// Create a new advertisement
exports.createAdvertisement = async (req, res) => {
    try {
        const { adImage, admin_id } = req.body;
        
        const newAdvertisement = new Advertisement({
            adImage,
            admin_id
        });

        await newAdvertisement.save();

        res.status(201).json(newAdvertisement);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create advertisement', error });
    }
};

// Get all advertisements
exports.getAllAdvertisements = async (req, res) => {
    try {
        const advertisements = await Advertisement.find().populate('admin_id', 'name');
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve advertisements', error });
    }
};

// Get a specific advertisement by ID
exports.getAdvertisementById = async (req, res) => {
    try {
        const advertisement = await Advertisement.findById(req.params.id).populate('admin_id', 'name');
        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.status(200).json(advertisement);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve advertisement', error });
    }
};

// Update an advertisement by ID
exports.updateAdvertisement = async (req, res) => {
    try {
        const { adImage, admin_id } = req.body;

        const advertisement = await Advertisement.findByIdAndUpdate(
            req.params.id,
            { adImage, admin_id },
            { new: true }
        );

        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        res.status(200).json(advertisement);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update advertisement', error });
    }
};

// Delete an advertisement by ID
exports.deleteAdvertisement = async (req, res) => {
    try {
        const advertisement = await Advertisement.findByIdAndDelete(req.params.id);
        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.status(200).json({ message: 'Advertisement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete advertisement', error });
    }
};
