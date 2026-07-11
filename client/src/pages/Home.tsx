import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Home() {
    const [search, setSearch] = useState('')
    const { user, isAuthenticated } = useAuth()
    console.log('Is ath:', isAuthenticated)
    console.log('User:', user)
    console.log(search)
    return (
        <div className="w-full px-3">

            <section className="mb-3 flex items-center sm:hidden justify-between border-3 border-blue-950 p-1">
                <input onChange={(e) => setSearch(e.target.value)} placeholder="search..." type="text" name="search" className="bg-yellow-200 nutino focus:outline-none focus:ring-0 p-1 font-bold" />
                <button className="bg-blue-200 active:bg-blue-300 p-1 font-bold">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </section>

            <div className="sm:grid sm:grid-cols-2">
                <section className="h-[60vh] sm:h-[90vh] flex items-center flex-col justify-center p-1">
                    <img src="extrapolation.png" alt="Pi" width={200} />
                    <p className="nutino text-4xl text-center italic font-bold">
                        Math is our daily bread
                    </p>
                    <p className="italic text-center nutino text-sm text-gray-500 font-bold">
                        Even if the Math has a surname : )
                    </p>
                    <div className="flex font-bold items-center gap-4 my-4 justify-between">
                        {
                            isAuthenticated ?
                                <>
                                    <Link to={'/profile'}>
                                        <button className="font-bold active:bg-green-400 text-xl px-3 bg-green-300 p-1">
                                            My Profile
                                        </button>
                                    </Link>
                                    <Link to={'/upload'}>
                                        <button className="font-bold active:bg-red-400 text-xl px-3 bg-red-300 p-1">
                                            Upload
                                        </button>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to={'/authenticate'}>
                                        <button className="font-bold active:bg-red-400 text-xl px-3 bg-red-300 p-1">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to={'/register'}>
                                        <button className="font-bold active:bg-green-400 text-xl px-3 bg-green-300 p-1">
                                            Register
                                        </button>
                                    </Link>
                                </>
                        }
                    </div>
                </section>

                <div className="sm:grid sm:grid-cols-2 gap-x-3">
                    <section className="mb-3 flex items-center hidden sm:block justify-center border-3 border-blue-950 p-1">
                        <h1 className="archivo">Looking for something specific? Type it below and we'll take you there</h1> <br />
                        <input onChange={(e) => setSearch(e.target.value)} placeholder="search..." type="text" name="search" className="bg-yellow-200 nutino focus:outline-none focus:ring-0 p-1 font-bold text-xl" />
                        <button className="ml-2 bg-blue-200 active:bg-blue-300 p-2 font-bold">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </section>

                    <section className="border-3 mb-3 border-blue-950 p-3">
                        <div>
                            <h1 className="archivo text-xl">
                                Grade <span style={{ color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` }} className={`archivo font-bold`}>8</span> Material
                            </h1>
                            <p className="nutino font-bold italic">
                                Previous question papers, memorandums, study guides
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                <em></em> {/* This is for layout purposes */}
                            </p>
                            <NavLink to={`/plug/grade/${8}`}>
                                <button className="bg-yellow-300 archivo p-1 active:bg-yellow-400 px-3">
                                    Explore
                                </button>
                            </NavLink>
                        </div>
                    </section>

                    <section className="border-3 mb-3 border-blue-950 p-3">
                        <div>
                            <h1 className="archivo text-xl">
                                Grade <span style={{ color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` }} className={`archivo font-bold`}>9</span> Material
                            </h1>
                            <p className="nutino font-bold italic">
                                Previous question papers, memorandums, study guides
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                <em></em> {/* This is for layout purposes */}
                            </p>
                            <NavLink to={`/plug/grade/${9}`}>
                                <button className="bg-yellow-300 archivo p-1 active:bg-yellow-400 px-3">
                                    Explore
                                </button>
                            </NavLink>
                        </div>
                    </section>

                    <section className="border-3 mb-3 border-blue-950 p-3">
                        <div>
                            <h1 className="archivo text-xl">
                                Grade <span style={{ color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` }} className={`archivo font-bold`}>10</span> Material
                            </h1>
                            <p className="nutino font-bold italic">
                                Previous question papers, memorandums, study guides
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                <em></em> {/* This is for layout purposes */}
                            </p>
                            <NavLink to={`/plug/grade/${10}`}>
                                <button className="bg-yellow-300 archivo p-1 active:bg-yellow-400 px-3">
                                    Explore
                                </button>
                            </NavLink>
                        </div>
                    </section>

                    <section className="border-3 mb-3 border-blue-950 p-3">
                        <div>
                            <h1 className="archivo text-xl">
                                Grade <span style={{ color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` }} className={`archivo font-bold`}>11</span> Material
                            </h1>
                            <p className="nutino font-bold italic">
                                Previous question papers, memorandums, study guides
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                <em></em> {/* This is for layout purposes */}
                            </p>
                            <NavLink to={`/plug/grade/${11}`}>
                                <button className="bg-yellow-300 archivo p-1 active:bg-yellow-400 px-3">
                                    Explore
                                </button>
                            </NavLink>
                        </div>
                    </section>

                    <section className="border-3 mb-3 border-blue-950 p-3">
                        <div>
                            <h1 className="archivo text-xl">
                                Grade <span style={{ color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` }} className={`archivo font-bold`}>12</span> Material
                            </h1>
                            <p className="nutino font-bold italic">
                                Previous question papers, memorandums, study guides
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                <em></em> {/* This is for layout purposes */}
                            </p>
                            <NavLink to={`/plug/grade/${12}`}>
                                <button className="bg-yellow-300 archivo p-1 active:bg-yellow-400 px-3">
                                    Explore
                                </button>
                            </NavLink>
                        </div>
                    </section>

                    <section className="border-3 mb-3 border-blue-950 p-3">
                        <div>
                            <h1 className="archivo text-xl">
                                Have an account?
                            </h1>
                            <p className="nutino font-bold italic">
                                Then login to <span className="text-green-800">keep your profile updated</span> with the latest mathematics study material
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                <em></em> {/* This is for layout purposes */}
                            </p>
                            <button className="bg-green-300 active:bg-green-400 archivo p-1 px-3">
                                Login
                            </button>
                        </div>
                    </section>

                    <section className="border-3 mb-3 border-blue-950 p-3">
                        <div>
                            <h1 className="archivo text-xl">
                                Wanna join?
                            </h1>
                            <p className="nutino font-bold italic">
                                Then register right now and upload mathematics study material. It <span className="text-blue-800">only takes 3 minutes</span> and THAT'S IT!
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>
                                <em></em> {/* This is for layout purposes */}
                            </p>
                            <Link to='/authenticate' ><button className="bg-blue-300 archivo active:bg-blue-400 p-1 px-3">
                                Register
                            </button></Link>
                        </div>
                    </section>
                </div>
            </div>


        </div>
    )
}

export default Home
