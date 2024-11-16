import { FC, ReactNode } from 'react'

interface ShowProps<T> {
  when: T | undefined | null | false
  fallback?: ReactNode
  children: ReactNode | ((item: T) => ReactNode)
}

export const Show: FC<ShowProps<any>> = ({ when: condition, fallback = null, children }) => {
  if (!condition) {
    return <>{fallback}</>
  }

  return <>{typeof children === 'function' ? children(condition) : children}</>
}
