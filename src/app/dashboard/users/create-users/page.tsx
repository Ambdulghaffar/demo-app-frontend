import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import CreateUser from '@/components/dashboard/users/create-user'
import React from 'react'

export default function page() {
  return (
    <div>
      <SidebarBreadcrumb label="Créer un utilisateur"/>
      <CreateUser/>
    </div>
  )
}
