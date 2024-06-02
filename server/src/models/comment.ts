import { type Document } from 'mongoose'

const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  commentText: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
commentSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export {}
module.exports = mongoose.model('Comment', commentSchema)
