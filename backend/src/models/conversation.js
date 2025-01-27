// import mongoose from "mongoose"

// const conversationSchema = new mongoose.Schema({}, { strict: false });

// const Conversation = mongoose.model('Conversation', conversationSchema);

// export default Conversation
import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
   
        participants: [{
            type:String, 
            required : true
        }],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
                default: [],
            }
        ],
    
    
   
})
const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;