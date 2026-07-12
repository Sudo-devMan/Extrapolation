import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Upload } from "../../config/types"
import Preview from "./Preview"
import { fetchUpload } from "../../config/functions"

function Detail() {
    const { id } = useParams()
    const [upload, setUpload] = useState<Upload | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // fetch upload
        setLoading(true)
        fetchUpload(id)
            .then(u => { setUpload(u?.data.upload); console.log('U: ', u) })
            .catch(err => alert(err.response.data.message))
            .finally(() => setLoading(false))
    }, [])
    return (
        <>
            {!loading ?
                <div>


                    {upload && <Preview upload={upload} />}
                </div>
                :
                <div>
                    Loading....
                </div>}
        </>
    )
}

export default Detail
