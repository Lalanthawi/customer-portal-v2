import { cn } from '@/src/lib/utils'
import { EmptyState } from './empty-state'
import { LoadingState } from './loading-state'

interface Column<T> {
  key: string
  header: string
  accessor: (item: T) => React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string
  isLoading?: boolean
  emptyMessage?: string
  emptyDescription?: string
  className?: string
  onRowClick?: (item: T) => void
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No data available',
  emptyDescription,
  className,
  onRowClick
}: DataTableProps<T>) {
  if (isLoading) {
    return <LoadingState message="Loading data..." />
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <EmptyState title={emptyMessage} description={emptyDescription} />
      </div>
    )
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",
                  alignClasses[column.align || 'left'],
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              onClick={() => onRowClick?.(item)}
              className={cn(
                "hover:bg-gray-50 transition-colors",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                    alignClasses[column.align || 'left'],
                    column.className
                  )}
                >
                  {column.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}