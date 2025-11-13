import { useEffect, useState } from 'react'

const ContactPage = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const APlusB = () => {
    
  }

  useEffect(() => {
    APlusB() 
  }, [])
  
  return <div></div>
}

export default ContactPage
