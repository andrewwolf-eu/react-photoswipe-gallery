import React, { useState, useRef } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Button } from '@mui/material'
import { ImageCrop } from '..'
import { ImageCropHandle } from '../imageCrop-types'
import { imageCropb64testSource } from './imageCropb64testSource'

const storyMeta: Meta = {
  title: 'Demo/Image Crop',
}

export const ImageCropBasic: StoryObj = {
  render: () => {
    const [croppedImageState, setCroppedImageState] = useState<string>()
    const imageCropRef = useRef<ImageCropHandle>(null)

    const handleCrop = async () => {
      if (imageCropRef.current) {
        const base64Output = await imageCropRef.current.crop()
        setCroppedImageState(base64Output)
      }
    }

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ImageCrop
          ref={imageCropRef}
          imageSrc={imageCropb64testSource}
          cropSize={{ width: 100, height: 100 }}
          // outputFileType='jpeg'
          base64Output
          zoomSpeed={0.1}
          /* GetCroppedImageUIElement={({ onClick }: any) => (
          <Button variant="contained" color="primary" onClick={onClick}>
            Download Cropped Image
          </Button>
        )} */
          // showGrid
          // enableZoomControl
          // enableFileTypeControl
          // enableFileUpload
          // enableOutputSizeControl
          // outputSize={{ width: 300, height: 300 }}
        />
        {croppedImageState && (
          <img src={croppedImageState} alt="croppedImage" />
        )}
        <Button variant="contained" color="primary" onClick={handleCrop}>
          Download Cropped Image
        </Button>
      </div>
    )
  },
}

export default storyMeta
