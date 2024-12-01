const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
// histories
const Histories = new Scheme({
    id_user: {type: String},
    historyItems: [{ type: Scheme.Types.ObjectId, ref: 'historyItem' }]
},{
    timestamps: true
})
// add fix buff
module.exports = mongoose.model('history', Histories)