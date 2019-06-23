const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex')({
    client : 'pg',
    version : '11.2',
    connection :{
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

// const knex = require('knex')({
//     connectionString: process.env.postgresql-clear-68690,
//     ssl: true,
//   });


const db  = knex;
// var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
// bcrypt.compareSync(myPlaintextPassword, hash); // true



app.use(bodyParser.json());
app.use(cors());


const database = {
    users :
            [
            {
                name: "Aditya",
                password: "pass",
                email:"aditya@gmail.com",
                id: '100',
                count:0,
                date: new Date()
            },
            {
                name: "Rajeev",
                password: "word",
                email:"Rajeev@gmail.com",
                id: '101',
                count:0,
                date: new Date()
            }

        ]
}
app.get('/',(req,res)=>{
   // res.send('this is working');
   res.send(database.users);
});

app.post('/signin',(req,res)=>{
    // console.log(req.body);
    // if((req.body.email == database.users[0].email)&&(req.body.password == database.users[0].password)){
    //     // res.send("success");
    //     res.json(database.users[0]);
    //     console.log('here');
    // }
    // else{
    //     res.send("fail");
    // }
    db('login').select('*').where('email','=',req.body.email)
    .then(data => {
        const valid = bcrypt.compareSync(req.body.password, data[0].hash);
        console.log(valid);
        if(valid){
            db('users')
            .select('*')
            .where('email','=',req.body.email)
            .then( user => {res.json(user[0])})
        //     .catch(res.status(400).send('unable to load user'))
        }
        else{
            res.status(400).send('unable to login')
        }
    })
    .catch( err => {
        res.status(400).send('Something wrong with email')
    })

});

app.post('/register',(req,res)=>{
    // db('users')
    // .returning('*')
    // .insert({
    //     name: req.body.name,
    //     password : req.body.password,
    //     email : req.body.email,
    //     date: new Date()
    // })
    // .then(response => {
    //     res.json(response[0]);
    // })   
    // .catch(err => {res.status(400).send('err');
    //                 console.error(err)});
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    db.transaction( trx =>{
        trx.insert({
            email : req.body.email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(loginemail =>{
            return trx('users')
                    .returning('*')
                    .insert({
                        email:loginemail[0],
                        name: req.body.name,
                        date: new Date() 
                    })
                    .then(user => {res.status(200).json(user[0])})
        })
        .then(trx.commit)
        .catch(err => {trx.rollback
                res.status(400).send('unable to register')   
        })
    })
    // .catch(res.status(400).send('unable to register'))
});

app.get('/profile/:id', (req,res)=>{
    const { id } = req.params;
    console.log(id); 
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found= true;
            return res.json(user);
        }
    })
    if (!found){
        res.send('No such profile');
    }
});

app.put('/image' , (req,res) =>{
    const { id } =req.body;
    // console.log(id);
    // database.users.forEach(user => {
    //     if(user.id === id){
    //         found=true;
    //         user.count++;
    //         return res.json(user.count);
    //     }
    // })
    // if(!found){
    //     res.send('No such profile');
    // }
    db('users')
    .returning('enteries')
    .where('id','=', id)
    .increment('enteries',1)    
    .then(data => {res.json(data[Number(0)])})
    .catch(err => {res.status(400).send(err)
                     console.log(err)})
});



app.listen(process.env.PORT||'3000');