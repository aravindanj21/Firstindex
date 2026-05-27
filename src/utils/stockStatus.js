export const getStockStatus = (stock) => {

  if (stock > 500) {
    return 'High Stock'
  }

  if (stock > 100) {
    return 'Medium Stock'
  }

  return 'Low Stock'
}