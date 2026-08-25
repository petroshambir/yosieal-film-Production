import express from 'express';
import AdminNotebook from '../models/AdminNotebook.js';

const router = express.Router();

/*
=========================================================
GET ALL NOTEBOOK RECORDS
GET /api/notebook
=========================================================
*/

router.get('/', async (req, res) => {
  try {
    const notes = await AdminNotebook.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (err) {
    console.error(
      'Error fetching admin notebook:',
      err
    );

    res.status(500).json({
      success: false,
      message: 'Notebook data could not be loaded.',
    });
  }
});


/*
=========================================================
CREATE NEW NOTEBOOK RECORD
POST /api/notebook
=========================================================
*/

router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      bookingDate,
      packageName,
      packagePrice,
      tier,
      packageServices,
      packageFeatures,
      timestamp,
    } = req.body;

    if (
      !customerName ||
      !customerName.trim() ||
      !bookingDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Customer name and booking date are required.',
      });
    }

    const newNote = new AdminNotebook({
      customerName: customerName.trim(),

      bookingDate,

      packageName: packageName || '',

      packagePrice: packagePrice || '',

      tier: tier || '',

      packageServices:
        Array.isArray(packageServices)
          ? packageServices
          : [],

      packageFeatures:
        Array.isArray(packageFeatures)
          ? packageFeatures
          : [],

      timestamp:
        timestamp ||
        new Date().toLocaleString(),
    });

    const savedNote = await newNote.save();

    res.status(201).json({
      success: true,
      message:
        'Notebook record saved successfully.',
      note: savedNote,
    });
  } catch (err) {
    console.error(
      'Error creating notebook record:',
      err
    );

    res.status(500).json({
      success: false,
      message:
        'Notebook record could not be saved.',
    });
  }
});


/*
=========================================================
UPDATE NOTEBOOK RECORD
PUT /api/notebook/:id
=========================================================
*/

router.put('/:id', async (req, res) => {
  try {
    const {
      customerName,
      bookingDate,
      packageName,
      packagePrice,
      tier,
      packageServices,
      packageFeatures,
    } = req.body;

    const updatedNote =
      await AdminNotebook.findByIdAndUpdate(
        req.params.id,

        {
          customerName:
            customerName?.trim() || '',

          bookingDate:
            bookingDate || '',

          packageName:
            packageName || '',

          packagePrice:
            packagePrice || '',

          tier:
            tier || '',

          packageServices:
            Array.isArray(packageServices)
              ? packageServices
              : [],

          packageFeatures:
            Array.isArray(packageFeatures)
              ? packageFeatures
              : [],
        },

        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: 'Notebook record not found.',
      });
    }

    res.status(200).json({
      success: true,
      message:
        'Notebook record updated successfully.',
      note: updatedNote,
    });
  } catch (err) {
    console.error(
      'Error updating notebook record:',
      err
    );

    res.status(500).json({
      success: false,
      message:
        'Notebook record could not be updated.',
    });
  }
});


/*
=========================================================
DELETE NOTEBOOK RECORD
DELETE /api/notebook/:id
=========================================================
*/

router.delete('/:id', async (req, res) => {
  try {
    const deletedNote =
      await AdminNotebook.findByIdAndDelete(
        req.params.id
      );

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: 'Notebook record not found.',
      });
    }

    res.status(200).json({
      success: true,
      message:
        'Notebook record deleted successfully.',
      note: deletedNote,
    });
  } catch (err) {
    console.error(
      'Error deleting notebook record:',
      err
    );

    res.status(500).json({
      success: false,
      message:
        'Notebook record could not be deleted.',
    });
  }
});


export default router;