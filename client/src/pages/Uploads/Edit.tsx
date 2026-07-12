import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, ExternalLink, Trash2, Save, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Upload } from '../../config/types';
import api from '../../config/api';

interface EditProps {
    upload: Upload;
    onSaveSuccess?: (updatedUpload: any) => void; // Optional callback to update parent state/UI on success
    onCancel?: () => void;
}

const Edit: React.FC<EditProps> = ({ upload, onSaveSuccess, onCancel }) => {
    const { user } = useAuth();
    const sliderRef = useRef<HTMLDivElement>(null);

    const [title, setTitle] = useState(upload.title);
    const [grade, setGrade] = useState(upload.grade);

    const [documents, setDocuments] = useState(upload.documents || []);

    const [isSaving, setIsSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [deletingFiles, setDeletingFiles] = useState<Record<string, boolean>>({});

    const isOwner = user?.id === upload.user?.id;

    const getFileInfo = (url: string) => {
        const decodedUrl = decodeURIComponent(url);
        const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).split('?')[0];
        const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        return { fileName, extension };
    };

    const isImage = (extension: string) => {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleDeleteFile = (docId: string) => {
        setDeletingFiles(prev => ({ ...prev, [docId]: true }));

        setTimeout(() => {
            setDocuments(prev => prev.filter(doc => doc.id !== +docId));
            setDeletingFiles(prev => ({ ...prev, [docId]: false }));
        }, 150);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isOwner || isSaving) return;

        setIsSaving(true);
        setErrorMsg(null);

        try {
            const remainingDocIds = documents.map(doc => String(doc.id));

            // Integrating the Axios instance using the /papers/:id endpoint
            const response = await api.put(`/papers/${upload.id}`, {
                title,
                grade,
                remainingDocIds
            });

            // Trigger success callback if provided
            if (onSaveSuccess) {
                onSaveSuccess(response.data);
            }
        } catch (error: any) {
            console.error("Failed to update upload:", error);
            setErrorMsg(error.response?.data?.message || "Failed to update the upload. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOwner) {
        return (
            <div className="border border-red-300 p-6 text-center text-red-600 bg-red-50 flex items-center justify-center gap-2 m-2">
                <AlertCircle size={20} />
                <span className="font-bold">Access Denied:</span> You do not have permission to edit this upload.
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className="w-full m-2 border border-gray-200 p-4 text-gray-900 font-sans bg-white">

            {errorMsg && (
                <div className="border border-red-300 p-3 mb-4 text-sm text-red-600 bg-red-50 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-300 bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {upload.user?.profilePicture ? (
                            <img
                                src={upload.user.profilePicture}
                                alt={`${upload.user.username}'s profile`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm font-bold text-gray-500 uppercase">
                                {upload.user?.username ? upload.user.username.charAt(0) : '?'}
                            </span>
                        )}
                    </div>
                    <div>
                        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block">Editing Upload Mode</span>
                        <span className="text-xs text-gray-500">by <strong className="text-gray-700">{upload.user?.username || 'Anonymous'}</strong></span>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSaving}
                            className="px-4 py-2 text-sm font-semibold border border-gray-300 hover:bg-gray-50 uppercase tracking-tight disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`flex items-center gap-2 text-white px-4 py-2 text-sm font-semibold transition-colors uppercase tracking-tight ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
                            }`}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Saving changes...
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Save Upload
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Upload Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isSaving}
                        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-black transition-colors"
                        placeholder="Enter dynamic title..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Grade / Level</label>
                    <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                        disabled={isSaving}
                        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-black transition-colors"
                        placeholder="e.g. Grade 12, A-Level"
                    />
                </div>
            </div>

            <div className="mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Manage Attached Documents ({documents.length})</label>

                {documents.length === 0 ? (
                    <div className="border border-dashed border-gray-300 p-6 text-center text-gray-500 bg-gray-50 text-sm">
                        No files attached. All files removed or pending removal.
                    </div>
                ) : (
                    <div className="relative group">
                        <button
                            type="button"
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 hover:bg-gray-50 text-black shadow-sm"
                            aria-label="Previous file"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div
                            ref={sliderRef}
                            className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory px-10 py-2 scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {documents.map((doc) => {
                                const { fileName, extension } = getFileInfo(doc.url);
                                const isImg = isImage(extension);
                                const isThisFileDeleting = deletingFiles[doc.id] || false;

                                return (
                                    <div
                                        key={doc.id}
                                        className="flex-none w-64 h-80 border border-gray-200 bg-gray-50 flex flex-col justify-between snap-start"
                                    >
                                        <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-200 relative group/item">
                                            {isImg ? (
                                                <img
                                                    src={doc.url}
                                                    alt={fileName}
                                                    className="w-full h-full object-cover object-center"
                                                    loading="lazy"
                                                // disabled={isSaving}
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                                    <FileText size={48} strokeWidth={1.5} />
                                                    <span className="uppercase font-bold text-xs tracking-widest bg-gray-200 text-gray-600 px-2 py-0.5">
                                                        .{extension || 'file'}
                                                    </span>
                                                </div>
                                            )}

                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 hover:bg-gray-50"
                                                title="Open file in new tab"
                                            >
                                                <ExternalLink size={14} className="text-gray-600" />
                                            </a>
                                        </div>

                                        <div className="p-3 flex flex-col justify-between flex-grow bg-white">
                                            <p className="text-xs font-medium text-gray-700 truncate mb-2" title={fileName}>
                                                {fileName}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteFile(String(doc.id))}
                                                disabled={isThisFileDeleting || isSaving}
                                                className={`w-full flex items-center justify-center gap-2 border py-1.5 text-xs font-bold uppercase transition-colors ${isThisFileDeleting || isSaving
                                                    ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                                                    }`}
                                            >
                                                {isThisFileDeleting ? (
                                                    <>
                                                        <Loader2 size={12} className="animate-spin" />
                                                        Removing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 size={12} />
                                                        Remove File
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 hover:bg-gray-50 text-black shadow-sm"
                            aria-label="Next file"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default Edit;