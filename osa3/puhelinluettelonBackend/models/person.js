const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connecting to", url)

const name = process.argv[3]
const number = process.argv[4]

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  })

// console.log('tässä 1')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: String,
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // console.log('käydäännkö me täällä')
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

 module.exports = mongoose.model("Person", personSchema)

 


 

// if (name == undefined && number == undefined) {
//   Person.find({}).then((result) => {
//     result.forEach((person) => {
//       // console.log(person.name, person.number);
//     })
//     mongoose.connection.close();
//   })
// } else {
//   const person = new Person({
//     name: name,
//     number: number,
//     // date: new Date().toString(),
//   });

//   person.save().then((result) => {
//     console.log(`added ${person.name} number ${person.number} to phonebook`);
//     mongoose.connection.close();
//   })
// }


