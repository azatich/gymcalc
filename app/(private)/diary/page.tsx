import dynamic from 'next/dynamic'
import React from 'react'

const Mealtime = dynamic(() => import('@/features/diary/components/Mealtime'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  ),
  ssr: true,
})

const Diary = () => {
  return (
    <div>
        <Mealtime />
    </div>
  )
}

export default Diary