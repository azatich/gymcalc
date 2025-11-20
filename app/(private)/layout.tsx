import Sidebar from '@/components/Sidebar'
import React from 'react'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Sidebar />

          <main
            className="
          ml-0
          md:ml-80     /* отступ справа от sidebar на desktop/tablet */
          md:pt-8
          pt-20        /* отступ сверху для mobile header */
          pb-20        /* отступ снизу для mobile navbar */
          p-6
          flex-1
        "
          >
            {children}
          </main>
    </>
  )
}

export default AppLayout