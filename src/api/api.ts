import type { MoviesPage } from '../interfaces/interfaces'

const API_URL = 'https://live.mocat.amifactory.network'

export const getMovies = async (movies: string): Promise<MoviesPage> => {
  const response = await fetch(`${API_URL}${movies}`)

  if (!response.ok) {
      throw new Error('Error of loading')
  }

  return response.json()
}
