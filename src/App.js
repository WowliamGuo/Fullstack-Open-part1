import { useState } from "react"

const Header = (x) => (
  <>
    <h1>{x.text}</h1>
  </>
)


const TestLine = (x) => {
  if(x.percentage === 1){
    return(
      <>
        <td>{x.val}</td>
        <td>{x.num * 100}%</td>
      </>
    )
  }else{
    return(
      <>
        <td>{x.val}</td>
        <td>{x.num}</td>
      </>
    )
  }
}

const Statistics = (x) => {

  if(x.good + x.bad + x.neutral > 0){
    return(
      <>

        <Header text = "Stats" />
        <table>
          <tbody>
            <tr>
              <TestLine val = "good " num = {x.good} />
            </tr>
            <tr>
              <TestLine val = "neutral " num = {x.neutral} />
            </tr>
            <tr>
              <TestLine val = "bad " num = {x.bad} />
            </tr>
            <tr></tr>
            <tr>
              <TestLine val = "average" num = {(x.good - x.bad)/(x.good + x.bad + x.neutral)} />
            </tr>
            <tr> 
              <TestLine val = "positive" num = {(x.good)/(x.good + x.bad + x.neutral)} percentage = {1} />
            </tr>
          </tbody>
        </table>

      </>
    )
  }else{
    return(
      <Header text = "Stats: N/A" />
    )
  }

}

const Button = (x) => {
  return(
    <button onClick = {x.handleClick}> {x.text} </button>
  )
}

const App = (prop) => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [select, setSelect] = useState(Math.floor(Math.random() * 7))

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleSelect = () => {
    setSelect(Math.floor(Math.random() * 7))
  }

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const resetStats = (newValue) => () => {
    setGood(newValue)
    setNeutral(newValue)
    setBad(newValue)
  }

  const getMax = (arry) => {

    let max = -1

    for (let i = 0; i < arry.length; i++) {
      if (Number(arry[i]) > max){
        max = Number(arry[i])
      }
    }

    return max

  }

  const getIndex = (arry, k) => {

    for(let i = 0; i < arry.length; i++){
      if (arry[i] === k){
        return i
      }

    }

    return -1

  }

  const handlePoints = () => {
    const copy = [points[0], points[1], points[2], points[3], points[4], points[5], points[6]]
    copy[select] += 1
    setPoints(copy)
    //console.log(points, points.length)
    //console.log(getMax(points), getIndex(points, getMax(points)))
  }


  return (
    <div>
      <Header text = "Give Feedback" />
      <Button handleClick = {handleGood} text = {"good"} />
      <Button handleClick = {handleNeutral} text = "neutral" />
      <Button handleClick = {handleBad} text = {"bad"} />

      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
   
      <Button handleClick = {resetStats(0)} text = {"Reset"} />

      <br />
      <p> {anecdotes[select]} </p>
      <Button handleClick = {handleSelect} text = "Get quote"/>
      <Button text = "Vote" handleClick = {handlePoints} />
      <p> Votes: {points[select]} </p>

      <br />
      <Header text = "Most Voted Anecdote" />
      <p>{anecdotes[getIndex(points, getMax(points))]}</p>

    </div>
  )

}

export default App