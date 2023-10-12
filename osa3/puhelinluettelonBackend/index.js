const express = require('express')
const morgan = require('morgan')
const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body));
const cors = require('cors')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] — :response-time ms :body'));
app.use(cors())
app.use(express.static('dist'))


let persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
    { id: 5, name: 'M3ry Popp33endieck', number: '39-23-6423122' },

]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('id: ', id)
    const person = persons.find(person => {
        console.log(person.id, typeof person.id, id, typeof id, person.id === id)
        return person.id === id
    })

    console.log('person: ', person)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

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

    const isInTheList = (persons) => persons.name === body.name;

    console.log(body)
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (persons.findIndex(isInTheList) > -1) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }


    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        number: body.number,
    }


    persons = persons.concat(person)

    response.json(person)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})