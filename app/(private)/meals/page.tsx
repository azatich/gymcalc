"use client";

import dynamic from 'next/dynamic'
import Header from '@/features/meals/components/Header'
import React from 'react'

const MealForm = dynamic(() => import('@/features/meals/components/MealForm'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  ),
  ssr: false,
})

const AddProduct = () => {
  return (
    <div className='space-y-6'>
        <Header />
        <MealForm />
    </div>
  )
}

export default AddProduct