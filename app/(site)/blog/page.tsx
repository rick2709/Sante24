"use client"

import { useState, useEffect } from "react"
import type { Post } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight, Loader2 } from "lucide-react"

const CATEGORIES = [
  { name: "All", description: "Browse all health articles from the Santé 24 medical team." },
  { name: "General Health & Wellness", description: "Everyday tips for living a healthier, happier life in Zimbabwe." },
  { name: "Emergency Care", description: "Know when and how to act fast — emergency guidance from our 24-hour team." },
  { name: "Women's Health & Maternity", description: "Antenatal care, postnatal recovery, and women's health across every life stage." },
  { name: "Child Health & Paediatrics", description: "Vaccinations, growth, nutrition, and caring for your child's health." },
  { name: "Chronic Disease Management", description: "Managing diabetes, hypertension, and other long-term conditions effectively." },
  { name: "Diagnostics & Lab", description: "Understanding your test results and the importance of early diagnostics." },
  { name: "Surgery & Procedures", description: "What to expect before, during, and after a surgical procedure at Santé 24." },
  { name: "Mental Health", description: "Breaking the stigma and supporting mental wellbeing in our community." },
  { name: "Health Tips & Prevention", description: "Practical preventive health advice tailored for life in Harare." },
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

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => {
        const posts = data
          .map((p: Record<string, unknown>) => ({
            ...p,
            readTime: p.read_time || '5 min read',
          }))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
            new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
          )
        setAllPosts(posts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeCategory === "All"
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory)

  const activeDesc = CATEGORIES.find(c => c.name === activeCategory)?.description || ""
  const featured = allPosts.find(p => p.featured) ?? allPosts[0]
  const gridPosts = filtered.slice(0, visibleCount)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#003366] to-[#005599] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#00B4A6]">Health Insights</p>
          <h1 className="mb-6 text-4xl font-heading font-bold text-white md:text-5xl lg:text-6xl">
            Health Blog & <span className="text-[#00B4A6]">News</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80">
            Expert health advice, medical guides, and wellness tips from the Santé 24 team.
          </p>
        </div>
      </section>

      {loading && (
        <section className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#00B4A6]" />
        </section>
      )}

      {/* Featured post */}
      {!loading && featured && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link href={`/blog/${featured.id}`} className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-2 hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 overflow-hidden md:h-auto">
                <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-[#00B4A6] px-3 py-1 text-xs font-bold text-white">
                    Featured
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00B4A6]">Featured Post</p>
                <h2 className="mb-4 font-heading text-2xl font-bold text-[#003366] transition-colors group-hover:text-[#00B4A6] md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mb-6 leading-relaxed text-gray-500">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                </div>
                <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#00B4A6] transition-all group-hover:gap-3">
                  Read Article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category filters + grid */}
      {!loading && (
        <section className="bg-[#F7F9FC] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => { setActiveCategory(cat.name); setVisibleCount(6) }}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    activeCategory === cat.name
                      ? "bg-[#003366] text-white"
                      : "border border-gray-200 bg-white text-gray-500 hover:border-[#00B4A6] hover:text-[#003366]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="mb-12 text-center">
              <p className="text-gray-500">{activeDesc}</p>
            </div>

            {gridPosts.length === 0 ? (
              <div className="py-20 text-center text-gray-400">No articles in this category yet.</div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <article>
                      <div className="relative h-52 overflow-hidden">
                        <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 left-4">
                          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${CAT_COLORS[post.category] || 'bg-gray-100 text-gray-700'}`}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 font-heading text-lg font-bold leading-snug text-[#003366] transition-colors group-hover:text-[#00B4A6]">
                          {post.title}
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {visibleCount < filtered.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-[#003366] px-8 py-3 font-semibold text-[#003366] transition-all hover:bg-[#003366] hover:text-white"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
