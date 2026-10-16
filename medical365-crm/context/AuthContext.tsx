'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'Superadmin' | 'Sales' | 'Telecaller';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarInitials: string;
  department: string;
  badgeColor: { bg: string; text: string; border: string };
}

export const DEMO_USERS: Record<string, UserProfile & { passwordHash: string }> = {
  'superadmin@medical365.in': {
    id: 'USR-SA',
    name: 'Dr. Rajesh V. (Superadmin)',
    email: 'superadmin@medical365.in',
    role: 'Superadmin',
    avatarInitials: 'SA',
    department: 'Hospital Board & Administration',
    badgeColor: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    passwordHash: 'superadmin123'
  },
  'admin@medical365.in': {
    id: 'USR-SA-ALIAS',
    name: 'Dr. Rajesh V. (Superadmin)',
    email: 'admin@medical365.in',
    role: 'Superadmin',
    avatarInitials: 'SA',
    department: 'Hospital Board & Administration',
    badgeColor: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    passwordHash: 'admin123'
  },
  'sales@medical365.in': {
    id: 'USR-SL',
    name: 'Vikram Malhotra',
    email: 'sales@medical365.in',
    role: 'Sales',
    avatarInitials: 'SL',
    department: 'Corporate & Surgical Sales',
    badgeColor: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    passwordHash: 'sales123'
  },
  'telecaller@medical365.in': {
    id: 'USR-TC',
    name: 'Pooja Sharma',
    email: 'telecaller@medical365.in',
    role: 'Telecaller',
    avatarInitials: 'TC',
    department: 'Patient Inbound & Calling Desk',
    badgeColor: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    passwordHash: 'telecaller123'
  }
};

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password?: string) => boolean;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'medical365_crm_auth_user_v2';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USERS['superadmin@medical365.in']);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        setUser(DEMO_USERS['superadmin@medical365.in']);
      }
    } catch {
      setUser(DEMO_USERS['superadmin@medical365.in']);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const login = (email: string, password?: string): boolean => {
    const cleanEmail = email.toLowerCase().trim();
    const foundUser = DEMO_USERS[cleanEmail];
    if (foundUser) {
      if (!password || password === foundUser.passwordHash) {
        const profile: UserProfile = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          avatarInitials: foundUser.avatarInitials,
          department: foundUser.department,
          badgeColor: foundUser.badgeColor
        };
        setUser(profile);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
        return true;
      }
    }

    // Role-based matching keyword in email
    if (cleanEmail.includes('superadmin') || cleanEmail.includes('admin')) {
      return login('superadmin@medical365.in', 'superadmin123');
    }
    if (cleanEmail.includes('sales')) {
      return login('sales@medical365.in', 'sales123');
    }
    if (cleanEmail.includes('telecaller') || cleanEmail.includes('calling')) {
      return login('telecaller@medical365.in', 'telecaller123');
    }

    return false;
  };

  const loginAsRole = (role: UserRole) => {
    if (role === 'Superadmin') login('superadmin@medical365.in', 'superadmin123');
    else if (role === 'Sales') login('sales@medical365.in', 'sales123');
    else if (role === 'Telecaller') login('telecaller@medical365.in', 'telecaller123');
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsRole, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
