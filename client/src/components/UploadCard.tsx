import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Upload } from "../config/types"
import { faCalculator, faClock, faDownload, faSchool } from "@fortawesome/free-solid-svg-icons"
import { formatTimeAgo } from "../config/functions"
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons/faSquareArrowUpRight"
import { Link } from "react-router-dom"


function UploadCard({ upload, bg }: { upload: Upload, bg: string }) {
    return (
        <div className="border-2 bg-gray-300 border-blue-900 mb-3">
            <div className="h-38 p-2" style={{ backgroundImage: `url(/${bg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                {/* image */}
                <div className="">
                    <span className="text-sm text-white p-1 bg-blue-500 mb-1"><FontAwesomeIcon icon={faClock} /> {formatTimeAgo(upload.createdAt)}</span> <br /> <br />
                    <span className="text-sm text-white p-1 bg-yellow-500 mb-1"><FontAwesomeIcon icon={faCalculator} /> Maths {upload.math}</span> <br /> <br />
                    <span className="text-sm text-white p-1 bg-slate-500 mb-1"><FontAwesomeIcon icon={faSchool} /> {upload.grade}</span> <br /> <br />
                </div>
            </div>
            <h3 className="archivo mt-1 ml-1">{upload.title}</h3>
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                    <img className="rounded-full w-10 h-10" src="/images/mathsteps.jpg" alt="Profile pic" />
                    <p className="font-bold mx-1">{upload.user?.username}</p>
                </div>
                <div>
                    <Link to={`/upload/detail/${upload.id}`}>
                        <button className="bg-blue-600 text-white p-1 px-2 mr-1">
                            <FontAwesomeIcon icon={faSquareArrowUpRight} />
                        </button>
                    </Link>
                    <button className="bg-green-600 text-white p-1 px-2">
                        <FontAwesomeIcon icon={faDownload} /> ({upload.documents.length})
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadCard
