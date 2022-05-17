import { useState, useContext, ChangeEvent, FormEvent, useCallback } from 'react'
import { RepeatHelloRequest } from '../../proto/helloworld_pb'
import { HelloContext } from '../../context/Hello'

const List = () => {
  const [messages, setMessages] = useState<Array<string>>([])
  const [name, setName] = useState('')
  const [count, setCount] =useState(0)
  const { client } = useContext(HelloContext)

  const request = new RepeatHelloRequest()
  request.setName(name)
  request.setCount(count)

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const helloStream = client.sayRepeatHello(request)
    helloStream.on('data', message => {
      setMessages((prevMessages) => [...prevMessages, message.getMessage()])
    })
  }, [request])

  return (
    <ul>
      {messages.map((message, index) => <li key={index}>{message}</li>)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="inputText"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <select value={count} onChange={(e: ChangeEvent<HTMLSelectElement>) => setCount(Number(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </ul>
  )
}

export default List
