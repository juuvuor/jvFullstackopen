import Course from './components/Course'

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  console.log('testiä r115:', courses[0])

  return (
    <div>
      <h1>Web development Curriculum</h1>
      {courses.map(course => <Course courses={course} />)}
    </div>
  )
}

export default App