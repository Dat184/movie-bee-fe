export const fetcher = (...args: Parameters<typeof fetch>): Promise<any> =>
  fetch(...args).then((res: Response) => res.json())

export const fetchWithToken = (url: string): Promise<any> => {
  return fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDlmMTg0OTM3MzQ4MjAxZTVkNjQ3Y2I5YmZkNTE5MCIsIm5iZiI6MTc1MzUyMzMwNS4wMSwic3ViIjoiNjg4NGE0NjlmYjViOWMxYjNjZjc4NWJhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rNDn2JT75g5UF0FuqmQqwllT0n9GFM9koI9baa1-Chg`
    }
  }).then((res: Response) => res.json())
}

const tmdbEndpoint: string = 'https://api.themoviedb.org/3/movie/'
const tmdbEndpointSearch: string = 'https://api.themoviedb.org/3/search/movie'
const tmdbEndpointKeyword: string = 'https://api.themoviedb.org/3/keyword/'

type MovieType = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'
type MetaType = 'credits' | 'videos' | 'images' | 'reviews' | 'similar' | 'recommendations'
type ImageSize = 'w154' | 'w185' | 'w300' | 'w342' | 'w500' | 'w780' | 'original'

export const tmdbAPI = {
  getMovieList: (type: MovieType, page: number = 1): string => {
    return `${tmdbEndpoint}${type}?page=${page}`
  },
  getMoviesearch: (query: string, page: number): string => {
    return `${tmdbEndpointSearch}?query=${query}&language=en-US&page=${page}`
  },
  getMovieDetails: (movieId: number | string): string => {
    return `${tmdbEndpoint}${movieId}`
  },
  getMovieMeta: (movieId: number | string, type: MetaType): string => {
    return `${tmdbEndpoint}${movieId}/${type}?language=en-US`
  },
  getImage: (path: string, size: ImageSize): string => {
    return `https://image.tmdb.org/t/p/${size}${path}`
  },
  getGenres: (): string => {
    return `https://api.themoviedb.org/3/genre/movie/list?language=en-US`
  },
  getCartoonMovies: (page: number = 1): string => {
    return `${tmdbEndpointKeyword}6513-cartoon/movies?page=${page}`
  }
}
