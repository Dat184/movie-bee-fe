import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const CastDetail = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const { id } = useParams()

  const handleGoBack = () => {
    // handle go back to previous page
    navigate(-1)
  }

  const handleDelete = () => {
    // handle go back to previous page
    navigate(-1)

    toast.warning('Đã xóa diễn viên')
  }

  useEffect(() => {
    if (id) {
      // fetch cast data by id and set to state
      setName('Diễn viên mẫu')
      setImageUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb')
    }
  }, [id])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file ảnh')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước ảnh không được vượt quá 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImageUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
  return (
    <section className='w-full min-h-screen px-5 pt-10 flex flex-col space-y-6 mb-10'>
      <div className='flex flex-row justify-start items-center gap-4 mb-10 h-10 w-full'>
        <button
          className='p-2 rounded-lg border border-gray-500 hover:bg-gray-700 cursor-pointer'
          onClick={handleGoBack}
        >
          <ArrowLeft />
        </button>
        <div>
          <h1 className='text-2xl font-bold'>Thêm diễn viên mới</h1>
          <p>Điền thông tin diễn viên mới</p>
        </div>
      </div>

      <form className='flex flex-col gap-5 w-full max-w-lg'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='font-medium'>
            Tên diễn viên
          </label>
          <input
            type='text'
            id='name'
            className='border border-gray-300 rounded-lg p-2'
            placeholder='Nhập tên diễn viên'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className='grid gap-2'>
          <label htmlFor='imageFile'>Chọn ảnh</label>
          <input
            id='imageFile'
            type='file'
            accept='image/*'
            onChange={handleFileUpload}
            className='border border-gray-300 rounded-lg p-2'
          />
          <p className='text-xs text-gray-500'>Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB</p>
        </div>
      </form>

      {imageUrl && (
        <div>
          <label>{id ? 'Ảnh hiện tại' : 'Xem trước'}</label>
          <div className='mt-2 aspect-[3/4] max-w-sm overflow-hidden rounded-lg bg-muted'>
            <img
              src={imageUrl}
              alt='Preview'
              className='h-full w-full object-cover'
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
              }}
            />
          </div>
        </div>
      )}

      <div className='flex gap-5'>
        <button
          className='bg-primary px-2 py-1 rounded-lg font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
          disabled={!name || !imageUrl}
        >
          Thêm
        </button>

        {id && (
          <button className='py-1 px-3 rounded-lg cursor-pointer bg-secondary' onClick={handleDelete}>
            Xóa
          </button>
        )}

        <button
          className='py-1 px-3 rounded-lg border border-gray-500 hover:bg-gray-700 cursor-pointer'
          onClick={handleGoBack}
        >
          Hủy
        </button>
      </div>
    </section>
  )
}

export default CastDetail
