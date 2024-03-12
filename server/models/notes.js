const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
        title: {
            type : String,
        },
        description: {
            type : String,
        },
        contributor : {
            type : String,
        }
    },
    {
        timestamps: true,
    }
)

mongoose.model("Note", notesSchema)