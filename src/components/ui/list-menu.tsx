import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { IoIosArrowForward } from 'react-icons/io'
import Link from './link'
import MegaMenu from './mega-menu'
import cn from 'classnames'

const ListMenu = ({
  dept,
  data,
  hasSubMenu,
  hasMegaMenu,
  hasBrands,
  hasBanners,
  menuIndex,
}: any) => {
  const { t } = useTranslation('menu')

  return (
    <li className={cn(!hasMegaMenu ? 'group relative' : '')}>
      <Link
        href={data?.path ? data?.path : data.slug}
        className='flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300'
      >
        {data.icon && <span className='inline-flex me-2'>
          <Image
            unoptimized
            src={data.icon}
            height={30}
            width={30}
            alt={data.slug}
          />
        </span>}
        {t(data.label ? data.label : data.title)}
        {data.subMenu && (
          <span className='text-sm mt-0.5 shrink-0 ml-auto'>
            <IoIosArrowForward className='transition duration-300 ease-in-out text-body group-hover:text-black' />
          </span>
        )}
      </Link>
      {hasSubMenu && (
        <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />
      )}
      {(hasMegaMenu || hasBrands || hasBanners) && (
        <div className='absolute flex bg-white categoryMegaMenu shadow-header start-full'>
          <div className='flex-shrink-0'>
            <MegaMenu columns={hasMegaMenu} />
          </div>
          <div className='hidden xl:block'>
            <div className='grid grid-cols-3 gap-3 p-6 2xl:py-8 2xl:px-7 3xl:grid-cols-3 justify-items-center'>
              {hasBrands.map((brand: any) => (
                <Link
                  href={brand.path}
                  key={brand.id}
                  className='bg-gray-200 border border-gray-300 rounded-md'
                >
                  <Image
                    src={brand.icon.src}
                    height={60}
                    width={150}
                    alt={brand.label}
                  />
                </Link>
              ))}
            </div>
            <div className='grid grid-cols-2 gap-3 p-6 border-t border-gray-300 2xl:py-8 2xl:px-7 '>
              {hasBanners.map((banner: any) => (
                <Link href={banner.path} key={banner.id}>
                  <img className='' src={banner.image.src} alt={banner.label} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
  dept = dept + 1
  return (
    <ul className='absolute z-0 invisible w-56 py-3 bg-gray-200 opacity-0 subMenuChild shadow-subMenu end-full 2xl:end-auto 2xl:start-full top-4'>
      {data?.map((menu: any, index: number) => {
        const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`

        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu.subMenu}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
          />
        )
      })}
    </ul>
  )
}

export default ListMenu
