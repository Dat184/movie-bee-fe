import { Clapperboard, MessageCircle, UserRound, UserRoundPlus } from 'lucide-react'
import { useEffect } from 'react'
import { get } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getAllUsers } from '../../redux/api_request/user_api'

const Dashboard = () => {
  // Dữ liệu mẫu cho biểu đồ 7 ngày
  const commentData = [
    { name: 'T2', comments: 45 },
    { name: 'T3', comments: 62 },
    { name: 'T4', comments: 38 },
    { name: 'T5', comments: 71 },
    { name: 'T6', comments: 85 },
    { name: 'T7', comments: 95 },
    { name: 'CN', comments: 78 }
  ]
  const userQuantity = useSelector((state: any) => state.user.getAllUsers?.meta.total || 0)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllUsers(1, 10, dispatch) // Lấy tất cả người dùng để hiển thị tổng số
  }, [dispatch])
  return (
    <section className='w-full min-h-screen px-5 pt-5 flex flex-col'>
      <h1 className='text-2xl font-bold mb-5'>Dashboard</h1>
      <div className='w-full flex-1  p-4 flex flex-col gap-6'>
        {/* Stats Cards */}
        <div className='grid grid-cols-4 gap-4'>
          <div className='bg-bg-color rounded-xl h-32 flex items-center justify-between p-6 gap-5'>
            <div className='flex flex-col'>
              <p className='text-sm font-medium text-gray-400'>Tổng số phim</p>
              <p className='mt-2 text-3xl font-bold'>100</p>
            </div>
            <div className='rounded-full bg-primary/10 p-3'>
              <Clapperboard />
            </div>
          </div>
          <div className='bg-bg-color rounded-xl h-32 flex items-center justify-between p-6 gap-5'>
            <div className='flex flex-col'>
              <p className='text-sm font-medium text-gray-400'>Tổng số người dùng</p>
              <p className='mt-2 text-3xl font-bold'>{userQuantity}</p>
            </div>
            <div className='rounded-full bg-primary/10 p-3'>
              <UserRound />
            </div>
          </div>
          <div className='bg-bg-color rounded-xl h-32 flex items-center justify-between p-6 gap-5'>
            <div className='flex flex-col'>
              <p className='text-sm font-medium text-gray-400'>Tổng số bình luận</p>
              <p className='mt-2 text-3xl font-bold'>100</p>
            </div>
            <div className='rounded-full bg-primary/10 p-3'>
              <MessageCircle />
            </div>
          </div>
          <div className='bg-bg-color rounded-xl h-32 flex items-center justify-between p-6 gap-5'>
            <div className='flex flex-col'>
              <p className='text-sm font-medium text-gray-400'>Người dùng mới</p>
              <p className='mt-2 text-3xl font-bold'>100</p>
            </div>
            <div className='rounded-full bg-primary/10 p-3'>
              <UserRoundPlus />
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className='bg-bg-color rounded-xl p-5 mt-5'>
          <h2 className='text-xl font-semibold mb-4'>Biểu đồ bình luận 7 ngày qua</h2>
          <ResponsiveContainer width='100%' height={350}>
            <LineChart data={commentData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
              <XAxis dataKey='name' stroke='#9CA3AF' style={{ fontSize: '14px' }} />
              <YAxis stroke='#9CA3AF' style={{ fontSize: '14px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ color: '#9CA3AF' }} />
              <Line
                type='monotone'
                dataKey='comments'
                stroke='#f62682'
                strokeWidth={2}
                dot={{ fill: '#f62682', r: 4 }}
                activeDot={{ r: 6 }}
                name='Số bình luận'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
