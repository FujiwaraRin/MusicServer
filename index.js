const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const morgan = require("morgan");

const typeUserController = require('./controller/typeuserController');
const userController = require('./controller/userController')
const genresController = require('./controller/genresController')
const artistController = require('./controller/artistController')
const albumController = require('./controller/albumController')
const trackController = require('./controller/trackController')
const playlistController = require('./controller/playlistController')
const playlistitemController = require('./controller/playlistitemController')
const commentController = require('./controller/commentController')
const questionController = require('./controller/questionController')
const optionController = require('./controller/optionController.Js')
const app = express();
const port = process.env.PORT || 3000;

// Kết nối đến MongoDB
mongoose.connect((process.env.MONGODB_URL), { //thay đổi mongodb tại đây
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// Sử dụng middleware để parse JSON body
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({limit:"50mb"}));

// Sử dụng router
app.use('/api', typeUserController);
app.use('/api', userController);
app.use('/api', genresController);
app.use('/api', artistController);
app.use('/api',albumController)
app.use('/api', trackController)
app.use('/api', playlistController)
app.use('/api', playlistitemController)
app.use('/api', commentController)
app.use('/api', questionController)
app.use('/api', optionController)
// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});