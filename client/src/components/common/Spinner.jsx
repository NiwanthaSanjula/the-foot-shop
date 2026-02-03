import React from 'react'
import { ImSpinner3 } from "react-icons/im";

const Spinner = ({size = 25, color = 'text-white'}) => {
  return (
    <ImSpinner3 size={size} className={`animate-spin ${color} `} />
  )
}

export default Spinner
