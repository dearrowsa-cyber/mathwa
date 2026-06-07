import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Section, Button } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaShareAlt, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NewsDetail = () => {
  const { id } = useParams()

  const translations = {
    en: {
      back: 'Back to News',
      share: 'Share',
      published: 'Published',
      category: 'Category',
    },
    ar: {
      back: 'العودة للأخبار',
      share: 'شارك',
      published: 'منشور',
      category: 'الفئة',
    }
  }

  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  const newsDetail = {
    title: 'Important News Item',
    date: 'February 14, 2024',
    category: 'Announcements',
    content: `This is a detailed news article content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  }

  const breadcrumbs = [
    { label: language === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: language === 'ar' ? 'الأخبار' : 'News', to: '/news' },
    { label: "News Detail" }
  ]

  return (
    <>
      <PageHeader 
        title="News Detail"
        description="Read the full story"
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link to="/news" className="flex items-center gap-2 text-primary hover:text-secondary mb-8 font-bold">
              <FaArrowLeft size={20} />
              {t.back}
            </Link>

            {/* News Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">{newsDetail.title}</h1>
              <div className="flex gap-6 text-gray-600 mb-6">
                <span>{t.published}: {newsDetail.date}</span>
                <span>{t.category}: {newsDetail.category}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="h-96 bg-gradient-to-br from-primary to-secondary rounded-lg mb-8"></div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {newsDetail.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>

            {/* Share Button */}
            <div className="flex gap-4">
              <Button variant="secondary" className="gap-2">
                <FaShareAlt size={20} />
                {t.share}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* More News */}
      <Section bg="gray">
        <Container>
          <h2 className="text-3xl font-bold text-primary mb-8">More News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(item => (
              <Link key={item} to={`/news/${item}`}>
                <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-primary to-secondary"></div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary mb-2">Related News {item}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      This is related news content...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

export default NewsDetail
