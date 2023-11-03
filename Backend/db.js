const mongoose=require('mongoose')
const Connection_String="mongodb://127.0.0.1:27017/qprofile_project";
async function connection(){
    try{
        await mongoose.connect(Connection_String);
        console.log("MongoDb Connected")
        }
        catch(err){
            console.log("Connection Err")
        }
}
module.exports=connection;
