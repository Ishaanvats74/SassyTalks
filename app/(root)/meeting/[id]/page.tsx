'use client'
import { useParams } from 'next/navigation';
import React from 'react'

const Meeting = () => {
    const params = useParams<{id:string}>();
  return (
    <div>
      Meeting Room: {params.id}
    </div>
  )
}

export default Meeting
