import { YoutubeEmbed } from "@/components/youtube-embed"
import { PostViewTracker } from "@/components/post-view-tracker"
import { CopyLinkButton } from "@/components/copy-link-button"
import { getPostById, getRelatedPosts } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Clock, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, MessageCircle } from "lucide-react"
import { notFound } from "next/navigation"

function toHtml(content: string | undefined | null): string {
  if (!content?.trim()) return ''
  let c = content.trim()
  if (c.startsWith('"') && c.endsWith('"')) c = c.slice(1, -1)
  c = c.replace(/""/g, '"')
  c = c
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
  if (/^<[a-zA-Z]/i.test(c)) return c
  return c
    .split(/\n{2,}/)
    .filter(Boolean)
    .map(p => `<p>${p.replace(/\n/g, '<br />')}</p>`)
    .join('\n')
}

type ContentSegment =
  | { type: "html"; content: string }
  | { type: "youtube"; src: string }

function parseContentSegments(html: string): ContentSegment[] {
  const segments: ContentSegment[] = []
  const youtubeRegex =
    /<div[^>]*data-youtube-video[^>]*>[\s\S]*?<iframe[^>]*src="([^"]*)"[\s\S]*?<\/iframe>[\s\S]*?<\/div>/gi
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = youtubeRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "html", content: html.slice(lastIndex, match.index) })
    }
    segments.push({ type: "youtube", src: match[1] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < html.length) {
    segments.push({ type: "html", content: html.slice(lastIndex) })
  }
  return segments.length > 0 ? segments : [{ type: "html", content: html }]
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostById(slug)
  if (!post) return { title: 'Post Not Found' }

  const baseUrl = 'https://santemedical.co.zw'
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`
  const postUrl = `${baseUrl}/blog/${post.id}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: postUrl },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      siteName: 'Santé 24hr Medical Centre',
      publishedTime: post.date,
      modifiedTime: post.updated_at,
      authors: ['Santé 24 Health Team'],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostById(slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post.id, post.category, 3)
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://santemedical.co.zw"

  return (
    <>
      <PostViewTracker postId={post.id} />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-[#003366]/60 to-[#003366]/40" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-20 text-center">
          <span className={`mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${CAT_COLORS[post.category] || 'bg-[#00B4A6]/20 text-[#00B4A6]'}`}>
            {post.category}
          </span>
          <h1 className="mb-6 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-white/80">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-[#00B4A6]">
            <ArrowLeft className="h-4 w-4" />
            Back to Health Blog
          </Link>

          <p className="mb-8 text-xl font-medium leading-relaxed text-[#003366]">{post.excerpt}</p>

          <div className="prose prose-lg prose-headings:font-heading prose-headings:text-[#003366] prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-[#00B4A6] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#00B4A6] prose-blockquote:text-gray-500 prose-strong:text-[#003366] prose-img:rounded-xl prose-img:my-6 prose-img:w-full prose-img:object-cover max-w-none">
            {parseContentSegments(toHtml(post.content)).map((segment, i) =>
              segment.type === "youtube" ? (
                <YoutubeEmbed key={i} src={segment.src} />
              ) : (
                <div key={i} dangerouslySetInnerHTML={{ __html: segment.content }} />
              )
            )}
          </div>

          {/* Share */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-medium text-[#003366]">
                <Share2 className="h-4 w-4" />
                Share this article:
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/blog/${post.id}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#00B4A6] hover:text-[#00B4A6]"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${baseUrl}/blog/${post.id}`)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#00B4A6] hover:text-[#00B4A6]"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${baseUrl}/blog/${post.id}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#00B4A6] hover:text-[#00B4A6]"
                  aria-label="Share on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <CopyLinkButton
                  url={`${baseUrl}/blog/${post.id}`}
                  title="Copy article link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[#00B4A6] hover:text-[#00B4A6]"
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F7F9FC] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#00B4A6]">Keep Reading</p>
              <h2 className="font-heading text-2xl font-bold text-[#003366] md:text-3xl">
                Related <span className="text-[#00B4A6]">Articles</span>
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.id}`}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={related.image} alt={related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${CAT_COLORS[related.category] || 'bg-gray-100 text-gray-700'}`}>
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-heading text-lg font-bold leading-snug text-[#003366] transition-colors group-hover:text-[#00B4A6]">
                      {related.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">{related.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B4A6] transition-all group-hover:gap-3">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#003366] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 font-heading text-2xl font-bold text-white md:text-3xl">
            Your Health, Our Priority
          </h2>
          <p className="mb-8 text-white/70">
            Santé 24hr Medical Centre is open every day, 24 hours a day. Our team is ready whenever you need us.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/blog" className="rounded-lg border-2 border-white/80 px-8 py-3 font-semibold text-white transition-all hover:bg-white hover:text-[#003366]">
              Browse All Articles
            </Link>
            <Link href="/contact" className="rounded-lg bg-[#00B4A6] px-8 py-3 font-semibold text-white transition-all hover:bg-[#009688]">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
