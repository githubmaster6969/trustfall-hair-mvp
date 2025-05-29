import React, { createContext, useContext, useState } from 'react';

interface Schedule {
  radius: number;
  date: Date | null;
  time: string | null;
}

interface BookingState {
  images: string[];
  hairType: 'straight' | 'wavy' | 'curly' | 'coily' | null;
  length: 'short' | 'medium' | 'long' | null;
  faceShape: 'oval' | 'round' | 'square' | 'heart' | 'diamond' | null;
  description: string;
  reference: string;
  schedule: Schedule;
  selectedPro: string | null;
}

interface BookingContextType {
  bookingData: BookingState;
  setBookingData: React.Dispatch<React.SetStateAction<BookingState>>;
  updateBooking: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
}

const defaultBookingState: BookingState = {
  images: [],
  hairType: null,
  length: null,
  faceShape: null,
  description: '',
  reference: '',
  schedule: {
    radius: 5,
    date: null,
    time: null
  },
  selectedPro: null
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingData, setBookingData] = useState<BookingState>(defaultBookingState);

  const updateBooking = (updates: Partial<BookingState>) => {
    setBookingData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetBooking = () => {
    setBookingData(defaultBookingState);
  };

  return (
    <BookingContext.Provider value={{ 
      bookingData, 
      setBookingData, 
      updateBooking,
      resetBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};