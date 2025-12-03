import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCast, deleteCast, getCastById } from '../../redux/api_request/cast_api'
import Loading from '../../components/Loading'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = Yup.object({
  name: Yup.string().required('Vui lòng nhập tên diễn viên'),
  avatarURL: Yup.mixed().nullable()
})

const CastDetail = () => {
  const casts = useSelector((state: any) => state.cast.getCastById?.data)
  const isLoading = useSelector((state: any) => state.cast.getCastById?.isFetching)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (id) {
      getCastById(id, dispatch)
    }
  }, [id, dispatch])

  useEffect(() => {
    if (id) {
      reset({
        name: casts?.name || '',
        avatarURL: null
      })
      setAvatarPreview(casts?.avatarPath || '')
    }
  }, [casts, reset])

  const handleGoBack = () => {
    // handle go back to previous page
    navigate(-1)
  }

  const handleDelete = () => {
    // handle go back to previous page
    if (!id) return
    if (window.confirm(`Bạn có chắc muốn xóa diễn viên "${casts?.name}"?`)) {
      deleteCast(id, dispatch)
    }
    navigate(-1)
  }

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
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmitForm = (data: any) => {
    if (isValid) {
      if (id) {
        // handle update cast
        toast.success('Cập nhật diễn viên thành công')
      } else {
        // handle create new cast
        createCast(data.avatarURL[0], data.name, dispatch)
      }
      handleGoBack()
    }
  }

  if (isLoading) {
    return <Loading />
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
          <h1 className='text-2xl font-bold'>{id ? 'Chỉnh sửa diễn viên' : 'Thêm diễn viên mới'}</h1>
          <p>{id ? 'Chỉnh sửa thông tin diễn viên' : 'Điền thông tin diễn viên mới'}</p>
        </div>
      </div>

      <form className='flex flex-col gap-5 w-full max-w-lg' onSubmit={handleSubmit(handleSubmitForm)}>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='font-medium'>
            Tên diễn viên
          </label>
          <input
            type='text'
            id='name'
            className='border border-gray-300 rounded-lg p-2'
            placeholder='Nhập tên diễn viên'
            {...register('name')}
          />
        </div>
        <div className='grid gap-2'>
          <label htmlFor='imageFile'>Chọn ảnh</label>
          <input
            id='imageFile'
            type='file'
            accept='image/*'
            {...register('avatarURL')}
            onChange={handleFileUpload}
            className='border border-gray-300 rounded-lg p-2'
          />
          <p className='text-xs text-gray-500'>Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB</p>
        </div>

        {avatarPreview && (
          <div>
            <label>{id ? 'Ảnh hiện tại' : 'Xem trước'}</label>
            <div className='mt-2 aspect-[3/4] max-w-sm overflow-hidden rounded-lg bg-muted'>
              <img
                src={avatarPreview}
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
            disabled={!isValid}
            type='submit'
          >
            Lưu
          </button>

          {id && (
            <button className='py-1 px-3 rounded-lg cursor-pointer bg-secondary' onClick={handleDelete} type='button'>
              Xóa
            </button>
          )}

          <button
            className='py-1 px-3 rounded-lg border border-gray-500 hover:bg-gray-700 cursor-pointer'
            onClick={handleGoBack}
            type='button'
          >
            Hủy
          </button>
        </div>
      </form>
    </section>
  )
}

export default CastDetail
