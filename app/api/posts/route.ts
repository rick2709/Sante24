import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  } catch {
    return new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const featured  = searchParams.get('featured')

  let query = supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('updated_at', { ascending: false })

  if (category) query = query.eq('category', category)
  if (featured)  query = query.eq('featured', true)

  const { data, error } = await query

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        hint:
          error.code === '42P01'
            ? 'Create the "posts" table: run supabase/posts-table.sql in Supabase → SQL Editor'
            : undefined,
      },
      { status: 500 }
    )
  }
  return NextResponse.json(data ?? [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { title, excerpt, content, category, image, date, featured, published } = body

  if (!title || !excerpt || !content || !category) {
    return NextResponse.json(
      { error: 'title, excerpt, content and category are required' },
      { status: 400 }
    )
  }

  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
  const id = `${baseSlug}-${Date.now().toString(36)}`

  const { data, error } = await supabase
    .from('posts')
    .insert({
      id,
      title,
      excerpt,
      content,
      category,
      image: image || '/placeholder.jpg',
      date: date ? formatDate(date) : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      read_time: estimateReadTime(content),
      featured: featured ?? false,
      published: published ?? true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
