import { useEffect, useRef } from 'react'
import type { Movie } from '../types'
import videojs from 'video.js'

const VideoPLayer = ({ movie }: { movie: Movie }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerRef = useRef<any>(null)
  const src = import.meta.env.VITE_API_URL_VIDEO + movie?.videoUrl

  useEffect(() => {
    // Khởi tạo player nếu chưa có
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      playerRef.current = videojs(videoElement, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: false,
        fill: true,
        height: 400,
        poster: movie?.backdropPath,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          playToggle: true,
          volumePanel: {
            inline: false
          },
          skipButtons: {
            forward: 10,
            backward: 10
          },
          fullscreenToggle: true
        },
        sources: [
          {
            src: src,
            type: 'application/x-mpegURL' // Đây là type bắt buộc cho file .m3u8
          }
        ]
      })
    } else {
      // Nếu player đã có rồi thì chỉ update source thôi (khi đổi tập phim)
      const player = playerRef.current
      player.src({ src: src, type: 'application/x-mpegURL' })
    }
  }, [src])

  // Hủy player khi component bị unmount (để tránh rò rỉ bộ nhớ)
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])
  return (
    <div className='w-full mx-auto h-full bg-black rounded-xl overflow-hidden shadow-2xl relative'>
      <div data-vjs-player className='w-full h-full'>
        <video ref={videoRef} className='video-js vjs-big-play-centered w-full h-full' />
      </div>
    </div>
  )
}

export default VideoPLayer
