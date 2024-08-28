const Report = require('../models/Report');

// Create a new report
exports.createReport = async (req, res) => {
    try {
        const { reservation_id, recipient_name, amountPaid, total_amount, paymentMethod, remainingAmount, finalPaymentDate, user_id } = req.body;
        
        const newReport = new Report({
            reservation_id,
            recipient_name,
            amountPaid,
            total_amount,
            paymentMethod,
            remainingAmount,
            finalPaymentDate,
            user_id
        });

        await newReport.save();

        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create report', error });
    }
};

// Get all reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('reservation_id', 'customerName bookingDate')
            .populate('user_id', 'name');
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reports', error });
    }
};

// Get a specific report by ID
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id)
            .populate('reservation_id', 'customerName bookingDate')
            .populate('user_id', 'name');
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve report', error });
    }
};

// Update a report by ID
exports.updateReport = async (req, res) => {
    try {
        const { reservation_id, recipient_name, amountPaid, total_amount, paymentMethod, remainingAmount, finalPaymentDate, user_id } = req.body;

        const report = await Report.findByIdAndUpdate(
            req.params.id,
            { reservation_id, recipient_name, amountPaid, total_amount, paymentMethod, remainingAmount, finalPaymentDate, user_id },
            { new: true }
        );

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update report', error });
    }
};

// Delete a report by ID
exports.deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete report', error });
    }
};
