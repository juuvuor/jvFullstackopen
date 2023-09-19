import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));
  const [selected, setSelected] = useState(0)
  const [highPointsLocation, setHighPoints] = useState()

  const findPoints = (points) => {
    let highest = 0
    let location = 0
    for (let i = 0; i < points.length; i++) {
      if (highest <= points[i]) {
        highest = points[i]
        location = i
      }
    }
    //console.log(location);
    setHighPoints(location);
  }

  const randomNumberInRange = (min, max) => {
    // console.log('min: ' + min , 'max: ' +  max)
    return (Math.floor(Math.random()
      * (max - min)));
  };

  const handleClick = () => {
    setSelected(randomNumberInRange(0, anecdotes.length));
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    findPoints(points)
  };


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleClick} text='next anecdote' />
      <br />
      <h1>Anecdote whit most votes</h1>
      {anecdotes[highPointsLocation]}
      <br />
      has {points[highPointsLocation]} votes
    </div>
  )
}

export default App