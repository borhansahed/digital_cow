export type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

type IOptionsReturn = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export const paginationHelper = (options: IOptions): IOptionsReturn => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)

  const skip = (page - 1) * 10

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}
