import Header from "@/features/home/components/Header"
import QuickActions from "@/features/home/components/QuickActions"
import dynamic from "next/dynamic"

const CircularProgress = dynamic(() => import('@/features/home/components/CircularProgress'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  )
})

const MacrosCards = dynamic(() => import('@/features/home/components/MacrosCards'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  )
})

const HomePage = () => {
  return (
    <div className="space-y-6">
      <Header />
      <CircularProgress />
      <MacrosCards />
      <QuickActions />
    </div>
  )
}

export default HomePage