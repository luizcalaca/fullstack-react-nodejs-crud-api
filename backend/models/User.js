import mongoose from 'mongoose'

var UserSchema = mongoose.Schema({
    name              : String,
    username           : String
});

const User = mongoose.model('User', UserSchema)

export default User