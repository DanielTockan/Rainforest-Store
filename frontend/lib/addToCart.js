import axios from 'axios'
export function addToCart(id) {
  if (!localStorage.getItem('token')) {
    props.history.push('/login')
  }
  axios.put(`/api/products/${id}/add-to-cart`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
    .then(resp => {
      updateCart(resp.data)
    })
}