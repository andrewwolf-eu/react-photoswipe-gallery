import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Meta, StoryObj } from '@storybook/react'
import { Gallery, Item } from '..'
import { staticImageUrls } from './imageUrls'

const storyMeta: Meta = {
  title: 'Demo/Basic',
}

export const Basic: StoryObj = {
  /* const getImages = async () => {
    const tempImageUrls: string[] = []
    for (let index = 0; index < imageCount; index++) {
      const imageRaw: { url: string } = await fetch('https://source.unsplash.com/random/200x200?sig=1')
      tempImageUrls.push(imageRaw.url)
    }
    setImageUrls(tempImageUrls)
  }

  useEffect(() => {
    getImages()
  }, []) */

  render: () => {
    const smallItemStyles: React.CSSProperties = {
      cursor: 'pointer',
      objectFit: 'cover',
      width: '100%',
      maxHeight: '100%',
    }
    return (
      <Gallery
        pagination={{
          items: staticImageUrls,
          pageSize: 50,
          paginationControl: 'top-bottom-button',
          UIElements: {
            PrevPageButton: ({ onClick }: any) => {
              return (
                <div
                  onClick={onClick}
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    height: '30px',
                    backgroundColor: 'red',
                  }}
                />
              )
            },
            NextPageButton: ({ onClick }: any) => {
              return (
                <div
                  onClick={onClick}
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    height: '30px',
                    backgroundColor: 'green',
                  }}
                />
              )
            },
          },
          displayItem: (
            paginatedItems: string[],
            pageNumber: number,
            pageSize: number,
          ) => (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '240px 171px 171px',
                gridTemplateRows: '114px 114px',
                gridGap: 12,
              }}
            >
              {paginatedItems.map((items, index) => (
                <div>
                  <p
                    style={{
                      height: '0px',
                      fontSize: '30px',
                      fontWeight: 'bold',
                      color: 'red',
                      position: 'absolute',
                    }}
                  >
                    {pageNumber > 1
                      ? (pageNumber - 1) * pageSize + index
                      : index}
                  </p>
                  <Item<HTMLImageElement>
                    original={items}
                    thumbnail={items}
                    width="1600"
                    height="1066"
                  >
                    {({ ref, open }) => (
                      <img
                        loading="lazy"
                        style={smallItemStyles}
                        src={items}
                        ref={ref}
                        onClick={open}
                        alt={`image${index}`}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          ),
        }}
        ProcessingUIElement={() => {
          return (
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p style={{ fontSize: 50, color: 'white' }}>
                Content Processing...
              </p>
            </div>
          )
        }}
      />
    )
  },
}

export default storyMeta
