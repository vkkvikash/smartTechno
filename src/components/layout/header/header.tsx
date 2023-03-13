import React, { useRef, useEffect, useState } from 'react'
import Router from "next/router";
import SearchIcon from '@components/icons/search-icon'
import HeaderMenu from '@components/layout/header/header-menu'
import Logo from '@components/ui/logo'
import { useUI } from '@contexts/ui.context'
import { ROUTES } from '@utils/routes'
import { addActiveScroll } from '@utils/add-active-scroll'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '@components/ui/language-switcher'
import WishButton from '@components/ui/wish-button'
import { UserLineIcon } from '@components/icons/UserLineIcon'
import Link from '@components/ui/link'
import { IoLogOutOutline } from "react-icons/io5";
import Cookies from 'universal-cookie'
import { useLogoutMutation } from "@framework/auth/use-logout";
import CategoryMenu from '@components/ui/category-menu'
import { submitAPI } from 'src/api/service'
import FormData from 'form-data'

const CartButton = dynamic(() => import('@components/cart/cart-button'), {
	ssr: false,
})

type DivElementRef = React.MutableRefObject<HTMLDivElement>

const staticMenu = [{
	id: 6,
	path: '/',
	label: 'Pages',
	subMenu: [
		{
			id: 2,
			path: '/faq',
			label: 'FAQ',
		},
		{
			id: 3,
			path: '/privacy',
			label: 'Privacy Policy',
		},
		{
			id: 4,
			path: '/terms',
			label: 'Terms & Condition',
		},
		{
			id: 5,
			path: '/contact-us',
			label: 'Contact Us',
		},
	],
}]
const Header: React.FC = () => {
	const {
		openSidebar,
		setDrawerView,
		openSearch,
		openModal,
		setModalView,
		isAuthorized,
	} = useUI()
	const { mutate: logout } = useLogoutMutation();
	const { t } = useTranslation()
	const siteHeaderRef = useRef() as DivElementRef
	addActiveScroll(siteHeaderRef)
	const cookies = new Cookies();

	function handleLogin() {
		setModalView('LOGIN_VIEW')
		return openModal()
	}
	function handleSignUp() {
		setModalView('SIGN_UP_VIEW')
		return openModal()
	}
	function handleMobileMenu() {
		setDrawerView('MOBILE_MENU')
		return openSidebar()
	}
	const [menu, setMenu] = useState({
		categoryMenu: [],
		pagesMenu: [],
		mobileMenu: []
	})
	const [searchData, setSearchData] = useState({
		searchArr: []
	})
	const [serachInput, setSearchInput] = useState("");
	const [showsuggestionBox, setshowsuggestionBox] = useState(false);

	const searchHeader = (event: any) => {
		setSearchInput(event.target.value);
		setTimeout(() => {
			setshowsuggestionBox(true)
			if(serachInput){
				getSearch()
			}
			
		}, 2000);
	}
	const onBlurSearch = () => {
		setTimeout(() => {
			setshowsuggestionBox(false)
			// if(serachInput){
			// 	getSearch()
			// }
			
		}, 1000);
	}

	async function getSearch() {
		// console.log("searchData.searchArr.length",searchData.searchArr.length)
		var data = new FormData();
		data.append("search", serachInput)
		const isApiSubscribed: any = await submitAPI(data, "POST", "get/header/search", { 'Content-Type': 'multipart/form-data' });
		if (isApiSubscribed.success) {
			console.log("isApiSubscribed",isApiSubscribed)
			setSearchData({
				searchArr: isApiSubscribed.data.results
			})
			// setIsLoading(false)
		}
	}

	// useEffect(() => {
	// 	console.log("serachInput",serachInput)
	// 	let isApiSubscribed = true;

	// 	if (isApiSubscribed && serachInput) {
	// 		getSearch()
	// 	}

	// 	return () => {
	// 		isApiSubscribed = false;
	// 	}
	// }, [serachInput])


	useEffect(() => {
		const getHeaders = async () => {
			var data = new FormData()
			const headerData: any = await submitAPI(data, "GET", "get/header/menu", { 'Content-Type': 'multipart/form-data' });
			if (headerData.success) {
				setMenu({
					categoryMenu: headerData.data.categoryMenu,
					pagesMenu: headerData.data.pagesMenu,
					mobileMenu: headerData.data.mobileMenu.concat(staticMenu)
				})
			}
		}
		getHeaders()
	}, [])

	return (
		<header
			id='siteHeader'
			ref={siteHeaderRef}
			className='relative z-20 w-full h-16 sm:h-20 lg:h-36 xl:h-40 headerThree'
		>
			<div className='fixed z-20 w-full h-16 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-36 xl:h-40 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 px-4 md:px-8 2xl:px-16'>
				<div className='flex items-center justify-center mx-auto max-w-[1920px] h-full lg:h-20 xl:h-24 w-full relative before:absolute before:w-screen before:h-px before:bg-[#F1F1F1] before:bottom-0'>
					<button
						aria-label='Menu'
						className='flex-col items-center justify-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex lg:hidden 2xl:px-7 focus:outline-none'
						onClick={handleMobileMenu}
					>
						<span className='menuIcon'>
							<span className='bar' />
							<span className='bar' />
							<span className='bar' />
						</span>
					</button>
					<div className='flex items-center 2xl:me-12 3xl:me-20'>
						<Logo />
						<div className='hidden transition-all duration-100 ease-in-out lg:flex ms-7 xl:ms-9 pe-2 headerTopMenu'>
							{menu.pagesMenu.length ? menu.pagesMenu?.map((item: any) => (
								<Link
									href={item.path}
									className='relative flex items-center px-3 lg:px-2.5 py-0 text-sm font-normal xl:text-base text-heading xl:px-6 hover:text-black'
									key={`pages-menu-${item.id}`}
								>
									{t(`${item.label}`)}
									{item.icon && (
										<span className='ms-1.5 xl:ms-2'>{item.icon}</span>
									)}
								</Link>
							)) : null}
						</div>
					</div>

					<div className='relative hidden w-2/6 me-auto lg:block'>
						<form
							className='relative w-full overflow-hidden rounded-md bg-borderBottom'
							noValidate
							onSubmit={(event) => {
								event.preventDefault();
								Router.push(`/search?q=${serachInput}`)
							}}
						>
							<label htmlFor='search' className='flex items-center'>
								<span className='absolute top-0 left-0 flex items-center justify-center flex-shrink-0 w-12 h-full cursor-pointer md:w-14 focus:outline-none'>
									<SearchIcon
										color='text-heading'
										className='w-[18px] h-[18px]'
									/>
								</span>
								<input
									id='search'
									className='w-full text-sm placeholder-gray-400 bg-transparent rounded-md outline-none focus:border-2 focus:border-gray-600 pe-4 ps-14 h-14 text-heading lg:text-base'
									placeholder={'Search Anything...'}
									aria-label='Search'
									autoComplete='off'
									value={serachInput}
									onChange={searchHeader}
									onBlur={onBlurSearch}
								/>
							</label>
						</form>
						{showsuggestionBox && <div className='searchSuggestionBox '>
							<ul className='suggestedProd'>
							{searchData.searchArr ? searchData.searchArr?.map((item: any) => (
									<Link
										href={t(`/products/${item.slug}`)}
									>
									<li>
										<h4 className='text-2xl md:text-lg font-bold text-heading'>
										{t(`${item.product_name}`)}
										</h4>
										<p className='text-2'>{t(`${Number(item.vendor_info.price)}`)}</p>
									</li>
									</Link>
							)) : 
									<li>
										<p className='text-2'>No data found.</p>
									</li>
							}
							</ul>
						</div>}
					</div>
					<div className='flex flex-shrink-0 transition-all duration-200 ease-in-out transform ms-auto md:me-auto lg:me-5 xl:me-8 2xl:me-10 languageSwitcher lg:hidden md:pe-16'>
						<LanguageSwitcher />
					</div>
					<div className='flex items-center justify-end flex-shrink-0'>
						<div className='items-center justify-end flex-shrink-0 hidden transition-all duration-200 ease-in-out md:flex space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 me-6 lg:me-5 xl:me-8 2xl:me-10 ms-auto searchSignIn lg:hidden'>
							<button
								className='relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none'
								onClick={openSearch}
								aria-label='search-button'
							>
								<SearchIcon />
							</button>
						</div>

						<div className='items-center hidden transition-all md:flex wishlistShopping space-s-7 lg:space-s-6 xl:space-s-8 2xl:space-s-10 ps-3'>
							<div className='flex md:gap-x-4 align-center '>
								<WishButton />
								<span className='hidden text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-heading'>
									{t('Wishlist')}
								</span>
							</div>

							<div className='flex md:gap-x-4 align-center'>
								<CartButton />
								<span className='hidden text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-heading'>
									{t('Shopping')}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='items-center hidden lg:flex lg:h-16 headerBottom mx-auto max-w-[1920px]'>
					<div className='flex items-center'>
						{menu?.categoryMenu.length ?
							<CategoryMenu
								className='hidden lg:block'
								categoryMenu={menu?.categoryMenu}
							/> : null}
						{menu.mobileMenu.length ?
							<HeaderMenu
								data={menu.mobileMenu}
								className='hidden lg:flex ps-3.5 xl:ps-5'
							/> : null}
					</div>

					<div className='flex items-center flex-shrink-0 ms-auto gap-x-0'>
						{cookies.get("Authorization") && cookies.get("userId") ? (
							<>
								<Link
									className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
									href="/my-account"
								>
									<UserLineIcon className='w-2 xl:w-[17px] h-auto text-black' />
									<span className="ps-2" >{t("My Account")}</span>
								</Link>
								<button
									className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
									onClick={() => logout()}
								>
									<IoLogOutOutline className="w-5 h-5" />
									<span className="ps-2" >{t("Logout")}</span>
								</button>

							</>
						) : (
							<>
								<button
									className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
									onClick={() => handleSignUp()}
								>
									<UserLineIcon className='w-2 xl:w-[17px] h-auto text-black' />
									<span className="ps-2" >{t("Signup")}</span>
								</button>
								<button
									className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
									onClick={() => handleLogin()}
								>
									<UserLineIcon className='w-2 xl:w-[17px] h-auto text-black' />
									<span className="ps-2" >{t("Login")}</span>
								</button>
							</>
						)}

					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
