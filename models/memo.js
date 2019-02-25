const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemoSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    }

});

MemoSchema.pre("save", function (next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
});


module.exports = mongoose.model("Memo", MemoSchema);