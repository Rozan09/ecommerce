import React from 'react'

const Loading = ({ 
  type = 'spinner', 
  size = 'medium', 
  text = 'Loading...',
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const Spinner = () => (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-[--main-color]`}></div>
  )

  const Dots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-[--main-color] rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-[--main-color] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-[--main-color] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  )

  const Pulse = () => (
    <div className={`${sizeClasses[size]} bg-[--main-color] rounded-full animate-pulse`}></div>
  )

  const Skeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-4 mb-2"></div>
      <div className="bg-gray-200 rounded-lg h-4 mb-2 w-3/4"></div>
      <div className="bg-gray-200 rounded-lg h-4 w-1/2"></div>
    </div>
  )

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <Dots />
      case 'pulse':
        return <Pulse />
      case 'skeleton':
        return <Skeleton />
      default:
        return <Spinner />
    }
  }

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {text && (
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  )
}

export default Loading 