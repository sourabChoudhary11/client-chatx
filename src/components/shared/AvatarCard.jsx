import React from 'react'
import { transformImage } from '../../lib/features'

const AvatarCard = ({avatar}) => {
  return (
    <div className='w-[2rem] h-[2rem] relative'>
        {avatar.map((a, index)=>(
            <img key={index} style={{left:`${index}rem`}} className={`w-[2rem] h-[2rem] absolute rounded-4xl border-2 border-white`} src={transformImage(a)} />
        ))}
    </div>
  )
}

export default AvatarCard