const Header = ({ course }) => {
    console.log('kurssin nimi on: ', course)
    return (
      <div>
        <h2>{course}</h2>
      </div>
    )
  }
  
  const Part = ({ part }) => {
    console.log(part)
    return (
      <div>
        <p> {part.name} {part.exercises} </p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    console.log('tähän tullaan', parts)
    return (
      <div>
        {parts.map(part => <Part part={part} />)}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
  
    const total = parts.map(part => part.exercises)
    // console.log('täällä ollaan: ', total)
    let sum = 0
    const sumWithInitial = total.reduce((accumulator, currentValue) => accumulator + currentValue, sum);
  
    // console.log('summa: ', sumWithInitial)
    return (
      <div>
        <b >Total of {sumWithInitial} exercises </b>
      </div>
    )
  }
  
  const Course = (props) => {
    // const course = props.course1
    console.log("testi48", props.courses.name)
    const course = props.courses
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  export default Course