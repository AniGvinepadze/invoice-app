import React from 'react'
import SidebarSecond from './SidebarSecond'
import SidebarContent from '../../atoms/SidebarContent/SidebarContent'

export default function MainSidebar() {
  return (
    <div className="flex bg-indigo-50">
    <SidebarSecond />
    <SidebarContent />
  </div>
  )
}
