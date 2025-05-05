import { createContext, useState, useEffect, useContext } from "react";
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { supabase } from "../lib/supabase";

type AuthData = {
    loading: boolean;
    session: Session | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthData>({
    loading: true,
    session: null,
    signIn: async () => {},
    signOut: async () => {},
});

interface Props {
    children: React.ReactNode;
}

export default function AuthProvider(props: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>(null);

    
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Error signing in:", error);
            throw error;
        }

        if (data.session) {
            setSession(data.session);
            console.log("User signed in successfully");
        } else {
            console.log("No user returned from sign in");
            throw new Error("No se pudo iniciar sesión");
        }
    };

    
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error("Error getting session:", error);
                }
                
                setSession(data.session);
                setLoading(false);
            } catch (e) {
                console.error("Error checking session:", e);
                setLoading(false);
            }
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
            console.log("Auth state changed:", event);
            setSession(newSession);
            
            if (event === 'SIGNED_IN' && newSession) {
                router.replace('/');
            } else if (event === 'SIGNED_OUT') {
                router.replace('/login');
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                loading, 
                session,
                signIn,
                signOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);