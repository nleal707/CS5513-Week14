import got from 'got';

const WORDPRESS_BASE_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL ||
  'https://dev-nleal-cs5513.pantheonsite.io';

const REST_NAMESPACE = 'twentytwentyfive-child/v1';
const API_BASE = `${WORDPRESS_BASE_URL}/wp-json/${REST_NAMESPACE}`;

async function fetchFromWordPress(endpoint) {
  try {
    const response = await got(`${API_BASE}${endpoint}`, {
      timeout: 10000,
    });
    return JSON.parse(response.body);
  } catch (error) {
    console.error(`[WordPress] Failed to load ${endpoint}`, error.message);
    throw error;
  }
}

export async function fetchCptList(postType) {
  const data = await fetchFromWordPress(`/cpt/${postType}`);
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    date: item.date,
    excerpt: item.content?.slice(0, 180) ?? '',
  }));
}

export async function fetchCptDetail(postType, slug) {
  const item = await fetchFromWordPress(`/cpt/${postType}/${slug}`);
  if (!item || !item.id) {
    return null;
  }
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    date: item.date,
    content: item.content,
    customFields: item.custom_fields || {},
  };
}

export const CPT_CONFIG = {
  contact: {
    label: 'Contacts',
    listPath: '/',
    detailPath: '/contacts',
  },
  products: {
    label: 'Products',
    listPath: '/products',
    detailPath: '/products',
  },
  transactions: {
    label: 'Transactions',
    listPath: '/transactions',
    detailPath: '/transactions',
  },
};

