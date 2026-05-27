import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VendorsPage = () => {
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )

      const updated = response.data.map((vendor, index) => ({
        ...vendor,
        status:
          index % 3 === 0
            ? 'Approved'
            : index % 3 === 1
            ? 'Pending'
            : 'Blocked',
      }))

      setVendors(updated)
    } catch (error) {
      console.log(error)
    }
  }

  const handleView = (vendor) => {
    alert(`
Vendor Details

ID: VEN00${vendor.id}
Name: ${vendor.name}
Business: ${vendor.company.name}
Phone: ${vendor.phone}
City: ${vendor.address.city}
Status: ${vendor.status}
    `)
  }

  const handleApprove = (id) => {
    const updated = vendors.map((vendor) =>
      vendor.id === id
        ? { ...vendor, status: 'Approved' }
        : vendor
    )

    setVendors(updated)
  }

  const handleBlock = (id) => {
    const updated = vendors.map((vendor) =>
      vendor.id === id
        ? { ...vendor, status: 'Blocked' }
        : vendor
    )

    setVendors(updated)
  }

  return (
    <div style={styles.container}>
      <div style={styles.topSection}>
        <div>
          <h1 style={styles.heading}>
            Vendors Management
          </h1>

          <p style={styles.subText}>
            Manage all registered vendors
          </p>
        </div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headRow}>
              <th style={styles.th}>Vendor ID</th>
              <th style={styles.th}>Vendor Name</th>
              <th style={styles.th}>Business Name</th>
              <th style={styles.th}>Mobile</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} style={styles.bodyRow}>
                <td style={styles.td}>
                  VEN00{vendor.id}
                </td>

                <td style={styles.td}>
                  <div style={styles.userBox}>
                    <div style={styles.avatar}>
                      {vendor.name.charAt(0)}
                    </div>
                    <span>{vendor.name}</span>
                  </div>
                </td>

                <td style={styles.td}>
                  {vendor.company.name}
                </td>

                <td style={styles.td}>
                  {vendor.phone}
                </td>

                <td style={styles.td}>
                  {vendor.address.city}
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      background:
                        vendor.status === 'Approved'
                          ? '#dcfce7'
                          : vendor.status === 'Pending'
                          ? '#fef3c7'
                          : '#fee2e2',

                      color:
                        vendor.status === 'Approved'
                          ? '#15803d'
                          : vendor.status === 'Pending'
                          ? '#b45309'
                          : '#dc2626',
                    }}
                  >
                    {vendor.status}
                  </span>
                </td>

                <td style={styles.td}>
                  <div style={styles.actionBox}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => handleView(vendor)}
                    >
                      View
                    </button>

                    <button
                      style={styles.approveBtn}
                      onClick={() => handleApprove(vendor.id)}
                    >
                      Approve
                    </button>

                    <button
                      style={styles.blockBtn}
                      onClick={() => handleBlock(vendor.id)}
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
    padding: 15,
  },

  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: 15,
  },

  heading: {
    fontSize: 32,
    color: '#111827',
    marginBottom: 5,
  },

  subText: {
    color: '#d6d9de',
    fontSize: 15,
  },

  tableWrapper: {
    background: '#fff',
    borderRadius: 20,
    overflowX: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  headRow: {
    background: '#0f172a',
  },

  th: {
    color: '#fff',
    textAlign: 'left',
    padding: 18,
    fontSize: 15,
  },

  bodyRow: {
    borderBottom: '1px solid #e5e7eb',
  },

  td: {
    padding: 18,
    color: '#374151',
    fontSize: 14,
  },

  userBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#dbeafe',
    color: '#1d4ed8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  status: {
    padding: '7px 14px',
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 13,
  },

  actionBox: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },

  viewBtn: {
    background: '#e0f2fe',
    color: '#0369a1',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  approveBtn: {
    background: '#dcfce7',
    color: '#15803d',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  blockBtn: {
    background: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}

export default VendorsPage