import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../config/types";
import { LOGGED_IN, USER } from "../config/constants";

type AuthContextType = {
    isAuthenticated: boolean,
    user: User | null,
    logout: () => void,
    setAuth: (v: boolean) => void,
    setAuthUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(LOGGED_IN) === 'true')
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem(USER) || 'null'))

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem(LOGGED_IN)
        localStorage.removeItem(USER)
    }

    const setAuth = (v: boolean) => {
        localStorage.setItem(LOGGED_IN, 'true')
        setIsAuthenticated(v)
    }

    const setAuthUser = (user: User) => {
        setUser(user)
        localStorage.setItem(USER, JSON.stringify(user))
    }

    useEffect(() => {
        return () => {
            localStorage.removeItem(LOGGED_IN)
            localStorage.removeItem(USER)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, logout, isAuthenticated, setAuthUser, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('AutContext finnna be used in AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
