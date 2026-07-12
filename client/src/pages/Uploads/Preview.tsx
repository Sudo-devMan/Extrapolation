import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import { saveAs } from 'file-saver';
import type { Upload } from '../../config/types';

interface FilePreviewsSliderProps {
    upload: Upload;
}

const FilePreviewsSlider: React.FC<FilePreviewsSliderProps> = ({ upload }) => {
    const { documents, title } = upload;
    const sliderRef = useRef<HTMLDivElement>(null);
    const [showPermissionWarning, setShowPermissionWarning] = useState(false);

    // --- Added states for download tracking ---
    const [isDownloadingAll, setIsDownloadingAll] = useState(false);
    const [downloadingFiles, setDownloadingFiles] = useState<Record<string, boolean>>({});

    const getFileInfo = (url: string) => {
        const decodedUrl = decodeURIComponent(url);
        const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1).split('?')[0];
        const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        return { fileName, extension };
    };

    console.log("File info:", getFileInfo('http://127.0.0.0.1:4000/example.jpg'))

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

    // Modified to accept a trackingId (doc.id) and handle state changes
    const downloadFile = async (url: string, fileName: string, trackingId?: string) => {
        if (trackingId) {
            setDownloadingFiles(prev => ({ ...prev, [trackingId]: true }));
        }
        try {
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            saveAs(blob, fileName);
        } catch (error) {
            console.error('Error downloading file:', error);
            window.open(url, '_blank');
        } finally {
            if (trackingId) {
                setDownloadingFiles(prev => ({ ...prev, [trackingId]: false }));
            }
        }
    };

    // Updated to lock states using promises to accurately track when the bulk operation is finished
    const downloadAllFiles = async () => {
        if (!documents || documents.length === 0) return;

        if (documents.length > 1) {
            setShowPermissionWarning(true);
        }

        setIsDownloadingAll(true);

        // Turn all URLs/IDs to individual promises using your setTimeouts so they execute incrementally
        const downloadPromises = documents.map((doc, index) => {
            const { fileName } = getFileInfo(doc.url);
            const fallbackName = fileName || `document-${index + 1}`;

            return new Promise<void>((resolve) => {
                setTimeout(async () => {
                    // Also track it individually while the bulk action happens
                    await downloadFile(doc.url, fallbackName, String(doc.id));
                    resolve();
                }, index * 200);
            });
        });

        // Wait for all download queues to resolve, then unlock the main button
        await Promise.all(downloadPromises);
        setIsDownloadingAll(false);
    };

    if (!documents || documents.length === 0) {
        return (
            <div className="border border-gray-300 p-6 text-center text-gray-500 bg-white">
                No files available for this upload.
            </div>
        );
    }

    return (
        <div className="w-full m-2 border border-gray-200 p-4 text-gray-900 font-sans">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-gray-200">
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
                        <h3 className="text-lg font-bold uppercase tracking-wider leading-tight">{title}</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500 mt-0.5">
                            <span className="font-semibold text-black">{upload.grade}</span>
                            <span className="text-gray-300">|</span>
                            <span>by <strong className="text-gray-700">{upload.user?.username || 'Anonymous'}</strong></span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={downloadAllFiles}
                    disabled={isDownloadingAll}
                    className={`flex items-center gap-2 text-white px-4 py-2 text-sm font-semibold transition-colors uppercase tracking-tight ${isDownloadingAll
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-800'
                        }`}
                >
                    {isDownloadingAll ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Downloading All...
                        </>
                    ) : (
                        <>
                            <Download size={16} />
                            Download All Files ({documents.length})
                        </>
                    )}
                </button>
            </div>

            {showPermissionWarning && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-2 text-xs">
                    <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-bold">Utlwa sefela:</span> If all files were not downloaded just download them one by one o tlogele fashion
                    </div>
                </div>
            )}

            <div className="relative group">
                <button
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

                        // Check if either this specific file is processing or bulk download is active
                        const isThisFileDownloading = downloadingFiles[doc.id] || false;
                        const isButtonDisabled = isThisFileDownloading || isDownloadingAll;

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
                                        onClick={() => downloadFile(doc.url, fileName, String(doc.id))}
                                        disabled={isButtonDisabled}
                                        className={`w-full flex items-center justify-center gap-2 border py-1.5 text-xs font-bold uppercase transition-colors ${isButtonDisabled
                                                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'border-black hover:bg-green-500 hover:text-white'
                                            }`}
                                    >
                                        {isThisFileDownloading ? (
                                            <>
                                                <Loader2 size={12} className="animate-spin" />
                                                Downloading...
                                            </>
                                        ) : (
                                            <>
                                                <Download size={12} />
                                                Download File
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 hover:bg-gray-50 text-black shadow-sm"
                    aria-label="Next file"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default FilePreviewsSlider;