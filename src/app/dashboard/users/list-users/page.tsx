import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import React from 'react'

export default function page() {
  return (
    <div>
      <SidebarBreadcrumb label={"Liste des utilisateurs"}/>
      <div className='flex justify-center items-center w-full h-full'>
        liste des utilisateurs
      </div>
    </div>
  )
}
