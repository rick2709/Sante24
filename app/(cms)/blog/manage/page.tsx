"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search, Plus, Eye, Edit3, Save, Trash2, Star, Globe,
  Clock, Loader2, CheckCircle, AlertCircle, ArrowLeft, X
} from "lucide-react"
import { RichTextEditor } from "@/components/rich-text-editor"

type Post = {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  read_time: string
  featured: boolean
  published: boolean
  views?: number
  created_at?: string
  updated_at?: string
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
type Mode = 'edit' | 'preview'

const CATEGORIES = [
  "General Health & Wellness",
  "Emergency Care",
  "Women's Health & Maternity",
  "Child Health & Paediatrics",
  "Chronic Disease Management",
  "Diagnostics & Lab",
  "Surgery & Procedures",
  "Mental Health",
  "Health Tips & Prevention",
]

const CAT_COLORS: Record<string, string> = {
  "General Health & Wellness":   "bg-teal-100 text-teal-800",
  "Emergency Care":              "bg-red-100 text-red-800",
  "Women's Health & Maternity":  "bg-pink-100 text-pink-800",
  "Child Health & Paediatrics":  "bg-blue-100 text-blue-800",
  "Chronic Disease Management":  "bg-orange-100 text-orange-800",
  "Diagnostics & Lab":           "bg-violet-100 text-violet-800",
  "Surgery & Procedures":        "bg-amber-100 text-amber-800",
  "Mental Health":               "bg-purple-100 text-purple-800",
  "Health Tips & Prevention":    "bg-green-100 text-green-800",
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function formatDateForInput(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0]
    return d.toISOString().split('T')[0]
  } catch { return new Date().toISOString().split('T')[0] }
}

