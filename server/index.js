const express = require('express')
const app = express();

const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const mongoose = require('mongoose')

async function main(){
    try{
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000})
        
        mongoose.connection.on('connected', ()=>{
            console.log('Connected MongoDb Atlas..');
        });
        
    
    }catch(error){
        console.log(error.reason)
    }
  
}
main();

require('./models/notes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./routes/notes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Connected on port : ${PORT}`);
});