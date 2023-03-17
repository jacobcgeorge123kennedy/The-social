const express = require('express')
const cors = require('cors')
const dataservice = require('./server/dataservice')
const { Profile } = require('./server/db')
const server = express()
server.use(cors({
    origin:'http://localhost:4200'
}))
server.use(express.json())
server.listen(3000,()=>{
    console.log('Server is listening at port number 3000');
})

server.post('/signup',(req,res)=>{
    console.log("Inside signup api");
    console.log(req.body);
    console.log(req.body.lastname);
    dataservice.signup(req.body.frstname,req.body.lastname,req.body.address,req.body.photo,req.body.email,req.body.mobile,req.body.title,req.body.id,req.body.password,req.body.gender).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/login',(req,res)=>{
    console.log('Inside login api');
    console.log(req.body);
    dataservice.login(req.body.email,req.body.password).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.get('/posts',(req,res)=>{
    console.log("Inside Post api");
    dataservice.getAllPost().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/postletter',(req,res)=>{
    console.log('inside postletter api');
    console.log(req.body);
    dataservice.postletter(req.body.posttitle,req.body.postbody,req.body.id).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/savepost',(req,res)=>{
    console.log('inside save post api')
    console.log(req.body);
    dataservice.savepost(req.body.frstname,req.body.post).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/getsaved',(req,res)=>{
    console.log('inside save post api')
    console.log(req.body);
    dataservice.getsaved(req.body.frstname).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/delete',(req,res)=>{
    console.log('inside delete api');
    console.log(req.body);
    dataservice.deletepost(req.body.frstname,req.body.post).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/deletemyaccount',(req,res)=>{
    console.log('inside delete account api');
    console.log(req.body);
    dataservice.deleteMyAccount(req.body.frstname).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/findmypost',(req,res)=>{
    console.log('inside findmypost api');
    console.log(req.body);
    dataservice.findmyposts(req.body.postedid).then((result=>{
        res.status(result.statusCode).json(result)
    }))
})
server.get('/postprofiles',(req,res)=>{
    console.log("Inside Post api");
    dataservice.getAllProfile().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

