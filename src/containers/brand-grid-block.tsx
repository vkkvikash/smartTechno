import React, { useState, useEffect } from "react"
import BrandCard from '@components/common/brand-card';
import SectionHeader from '@components/common/section-header';
// import BrandCardLoader from '@components/ui/loaders/brand-card-loader';
// import { useBrandsQuery } from '@framework/brand/get-all-brands';
import Alert from '@components/ui/alert';
import { submitAPI } from "../api/service"

interface BrandProps {
  sectionHeading: string;
  className?: string;
  limit?: number;
  variant?: '6column' | '4column';
}

const BrandGridBlock: React.FC<BrandProps> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
  sectionHeading,
  variant = '4column',
  limit = 3,
}) => {
  // const { data, isLoading, error } = useBrandsQuery({
  //   limit: 5,
  // });
  // const brands = data;
  const [response, setResponse] = useState<{ error: boolean; data: any[]; isLoading: boolean }>({
    error: true,
    data: [],
    isLoading: true
  })
  const columnClasses =
    variant === '4column'
      ? 'grid-cols-2 sm:grid-cols-4'
      : 'grid-cols-2 sm:grid-cols-4 2xl:grid-cols-6';

  useEffect(() => {
    let isApiSubscribe = true;
    async function getData() {
      const brands: any = await submitAPI({}, "GET", "get/brands", {})
      if (brands.success) {
        isApiSubscribe = false;
        setResponse({
          error: false,
          data: brands.data,
          isLoading: false
        })
      } else {
        isApiSubscribe = false;
        setResponse({
          error: true,
          data: [],
          isLoading: false
        })
      }
    }
    if (isApiSubscribe === true) {
      getData()
    }


    return () => {
      isApiSubscribe = false;
    }
  }, [])

  return (
    <div className={className}>
      <SectionHeader sectionHeading={"TOP BRANDS"} />
      {response.error ? (
        <Alert message={"Error while loading data "} />
      ) : (
        <div
          className={`grid ${columnClasses} gap-2.5 md:gap-3 lg:gap-5 xl:gap-7`}
        >
          {/* <>text area testing {response?.data?[0]?title}</> */}
          {response.data?.slice(0, limit)
            .map((item) => (
              <BrandCard key={`brand--key${item.id}`} brand={{ "id": item.id, "slug": item.slug, "name": item.title, background_image: item.image_medium, image: item.image_small }} />
            ))
          }

        </div>
      )}
    </div>
  );
};

export default BrandGridBlock;
