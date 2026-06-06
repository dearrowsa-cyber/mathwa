import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getImageUrl } from '../../utils/imageUrl'

const translations = {
  en: {
    add_video_album: 'Add Video Album',
    edit_video_album: 'Edit Video Album',
    title: 'Title',
    title_required: 'Title *',
    description: 'Description',
    video_source: 'Video Source',
    upload_local_video: 'Upload Local Video',
    youtube_link: 'YouTube Link',
    select_video_file: 'Select MP4/WebM Video File',
    selected: 'Selected:',
    current_video: 'Current Video:',
    enter_youtube_url: 'Enter YouTube URL',
    youtube_placeholder: 'http://www.youtube.com/watch?v=... or http://youtu.be/...',
    youtube_url_entered: 'YouTube URL:',
    thumbnail: 'Thumbnail',
    thumbnail_url: 'Thumbnail URL',
    or_upload: 'Or Upload',
    preview: 'Preview:',
    new_file_selected: 'New file selected:',
    cancel: 'Cancel',
    save: 'Save',
    update_album: 'Update Album',
    create_album: 'Create Album',
    saving: 'Saving...',
    upload_failed: 'Upload failed',
    invalid_response: 'Invalid JSON response from server',
    server_error: 'Server responded with invalid data. Check browser console for details.',
    youtube_url_required: 'Please enter a YouTube URL',
    upload_error: 'Upload error:',
    error_uploading_thumbnail: 'Thumbnail upload failed',
    error_uploading_video: 'Video upload failed',
    error_submitting: 'Error in handleSubmit:',
    error_occurred: 'An error occurred. Check browser console for details.',
    uploading_thumbnail: 'Uploading thumbnail...',
    thumbnail_uploaded: 'Thumbnail uploaded:',
    uploading_video: 'Uploading video...',
    video_uploaded: 'Video uploaded:',
    using_youtube_url: 'Using YouTube URL:',
    save_failed: 'Save failed'
  },
  ar: {
    add_video_album: 'إضافة ألبوم فيديو',
    edit_video_album: 'تعديل ألبوم فيديو',
    title: 'العنوان',
    title_required: 'العنوان *',
    description: 'الوصف',
    video_source: 'مصدر الفيديو',
    upload_local_video: 'تحميل فيديو محلي',
    youtube_link: 'رابط يوتيوب',
    select_video_file: 'حدد ملف فيديو MP4 أو WebM',
    selected: 'المختار:',
    current_video: 'الفيديو الحالي:',
    enter_youtube_url: 'أدخل رابط يوتيوب',
    youtube_placeholder: 'http://www.youtube.com/watch?v=... أو http://youtu.be/...',
    youtube_url_entered: 'رابط يوتيوب:',
    thumbnail: 'الصورة المصغرة',
    thumbnail_url: 'رابط الصورة المصغرة',
    or_upload: 'أو حمل',
    preview: 'معاينة:',
    new_file_selected: 'تم اختيار ملف جديد:',
    cancel: 'إلغاء',
    save: 'حفظ',
    update_album: 'تحديث الألبوم',
    create_album: 'إنشاء ألبوم',
    saving: 'جاري الحفظ...',
    upload_failed: 'فشل التحميل',
    invalid_response: 'استجابة JSON غير صالحة من الخادم',
    server_error: 'رد الخادم ببيانات غير صالحة. تحقق من وحدة تحكم المتصفح للحصول على التفاصيل.',
    youtube_url_required: 'يرجى إدخال رابط يوتيوب',
    upload_error: 'خطأ في التحميل:',
    error_uploading_thumbnail: 'فشل تحميل الصورة المصغرة',
    error_uploading_video: 'فشل تحميل الفيديو',
    error_submitting: 'خطأ في handleSubmit:',
    error_occurred: 'حدث خطأ. تحقق من وحدة تحكم المتصفح للحصول على التفاصيل.',
    uploading_thumbnail: 'جاري تحميل الصورة المصغرة...',
    thumbnail_uploaded: 'تم تحميل الصورة المصغرة:',
    uploading_video: 'جاري تحميل الفيديو...',
    video_uploaded: 'تم تحميل الفيديو:',
    using_youtube_url: 'استخدام رابط يوتيوب:',
    save_failed: 'فشل الحفظ'
  }
}

