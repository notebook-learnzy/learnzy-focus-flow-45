
import { useState, useEffect } from 'react';
import { SM2Data, calculateSM2, getNextSet } from '@/utils/sm2Algorithm';

interface UseSM2DataReturn {
  getSM2Data: (chapterId: string, setId: string) => SM2Data | null;
  updateSM2Data: (chapterId: string, setId: string, accuracy: number) => SM2Data;
  getNextSetData: (chapterId: string, currentSet: string) => { nextSet: string | null; nextDate: Date | null };
  getAllChapterProgress: (chapterId: string) => Record<string, SM2Data>;
}

export function useSM2Data(): UseSM2DataReturn {
  const [sm2Storage, setSM2Storage] = useState<Record<string, Record<string, SM2Data>>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('sm2-data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        Object.keys(parsed).forEach(chapterId => {
          Object.keys(parsed[chapterId]).forEach(setId => {
            parsed[chapterId][setId].lastReviewed = new Date(parsed[chapterId][setId].lastReviewed);
            parsed[chapterId][setId].nextReview = new Date(parsed[chapterId][setId].nextReview);
          });
        });
        setSM2Storage(parsed);
      } catch (error) {
        console.error('Error parsing SM2 data from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('sm2-data', JSON.stringify(sm2Storage));
  }, [sm2Storage]);

  const getSM2Data = (chapterId: string, setId: string): SM2Data | null => {
    return sm2Storage[chapterId]?.[setId] || null;
  };

  const updateSM2Data = (chapterId: string, setId: string, accuracy: number): SM2Data => {
    const previousData = getSM2Data(chapterId, setId) || {};
    const newData = calculateSM2({ ...previousData, set: setId }, accuracy);
    
    setSM2Storage(prev => ({
      ...prev,
      [chapterId]: {
        ...prev[chapterId],
        [setId]: newData
      }
    }));
    
    return newData;
  };

  const getNextSetData = (chapterId: string, currentSet: string) => {
    const nextSet = getNextSet(currentSet);
    if (!nextSet) return { nextSet: null, nextDate: null };
    
    const nextSetData = getSM2Data(chapterId, nextSet);
    return {
      nextSet,
      nextDate: nextSetData?.nextReview || null
    };
  };

  const getAllChapterProgress = (chapterId: string): Record<string, SM2Data> => {
    return sm2Storage[chapterId] || {};
  };

  return {
    getSM2Data,
    updateSM2Data,
    getNextSetData,
    getAllChapterProgress
  };
}
