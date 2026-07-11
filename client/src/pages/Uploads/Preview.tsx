
interface PreviewProps {
    url: string;
    className?: string;
}

function Preview({ url, className = "" }: PreviewProps) {
    // Use regex to find the extension cleanly, converting it to lowercase
    // This extracts 'mp4' from 'something.mp41783767505199RemshareDevman'
    const match = url.split('?')[0].split('.')
    let fileExt = match[match.length - 1];

    // Secondary fallback check: if the URL contains a known bracketed string like (MP4)
    if (!fileExt || fileExt.length > 5) {
        if (url.toLowerCase().includes("(mp4)")) fileExt = "mp4";
        else if (url.toLowerCase().includes("(pdf)")) fileExt = "pdf";
        else if (url.toLowerCase().includes("(png)")) fileExt = "png";
        else if (url.toLowerCase().includes("(jpg)") || url.toLowerCase().includes("(jpeg)")) fileExt = "jpg";
        else if (url.toLowerCase().includes("(mp3)")) fileExt = "mp3";
    }

    // Define asset groupings
    const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(fileExt);
    const isVideo = ["mp4", "webm", "ogg", "mov"].includes(fileExt);
    const isAudio = ["mp3", "wav", "ogg", "aac"].includes(fileExt);
    const isPDF = fileExt === "pdf";

    // Flat theme box styling matches your pure black grid environment
    const baseStyle = `w-full min-h-[240px] max-h-[420px] bg-black border border-zinc-900 flex items-center justify-center font-mono text-xs text-zinc-500 p-2 ${className}`;

    if (isImage) {
        return (
            <div className={baseStyle}>
                <img
                    src={url}
                    alt="Asset Preview"
                    className="w-full h-full object-contain max-h-[390px]"
                    loading="lazy"
                />
            </div>
        );
    }

    if (isVideo) {
        return (
            <div className={baseStyle}>
                <video
                    src={url}
                    controls
                    className="w-full h-full max-h-[390px] bg-black outline-none border-0"
                    preload="metadata"
                />
            </div>
        );
    }

    if (isAudio) {
        return (
            <div className={`${baseStyle} flex-col gap-3 min-h-[120px]`}>
                <span className="text-zinc-400">🎵 Audio Asset Preview</span>
                <audio src={url} controls className="w-full max-w-md invert filter brightness-90" />
            </div>
        );
    }

    if (isPDF) {
        return (
            <div className={baseStyle}>
                <embed
                    src={`${url}#toolbar=0&navpanes=0`}
                    type="application/pdf"
                    className="w-full h-[390px] bg-zinc-950 border border-zinc-900"
                />
            </div>
        );
    }

    // Clean fallback layout for unrenderable content or obscure archive packs
    return (
        <div className={`${baseStyle} flex-col gap-2`}>
            <span className="text-xl">📦</span>
            <p className="text-zinc-400 uppercase tracking-wider font-bold text-[10px]">
                No Preview Available
            </p>
            <p className="text-zinc-600 text-[9px] font-mono select-all truncate max-w-[250px] px-2">
                Type parsed: {fileExt || "unknown"}
            </p>
            <a
                href={url}
                download
                target="_blank"
                rel="noreferrer"
                className="mt-1 bg-zinc-900 border border-zinc-800 text-purple-400 hover:text-purple-300 font-bold px-3 py-1.5 uppercase text-[10px] tracking-wide transition-colors"
            >
                Download Directly
            </a>
        </div>
    );
}

export default Preview;