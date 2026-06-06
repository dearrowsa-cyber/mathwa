import React from 'react'
import AdminSectionPage from '../components/AdminSectionPage'

export default function GenericManage({ title, description, addLabel = 'Add new' }) {
  return (
    <AdminSectionPage
      title={title}
      description={description}
      addLabel={addLabel}
      onAdd={() => alert('Add form — connect backend for CRUD')}
      columns={[{ key: 'name', label: 'Name' }, { key: 'updated', label: 'Last updated' }]}
      data={[]}
      onEdit={() => alert('Edit — connect backend')}
      onDelete={() => {}}
      emptyMessage={`No items yet. Connect backend and add "${addLabel}" to manage content here.`}
    />
  )
}
