import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type Params = { params: Promise<{ id: string }> }

export async function POST(_: Request, { params }: Params) {
  const { id } = await params
  await supabase.rpc('increment_post_views', { post_id: id }).catch(() => {})
  return NextResponse.json({ ok: true })
}
