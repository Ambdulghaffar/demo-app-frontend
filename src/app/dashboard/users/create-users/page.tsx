import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import React from 'react'

export default function page() {
  return (
    <div>
      <SidebarBreadcrumb label="Créer un utilisateur"/>
      <div className="flex justify-center items-center h-full w-full">
        <p>Page de création d&apos;un utilisateur</p>
      </div>
    </div>
  )
}
