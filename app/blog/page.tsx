"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = [
  'All',
  'Nutrition',
  'Mental Health',
  'Maternal Care',
  'Emergency Tips',
  'Paediatrics',
]

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Malaria Prevention in Urban Harare',
    excerpt: 'Essential tips for protecting your family from malaria during the rainy season. Learn about mosquito control and preventive measures.',
    content: 'Full article content...',
    category: 'Emergency Tips',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    author: {
      name: 'Dr. Tendai Moyo',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
    },
    date: 'April 10, 2025',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: '5 Signs You Should Visit Emergency Care Immediately',
    excerpt: 'Know when to seek urgent medical attention and what symptoms require immediate care at our 24-hour facility.',
    content: 'Full article content...',
    category: 'Emergency Tips',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?w=600&q=80',
    author: {
      name: 'Dr. Farai Mutasa',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&q=80',
    },
    date: 'April 8, 2025',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Maternal Health: What Every Zimbabwean Mother Should Know',
    excerpt: 'A comprehensive guide to prenatal care and healthy pregnancy practices for expecting mothers in Zimbabwe.',
    content: 'Full article content...',
    category: 'Maternal Care',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
    author: {
      name: 'Dr. Nyasha Dziva',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80',
    },
    date: 'April 5, 2025',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Managing Diabetes in the Zimbabwean Diet',
    excerpt: 'Practical dietary advice for managing diabetes while enjoying traditional Zimbabwean foods.',
    content: 'Full article content...',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80',
    author: {
      name: 'Dr. Tendai Moyo',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
    },
    date: 'April 2, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 5,
    title: "Children's Vaccinations: A Parent's Complete Guide",
    excerpt: 'Everything parents need to know about childhood immunizations and the vaccination schedule in Zimbabwe.',
    content: 'Full article content...',
    category: 'Paediatrics',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=80',
    author: {
      name: 'Dr. Rudo Chikwanda',
      image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=100&q=80',
    },
    date: 'March 28, 2025',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'Mental Health: Breaking the Stigma in Our Communities',
    excerpt: 'Why mental health matters and how we can create more supportive communities for those struggling.',
    content: 'Full article content...',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80',
    author: {
      name: 'Dr. Tendai Moyo',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
    },
    date: 'March 25, 2025',
    readTime: '5 min read',
    featured: false,
  },
]

const recentPosts = blogPosts.slice(0, 4)
const popularCategories = ['Emergency Tips', 'Maternal Care', 'Nutrition', 'Paediatrics']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [email, setEmail] = useState('')

  const featuredPost = blogPosts.find(post => post.featured)
  const filteredPosts = blogPosts.filter(post => {
    if (selectedCategory === 'All') return !post.featured
    return post.category === selectedCategory && !post.featured
  })

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setEmail('')
    alert('Thank you for subscribing!')
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#003366] to-[#005599] pt-32 pb-20 grain-overlay">
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Health Insights & News
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Expert health advice from the Sante 24 team to help you live your healthiest life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border sticky top-14 md:top-[72px] bg-white z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-5 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-[#00B4A6] text-white'
                    : 'bg-[#F7F9FC] text-[#003366] hover:bg-[#00B4A6]/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Content */}
            <div>
              {/* Featured Post */}
              {featuredPost && selectedCategory === 'All' && (
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <Link href="#" className="group block">
                    <div className="relative rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        width={800}
                        height={450}
                        className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 bg-[#FF6B6B] text-white text-sm font-medium rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#00B4A6]/10 text-[#00B4A6] text-xs font-medium rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-muted-foreground text-sm">{featuredPost.date}</span>
                      <span className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#003366] mb-3 group-hover:text-[#00B4A6] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={featuredPost.author.image}
                        alt={featuredPost.author.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-[#003366] font-medium text-sm">{featuredPost.author.name}</span>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href="#">
                      <div className="relative rounded-2xl overflow-hidden mb-4 border-2 border-transparent group-hover:border-[#00B4A6] transition-colors">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="w-full h-[200px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-[#00B4A6] text-white text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#003366] mb-2 group-hover:text-[#00B4A6] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={post.author.image}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-muted-foreground text-xs">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No articles found in this category.</p>
                </div>
              )}
            </div>

            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block">
              <div className="sticky top-40 space-y-8">
                {/* Recent Posts */}
                <div className="bg-[#F7F9FC] rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-lg text-[#003366] mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <Link key={post.id} href="#" className="flex gap-3 group">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={80}
                          height={60}
                          className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium text-sm text-[#003366] group-hover:text-[#00B4A6] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-[#F7F9FC] rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-lg text-[#003366] mb-4">Popular Categories</h3>
                  <div className="space-y-2">
                    {popularCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white transition-colors text-left"
                      >
                        <span className="text-[#003366] font-medium text-sm">{category}</span>
                        <ArrowRight className="w-4 h-4 text-[#00B4A6]" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-[#003366] rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-full bg-[#00B4A6] flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2">Subscribe to Newsletter</h3>
                  <p className="text-white/70 text-sm mb-4">Get health tips delivered to your inbox.</p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
                    />
                    <Button 
                      type="submit"
                      className="w-full bg-[#00B4A6] hover:bg-[#009688] text-white rounded-full"
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
