import SidebarBreadcrumb from '@/components/dashboard/sidebar-breadcrumb'
import ListUsers from '@/components/dashboard/users/list-users'
import React from 'react'

export default function page() {
  return (
    <div>
      <SidebarBreadcrumb label={"Liste des utilisateurs"}/>
      <ListUsers/>
    </div>
  )
}
