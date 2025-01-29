import { useEffect } from 'react';
import { useAuth } from '../store/UserContext';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children, users }) {
    const navigate = useNavigate();
    const {userData} = useAuth()

    useEffect(() => {
        const isValid = (userData) => {
            const tokenValidity = new Date(userData.exp * 1000) // * 1000 to convert into milliseconds
            const now = new Date()
            return tokenValidity >= now
        }

        const getUserDetails = async () => {
            if (userData && isValid(userData)) {
                if (!(users ? users.includes(userData.role) : true)) {
                    alert("Unauthorized User")
                    navigate(-1)
                }
            } else {
                navigate('/login')
            }
        }
        getUserDetails()
    }, [userData, users, navigate])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute