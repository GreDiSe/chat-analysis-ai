import { useState, useEffect } from 'react';
import { Story } from '../types/story';

interface UseGuideTimerProps {
    currentStory?: Story | null;
    isActive: boolean;
}

interface UseGuideTimerReturn {
  timeLeft: number;
  canProceed: boolean;
  isTimerActive: boolean;
}

export const useGuideTimer = ({ currentStory, isActive }: UseGuideTimerProps): UseGuideTimerReturn => {
  const withTimer = currentStory?.withTimer || 0;
  const [timeLeft, setTimeLeft] = useState(withTimer || 0);
  const [isTimerActive, setIsTimerActive] = useState(!!withTimer);
  const [canProceed, setCanProceed] = useState(!withTimer);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    if(ids.includes(currentStory?.id || '')) {
        setIsTimerActive(false);
        setCanProceed(true);
        setTimeLeft(0);
        return;
    }

    setIsTimerActive(!!withTimer);
    setCanProceed(!withTimer);
    setTimeLeft(withTimer || 0);
  }, [currentStory]);

  useEffect(() => {
    if(ids.includes(currentStory?.id || '')) {
        return;
    }

    if (withTimer && isActive && isTimerActive) {
      setTimeLeft(withTimer);
      setCanProceed(false);

      const timer = setTimeout(() => {
        setCanProceed(true);
        setIsTimerActive(false);
        setIds((prev) => [...prev, currentStory?.id || '']);
      }, withTimer * 1000);
      
      // Update countdown every second
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isActive, isTimerActive, withTimer]);

  return {
    timeLeft,
    canProceed,
    isTimerActive
  };
}; 