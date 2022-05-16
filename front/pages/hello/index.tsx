import { useRef, useContext, FormEvent } from 'react'
import { HelloRequest } from '../../proto/helloworld_pb'
import { HelloContext } from '../../context/Hello'

const Hello = () => {
  const { client } = useContext(HelloContext)
  const textRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const request = new HelloRequest()
    if (!textRef.current?.value) {
      alert('please enter your message')
      return
    }
    request.setName(textRef.current.value)
    client.sayHello(request, (error, response) => {
      if (error) {
        console.error(error)
        return
      }
      console.log(response)
    })

    textRef.current.value = ''
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="inputText" ref={textRef} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Hello
