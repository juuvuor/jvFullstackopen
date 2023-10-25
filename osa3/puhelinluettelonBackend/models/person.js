const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

// console.log('connecting to', url)

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: String,
  date: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // console.log('käydäännkö me täällä')
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
