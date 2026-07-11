import { useAuth } from "../context/AuthContext"

function Profile() {
    const { user } = useAuth()
    return (
        <div>
            <h1 className="text-center text-4xl">
                {user && user.username}'s Profile
            </h1>
        </div>
    )
}

export default Profile
