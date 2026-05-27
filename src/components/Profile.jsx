import React from 'react'

const Profile = () => {

  const styles = {

    container: {
      marginLeft: '280px',
      padding: '30px',
      background: '#0d3257',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    card: {
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      width: '400px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },

    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: '#16253c',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '40px',
      fontWeight: 'bold',
      margin: '0 auto 15px'
    },

    name: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: '5px'
    },

    role: {
      color: '#64748b',
      marginBottom: '20px'
    },

    info: {
      textAlign: 'left',
      marginTop: '15px'
    },

    row: {
      padding: '10px 0',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '15px',
      color: '#334155'
    },

    label: {
      fontWeight: 'bold',
      color: '#0f172a'
    },

    button: {
      marginTop: '20px',
      padding: '10px 15px',
      background: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }

  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.avatar}>
          S
        </div>

        <div style={styles.name}>Supplier Name</div>
        <div style={styles.role}>Supplier Account</div>

        <div style={styles.info}>

          <div style={styles.row}>
            <span style={styles.label}>Email:</span> supplier@gmail.com
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Phone:</span> +91 9876543210
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Location:</span> Tamil Nadu
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Role:</span> Vendor Supplier
          </div>

        </div>

        <button style={styles.button}>
          Edit Profile
        </button>

      </div>

    </div>
  )
}

export default Profile