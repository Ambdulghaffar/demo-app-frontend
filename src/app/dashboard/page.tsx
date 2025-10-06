import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb"

export default function Page() {
  return (
    <>
    <SidebarBreadcrumb/>
    <div className="flex justify-center items-center h-full w-full">
      <p>Bienvenue dans le dashboard de l&apos;administrateur</p>
    </div>
    </>
  )
}
