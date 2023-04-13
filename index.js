const express = require('express')

const { connection } = require('mongoose')

const client_id = "0a3c4612d92497a1d2de"

const client_secret = "8ef33ab8a036c5bfc0e9a3298c78de72a140b9a6"

const fs = require('fs')

const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("home page")
})


app.get("/auth/github", (req,res)=>{

    const {code} = req.query;
    console.log(code)

    let Access_token = '';

    // making request to get access-token

    fetch(`https://github.com/login/oauth/access_token`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            client_id:client_id,
            client_secret:client_secret,
            code:code
        })
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log("data--->",data)
        Access_token=data;
        console.log("---at",Access_token)
        fetchuser(Access_token)
    })
    .catch((err)=>{
        console.log(err)
    })


    res.send("sign using github successfull")
})



app.get("/login", (req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/index.html")
})



function fetchuser(Access_token){

    console.log("---> token mila user lane ka ",Access_token.access_token)

    // fetching user details from github

    fetch(`https://api.github.com/user`,{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            'Authorization': `bearer ${Access_token.access_token}`
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((user)=>{
        console.log("---> user data", user)
        
    })
    .catch((err)=>{
        console.log(err)
    })



}







app.listen(3000, async () => {

    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }

})