const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Comments = new Scheme({
    id_user: {type: String},
    id_track: {type: String},
    content: {type: String, maxLength: 255}
},{
    timestamps: true
})
// add fix buff
module.exports = mongoose.model('comment', Comments)