function formatDateForDisplay(dateInput: string): string {
  try {
    const d = new Date(dateInput + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return dateInput }
}

function sortByDate(list: Post[]): Post[] {
  return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const emptyForm = () => ({
  title: '', excerpt: '', content: '',
  category: '', image: '',
  date: new Date().toISOString().split('T')[0],
  featured: false, published: true,
})

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [mode, setMode] = useState<Mode>('edit')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [form, setForm] = useState(emptyForm())
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isDirty = useRef(false)
  const [mobileView, setMobileView] = useState<'sidebar' | 'editor'>('sidebar')
  const titleInputRef = useRef<HTMLInputElement>(null)

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  const loadPosts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/posts')
      const data: Post[] = await res.json()
      setPosts(sortByDate(data))
    } catch {
      setToast({ msg: 'Failed to load posts', type: 'error' })
      setTimeout(() => setToast(null), 3500)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function selectPost(post: Post) {
    setSelectedId(post.id)
    setIsNew(false)
    setMode('edit')
    setForm({
      title:     post.title,
      excerpt:   post.excerpt,
      content:   post.content,
      category:  post.category,
      image:     post.image || '',
      date:      formatDateForInput(post.date),
      featured:  post.featured,
      published: post.published,
    })
    setSaveStatus('idle')
    isDirty.current = false
    setMobileView('editor')
  }

  function startNew() {
    setSelectedId(null)
    setIsNew(true)
    setMode('edit')
    setForm(emptyForm())
    setSaveStatus('idle')
    isDirty.current = false
    setMobileView('editor')
    setTimeout(() => titleInputRef.current?.focus(), 50)
  }

  function updateForm(key: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }))
    isDirty.current = true
    setSaveStatus('idle')
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      if (isDirty.current) handleSave(false, true)
    }, 3000)
  }

  async function handleSave(andPublish = false, silent = false) {
    if (!form.title.trim()) { showToast('Please enter a title', 'error'); return }
    if (!form.category)     { showToast('Please select a category', 'error'); return }
    if (!form.content.trim()){ showToast('Please add some content', 'error'); return }
    if (!form.excerpt.trim()){ showToast('Please write an excerpt', 'error'); return }

    setSaveStatus('saving')
    isDirty.current = false

    const payload = {
      title:     form.title.trim(),
      excerpt:   form.excerpt.trim(),
      content:   form.content,
      category:  form.category,
      image:     form.image.trim() || '/placeholder.jpg',
      date:      form.date,
      read_time: estimateReadTime(form.content),
      featured:  form.featured,
      published: andPublish ? true : form.published,
    }

    try {
      const res = await fetch(isNew ? '/api/posts' : `/api/posts/${selectedId}`, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const saved: Post = await res.json()
      if (!res.ok) throw new Error((saved as unknown as { error: string }).error)

      setSaveStatus('saved')
      setIsNew(false)
      setSelectedId(saved.id)
      if (isNew) {
        setPosts(prev => sortByDate([saved, ...prev]))
      } else {
        setPosts(prev => sortByDate(prev.map(p => p.id === saved.id ? saved : p)))
      }
      if (!silent) showToast(andPublish ? '✓ Published!' : '💾 Saved!', 'success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (err) {
      setSaveStatus('error')
      showToast(`Save failed: ${(err as Error).message}`, 'error')
    }
  }

  async function handleDelete() {
    if (!selectedId) return
    const idToRemove = selectedId
    try {
      await fetch(`/api/posts/${idToRemove}`, { method: 'DELETE' })
      setShowDeleteModal(false)
      setSelectedId(null)
      setIsNew(false)
      setPosts(prev => prev.filter(p => p.id !== idToRemove))
      showToast('Post archived', 'success')
    } catch {
      showToast('Delete failed', 'error')
    }
  }

  const visiblePosts = posts.filter(p => {
    const matchCat = filterCat === 'all' || p.category === filterCat
    const q = search.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length
  const readTime = estimateReadTime(form.content)
  const hasSelection = !!selectedId || isNew

  const StatusIcon = () => {
    if (saveStatus === 'saving') return <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500" />
    if (saveStatus === 'saved')  return <CheckCircle className="h-3.5 w-3.5 text-green-600" />
    if (saveStatus === 'error')  return <AlertCircle className="h-3.5 w-3.5 text-red-500" />
    return <div className="h-3.5 w-3.5 rounded-full border-2 border-gray-300" />
  }
  const statusLabel = { idle: 'Unsaved', saving: 'Saving…', saved: 'Saved', error: 'Error' }[saveStatus]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (hasSelection) handleSave()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [hasSelection, form, selectedId, isNew])

  return (
    <div className="flex flex-col overflow-hidden bg-white font-sans" style={{ height: '100vh' }}>

      {/* Top bar */}
      <header className="flex h-auto min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-[#003366] px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/blog" className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Blog</span>
          </Link>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="text-sm font-bold text-[#00B4A6] sm:text-base">✏️ Blog Manager</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline rounded-full bg-[#00B4A6]/20 px-3 py-1 text-xs font-semibold text-[#00B4A6]">
            {posts.length} posts
          </span>
          <button
            onClick={startNew}
            className="flex items-center gap-1.5 rounded-lg bg-[#00B4A6] px-3 py-1.5 text-sm font-semibold text-white transition-all hover:bg-[#009688] sm:px-4 sm:py-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">

        {/* Sidebar */}
        <aside className={`${mobileView === 'sidebar' ? 'flex' : 'hidden'} md:flex w-full md:w-72 shrink-0 flex-col border-r border-gray-200 bg-gray-50`}>
          <div className="border-b border-gray-200 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts…"
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#00B4A6]"
              />
            </div>
            <select
              value={filterCat}
              onChange={e => setFilterCat(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#00B4A6]"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-[#00B4A6]" />
              </div>
            ) : visiblePosts.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-gray-400">
                No posts found
              </div>
            ) : (
              visiblePosts.map(post => (
                <button
                  key={post.id}
                  onClick={() => selectPost(post)}
                  className={`w-full border-b border-gray-200 px-4 py-3 text-left transition-colors hover:bg-gray-100 ${
                    selectedId === post.id ? 'border-l-2 border-l-[#00B4A6] bg-[#00B4A6]/5' : 'border-l-2 border-l-transparent'
                  }`}
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700'}`}>
                      {post.category.split(' ')[0]}
                    </span>
                    {post.featured && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                    {!post.published && <span className="rounded bg-red-100 px-1.5 text-[10px] font-bold text-red-600">DRAFT</span>}
                  </div>
                  <p className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-gray-800">{post.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.read_time}</span>
                    <span>·</span>
                    <span className="font-medium">👁 {post.views ?? 0}</span>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-gray-200 p-3">
            <button
              onClick={startNew}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:border-[#00B4A6] hover:text-[#00B4A6]"
            >
              <Plus className="h-4 w-4" /> Write a new post
            </button>
          </div>
        </aside>

        {/* Editor / Preview */}
        <main className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-1 flex-col overflow-hidden`}>
          {!hasSelection ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="text-6xl opacity-20">📝</div>
              <h2 className="font-heading text-2xl font-bold text-[#003366]">Select or create a post</h2>
              <p className="max-w-xs text-sm text-gray-400">
                Choose an existing post from the panel on the left, or start writing a new one.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setMobileView('sidebar')}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 md:hidden"
                >
                  <ArrowLeft className="h-4 w-4" /> Browse Posts
                </button>
                <button onClick={startNew} className="flex items-center gap-2 rounded-lg bg-[#00B4A6] px-6 py-3 font-semibold text-white hover:bg-[#009688]">
                  <Plus className="h-4 w-4" /> Write your first post
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Editor toolbar */}
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 py-2 sm:px-5 sm:py-2.5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setMobileView('sidebar')}
                    className="flex md:hidden items-center gap-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> List
                  </button>
                  <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-0.5">
                    <button
                      onClick={() => setMode('edit')}
                      className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-all sm:px-3 ${mode === 'edit' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => setMode('preview')}
                      className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-all sm:px-3 ${mode === 'preview' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                      <Eye className="h-3.5 w-3.5" /> Preview
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <StatusIcon />
                    <span className="hidden sm:inline">{statusLabel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  {!isNew && (
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white sm:px-3"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Archive</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleSave(false)}
                    disabled={saveStatus === 'saving'}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-semibold transition-all hover:bg-gray-100 disabled:opacity-50 sm:px-3"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Save <span className="text-gray-400">(⌘S)</span></span>
                  </button>
                  <button
                    onClick={() => handleSave(true)}
                    disabled={saveStatus === 'saving'}
                    className="flex items-center gap-1.5 rounded-lg bg-[#003366] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#004488] disabled:opacity-50 sm:px-4"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{isNew ? 'Publish' : 'Update & Publish'}</span>
                    <span className="sm:hidden">{isNew ? 'Publish' : 'Update'}</span>
                  </button>
                </div>
              </div>

              {/* EDIT MODE */}
              {mode === 'edit' && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="mx-auto max-w-3xl space-y-5">

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                        Title <span className="text-[#00B4A6]">*</span>
                      </label>
                      <input
                        ref={titleInputRef}
                        value={form.title}
                        onChange={e => updateForm('title', e.target.value)}
                        placeholder="Enter a compelling headline…"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-heading text-xl font-bold text-[#003366] outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-gray-300 focus:border-[#00B4A6] focus:ring-2 focus:ring-[#00B4A6]/10"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                          Category <span className="text-[#00B4A6]">*</span>
                        </label>
                        <select
                          value={form.category}
                          onChange={e => updateForm('category', e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#00B4A6]"
                        >
                          <option value="">Select category…</option>
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                          Publish Date
                        </label>
                        <input
                          type="date"
                          value={form.date}
                          onChange={e => updateForm('date', e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#00B4A6]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                          Read Time
                        </label>
                        <div className="flex h-10 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-400">
                          {readTime}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                        Excerpt <span className="text-[#00B4A6]">*</span>
                        <span className="ml-2 font-normal normal-case text-gray-300">shown on post cards</span>
                      </label>
                      <textarea
                        value={form.excerpt}
                        onChange={e => updateForm('excerpt', e.target.value)}
                        placeholder="A compelling 1–2 sentence summary…"
                        rows={3}
                        className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 outline-none placeholder:text-gray-300 focus:border-[#00B4A6] focus:ring-2 focus:ring-[#00B4A6]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                        Content <span className="text-[#00B4A6]">*</span>
                      </label>
                      <RichTextEditor
                        value={form.content}
                        onChange={(html) => updateForm("content", html)}
                        placeholder="Write your article here…"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                        Cover Image URL
                      </label>
                      <div className="flex gap-3">
                        {/^(\/|https?:\/\/).+/.test(form.image) && (
                          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                            <Image src={form.image} alt="preview" fill className="object-cover" onError={() => {}} />
                          </div>
                        )}
                        <input
                          value={form.image}
                          onChange={e => updateForm('image', e.target.value)}
                          placeholder="/images/my-post.jpg  or  https://…"
                          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#00B4A6]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:gap-8">
                      <label className="flex cursor-pointer items-center gap-3">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={form.featured}
                          onClick={() => updateForm('featured', !form.featured)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${form.featured ? 'bg-amber-400' : 'bg-gray-300'}`}
                        >
                          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                          <Star className="h-4 w-4 text-amber-400" /> Featured post
                        </span>
                      </label>

                      <label className="flex cursor-pointer items-center gap-3">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={form.published}
                          onClick={() => updateForm('published', !form.published)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${form.published ? 'bg-[#003366]' : 'bg-gray-300'}`}
                        >
                          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                          <Globe className="h-4 w-4 text-[#003366]" /> Published
                        </span>
                      </label>
                    </div>

                    <p className="text-xs text-gray-400">{wordCount.toLocaleString()} words · {readTime}</p>
                  </div>
                </div>
              )}

              {/* PREVIEW MODE */}
              {mode === 'preview' && (
                <div className="flex-1 overflow-y-auto">
                  <div className="relative flex min-h-[280px] items-end bg-[#003366]">
                    {form.image && (
                      <Image src={form.image} alt={form.title || 'Preview'} fill className="object-cover opacity-40" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-[#003366]/50 to-transparent" />
                    <div className="relative z-10 max-w-3xl px-4 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20">
                      {form.category && (
                        <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${CAT_COLORS[form.category] || 'bg-[#00B4A6]/20 text-[#00B4A6]'}`}>
                          {form.category}
                        </span>
                      )}
                      <h1 className="mb-4 font-heading text-3xl font-bold leading-tight text-white">
                        {form.title || 'Your article title…'}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>{form.date ? formatDateForDisplay(form.date) : 'Date'}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{readTime}</span>
                        {form.featured && <span className="flex items-center gap-1 text-amber-300"><Star className="h-3.5 w-3.5 fill-current" /> Featured</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
                    {form.excerpt && (
                      <p className="mb-8 border-l-4 border-[#00B4A6] pl-5 text-lg font-medium italic leading-relaxed text-[#003366]">
                        {form.excerpt}
                      </p>
                    )}
                    <div
                      dangerouslySetInnerHTML={{ __html: form.content || '<p>Start writing your content…</p>' }}
                      className="prose prose-lg prose-headings:font-heading prose-headings:text-[#003366] prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#00B4A6] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#00B4A6] prose-strong:text-[#003366] max-w-none [&_div[data-youtube-video]]:relative [&_div[data-youtube-video]]:w-full [&_div[data-youtube-video]]:pb-[56.25%] [&_div[data-youtube-video]]:h-0 [&_div[data-youtube-video]]:overflow-hidden [&_div[data-youtube-video]]:rounded-xl [&_div[data-youtube-video]]:my-6 [&_div[data-youtube-video]_iframe]:absolute [&_div[data-youtube-video]_iframe]:inset-0 [&_div[data-youtube-video]_iframe]:w-full [&_div[data-youtube-video]_iframe]:h-full"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
            <div className="mb-4 text-center text-5xl">🗄️</div>
            <h3 className="mb-2 text-center font-heading text-xl font-bold text-[#003366]">Archive this post?</h3>
            <p className="mb-6 text-center text-sm text-gray-400">
              The post will be unpublished and hidden from the blog. You can restore it from your database at any time.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-2xl transition-all ${toast.type === 'success' ? 'bg-[#003366]' : 'bg-red-500'}`}>
          {toast.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
          <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  )
}
