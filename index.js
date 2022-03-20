const express= require('express')
const api = express()
const port = process.env.PORT || 3000
const path = require('path')

const session = require('express-session')
const UserModel = require('./models/user')
//create variable to receive bodyparser
const bodyParser = require('body-parser')


// create connect mongo and mongoose
const mongodb = process.env.MONGODB || 'mongodb://localhost/empresa'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise



api.use(session({
    secret:'teste',
    resave: true,
    saveUninitialized: true
}))


api.set('views', path.join(__dirname, 'views'))
api.set('view engine','ejs')
api.use(express.static(path.join( __dirname ,'views')))

// connection about body parser
api.use(bodyParser.urlencoded({extended:true}))

api.get('/', (req, res) => {
    res.send('allows learnig moreevry single day')
})

api.post('/login', async(req,res) => {
    const user = await UserModel.findOne({username: req.body.username}) 
    const isValid = await user?.checkPassword(req.body.password)
      
    if(isValid){
      req.session.user = user
      res.redirect('/')
    }else{
        res.redirect('/login')
   }    
})

const CreateInitialuser =  async() => {
    const total = await UserModel.count({username:'felipe martins'})
    if(total === 0){
        const user = new UserModel ({
            username:'felipe martins',
            email:'machadofelipe2016@outlook.com',
            password:'martins18',
        })
       await user.save()
       console.log('user created')
    }else{
        console.log('user created shiped')
    }
}



mongoose.connect(mongodb, {useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {
    CreateInitialuser()
    api.listen(port, () => console.log('listing of port: '+ port))
})
.catch(e => console.log(e))

