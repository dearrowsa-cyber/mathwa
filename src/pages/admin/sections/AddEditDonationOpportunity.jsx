import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload, ArrowLeft } from 'lucide-react'

export default function AddEditDonationOpportunity() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    price: '',
    image: null,
    payment_link: '',
    status: 'active'
  })

  // Fetch data if editing
  useEffect(() => {
    if (id) {
      fetchOpportunity()
    }
  }, [id])

  const fetchOpportunity = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://mathwaa.org.sa/Backend/api/donation-opportunities.php?id=${id}`)
      const data = await response.json()
      
      if (data.success) {
        setFormData(data.data)
        if (data.data.image) {
          setPreviewImage(`https://mathwaa.org.sa//${data.data.image}`)
        }
      } else {
        setError('Failed to load opportunity')
      }
    } catch (err) {
      setError('Error loading opportunity: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title_en.trim() || !formData.title_ar.trim() || !formData.price || !formData.payment_link.trim()) {
      setError('Please fill in all required fields (Title EN, Title AR, Price, Payment Link)')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const method = id ? 'PUT' : 'POST'
      const url = `https://mathwaa.org.sa/Backend/api/donation-opportunities.php${id ? `?id=${id}` : ''}`
      
      const formDataToSend = new FormData()
      formDataToSend.append('title_en', formData.title_en.trim())
      formDataToSend.append('title_ar', formData.title_ar.trim())
      formDataToSend.append('description_en', formData.description_en || '')
      formDataToSend.append('description_ar', formData.description_ar || '')
      formDataToSend.append('price', parseFloat(formData.price))
      formDataToSend.append('payment_link', formData.payment_link.trim())
      formDataToSend.append('status', formData.status)
      
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image)
      }

      console.log('Submitting form with method:', method, 'URL:', url)

      const response = await fetch(url, {
        method,
        body: formDataToSend
      })

      const result = await response.json()

      console.log('API Response:', result)

      if (result.success) {
        setSuccess(result.message || 'Saved successfully!')
        setTimeout(() => {
          navigate('/admin/contribute/donation-opportunities')
        }, 1500)
      } else {
        setError(result.message || 'Error saving opportunity')
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/contribute/donation-opportunities')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Edit Donation Opportunity' : 'Add Donation Opportunity'}
        </h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* English Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title (English) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleInputChange}
              placeholder="Enter English title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
          </div>

          {/* Arabic Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title (Arabic) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title_ar"
              value={formData.title_ar}
              onChange={handleInputChange}
              placeholder="أدخل العنوان بالعربية"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] text-right"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (SAR) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
          </div>

          {/* Description English */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Details (English)
            </label>
            <textarea
              name="description_en"
              value={formData.description_en}
              onChange={handleInputChange}
              placeholder="Enter English details"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
          </div>

          {/* Description Arabic */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Details (Arabic)
            </label>
            <textarea
              name="description_ar"
              value={formData.description_ar}
              onChange={handleInputChange}
              placeholder="أدخل التفاصيل بالعربية"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] text-right"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#C89B3C] transition-colors">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Upload size={20} />
                    <span>Upload Image</span>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              {previewImage && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Payment Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="payment_link"
              value={formData.payment_link}
              onChange={handleInputChange}
              placeholder="http://..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#C89B3C' }}
            >
              {saving ? 'Saving...' : id ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/contribute/donation-opportunities')}
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
