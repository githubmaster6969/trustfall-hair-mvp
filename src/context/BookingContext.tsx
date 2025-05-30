import { createContext, useContext, useState, ReactNode } from "react";

interface Photos {
  front: string;
  side: string;
  back?: string;
  top?: string;
}

interface HairProfile {
  type: string;
  shape: string;
  length: string;
  texture?: string;
}

interface Preferences {
  date: Date | undefined;
  times: string[];
  radius: number;
  isFlexible: boolean;
}

interface Professional {
  id: string;
  name: string;
  avatar: string;
  services: Array<{
    name: string;
    price: number;
    duration: string;
  }>;
  distance: number;
}

interface BookingData {
  name: string;
  email: string;
  location: string;
  photos: Photos;
  hairProfile: HairProfile;
  preferences: Preferences;
  selectedPro?: Professional;
  selectedService?: {
    name: string;
    price: number;
    duration: string;
  };
}

interface BookingContextType {
  bookingData: BookingData;
  setBookingData: (data: Partial<BookingData>) => void;
  updatePhotos: (photos: Partial<Photos>) => void;
  updateHairProfile: (profile: Partial<HairProfile>) => void;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  selectProfessional: (pro: Professional) => void;
  selectService: (service: { name: string; price: number; duration: string }) => void;
  resetBooking: () => void;
}

const defaultBookingData: BookingData = {
  name: "",
  email: "",
  location: "",
  photos: {
    front: "",
    side: "",
  },
  hairProfile: {
    type: "",
    shape: "",
    length: "",
  },
  preferences: {
    date: undefined,
    times: [],
    radius: 5,
    isFlexible: false,
  },
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingDataState] = useState<BookingData>(defaultBookingData);

  const setBookingData = (data: Partial<BookingData>) => {
    setBookingDataState(prev => ({
      ...prev,
      ...data,
    }));
  };

  const updatePhotos = (photos: Partial<Photos>) => {
    setBookingDataState(prev => ({
      ...prev,
      photos: {
        ...prev.photos,
        ...photos,
      },
    }));
  };

  const updateHairProfile = (profile: Partial<HairProfile>) => {
    setBookingDataState(prev => ({
      ...prev,
      hairProfile: {
        ...prev.hairProfile,
        ...profile,
      },
    }));
  };

  const updatePreferences = (prefs: Partial<Preferences>) => {
    setBookingDataState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...prefs,
      },
    }));
  };

  const selectProfessional = (pro: Professional) => {
    setBookingDataState(prev => ({
      ...prev,
      selectedPro: pro,
    }));
  };

  const selectService = (service: { name: string; price: number; duration: string }) => {
    setBookingDataState(prev => ({
      ...prev,
      selectedService: service,
    }));
  };

  const resetBooking = () => {
    setBookingDataState(defaultBookingData);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        updatePhotos,
        updateHairProfile,
        updatePreferences,
        selectProfessional,
        selectService,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}