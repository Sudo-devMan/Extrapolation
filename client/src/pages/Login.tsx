
import { useEffect, useState, type SubmitEvent } from 'react'
import api from '../config/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login({ login }: { login: boolean }) {
    const [searchParams] = useSearchParams()
    const reg = searchParams.get('reg')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [isLogin, setLogin] = useState(reg === 'true' ? false : login)
    const [msg, setMsg] = useState<{ text: string, error: boolean }>({ text: '', error: false })
    const navigate = useNavigate()
    const { setAuth, setAuthUser, user } = useAuth()
    const passCheck = (password1 && password2) && password1 !== password2

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()
        setLoading(true)
        const payload = {
            username,
            email,
            password: password1
        }

        if (isLogin) {
            try {
                const res = await api.post('/auth/login', payload)
                if (res.status === 200 || res.status === 201) {
                    // alert(res.data.message)
                    setMsg({
                        text: res.data.message,
                        error: false
                    })
                    setAuth(true)
                    setAuthUser(res.data.user)
                    navigate('/profile?oldUser=1')
                    // console.log("Login res:", res)
                }
            } catch (err: any) {
                // alert(err.response.data.message)
                setMsg({
                    text: err.response.data.message,
                    error: true
                })
                // console.log("Error:", err)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const res = await api.post('/auth/signup', payload)
                if (res.status === 200 || res.status === 201) {
                    // alert(res.data.message)
                    setMsg({
                        text: res.data.message,
                        error: false
                    })
                    navigate('/profile?newUser=1')
                    setAuth(true)
                    setAuthUser(res.data.user)
                    // console.log("Reg res:", res)
                }
            } catch (err: any) {
                // alert(err.response.data.message)
                setMsg({
                    text: err.response.data.message,
                    error: true
                })
                // console.log("Error:", err)
            } finally {
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])
    return (
        <div className='p-3 w-full sm:h-screen  flex items-center justify-center'>
            <form className='p-5 shadow-xl shadow shadow-blue-950 sm:w-110 grid grid-cols-1 gap-y-3 bg-white' onSubmit={handleSubmit} method="post">
                <h1 className='text-3xl font-bold'>
                    {
                        isLogin ? 'Login' : 'Create Account'
                    }
                </h1>
                {
                    msg.text.length > 0 &&
                    <p style={{ color: msg.error ? 'red' : 'green' }} className="font-bold text-xl text-center">
                        {msg.text}
                    </p>
                }
                {
                    !isLogin &&
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            disabled={loading}
                            className="text-sm input:text focus:outline-none focus:ring-0 p-1 text-xl w-full bg-blue-200"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                }
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        disabled={loading}
                        className="text-sm input:text focus:outline-none focus:ring-0 p-1 text-xl w-full bg-blue-200"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password1">Password:</label>
                    <input
                        type="text"
                        disabled={loading}
                        className="text-sm input:text focus:outline-none focus:ring-0 p-1 text-xl w-full bg-blue-200"
                        name="password2"
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                </div>
                {
                    !isLogin &&
                    <div>
                        <label htmlFor="password2">Comfirm Password: {passCheck && <span style={{ color: 'red', fontWeight: 'bold' }}> Passwords do not match! </span>}</label>
                        <input
                            type="text"
                            disabled={loading}
                            className="text-sm input:text focus:outline-none focus:ring-0 p-1 text-xl w-full bg-blue-200"
                            name="password2"
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                }

                {
                    loading ?
                        <button disabled className='bg-yellow-500 text-white p-2 w-full' type="button">
                            {
                                isLogin ? 'Loging in...' : 'Creating Account...'
                            }
                        </button>
                        :
                        isLogin ?
                            <button className='bg-yellow-500 text-white p-2 w-full' type="submit">
                                {
                                    isLogin ? 'Login' : 'Create Account'
                                }
                            </button>
                            :
                            !passCheck ? <button className='bg-yellow-500 text-white p-2 w-full' type="submit">
                                {
                                    isLogin ? 'Login' : 'Create Account'
                                }
                            </button>
                                :
                                <button disabled className='bg-yellow-500 text-white p-2 w-full' type="button">
                                    {
                                        isLogin ? 'Login' : 'Create Account'
                                    }
                                </button>
                }
                <button className='font-bold underline' onClick={() => setLogin(p => !p)} type="button">
                    {
                        !isLogin ? 'I already have an account' : 'I don\'t have an account'
                    }
                </button>
            </form>
        </div>
    )
}

export default Login

