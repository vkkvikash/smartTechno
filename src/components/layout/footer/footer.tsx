import React, { useEffect, useState } from "react"
import Widgets from './widgets'
import Copyright from './copyright'
import { submitAPI } from 'src/api/service';


const Footer: React.FC = () => {

  const [footerMenu, setFooterMenu] = useState({
    widgetsMenu: [],
    paymentMenu: []
  })
  useEffect(() => {
    const getHeaders = async () => {
      var data = new FormData()
      const footerData: any = await submitAPI(data, "GET", "get/footer/page", { 'Content-Type': 'multipart/form-data' });
      if (footerData.success) {
        setFooterMenu({
          widgetsMenu: footerData.data.widgets,
          paymentMenu: footerData.data.payment
        })
      }
    }
    getHeaders()

  }, [])

  return (
    <footer className='border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2'>
      <Widgets widgets={footerMenu.widgetsMenu} />
      <Copyright payment={footerMenu.paymentMenu} />
    </footer>
  )

}

export default Footer
