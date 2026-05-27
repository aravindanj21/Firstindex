import { useEffect, useState } from 'react'

import { getProducts } from '../services/api/productApi'

const useProducts = () => {

  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const fetchProducts = async () => {

    try {

      setLoading(true)

      const data = await getProducts()

      setProducts(data)

    } catch (err) {

      setError(err)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchProducts()

  }, [])

  return {

    products,

    setProducts,

    loading,

    error,

    fetchProducts
  }
}

export default useProducts