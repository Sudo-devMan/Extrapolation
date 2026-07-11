import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchUploads } from "../config/functions"
import Header from "../components/Header"
import UploadCard from "../components/UploadCard"

function Plug() {
    const { grade } = useParams()
    const [uploads, setUploads] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        document.title = `Extrapolation | Grade ${grade} Plug`
        // fetch uploads below
        setLoading(true)
        fetchUploads(grade).then(u => {
            console.log("Data: ", u?.data)
            setUploads(u?.data.uploads);
            setLoading(false)
            console.log(uploads)
        }).catch(err => {
            setLoading(false)
            alert(err.message)
            console.log(err)
        })

    }, [])
    return (
        <div>
            <Header title={`Grade ${grade} Plug`} pic="/extrapolation.png" />

            {
                loading && uploads.length === 0 ?
                    <div>LOADING...</div>
                    :
                    <div>
                        {
                            uploads.length !== 0 ?
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 p-2">
                                    {uploads.map((upload, i) => {
                                        return <UploadCard key={i} upload={upload} bg='images/calculator.jpg' />
                                    })}
                                </div>
                                :
                                <div className="flex flex-col items-center justify-center w-full h-screen">
                                    <h1 className="nutino text-3xl">NO PLUG FOR GRADE {grade} YET</h1>
                                    <p>
                                        <em>
                                            If you have some material <Link className="underline decoration-blue-500 font-bold" to={'/upload'}>click here to upload.</Link>
                                        </em>
                                    </p>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default Plug

