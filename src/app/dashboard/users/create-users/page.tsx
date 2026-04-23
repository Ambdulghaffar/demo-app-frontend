import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import CreateUser from '@/features/users/components/create-user'
import React from 'react'

export default async function page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <div>
      <SidebarBreadcrumb label="Créer un utilisateur"/>
      <CreateUser/>
    </div>
  )
}
