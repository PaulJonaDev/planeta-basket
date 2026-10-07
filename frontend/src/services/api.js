const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Error en la petición (${res.status})`);
  }

  return res.json();
}

export function getProducts(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/products${query}`);
}

export function getBundles(type) {
  const query = type ? `?type=${encodeURIComponent(type)}` : '';
  return request(`/bundles${query}`);
}

export function calculateCart(items) {
  return request('/cart/calculate', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}
