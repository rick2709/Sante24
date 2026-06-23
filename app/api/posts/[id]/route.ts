import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params
  const body = await req.json()

  if (body.content && !body.read_time) {
    const words = body.content.trim().split(/\s+/).length
    body.read_time = `${Math.max(1, Math.ceil(words / 200))} min read`
  }

  if (body.date && body.date.includes('-') && body.date.length === 10) {
    body.date = new Date(body.date + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  }

  const { data, error } = await supabase
    .from('posts')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  const { error } = await supabase
    .from('posts')
    .update({ published: false })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
