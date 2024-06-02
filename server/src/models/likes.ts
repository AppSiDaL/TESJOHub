import { type Document } from 'mongoose'

const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
likeSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export {}
module.exports = mongoose.model('Like', likeSchema)
