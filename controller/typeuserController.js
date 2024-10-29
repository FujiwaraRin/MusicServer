const express = require('express');
const router = express.Router();
const TypeUser = require('../model/TypeUser'); // Thay đổi đường dẫn nếu cần

// Tạo một type user mới
router.post('/type-users', async (req, res) => {
    try {
        const { name } = req.body;
        const newTypeUser = new TypeUser({ name });
        const savedTypeUser = await newTypeUser.save();
        res.json(savedTypeUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo type user' });
    }
});

// Lấy danh sách tất cả các type user
router.get('/type-users', async (req, res) => {
    try {
        const typeUsers = await TypeUser.find();
        res.json(typeUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách type user' });
    }
});

// Lấy một type user theo ID
router.get('/type-users/:id', async (req, res) => {
    try {
        const typeUser = await TypeUser.findById(req.params.id);
        if (!typeUser) {
            return res.status(404).json({ message: 'Không tìm thấy type user' });
        }
        res.json(typeUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin type user' });
    }
});

// Cập nhật thông tin một type user
router.put('/type-users/:id', async (req, res) => {
    try {
        const updatedTypeUser = await TypeUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTypeUser) {
            return res.status(404).json({ message: 'Không tìm thấy type user' });
        }
        res.json(updatedTypeUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật thông tin type user' });
    }
});

// Xóa một type user
router.delete('/type-users/:id', async (req, res) => {
    try {
        await TypeUser.findByIdAndDelete(req.params.id);
        res.json({ message: 'Xóa type user thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa type user' });
    }
});

module.exports = router;