"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Post = {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  read_time: string
}

export function BlogPreview() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then((data: Post[]) => {
        if (Array.isArray(data)) setPosts(data.slice(0, 3))
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#003366] animated-underline">
            Health Insights & News
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl">
            Expert health advice and the latest updates from the Sante 24 team.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          /* Skeleton placeholders while loading */
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map(i => (
              <div key={i} className="animate-pulse">
                <div className="rounded-2xl bg-gray-200 h-[200px] mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-3 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={250}
                      loading="lazy"
                      className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#00B4A6] text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#003366] mb-2 group-hover:text-[#00B4A6] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white rounded-full px-8"
          >
            <Link href="/blog">
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
