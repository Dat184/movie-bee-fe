import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

  return (
    <section className='w-full min-h-screen px-5 pt-5 flex flex-col'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='w-full flex-1 rounded border-2 border-gray-800 p-4 flex flex-col gap-6'>
        {/* Stats Cards */}
        <div className='grid grid-cols-4 gap-4'>
          <div className='bg-bg-color h-32 flex flex-col items-start rounded p-5 gap-5'>
            <h1 className='text-gray-400'>Tổng số phim</h1>
            <p className=''>100 bộ phim</p>
          </div>
          <div className='bg-bg-color h-32 flex flex-col items-start rounded p-5 gap-5'>
            <h1 className='text-gray-400'>Tổng số người dùng</h1>
            <p>100 người dùng</p>
          </div>
          <div className='bg-bg-color h-32 flex flex-col items-start rounded p-5 gap-5'>
            <h1 className='text-gray-400'>Tổng số bình luận</h1>
            <p>100 bình luận</p>
          </div>
          <div className='bg-bg-color h-32 flex flex-col items-start rounded p-5 gap-5'>
            <h1 className='text-gray-400'>Người dùng mới</h1>
            <p>100 người dùng mới</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className='bg-bg-color rounded p-5 mt-5'>
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
