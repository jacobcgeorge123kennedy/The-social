const db = require('./db')
const jwt = require('jsonwebtoken')


// Signup
const signup=(frstname,lstname,address,photo,email,mobile,title,id,password,gender)=>{
     return db.Profile.findOne({
        email
    }).then((result)=>{
        console.log(result);
        if(result){
            return {
                statusCode:403,
                message:"Account already exist"
            }
        }else{
            if(frstname!=''&& lstname!=''&& address!=''&& photo!=''&& email!=''&& mobile!=''&& title!=''&& id!=''&& password!=''&& gender!=''){
                console.log(lstname);
                const newprofile = new db.Profile({
                    id:id,
                    frstname:frstname,
                    lstname:lstname,
                    address:address,
                    password:password,
                    gender:gender,
                    email:email,
                    photo:photo,
                    mobile:mobile,
                    title:title,
                    posts:[]
                })
                console.log(newprofile.lstname);
                newprofile.save()
                return{
                    statusCode:200,
                    message:"Signup Completed. Now Log In to Use The Social"
                }
            }else{
                return{
                    statusCode:404,
                    message:"invalid Form"
                }
            }
        }
    })
}
const deleteMyAccount= (frstname) => {
    return db.Profile.deleteOne({
        frstname
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Account deleted successfully"
           }
        }else{
           return{
                statusCode:401,
                message:"Invalid Account"
           } 

        }
    })
}
const login=(email,password)=>{
    console.log(email);
return db.Profile.findOne({
    email
}).then((result)=>{
    console.log(result);
    if(result){
        if(password==result.password){
            const token = jwt.sign({
                email:email
            },'secretkey123')
            return{
                statusCode:200,
                profile:result,
                token
            }  
        }else{
            return{
                statusCode:403,
                message:"Invalid password"
            }

        }
    }else{
        return{
            statusCode:403,
            message:"Invalid Account"
        }
    }
})
}

const getAllPost=()=>{
    return db.Post.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                posts:result
            }
        }else{
            return{
                statusCode:403,
                message:'No Post Available'
            }
        }
    })
}
const postletter=(posttitle,postbody,id)=>{
    return db.Post.find().then((result)=>{
        console.log(result);
        const newpost = new db.Post({
            postedid:id,
            title:posttitle,
            body:postbody
        })
        console.log(newpost);
        newpost.save()
        return{
            statusCode:200,
            message:"Posted"
        }
    })
}
const savepost=(frstname,post)=>{
    return db.Profile.findOne({
        frstname
    }
    ).then((result)=>{
        console.log(result);
        let check=result.posts.find(posted=>posted.title==post.title)
        if(check){
            return{
                statusCode:401,
                message:"Post is in your saved"
            }
        }else{
            result.posts.push(post)
        console.log(result);
        result.save()
        return{
            statusCode:200,
            message:"Post is saved"
        }
        }
       
    })
}
const getsaved=(frstname)=>{
    return db.Profile.findOne({
        frstname
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                posts:result.posts
            }
        }else{
            return{
                statusCode:403,
                message:'No Saved Post'
            }
        }
    })
}
const deletepost=(frstname,item)=>{
    return db.Profile.findOne({
        frstname
    }).then((result)=>{
        console.log(item);
        console.log(result);
        let index = result.posts.indexOf(result.posts.find(element=>element.title==item.title))
        result.posts.splice(index,1);
        result.save()
        return{
            statusCode:200,
            message:'deleted'
        }

    })
}
const findmyposts=(postedid)=>{
    return db.Post.find({
        postedid
    }).then((result)=>{
        console.log(result);
        return{
            statusCode:200,
            post:result
        }
    },(result)=>{
        return{
            statusCode:403,
            message:'No posts posted'
        }
    })
}

const getAllProfile=()=>{
    return db.Profile.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                profiles:result
            }
        }else{
            return{
                statusCode:403,
                message:'No Post Available'
            }
        }
    })
}

module.exports={
    signup,
    login,
    getAllPost,
    postletter,
    savepost,
    getsaved,
    deletepost,
    deleteMyAccount,
    findmyposts,
    getAllProfile
}


