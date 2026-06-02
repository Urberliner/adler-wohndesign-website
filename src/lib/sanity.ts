import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  token: import.meta.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export const fmtDate = (d) => d ? new Date(d).toLocaleDateString('de-DE') : '';

export async function getApprovedPosts() {
  return client.fetch(
    `*[_type=='blogPost' && status=='approved']|order(coalesce(publishedAt,_createdAt) desc){
      'slug': slug.current,
      title,
      excerpt,
      featured,
      publishedAt,
      'kategorie': categories[0]->title,
      heroImage
    }`
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type=='blogPost' && status=='approved' && slug.current==$slug][0]{
      'slug': slug.current,
      title,
      excerpt,
      featured,
      publishedAt,
      body,
      'kategorie': categories[0]->title,
      'author': author->name,
      heroImage
    }`,
    { slug }
  );
}
