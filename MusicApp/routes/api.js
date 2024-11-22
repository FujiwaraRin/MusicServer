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

//-----Delete playlist by id
router.delete('/delele-playlist-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Playlists.findByIdAndDelete(id);
        if (result) {
            res.json({
                "status": 200,
                "message": "Xoá thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "Lỗi, xoá ko thành công",
                "data":{}
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//-----Get list playlist
router.get('/get-list-playlist', async (req, res) => {
    try {
        const data = await Playlists.find()
        .populate('playlistItems')
        .sort({ createAt: -1 });
        if (data) {
            res.json({
                "status": 200,
                "message": "Thành công",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "message": "Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});
//-----Get list playlist by user id
router.get('/get-list-playlist/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        console.log('Requested id_user:', id_user);

        const playlists = await Playlists.find({ id_user }).populate('playlistItems');
        console.log('Playlists found:', playlists);
        
        if (playlists.length > 0) {
            res.json({
                "status": 200,
                "message": "Success",
                "data": playlists
            });
        } else {
            res.status(400).json({
                "status": 400,
                "message": "Failed",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status": 500,
            "message": "Server Error",
            "error": error.message
        });
    }
});

//Get playlist by user id
router.get('/get-playlist/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        const playlists = await Playlists.find({ id_user }).select('_id name');
        if (playlists.length > 0) {
            res.json({
                "status": 200,
                "message": "Success",
                "data": playlists
            });
        } else {
            res.status(400).json({
                "status": 400,
                "message": "Failed",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status": 500,
            "message": "Server Error",
            "error": error.message
        });
    }
});

//-----Get list playlist item by id_playlist
router.get('/get-list-playlist-item/:id_playlist', async (req, res) => {
    try {
        const { id_playlist } = req.params;
        const playlistItems = await PlaylistItems.find({ id_playlist });
        if (playlistItems.length > 0) {
            res.json({
                "status": 200,
                "message": "Success",
                "data": playlistItems
            });
        } else {
            res.status(400).json({
                "status": 400,
                "message": "Failed",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status": 500,
            "message": "Server Error",
            "error": error.message
        });
    }
});

//-----Delete playlist by id
router.delete('/delele-playlist-item-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await PlaylistItems.findByIdAndDelete(id);
        if (result) {
            res.json({
                "status": 200,
                "message": "Xoá thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "Lỗi, xoá ko thành công",
                "data": {}
            })
        }
    } catch (error) {
        console.log(error);
    }
})
//-----Add playlist item
router.post('/add-playlist-item', async (req, res) => {
    try {
        const data = req.body;

        // Lấy thông tin playlist để tìm id_user
        const playlist = await Playlists.findById(data.id_playlist).populate('id_user');
        if (!playlist) {
            return res.status(404).json({
                status: 404,
                message: "Playlist không tồn tại",
                data: {}
            });
        }

        // Lấy thông tin user từ playlist
        const user = await Users.findById(playlist.id_user);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Người dùng không tồn tại",
                data: {}
            });
        }

        // Kiểm tra xem id_track đã tồn tại trong playlist chưa
        const isTrackExist = await PlaylistItems.findOne({
            id_playlist: data.id_playlist,
            id_track: data.id_track
        });

        if (isTrackExist) {
            return res.status(400).json({
                status: 400,
                message: "Bài hát đã tồn tại trong playlist",
                data: {}
            });
        }

        // Kiểm tra số coin của user
    

            // Tạo PlaylistItem mới
            const newPlaylistItem = new PlaylistItems({
                id_playlist: data.id_playlist,
                id_track: data.id_track,
                name: data.name,
                image_url: data.image_url,
                preViewUrl: data.preViewUrl,
                artist: data.artist,
            });
            const result = await newPlaylistItem.save();

            // Cập nhật playlist với playlistItem mới
            await Playlists.findByIdAndUpdate(data.id_playlist, { $push: { playlistItems: result._id } });

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
