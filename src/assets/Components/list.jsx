import getData from "./data"

const [newState] = getData("repos")
// console.log(state[0].name)

function List(props){
    const filteredData = newState.filter((data) => {
      if(props.input === ''){
        return data
      }else{
        return data.text.tolowecase().includes(props.input)
      }
    }) 
    return (
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    )
  }

  export default List