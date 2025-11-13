import { useEffect, useRef, useState } from 'react'

export default function useClickOutside(dom: string = 'button') {
  const [show, setShow] = useState<boolean>(false)
  const nodeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node) && !(e.target as Element).matches(dom)) {
        setShow(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return {
    setShow,
    nodeRef,
    show
  }
}
