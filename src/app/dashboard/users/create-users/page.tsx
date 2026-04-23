import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import CreateUser from '@/features/users/components/create-user'
import React from 'react'

export default async function page() {
  return (
    <div>
      <SidebarBreadcrumb label="Créer un utilisateur"/>
      <CreateUser/>
    </div>
  )
}
