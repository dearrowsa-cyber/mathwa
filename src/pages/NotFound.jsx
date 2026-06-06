import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Section, Button } from '../components/Common'
import { FaArrowLeft } from 'react-icons/fa'

const NotFound = () => {
  return (
    <Section>
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-9xl font-bold text-primary mb-4">404</div>
            <h1 className="text-4xl font-bold text-primary mb-3">Page Not Found</h1>
            <p className="text-gray-600 text-lg mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button size="lg" className="gap-2">
                <FaArrowLeft size={20} />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default NotFound
