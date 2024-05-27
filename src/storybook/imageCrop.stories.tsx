import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Button } from '@mui/material'
import { ImageCrop } from '..'
import { imageCropb64testSource } from './imageCropb64testSource'

const storyMeta: Meta = {
  title: 'Demo/Image Crop',
}

export const ImageCropBasic: StoryObj = {
  render: () => {
    const [croppedImageState, setCroppedImageState] = useState<string>()

    return (
      <div style={{ width: 1000, height: 1000 }}>
        <ImageCrop
          imageSrc={imageCropb64testSource}
          cropSize={{ width: 100, height: 100 }}
          // outputFileType='jpeg'
          base64Output
          getCroppedImage={(base64Output: string) =>
            setCroppedImageState(base64Output)
          }
          GetCroppedImageUIElement={({ onClick }: any) => (
            <Button variant="contained" color="primary" onClick={onClick}>
              Download Cropped Image
            </Button>
          )}
          zoomSpeed={0.1}
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
      </div>
    )
  },
}

export default storyMeta
