import { useState } from 'react'


const StatisticLine = (props) => {
  // console.log(props)
  const { text, value } = props

  return (
    <div>
      {text} {value} 
    </div>
  )
}

const Statistics = (props) => {
  const { all, good, neutral, bad } = props
  const avarage1 = Avarage({ all, good, bad })
  const positive = Positive({ all, good})
  const ta = [
    {text: 'good' , value: good}, 
    {text: 'neutral' , value: neutral}, 
    {text: 'bad' , value: bad}, 
    {text: 'all' , value: all}, 
    {text: 'avarage' , value: avarage1}, 
    {text: 'positive' , value: positive}
  ]

  console.log( 'taulukko   '+ ta[1].text + ' '+ta[1].value)
  if (all === 0) {
    return (
      <div>
        <h1>Statistic</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistic</h1>
        <StatisticLine text= {ta[0].text} value ={ta[0].value} />
        <StatisticLine text= {ta[1].text} value ={ta[1].value} />
        <StatisticLine text= {ta[2].text} value ={ta[2].value} />
        <StatisticLine text= {ta[3].text} value ={ta[3].value} />
        <StatisticLine text= {ta[4].text} value ={ta[4].value} />
        <StatisticLine text= {ta[5].text} value ={ta[5].value + '%'} />
    </div>
  )

}

const Positive = (props) => {
  const { all, good } = props
  const postive = ((good / all) * 100)
  return (
    postive
  )
}

const Avarage = (props) => {
  const { all, good, bad } = props
  const updateBad = -1 * bad
  const avarage = (good + updateBad) / all
  return (
    avarage
  )
}

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)



  const handleGoodClick = () => {
    const updateAll = all + 1
    setAll(updateAll)
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const handleNeutralClicks = () => {
    const updateAll = all + 1
    setAll(updateAll)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBadClick = () => {
    const updateAll = all + 1
    setAll(updateAll)
    const updatedBad = bad + 1
    setBad(updatedBad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClicks} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <Statistics all={all} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App