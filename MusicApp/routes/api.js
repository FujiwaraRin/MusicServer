var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const Transporter = require('../config/mail');
const Playlists = require('../models/playlists');
const JWT = require('jsonwebtoken');
const SECRECT_KEY = "mophan";
const PlaylistItems = require('../models/playlistItems');
const Histories = require('../models/histories');
const HistoryItems = require('../models/historyItems');
const Favorites = require('../models/favorites');
const FavoriteItems = require('../models/favoriteItems');
const Comments = require('../models/comments');

//-----Add playlist
router.post('/add-playlist', async (req, res) => {
    try {
        const { id_user, name } = req.body; // Lấy dữ liệu từ body

        // Tìm user theo id_user
        const user = await Users.findById(id_user);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Người dùng không tồn tại",
                data: {}
            });
        }


            // Tạo playlist mới
            const newPlaylist = new Playlists({
                id_user: id_user,
                name
            });

            const result = await newPlaylist.save();
            return res.json({
                status: 200,
                message: "Thêm thành công",
                data: result
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Lỗi server",
            error: error.message
        });
    }
});


module.exports = router;
