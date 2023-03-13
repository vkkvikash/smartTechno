import SectionHeader from '@components/common/section-header';
import ProductOverlayCard from '@components/product/product-overlay-card';
import { useFeaturedProductsQuery } from '@framework/product/get-all-featured-products';
import Alert from '@components/ui/alert';
import { Product } from '@framework/types';
import Image from 'next/image';
import cn from 'classnames';

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  limit?: number;
  variant?: 'left' | 'center' | 'combined' | 'flat' | 'modern';
  hideBanner?: boolean;
  demoVariant?: 'ancient';
  disableBorderRadius?: boolean;
}

const ProductsFeatured: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = 'mb-12 md:mb-14 xl:mb-16',
  variant = 'left',
  limit = 5,
  hideBanner = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const { data, error } = useFeaturedProductsQuery({
    limit: limit,
    demoVariant,
  });

  const dummyData = [
    {
      "id": 1,
      "name": "Nike Bag",
      "description": "Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement",
      "slug": "nike-bag",
      "isNewArrival": true,
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/1.png",
        "original": "/assets/images/products/featured/1.png"
      },
      "price": 20.38,
      "sale_price": 16.38,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 2,
      "name": "Adidas Woolen Cap",
      "description": "Casual wear (casual attire or clothing) may be a Western code that’s relaxed, occasional, spontaneous and fitted to everyday use. Casual wear became popular within the Western world following the counterculture of the 1960s.",
      "slug": "adidas-woolen-cap",
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/2.png",
        "original": "/assets/images/products/featured/2.png"
      },
      "price": 20.0,
      "sale_price": 16.0,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 3,
      "name": "Nike Leader VT",
      "description": "Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment, usually regarding ground textures and temperature.",
      "slug": "nike-leader-vt",
      "isNewArrival": true,
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/3.png",
        "original": "/assets/images/products/featured/3.png"
      },
      "price": "",
      "sale_price": 16.38,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 4,
      "name": "Ray ban Aviator",
      "description": "Polarized sunglasses reduce glare reflected off of roads, bodies of water, snow and other horizontal surfaces.Restore true color.Vision lenses are 400UV rated, meaning it can block UVA and UVB radiation.",
      "slug": "ray-ban-aviator",
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/4.png",
        "original": "/assets/images/products/featured/4.png"
      },
      "price": 850.0,
      "sale_price": 720.0,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 5,
      "name": "Tissot Classic",
      "description": "The new-model Submariner now features Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement,",
      "slug": "tissot-classic",
      "isNewArrival": true,
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/5.png",
        "original": "/assets/images/products/featured/5.png"
      },
      "price": "20.38",
      "sale_price": 600.0,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 6,
      "name": "Nike Leader VT",
      "description": "Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment, usually regarding ground textures and temperature.",
      "slug": "nike-leader-vt",
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/3.png",
        "original": "/assets/images/products/featured/3.png"
      },
      "price": "",
      "sale_price": 16.38,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 7,
      "name": "Ray ban Aviator",
      "description": "Polarized sunglasses reduce glare reflected off of roads, bodies of water, snow and other horizontal surfaces.Restore true color.Vision lenses are 400UV rated, meaning it can block UVA and UVB radiation.",
      "slug": "ray-ban-aviator",
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/4.png",
        "original": "/assets/images/products/featured/4.png"
      },
      "price": 850.0,
      "sale_price": 720.0,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 8,
      "name": "Tissot Classic",
      "description": "The new-model Submariner now features Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement,",
      "slug": "tissot-classic",
      "isNewArrival": true,
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/5.png",
        "original": "/assets/images/products/featured/5.png"
      },
      "price": "20.38",
      "sale_price": 600.0,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 9,
      "name": "Nike Leader VT",
      "description": "Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment, usually regarding ground textures and temperature.",
      "slug": "nike-leader-vt",
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/7.png",
        "original": "/assets/images/products/featured/7.png"
      },
      "price": "",
      "sale_price": 16.38,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 10,
      "name": "Ray ban Aviator",
      "description": "Polarized sunglasses reduce glare reflected off of roads, bodies of water, snow and other horizontal surfaces.Restore true color.Vision lenses are 400UV rated, meaning it can block UVA and UVB radiation.",
      "slug": "ray-ban-aviator",
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/8.png",
        "original": "/assets/images/products/featured/8.png"
      },
      "price": 850.0,
      "sale_price": 720.0,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    },
    {
      "id": 11,
      "name": "Tissot Classic",
      "description": "The new-model Submariner now features Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement,",
      "slug": "tissot-classic",
      "isNewArrival": true,
      "image": {
        "id": 1,
        "thumbnail": "/assets/images/products/featured/9.png",
        "original": "/assets/images/products/featured/9.png"
      },
      "price": "20.38",
      "sale_price": 600.0,
      "variations": [
        {
          "id": 1,
          "value": "S",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 2,
          "value": "M",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 3,
          "value": "L",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 4,
          "value": "XL",
          "attribute": {
            "id": 1,
            "name": "Size",
            "slug": "size"
          }
        },
        {
          "id": 5,
          "value": "Orange",
          "meta": "#e86c25",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 6,
          "value": "Pink",
          "meta": "#ffa5b4",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 7,
          "value": "Purple",
          "meta": "#8224e3",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        },
        {
          "id": 8,
          "value": "Red",
          "meta": "#dd3333",
          "attribute": {
            "id": 1,
            "name": "Color",
            "slug": "color"
          }
        }
      ]
    }
  ]

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} categorySlug={categorySlug} />
      {false ? (
        <Alert message={error?.message} />
      ) : (
        <div
          className={cn(
            `grid grid-cols-4 grid-rows-2 gap-${demoVariant === 'ancient' ? 1 : 3} md:gap-${demoVariant === 'ancient' ? 2 : 5} xl:gap-${demoVariant === 'ancient' ? 1 : 7
            }`,
            {
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': variant === 'modern',
            }
          )}
        >
          {dummyData?.slice(0, limit).map((product: any, idx: number) => (
            <ProductOverlayCard
              disableBorderRadius={disableBorderRadius}
              key={`product--key${product.id}`}
              product={product}
              variant={variant}
              index={idx}
            />
          ))}
          {hideBanner === false && variant === 'modern' && (
            <>
              <div className="sm:row-span-2">
                <Image
                  src="/assets/images/products/featured/featured-products-banner.png"
                  width={435}
                  height={647}
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div className="sm:row-span-2">
                <Image
                  src="/assets/images/products/featured/featured-products-banner.png"
                  width={435}
                  height={647}
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div className="sm:row-span-2">
                <Image
                  src="/assets/images/products/featured/featured-products-banner.png"
                  width={435}
                  height={647}
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div className="sm:row-span-2">
                <Image
                  src="/assets/images/products/featured/featured-products-banner.png"
                  width={435}
                  height={647}
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default ProductsFeatured;
