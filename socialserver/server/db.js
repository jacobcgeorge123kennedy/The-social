const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/social',()=>{
    console.log('MONGODB CONNECTION SUCCESSFULL');
})

const Profile = mongoose.model('Profile',
    {
    id: String,
    frstname: String,
    lstname: String,
    address:String,
    password:String,
    gender:String,
    email: String,
    photo: String,
    mobile: Number,
    title: String,
    posts:Array
  }
)

const Post = mongoose.model('Post',
{
    postedid:String,
    title: String,
    body: String
  
})

module.exports={
    Profile,
    Post
}