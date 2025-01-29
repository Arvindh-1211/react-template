import { useEffect, useState } from 'react';
import { useAuth } from '../store/UserContext';

function ProtectedComponent({ children, users }) {
    const {userData} = useAuth()
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const isValid = (userData) => {
            const tokenValidity = new Date(userData.exp * 1000) // * 1000 to convert into milliseconds
            const now = new Date()
            return tokenValidity >= now
        }

        const getUserDetails = async () => {
            if (userData && isValid(userData) && (users ? users.includes(userData.role) : true)) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        getUserDetails()
    }, [userData, users])

    return (
        <>
            {isVisible && children}
        </>
    )
}

export default ProtectedComponent