"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Malaria Prevention in Urban Harare',
    excerpt: 'Essential tips for protecting your family from malaria during the rainy season.',
    category: 'Health Tips',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    imageAlt: 'Medical professional reviewing health data',
    date: 'April 10, 2025',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Maternal Health: What Every Zimbabwean Mother Should Know',
    excerpt: 'A comprehensive guide to prenatal care and healthy pregnancy practices.',
    category: 'Maternal Care',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&q=80',
    imageAlt: 'African woman in a maternal wellness setting',
    date: 'April 5, 2025',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Mental Health: Breaking the Stigma in Our Communities',
    excerpt: 'Why mental health matters and how we can create more supportive communities.',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    imageAlt: 'African man in a mental wellness support session',
    date: 'March 25, 2025',
    readTime: '5 min read',
  },
]

export function BlogPreview() {
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

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <Link href="/blog">
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    width={800}
                    height={250}
                    loading="lazy"
                    className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80'
                    }}
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
                    {post.readTime}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

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
