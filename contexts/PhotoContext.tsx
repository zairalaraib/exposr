import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PhotoData {
  uri: string;
  base64?: string;
  width?: number;
  height?: number;
}

interface PhotoContextType {
  photo: PhotoData | null;
  setPhoto: (photo: PhotoData | null) => void;
  clearPhoto: () => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [photo, setPhoto] = useState<PhotoData | null>(null);

  const clearPhoto = () => setPhoto(null);

  return (
    <PhotoContext.Provider value={{ photo, setPhoto, clearPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhoto() {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
}

