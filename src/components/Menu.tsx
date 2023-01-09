import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Link from "next/link";


const MenuList = [
  {
    id:'1',
    name:'Dashboard',
    inactiveIcon:'/image/dashboard_icon_inactive.png',
    hoverIcon:'/image/dashboard_icon_hover.png',
    activeIcon:'/image/dashboard_icon_active.png',
    url:'/dashboard',
    classNameActive:'flex items-center space-x-4',
    classNameInactive:'group',
  },
  {
    id:'2',
    name:'POS APIs',
    inactiveIcon:'/image/posapi_icon_inactive.png',
    hoverIcon:'/image/posapi_icon_hover.png',
    activeIcon:'/image/posapi_icon_active.png',
    url:'/test',
    classNameActive:'flex items-center space-x-4',
    classNameInactive:'group',
  },
  {
    id:'3',
    name:'IPFS',
    inactiveIcon:'/image/ipfs_icon_inactive.png',
    hoverIcon:'/image/ipfs_icon_hover.png',
    activeIcon:'/image/ipfs_icon_active.png',
    url:'/ipfs',
    classNameActive:'flex items-center space-x-4',
    classNameInactive:'group',
  },
  {
    id:'4',
    name:'Node',
    inactiveIcon:'/image/node_icon_inactive.png',
    hoverIcon:'/image/node_icon_hover.png',
    activeIcon:'/image/node_icon_active.png',
    url:'/test',
    classNameActive:'flex items-center space-x-4',
    classNameInactive:'group',
  },
  {
    id:'5',
    name:'Premium',
    inactiveIcon:'/image/premium_icon_inactive.png',
    hoverIcon:'/image/premium_icon_hover.png',
    activeIcon:'/image/premium_icon_active.png',
    url:'/test',
    classNameActive:'flex items-center space-x-4',
    classNameInactive:'group',
  },
  {
    id:'6',
    name:'Settings',
    inactiveIcon:'/image/setting_icon_inactive.png',
    hoverIcon:'/image/setting_icon_hover.png',
    activeIcon:'/image/setting_icon_active.png',
    url:'/test',
    classNameActive:'flex items-center space-x-4',
    classNameInactive:'group',
  },
]


type MenuItemPrpos = {
  itemUrl?:string;
  path?:string;
  itemName?:string;
  itemInactiveIcon?:string;
  itemActiveIcon?:string;
  itemHoverIcon?:string;
  classNameActive?:string;
  classNameInactive?:string;
}

export function MenuItem (
  {
    itemUrl,
    path,
    itemName,
    itemInactiveIcon,
    itemActiveIcon,
    itemHoverIcon,
    classNameActive,
    classNameInactive,
  }:MenuItemPrpos
){
  if(path == itemUrl){
    return <div className={classNameActive}>
    <img src={itemActiveIcon} className='w-6'/>
    <h2 className='text-lg text-white font-bold'>
      {itemName}
    </h2>
  </div>
      
  }
  else {
    return <div className={classNameInactive}>
    <div className='hidden group-hover:block group-active:hidden'>
      <div className='flex items-center space-x-4'>
        <img src={itemHoverIcon} className='w-6'/>
          <h2 className='text-lg text-white/70'>
            {itemName}
          </h2>
        </div>
      </div>
      <div className="activeKey =='1':'hidden'?'block' group-hover:hidden">
        <div className='flex items-center space-x-4'>
          <img src={itemInactiveIcon} className='w-6'/>
            <h2 className='text-lg text-white/50'>
              {itemName}
            </h2>
        </div>
    </div>
  </div>

  }
} 

export function Menu()
{
  const router = useRouter();
  
  const activeMenu = useMemo(
    () => MenuList.find((menu) => menu.url === router.pathname),
    [router.pathname]
  );

  return(
    <>
    <div className="min-w-[280px] bg-[#182036]">
      <div className="px-10 flex flex-col h-screen">
        <div className='pt-14'>
          <img src="/image/wetez_logo.png" className="w-2/3"/>
        </div>

        <div className="mt-24 grow">
          <div className='space-y-8 flex flex-col h-full'>
          {MenuList.slice(0,5).map((item) => (
            <div key={item.id}>
              <Link href={item.url}>
                <MenuItem
                  itemUrl={item.id}
                  path={activeMenu?.id}
                  itemName={item.name}
                  itemInactiveIcon={item.inactiveIcon}
                  itemActiveIcon={item.activeIcon}
                  itemHoverIcon={item.hoverIcon}
                  key={item.id}
                  classNameActive={item.classNameActive}
                  classNameInactive={item.classNameInactive}
                />
              </Link>
            </div>
          ))}
          <div className="grow">
            
          </div>
          {MenuList.slice(5,6).map((item) => (
            <div key={item.id}>
              <Link href={item.url}>
                <MenuItem
                  itemUrl={item.id}
                  path={activeMenu?.id}
                  itemName={item.name}
                  itemInactiveIcon={item.inactiveIcon}
                  itemActiveIcon={item.activeIcon}
                  itemHoverIcon={item.hoverIcon}
                  key={item.id}
                  classNameActive={item.classNameActive}
                  classNameInactive={item.classNameInactive}
                />
              </Link>
            </div>
          ))}
            <div className="pb-16">
              <Link href="/">
                <MenuItem
                  itemUrl="//"
                  path="/"
                  itemName="Log Out"
                  itemInactiveIcon="/image/logout_icon_inactive.png"
                  itemActiveIcon="/image/logout_icon_hover.png"
                  itemHoverIcon="/image/logout_icon_hover.png"
                  classNameActive="flex items-center space-x-4"
                  classNameInactive="group"
                />
              </Link>
            </div>
          </div>
                  
        </div>

      </div>

    </div>
    </>
  );

  }