export default function AddEditVideoAlbum() {
  const navigate = useNavigate()
  const params = useParams()
  const isEdit = Boolean(params.id)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [videoSource, setVideoSource] = useState('local') // 'local' or 'youtube'
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    if (isEdit) fetchAlbum()
  }, [params.id])

  async function fetchAlbum() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/video-albums.php?id=${params.id}`)
      const j = await res.json()
      if (j.success) {
        const a = j.data
        setTitle(a.title || '')
        setDescription(a.description || '')
        setThumbnailUrl(a.thumbnail || '')
        
        // Detect if video is YouTube or local
        const videoUrlValue = a.video_url || ''
        const isYoutube = videoUrlValue.includes('youtube') || videoUrlValue.includes('youtu.be')
        
        if (isYoutube) {
          setVideoSource('youtube')
          setYoutubeUrl(videoUrlValue)
          setVideoUrl('')
        } else {
          setVideoSource('local')
          setVideoUrl(videoUrlValue)
          setYoutubeUrl('')
        }
      }
    } catch (e) { console.error(e) }
  }

  async function uploadFile(file) {
    const fd = new FormData()
    fd.append('file', file)
    // tell the server this is intended as a video when uploading videos
    if (file.type && file.type.indexOf('video/') === 0) fd.append('target', 'videos')
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/upload.php`, { 
        method: 'POST', 
        body: fd 
      })
      
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`)
      }
      
      const text = await response.text()
      
      // Try to parse JSON response
      try {
        return JSON.parse(text)
      } catch (parseErr) {
        console.error(t.invalid_response, text)
        throw new Error(t.server_error)
      }
    } catch (err) {
      console.error(t.upload_error, err)
      throw err
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      let thumb = thumbnailUrl
      if (thumbnailFile) {
        console.log(t.uploading_thumbnail, thumbnailFile)
        const upRes = await uploadFile(thumbnailFile)
        if (upRes.success) {
          thumb = upRes.url
          console.log(t.thumbnail_uploaded, thumb)
        } else {
          throw new Error(upRes.message || t.error_uploading_thumbnail)
        }
      }

      // Handle video source
      let vurl = videoUrl
      if (videoSource === 'youtube') {
        // Use YouTube URL directly
        vurl = youtubeUrl
        if (!vurl) {
          throw new Error(t.youtube_url_required)
        }
        console.log(t.using_youtube_url, vurl)
      } else if (videoSource === 'local') {
        // Upload local video file if provided
        if (videoFile) {
          console.log(t.uploading_video, videoFile)
          const upRes = await uploadFile(videoFile)
          if (upRes.success) {
            vurl = upRes.url
            console.log(t.video_uploaded, vurl)
          } else {
            throw new Error(upRes.message || t.error_uploading_video)
          }
        }
      }

      const payload = { title, description, thumbnail: thumb, video_url: vurl }
      const url = isEdit ? `${BACKEND_URL}/api/video-albums.php?id=${params.id}` : `${BACKEND_URL}/api/video-albums.php`
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const j = await res.json()
      if (j.success) {
        navigate('/admin/news/video-albums')
      } else {
        alert(j.message || t.save_failed)
      }
    } catch (err) {
      console.error(t.error_submitting, err)
      alert(err.message || t.error_occurred)
    } finally { 
      setSaving(false) 
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E4B33' }}>{isEdit ? t.edit_video_album : t.add_video_album}</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.title_required}</label>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" 
            rows={4} 
          />
        </div>

        {/* Video Source Selection */}
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-4">📹 {t.video_source}</label>
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="videoSource" 
                value="local" 
                checked={videoSource === 'local'}
                onChange={(e) => {
                  setVideoSource(e.target.value)
                  setYoutubeUrl('')
                }}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">📦 {t.upload_local_video}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="videoSource" 
                value="youtube" 
                checked={videoSource === 'youtube'}
                onChange={(e) => {
                  setVideoSource(e.target.value)
                  setVideoFile(null)
                }}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">🎬 {t.youtube_link}</span>
            </label>
          </div>

          {videoSource === 'local' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t.select_video_file}</label>
              <input 
                type="file" 
                accept="video/*" 
                onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} 
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
              />
              {videoFile && (
                <p className="text-sm text-green-600 mt-2">✓ {t.selected} {videoFile.name}</p>
              )}
              {videoUrl && !videoFile && (
                <div className="mt-4 bg-white border border-gray-200 rounded p-4">
                  <p className="text-sm text-gray-600 mb-2">{t.current_video}</p>
                  <video 
                    src={videoUrl}
                    controls 
                    className="w-full h-64 bg-black rounded"
                  />
                  <p className="text-xs text-gray-500 mt-2 break-all">{videoUrl}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t.enter_youtube_url}</label>
              <input 
                type="text" 
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder={t.youtube_placeholder}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" 
              />
              {youtubeUrl && (
                <p className="text-sm text-green-600 mt-2">✓ {t.youtube_url_entered} {youtubeUrl}</p>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">🖼️ {t.thumbnail}</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Thumbnail URL */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.thumbnail_url}</label>
              <input 
                value={thumbnailUrl} 
                onChange={(e) => setThumbnailUrl(e.target.value)} 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" 
                placeholder="http://..." 
              />
            </div>

            {/* Upload Thumbnail */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.or_upload}</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)} 
                className="block w-full text-xs text-gray-500
                  file:mr-2 file:py-1 file:px-3
                  file:rounded file:border-0
                  file:text-xs file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Thumbnail Preview */}
          {(thumbnailUrl || thumbnailFile) && (
            <div className="mt-4 border border-gray-200 rounded-lg p-3 bg-white">
              <p className="text-xs text-gray-600 mb-2">{t.preview}</p>
              <img 
                src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : getImageUrl(thumbnailUrl)} 
                alt="Thumbnail preview" 
                className="w-full h-48 object-cover rounded"
                onError={(e) => e.target.src = '/images/placeholder.jpg'}
              />
              {thumbnailFile && (
                <p className="text-xs text-blue-600 mt-2">✓ {t.new_file_selected} {thumbnailFile.name}</p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin/news/video-albums')} 
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
          >
            {t.cancel}
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 rounded text-white font-medium transition-opacity hover:opacity-90" 
            style={{ backgroundColor: '#C89B3C' }} 
            disabled={saving}
          >
            {saving ? t.saving : isEdit ? t.update_album : t.create_album}
          </button>
        </div>
      </form>
    </div>
  )
}
