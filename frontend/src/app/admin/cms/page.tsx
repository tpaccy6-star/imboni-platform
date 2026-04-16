'use client';

import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  ChevronRight, 
  Edit3, 
  Trash2, 
  Eye, 
  Layout, 
  BookOpen,
  CheckCircle2,
  Clock
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import StatusModal from '@/components/StatusModal';

export default function CMSHub() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('opportunities');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cmsStats, setCmsStats] = useState({ published: 0, drafts: 0, scheduled: 0 });
  const [modal, setModal] = useState<{ isOpen: boolean, type: 'info' | 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void, confirmText?: string }>({ isOpen: false, type: 'info', title: '', message: '' });
  const [editingItem, setEditingItem] = useState<any>(null);

  const fetchContent = () => {
    setLoading(true);
    let endpoint = '/api/opportunities';
    if (activeTab === 'posts') endpoint = '/api/admin/cms/posts';
    if (activeTab === 'pages') endpoint = '/api/admin/cms/pages';

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
    })
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  };

  const fetchStats = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/cms/stats`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.published !== undefined) setCmsStats(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchContent();
    fetchStats();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    let endpoint = `/api/opportunities/${id}`;
    if (activeTab === 'posts') endpoint = `/api/admin/cms/posts/${id}`;
    if (activeTab === 'pages') endpoint = `/api/admin/cms/pages/${id}`;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` }
      });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
        fetchStats();
        setModal({ isOpen: true, type: 'success', title: 'Deleted', message: 'Item has been permanently removed.' });
      }
    } catch (error) {
       setModal({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to delete item.' });
    }
  };

  const confirmDelete = (item: any) => {
    setModal({
      isOpen: true,
      type: 'confirm',
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete "${item.title}"? This cannot be undone.`,
      confirmText: 'Delete Permanently',
      onConfirm: () => handleDelete(item.id)
    });
  };

  const handleSaveEdit = async (updatedData: any) => {
    let endpoint = `/api/opportunities/${editingItem.id}`;
    if (activeTab === 'posts') endpoint = `/api/admin/cms/posts/${editingItem.id}`;
    if (activeTab === 'pages') endpoint = `/api/admin/cms/pages/${editingItem.id}`;

    const isFormData = updatedData instanceof FormData;
    const requestOptions: any = {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('imboni_token')}` 
      },
      body: isFormData ? updatedData : JSON.stringify(updatedData)
    };

    if (!isFormData) {
      requestOptions.headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, requestOptions);
      if (res.ok) {
        fetchContent();
        fetchStats();
        setEditingItem(null);
        setModal({ isOpen: true, type: 'success', title: 'Updated', message: 'Changes saved successfully.' });
      }
    } catch (error) {
       setModal({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to save changes.' });
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      <StatusModal 
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        confirmText={modal.confirmText}
      />

      {editingItem && (
        <EditModal 
          item={editingItem} 
          onClose={() => setEditingItem(null)} 
          onSave={handleSaveEdit} 
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0A2647] dark:text-white mb-2">Content Management</h1>
          <p className="text-slate-500 text-sm sm:text-base">Create, edit and publish scholarships, blog posts, and site pages.</p>
        </div>
        <button 
          onClick={() => {
            if (activeTab === 'opportunities') router.push('/admin/upload');
            else setModal({
              isOpen: true,
              type: 'info',
              title: 'CMS Editor',
              message: 'The Blog/Page visual editor is being synchronized with the new database schema. Use the upload tool for scholarships in the meantime.'
            });
          }}
          className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 !px-8 h-12 sm:h-14"
        >
          <Plus size={20} />
          Create New {activeTab === 'opportunities' ? 'Scholarship' : 'Content'}
        </button>
      </div>

      {/* CMS Tabs - Scrollable on mobile */}
      <div className="flex gap-2 sm:gap-4 border-b border-slate-200 dark:border-white/5 pb-0 overflow-x-auto no-scrollbar">
        {[
          { id: 'opportunities', label: 'Scholarships', icon: BookOpen },
          { id: 'posts', label: 'Blog Posts', icon: FileText },
          { id: 'pages', label: 'Static Pages', icon: Layout },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 sm:px-8 py-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
              ? 'border-[#E1B12C] text-[#0A2647] dark:text-white' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Statistics & Filter Sidebar */}
        <div className="space-y-6 order-2 lg:order-1">
           <div className="bg-[#0A2647] p-8 rounded-3xl sm:rounded-[2.5rem] text-white shadow-xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E1B12C] mb-6">Archive Stats</h4>
              <div className="space-y-4 sm:space-y-6">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold opacity-60">Published</span>
                    <span className="text-lg sm:text-xl font-black">{cmsStats.published}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold opacity-60">Drafts</span>
                    <span className="text-lg sm:text-xl font-black text-[#E1B12C]">{cmsStats.drafts}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-bold opacity-60">Scheduled</span>
                    <span className="text-lg sm:text-xl font-black">{cmsStats.scheduled}</span>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
              <div className="relative mb-6">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="Search archive..." className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs outline-none" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Folders</h4>
              <nav className="space-y-1">
                 {['All Content', 'Recent', 'Trash'].map(f => (
                   <button key={f} className="w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                     {f}
                   </button>
                 ))}
              </nav>
           </div>
        </div>

        {/* Content List */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-1 lg:order-2">
          {loading ? (
             <div className="p-20 text-center animate-pulse text-[#0A2647] dark:text-white font-black tracking-widest uppercase text-xs">Retreiving content library...</div>
          ) : items.length === 0 ? (
             <div className="bg-white dark:bg-slate-900 p-12 sm:p-20 rounded-[2rem] sm:rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10 text-center text-slate-400">
                No {activeTab} found in your archive.
             </div>
          ) : items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group flex items-start gap-4 sm:gap-6">
               <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 dark:bg-white/5 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                       <FileText size={24} className="sm:w-8 sm:h-8" />
                    </div>
                  )}
               </div>
               
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-0.5 bg-[#E1B12C]/10 text-[#E1B12C] text-[8px] sm:text-[10px] font-black rounded-full uppercase tracking-widest">{item.tag || 'POST'}</span>
                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                       <CheckCircle2 size={12} className="text-green-500" />
                       Published
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#0A2647] dark:text-white mb-1 sm:mb-2 truncate group-hover:text-[#E1B12C] transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold text-slate-400">
                     <span className="flex items-center gap-1.5"><Clock size={14} /> <span className="hidden sm:inline">Last updated </span>2d ago</span>
                     <span className="flex items-center gap-1.5"><Eye size={14} /> 1.2k <span className="hidden sm:inline">Views</span></span>
                  </div>
               </div>

                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <button 
                    onClick={() => setEditingItem(item)}
                    className="p-2 sm:p-3 bg-slate-50 dark:bg-white/5 rounded-lg sm:rounded-xl hover:text-[#E1B12C] transition-all"
                  >
                    <Edit3 size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={() => confirmDelete(item)}
                    className="p-2 sm:p-3 bg-slate-50 dark:bg-white/5 rounded-lg sm:rounded-xl hover:text-red-500 transition-all text-slate-400"
                  >
                    <Trash2 size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function EditModal({ item, onClose, onSave }: { item: any; onClose: () => void; onSave: (data: any) => void }) {
  const [data, setData] = useState({ ...item });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(item.image || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveClick = () => {
    if (newImage) {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) formData.append(key, data[key]);
      });
      formData.append('image', newImage);
      onSave(formData);
    } else {
      onSave(data);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="absolute inset-0 bg-[#0A2647]/90 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl sm:rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A2647] dark:text-white">Edit Content</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Update details for {item.title}</p>
          </div>
          <button onClick={onClose} className="p-2 sm:p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl sm:rounded-2xl text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 sm:space-y-8 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {/* Left Column: Image Replacement */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Cover Image</label>
            <div className="relative group cursor-pointer aspect-video bg-slate-50 dark:bg-slate-800/50 rounded-2xl sm:rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
               {previewImage ? (
                 <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
               ) : (
                 <div className="text-slate-400 flex flex-col items-center">
                    <FileText size={32} className="mb-2 opacity-50" />
                    <span className="text-sm font-bold">No Image Available</span>
                 </div>
               )}
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-xs sm:text-sm font-bold bg-[#E1B12C] px-6 py-2 rounded-full shadow-xl">Change Image</span>
               </div>
               <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 px-2 sm:px-4">Click the area to replace the image. Ideal aspect ratio is 16:9.</p>
          </div>

          {/* Right Column: Text Details */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Title</label>
              <input 
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C] text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Category</label>
                <input 
                  value={data.tag || (data.link ? 'Scholarship' : 'POST')}
                  onChange={(e) => setData({ ...data, tag: e.target.value })}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C] text-sm sm:text-base"
                />
              </div>
              {data.deadline && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Deadline</label>
                  <input 
                    type="date"
                    value={data.deadline}
                    onChange={(e) => setData({ ...data, deadline: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C] text-sm sm:text-base"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Summary</label>
              <textarea 
                rows={4}
                value={data.description || data.content?.substring(0, 200)}
                onChange={(e) => setData({ ...data, description: e.target.value, content: e.target.value })}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E1B12C] resize-none text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
          <button onClick={onClose} className="px-8 py-3 sm:py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors text-sm sm:text-base">Cancel</button>
          <button 
            onClick={handleSaveClick}
            className="btn-primary !rounded-xl sm:!rounded-2xl px-8 sm:px-12 py-3 sm:py-4 shadow-xl shadow-yellow-500/20 text-sm sm:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
