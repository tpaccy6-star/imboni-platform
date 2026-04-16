'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';
import OpportunityCard from '@/components/OpportunityCard';
import StatusModal from '@/components/StatusModal';

export default function UploadOpportunity() {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    deadline: '',
    tag: 'Full Funding',
    link: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tempImage, setTempImage] = useState<string | null>(null);
  
  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  const [modal, setModal] = useState<{ isOpen: boolean, type: 'success' | 'error' | 'info', title: string, message: string }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setTempImage(reader.result as string);
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: any, _pixelCrop: any) => {
    setCroppedAreaPixels(_pixelCrop);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (!tempImage || !croppedAreaPixels) return;
      const croppedBlob = await getCroppedImg(tempImage, croppedAreaPixels);
      if (croppedBlob) {
        const file = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
        setImageFile(file);
        setImagePreview(URL.createObjectURL(croppedBlob));
        setIsCropping(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [tempImage, croppedAreaPixels]);

  const handlePublish = async () => {
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.desc);
      payload.append('tag', formData.tag);
      payload.append('deadline', formData.deadline);
      payload.append('link', formData.link);
      if (imageFile) {
        payload.append('image', imageFile);
      }

      const response = await fetch('http://localhost:5000/api/opportunities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('imboni_token')}`
        },
        body: payload
      });

      if (response.ok) {
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Publish Successful',
          message: 'The opportunity has been published and is now visible to all scholars.'
        });
        setFormData({ title: '', desc: '', deadline: '', tag: 'Full Funding', link: '' });
        setImageFile(null);
        setImagePreview('');
      } else {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Publish Failed',
          message: 'We could not publish the opportunity. Please check your network or login status.'
        });
      }
    } catch (error) {
       console.error(error);
       setModal({
        isOpen: true,
        type: 'error',
        title: 'Connection Error',
        message: 'Could not connect to the server. Please ensure the backend is running.'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <StatusModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {isCropping && tempImage && (
        <div className="fixed inset-0 z-[100] bg-[#0A2647]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-[#0A2647] dark:text-white">Image Studio</h3>
                <p className="text-slate-500 text-sm">Zoom and frame your scholarship image perfectly.</p>
              </div>
              <button onClick={() => setIsCropping(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="relative flex-1 bg-black min-h-[400px]">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 space-y-6">
              <div className="flex items-center gap-6">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Zoom Level</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-[#E1B12C] cursor-pointer"
                />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsCropping(false)}
                  className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={showCroppedImage}
                  className="flex-1 btn-primary !rounded-2xl py-4 shadow-xl shadow-yellow-500/20"
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2647]">Upload New Opportunity</h1>
          <p className="text-slate-500">Fill in the details to publish a new scholarship or job link.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Area */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Opportunity Title</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text" 
                placeholder="e.g. Commonwealth Masters Scholarship 2026" 
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Deadline</label>
                <input 
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  type="text" 
                  placeholder="e.g. 15 Aug 2026" 
                  className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Category</label>
                <select 
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all"
                >
                  <option className="dark:bg-slate-900">Full Funding</option>
                  <option className="dark:bg-slate-900">Partial Scholarship</option>
                  <option className="dark:bg-slate-900">International Job</option>
                  <option className="dark:bg-slate-900">Internship</option>
                  <option className="dark:bg-slate-900">Europe</option>
                  <option className="dark:bg-slate-900">Global</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Application Link</label>
              <input 
                name="link"
                value={formData.link}
                onChange={handleChange}
                type="url" 
                placeholder="https://example.com/apply" 
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all" 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Short Description</label>
              <textarea 
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                rows={4} 
                placeholder="Briefly explain what this opportunity offers..." 
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#E1B12C] outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#0A2647] dark:text-slate-300">Opportunity Image (Local File)</label>
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="p-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5 group-hover:bg-slate-100 dark:group-hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-2">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-bold text-slate-500">{imageFile ? imageFile.name : 'Click or Drag to Upload Image'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handlePublish}
                className="flex-1 btn-primary"
              >
                Publish Opportunity
              </button>
              <button className="px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-slate-400">
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0A2647]">Live Preview</h3>
            <span className="text-[10px] uppercase font-black text-slate-400">How it looks to scholars</span>
          </div>
          
          <div className="max-w-md">
            <OpportunityCard 
              id="preview"
              title={formData.title || "Opportunity Title Preview"}
              desc={formData.desc || "Description will appear here as you type..."}
              deadline={formData.deadline || "Date"}
              tag={formData.tag}
              image={imagePreview}
            />
          </div>

          <div className="bg-[#E1B12C]/10 border border-[#E1B12C]/20 p-6 rounded-2xl">
             <h4 className="font-bold text-[#0A2647] flex items-center gap-2 mb-2">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
               </svg>
               Pro Tip
             </h4>
             <p className="text-sm text-slate-600">
               Make sure your title includes the year and the funding type (e.g. 2026 Fully Funded) for better SEO performance.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
