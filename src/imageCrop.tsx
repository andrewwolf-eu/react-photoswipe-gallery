import React, { FC, useState, useCallback } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import {
  Slider,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { getCroppedImg } from './helpers/get-cropped-image'
import { ImageCropProps } from './imageCrop-types'

export const ImageCrop: FC<ImageCropProps> = ({
  cropSize,
  outputFileType,
  base64Output,
  getCroppedImage,
  GetCroppedImageUIElement,
  enableFileTypeControl,
  imageSrc,
  enableFileUpload,
  outputSize,
  enableOutputSizeControl,
  zoomSpeed,
  minZoom,
  maxZoom,
  enableZoomControl,
  showGrid = false,
}: ImageCropProps) => {
  const [outputFormat, setOutputFormat] = useState<string>(
    outputFileType ? `image/${outputFileType}` : 'image/jpeg',
  )
  const [image, setImage] = useState<string | null>(imageSrc ?? null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [minZoomState] = useState<number>(minZoom ?? 0.3)
  const [maxZoomState] = useState<number>(maxZoom ?? 5)
  const [zoomSpeedState] = useState<number>(zoomSpeed ?? 1)
  const [croppedAreaPixelsState, setCroppedAreaPixelsState] =
    useState<Area | null>(null)
  const [outputWidth, setOutputWidth] = useState<number>(
    outputSize ? outputSize?.width : cropSize.width,
  )
  const [outputHeight, setOutputHeight] = useState<number>(
    outputSize ? outputSize?.height : cropSize.height,
  )

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixelsState(croppedAreaPixels)
    },
    [],
  )

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result.toString())
        }
      }
    }
  }

  const onDownload = useCallback(async () => {
    if (image && croppedAreaPixelsState) {
      try {
        const croppedImage = await getCroppedImg(
          image,
          croppedAreaPixelsState,
          outputWidth,
          outputHeight,
          outputFormat,
          base64Output,
        )
        if (typeof croppedImage === 'string' && base64Output) {
          getCroppedImage(croppedImage)
        }
        if (typeof croppedImage === 'string' && !base64Output) {
          const link = document.createElement('a')
          link.href = croppedImage
          link.download = `croppedImage.${outputFormat.split('/')[1]}`
          link.click()
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [image, croppedAreaPixelsState, outputWidth, outputHeight])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {enableFileUpload && (
        <input type="file" accept="image/*" onChange={onFileChange} />
      )}
      {image && (
        <div style={{ width: '100%', height: '100%' }}>
          <GetCroppedImageUIElement onClick={onDownload} />
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              cropSize={cropSize}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              minZoom={minZoomState}
              maxZoom={maxZoomState}
              showGrid={showGrid}
              zoomSpeed={zoomSpeedState}
              onCropComplete={onCropComplete}
            />
          </div>
          <div>
            {enableZoomControl && (
              <>
                <Typography variant="overline" display="block" gutterBottom>
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={minZoomState}
                  max={maxZoomState}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoomValue) => setZoom(zoomValue as number)}
                />
              </>
            )}
          </div>
          <div>
            {enableOutputSizeControl && (
              <>
                <TextField
                  label="Output Width"
                  type="number"
                  value={outputWidth}
                  onChange={(e) => setOutputWidth(parseInt(e.target.value, 10))}
                />
                <TextField
                  label="Output Height"
                  type="number"
                  value={outputHeight}
                  onChange={(e) =>
                    setOutputHeight(parseInt(e.target.value, 10))
                  }
                />
              </>
            )}
            {enableFileTypeControl && (
              <FormControl>
                <InputLabel>Format</InputLabel>
                <Select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as string)}
                >
                  <MenuItem value="image/png">PNG</MenuItem>
                  <MenuItem value="image/jpeg">JPEG</MenuItem>
                  <MenuItem value="image/webp">WEBP</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
