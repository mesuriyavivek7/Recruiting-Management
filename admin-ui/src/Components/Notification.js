import React ,{useEffect,useState} from 'react'

export default function Notification({ message, type, onClose }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true)
        // Automatically close the notification after 3 seconds
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 600); // Wait for fade-out to complete
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-8 right-8 z-50 max-w-xs px-4 py-2 shadow-lg text-white mb-4 transition-opacity duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'} ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
            {message}
        </div>
    );
}
