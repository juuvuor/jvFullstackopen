require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
morgan.token('body', (req) => JSON.stringify(req.body))
const cors = require('cors')

const Person = require('./models/person')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}




app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] — :response-time ms :body')
)
app.use(cors())


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date().toString(),
  })

  person.save()
    .then(savedPerson => {
      //   console.log(`added ${person.name} number ${person.number} to phonebook`);
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


app.get('/info', (request, response) => {
  Person.countDocuments().then((count) => {
    const time = new Date()
    response.send(`
      <div>
        <p>Phonebook has info for ${count} people</p>
        <p>${time}</p>
      </div>
    `)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end
      }
    })
    .catch((error) => next(error))
})




app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      console.log('result: ', result)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
