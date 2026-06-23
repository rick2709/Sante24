import { supabase } from '@/lib/supabase'

export type Post = {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  readTime: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('getAllPosts error:', error)
    return []
  }
  return (data ?? []).map(normalise)
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single()

  if (error || !data) return undefined
  return normalise(data)
}

export async function getRelatedPosts(
  currentId: string,
  category: string,
  limit = 3
): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .neq('id', currentId)
    .limit(limit)

  if (error) return []
  return (data ?? []).map(normalise)
}

export async function getFeaturedPost(): Promise<Post | undefined> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .single()

  return data ? normalise(data) : undefined
}

function normalise(row: Record<string, unknown>): Post {
  return {
    id:         row.id as string,
    title:      row.title as string,
    excerpt:    row.excerpt as string,
    content:    row.content as string,
    category:   row.category as string,
    image:      (row.image as string) || '/placeholder.jpg',
    date:       row.date as string,
    readTime:   (row.read_time as string) || '5 min read',
    featured:   Boolean(row.featured),
    published:  Boolean(row.published),
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}
