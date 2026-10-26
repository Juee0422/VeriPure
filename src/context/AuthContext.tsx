import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserHealthProfile, HealthCondition } from '../types';

interface AuthContextType {
  user: UserHealthProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, conditions?: HealthCondition[]) => void;
  signup: (name: string, email: string, conditions: HealthCondition[]) => void;
  logout: () => void;
  switchDemoProfile: (profileType: 'diabetic' | 'fitness' | 'allergy' | 'general') => void;
  updateUserConditions: (conditions: HealthCondition[]) => void;
}

const DEMO_PROFILES: Record<string, UserHealthProfile> = {
  diabetic: {
    id: 'user-diabetic',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    activeConditions: ['diabetic', 'low_sodium'],
    dailyCalorieTarget: 1800,
    maxSugarPerServing: 10,
    maxSodiumPerServing: 300,
    allergensList: [],
    notes: 'Type-2 Diabetic, monitoring glycemic spikes and sodium.'
  },
  fitness: {
    id: 'user-fitness',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    activeConditions: ['muscle_gain'],
    dailyCalorieTarget: 2800,
    maxSugarPerServing: 25,
    maxSodiumPerServing: 800,
    allergensList: [],
    notes: 'Hypertrophy resistance training, aiming for 160g+ daily protein.'
  },
  allergy: {
    id: 'user-allergy',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    activeConditions: ['nut_allergy', 'gluten_free', 'vegan'],
    dailyCalorieTarget: 2000,
    maxSugarPerServing: 18,
    maxSodiumPerServing: 400,
    allergensList: ['Peanuts', 'Tree Nuts', 'Hazelnuts', 'Almonds', 'Wheat', 'Dairy'],
    notes: 'Severe tree nut anaphylaxis & celiac disease. Strict 100% plant-based.'
  },
  general: {
    id: 'user-general',
    name: 'Jordan Lee',
    email: 'jordan.lee@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    activeConditions: ['hypertension'],
    dailyCalorieTarget: 2100,
    maxSugarPerServing: 20,
    maxSodiumPerServing: 350,
    allergensList: [],
    notes: 'Managing borderline hypertension, watches salt & stimulants.'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'veripure_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserHealthProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    // Default to Sarah (Diabetic & Low Sodium) for rich initial feedback
    return DEMO_PROFILES.diabetic;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = (email: string, name?: string, conditions: HealthCondition[] = ['diabetic']) => {
    const newUser: UserHealthProfile = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      activeConditions: conditions,
      dailyCalorieTarget: 2000,
      maxSugarPerServing: 15,
      maxSodiumPerServing: 400,
      allergensList: []
    };
    setUser(newUser);
  };

  const signup = (name: string, email: string, conditions: HealthCondition[]) => {
    login(email, name, conditions);
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoProfile = (profileType: 'diabetic' | 'fitness' | 'allergy' | 'general') => {
    setUser(DEMO_PROFILES[profileType] || DEMO_PROFILES.diabetic);
  };

  const updateUserConditions = (conditions: HealthCondition[]) => {
    if (!user) return;
    setUser({
      ...user,
      activeConditions: conditions
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        switchDemoProfile,
        updateUserConditions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
