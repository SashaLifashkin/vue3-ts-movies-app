import type { Person } from '../interfaces/interfaces'

export const hoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  if (hours === 0) {
    return `${remainingMinutes}m`
  }

  return `${hours}h ${remainingMinutes}m`
}

export const getPersons = (persons: Person[]): string => {
  if (persons.length === 0) {
    return ''
  }

  if (persons.length === 1) {
    return `${persons[0].first_name} ${persons[0].last_name}`
  }

  return `${persons.map(persons => `${persons.first_name} ${persons.last_name}`).join(', ')}`
}

export const splitIntoChunks = <T>(sourceArray: T[], chunkSize: number): T[][] => {
  const resultChunks: T[][] = []
  const chunkCounts = Math.ceil(sourceArray.length / chunkSize)

  for (let i = 0; i < chunkCounts; i++) {
    const start = i * chunkSize
    const end = start + chunkSize
    const chunk = sourceArray.slice(start, end)
    resultChunks.push(chunk)
  }

  return resultChunks
}

export const getArrayFromChunks = <T>(sourceArray: T[][], count: number): T[] => {
  const resultCountChanks: T[] = []

  for (let i = 0; i <= count; i++) {
    resultCountChanks.push(...sourceArray[i])
  }

  return resultCountChanks
}
