require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body));
const cors = require('cors')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] — :response-time ms :body'));
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')


let persons = [
    // { id: 1, name: 'Arto Hellas', number: '040-123456' },
    // { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    // { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    // { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
    // { id: 5, name: 'M3ry Popp33endieck', number: '39-23-6423122' },
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person)
    })
  })


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })

})

const countContacts = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId
}



app.get('/info', (req, res) => {
    const persons = countContacts()
    const time = new Date()
    // console.log('time: ', time)
    res.send(`
        <div>
            <p> Phonebook has info for ${persons} people </p>
            <p> ${time} </p>
        </div>
        `)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    // const isInTheList = (persons) => persons.name === body.name;

     console.log(body)
    // if (body.name === undefined) {
    //     return response.status(400).json({
    //         error: 'name missing'
    //     })
    // }

    if (body.name == undefined && body.number == undefined) {
        Person.find({}).then((result) => {
          result.forEach((person) => {
            // console.log(person.name, person.number);
          })
          mongoose.connection.close();
        })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
          // date: new Date().toString(),
        });
      
        person.save().then((result) => {
          console.log(`added ${person.name} number ${person.number} to phonebook`);
          mongoose.connection.close();
        })
      }


    // if (persons.findIndex(isInTheList) > -1) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }


    // if (body.number === undefined) {
    //     return response.status(400).json({
    //         error: 'number missing'
    //     })
    // }

    // const person = {
    //     id: Math.floor(Math.random() * 10000),
    //     name: body.name,
    //     number: body.number,
    // }

// person.save().then(savedPerson => {
//     response.json(savedPerson)
// })
    
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})