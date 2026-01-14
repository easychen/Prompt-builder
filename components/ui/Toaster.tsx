import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ToastContextType = {
  toast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const Toaster: React.FC = () => {
    // This component is actually just the provider in this simplified logic, 
    // but typically Toaster renders the portal. 
    // We will cheat slightly and put logic in the AppProvider or export a hook + component.
    // For specific structure requirements, I'll return null here and handle rendering in the hook's returned layout 
    // or just render fixed list here if accessible.
    // Let's implement a listener pattern or simple state.
    
    // To match the App.tsx usage:
    return <ToastContainer />;
};

// Internal State for Toast
let toastListener: ((msg: string) => void) | null = null;

const ToastContainer = () => {
    const [msgs, setMsgs] = useState<{id: number, text: string}[]>([]);

    useEffect(() => {
        toastListener = (text: string) => {
            const id = Date.now();
            setMsgs(prev => [...prev, { id, text }]);
            setTimeout(() => {
                setMsgs(prev => prev.filter(m => m.id !== id));
            }, 3000);
        };
        return () => { toastListener = null; };
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            {msgs.map(m => (
                <div key={m.id} className="bg-surfaceHighlight border border-border text-textMain px-4 py-2 rounded shadow-lg text-sm animate-fade-in-up">
                    {m.text}
                </div>
            ))}
        </div>
    );
};

export const useToast = () => {
    return {
        toast: (message: string) => {
            if (toastListener) toastListener(message);
        }
    };
};