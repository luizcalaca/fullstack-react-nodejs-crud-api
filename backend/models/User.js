import { model } from 'mongoose'

const User = model('User',{
    name: String, 
    username: String,
})

export default User