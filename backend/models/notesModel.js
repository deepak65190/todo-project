const mongoose =require("mongoose") ;
const notesSchema=mongoose.Schema({
    name: String ,
    age:{
        type :Number ,
        min:18 ,
        max:40

    } ,
    email:{
       type: String ,
        required:[true ,"Email required"],
        trim:true ,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    } ,
    gender:{
        type: String,
        enum:{
            values:["male","female","other"] ,
            message: "{VALUE} is not a valid gender"
        }
    } ,
    jobType:{
        type:String ,
        default:"full stack"
    } ,
    hobby:{
        type:String ,
        default: "not specified"
    },

   

} , {timestamps:true} )
const notesModel=mongoose.model("Note",notesSchema) ;
module.exports =notesModel
