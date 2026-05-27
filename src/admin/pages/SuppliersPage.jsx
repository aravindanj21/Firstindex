import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )

      const updatedSuppliers = response.data.map(
        (supplier, index) => ({
          ...supplier,

          status:
            index % 3 === 0
              ? 'Approved'
              : index % 3 === 1
              ? 'Pending'
              : 'Blocked',
        })
      )

      setSuppliers(updatedSuppliers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = (id) => {
    const updatedSuppliers = suppliers.map(
      (supplier) =>
        supplier.id === id
          ? {
              ...supplier,
              status: 'Approved',
            }
          : supplier
    )

    setSuppliers(updatedSuppliers)
  }

  const handleBlock = (id) => {
    const updatedSuppliers = suppliers.map(
      (supplier) =>
        supplier.id === id
          ? {
              ...supplier,
              status: 'Blocked',
            }
          : supplier
    )

    setSuppliers(updatedSuppliers)
  }

  const handleView = (supplier) => {
    alert(`
Supplier Details

Supplier ID : SUP00${supplier.id}

Name : ${supplier.name}

Business : ${supplier.company.name}

Phone : ${supplier.phone}

Location : ${supplier.address.city}

Status : ${supplier.status}
    `)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>
          Suppliers Management
        </h2>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>
                Supplier ID
              </th>

              <th style={styles.th}>
                Supplier Name
              </th>

              <th style={styles.th}>
                Business Name
              </th>

              <th style={styles.th}>Mobile</th>

              <th style={styles.th}>
                Location
              </th>

              <th style={styles.th}>Status</th>

              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                style={styles.tr}
              >
                <td style={styles.td}>
                  SUP00{supplier.id}
                </td>

                <td style={styles.td}>
                  {supplier.name}
                </td>

                <td style={styles.td}>
                  {supplier.company.name}
                </td>

                <td style={styles.td}>
                  {supplier.phone}
                </td>

                <td style={styles.td}>
                  {supplier.address.city}
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,

                      background:
                        supplier.status ===
                        'Approved'
                          ? '#dcfce7'
                          : supplier.status ===
                            'Pending'
                          ? '#fef3c7'
                          : '#fee2e2',

                      color:
                        supplier.status ===
                        'Approved'
                          ? '#15803d'
                          : supplier.status ===
                            'Pending'
                          ? '#b45309'
                          : '#dc2626',
                    }}
                  >
                    {supplier.status}
                  </span>
                </td>

                <td style={styles.td}>
                  <div
                    style={
                      styles.actionContainer
                    }
                  >
                    <button
                      style={styles.viewBtn}
                      onClick={() =>
                        handleView(supplier)
                      }
                    >
                      View
                    </button>

                    <button
                      style={
                        styles.approveBtn
                      }
                      onClick={() =>
                        handleApprove(
                          supplier.id
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      style={styles.blockBtn}
                      onClick={() =>
                        handleBlock(
                          supplier.id
                        )
                      }
                    >
                      Block
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 20,
    background: '#f8fafc',
    minHeight: '100vh',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    flexWrap: 'wrap',
    gap: 15,
  },

  heading: {
    fontSize: 32,
    color: '#0f172a',
    fontWeight: '700',
  },

  tableContainer: {
    background: '#fff',
    borderRadius: 20,
    overflowX: 'auto',
    boxShadow:
      '0 8px 25px rgba(0,0,0,0.08)',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: 1000,
  },

  thead: {
    background: '#0f172a',
  },

  th: {
    color: '#fff',
    textAlign: 'left',
    padding: 18,
    fontSize: 15,
    fontWeight: '600',
  },

  tr: {
    borderBottom: '1px solid #e2e8f0',
    transition: '0.3s',
  },

  td: {
    padding: 18,
    color: '#334155',
    fontSize: 15,
  },

  status: {
    padding: '7px 14px',
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 13,
  },

  actionContainer: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },

  viewBtn: {
    background: '#e0f2fe',
    color: '#0369a1',
    border: 'none',
    padding: '9px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: '600',
  },

  approveBtn: {
    background: '#dcfce7',
    color: '#15803d',
    border: 'none',
    padding: '9px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: '600',
  },

  blockBtn: {
    background: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    padding: '9px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: '600',
  },
}

export default SuppliersPage