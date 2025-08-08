import mongoose from "mongoose";

const taskSсhema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    category: {
        type: String
    },

    completed: {
        type: Boolean,
        default: false
    },

    tabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tab',
        required: true
    }
}, {timestamps: true});


export default mongoose.model('Task', taskSсhema);