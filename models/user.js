const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    username: {
        type: String,
        required: true
    },
    memos: [{
        type: Schema.Types.ObjectId,
        ref: "Memo"
    }]

});



UserSchema.pre("save", function (next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    return next();
});


module.exports = mongoose.model("User", UserSchema);