const Decoration = require('../models/Decoration');

// إنشاء ديكور جديد
exports.createDecoration = async (req, res) => {
    try {
        const { name, classification, status, picture, admin_id } = req.body;
        
        const newDecoration = new Decoration({
            name,
            classification,
            status,
            picture,
            admin_id
        });

        await newDecoration.save();

        res.status(201).json(newDecoration);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create decoration', error });
    }
};

// جلب جميع الديكورات
exports.getAllDecorations = async (req, res) => {
    try {
        const decorations = await Decoration.find().populate('admin_id', 'name');
        res.status(200).json(decorations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve decorations', error });
    }
};

// جلب ديكور معين باستخدام ID
exports.getDecorationById = async (req, res) => {
    try {
        const decoration = await Decoration.findById(req.params.id).populate('admin_id', 'name');
        if (!decoration) {
            return res.status(404).json({ message: 'Decoration not found' });
        }
        res.status(200).json(decoration);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve decoration', error });
    }
};

// تحديث ديكور باستخدام ID
exports.updateDecoration = async (req, res) => {
    try {
        const { name, classification, status, picture, admin_id } = req.body;

        const decoration = await Decoration.findByIdAndUpdate(
            req.params.id,
            { name, classification, status, picture, admin_id },
            { new: true }
        );

        if (!decoration) {
            return res.status(404).json({ message: 'Decoration not found' });
        }

        res.status(200).json(decoration);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update decoration', error });
    }
};

// حذف ديكور باستخدام ID
exports.deleteDecoration = async (req, res) => {
    try {
        const decoration = await Decoration.findByIdAndDelete(req.params.id);
        if (!decoration) {
            return res.status(404).json({ message: 'Decoration not found' });
        }
        res.status(200).json({ message: 'Decoration deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete decoration', error });
    }
};
