import React from 'react'

export interface ImageCropHandle {
  crop: () => Promise<string>
}

export interface ImageCropProps {
  parentRef?: any
  cropSize: { width: number; height: number }
  outputFileType?: 'jpeg' | 'png' | 'webp'
  base64Output?: boolean
  getCroppedImage?: (base64Output: string) => void
  GetCroppedImageUIElement?: (onClick: any) => React.JSX.Element
  enableFileTypeControl?: boolean
  imageSrc?: string
  enableFileUpload?: boolean
  outputSize?: { width: number; height: number }
  enableOutputSizeControl?: boolean
  zoomSpeed?: number
  minZoom?: number
  maxZoom?: number
  enableZoomControl?: boolean
  showGrid?: boolean
}
