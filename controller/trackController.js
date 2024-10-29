const express = require('express');
const Track = require('../model/Track'); 
const Album = require('../model/Album');  

const router = express.Router();

// Tạo bài hát
router.post('/tracks', async (req, res) => {
    try {
        const { title, duration, release_date, album_id } = req.body;
        const newTrack = new Track({ title, duration, release_date, album_id });
        const savedTrack = await newTrack.save();
        res.status(201).json(savedTrack);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating track' });
    }
});

// Lấy tất cả bài hát
router.get('/tracks', async (req, res) => {
    try {
        const tracks = await Track.find().populate('album'); // Populate album information
        res.json(tracks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching tracks' });
    }
});

// Lấy bài hát theo ID
router.get('/tracks/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id).populate('album');
        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.json(track);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching track' });
    }
});

// Cập nhật
router.put('/tracks/:id', async (req, res) => {
    try {
        const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('album');
        if (!updatedTrack) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.json(updatedTrack);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating track' });
    }
});

// Xóa
router.delete('/tracks/:id', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.id);
        if (!deletedTrack) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.json({ message: 'Track deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting track' });
    }
});

module.exports = router;