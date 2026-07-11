import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Upload } from "../../config/types"
import Preview from "./Preview"

function Detail() {
    const { id } = useParams()
    const [upload, setUpload] = useState<Upload | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // fetch upload
    }, [])
    return (
        <div>
            This is the upload detail Page for upload with id: {id} Bruh

            <Preview url="https://remshare.s3.eu-north-1.amazonaws.com/sharing/%C3%A2%C2%80%C2%9EAfter-everything-i-did-for-you_-_snowfall-_franklinsaint-_frxnklinswrld-_viral-_fy%28MP4%291783767505199RemshareDevman.mp4" />
        </div>
    )
}

export default Detail
