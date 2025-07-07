import { RefObject } from 'react';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { safeLogEvent } from '../utils/analytics';

interface ShareStoryOptions {
  title: string;
  message: string;
  storyKey: string;
}

const MINIMUM_SHARE_TIME = 6000; 

export const shareStory = async (
  viewShotRef: RefObject<ViewShot & { capture: () => Promise<string> }>,
  options: ShareStoryOptions
): Promise<{ success: boolean }> => {
  const startTime = Date.now();

  await safeLogEvent('share_story_started', {
    story_title: options.title,
    story_key: options.storyKey
  });
  
  try {
    const uri = await viewShotRef.current?.capture();
    if (uri) {
      const shareOptions = {
        title: options.title,
        message: options.message,
        url: uri,
        type: 'image/jpeg',
      };
      await Share.open(shareOptions);

      const endTime = Date.now();
      const shareDuration = endTime - startTime;

      // Return success false if completed before 5 seconds
      if (shareDuration < MINIMUM_SHARE_TIME) {
        await safeLogEvent('share_story_failed_too_quickly', {
          story_title: options.title,
          story_key: options.storyKey,
          share_duration_ms: shareDuration
        });
        console.log(`Share completed too quickly: ${shareDuration}ms (minimum: ${MINIMUM_SHARE_TIME}ms)`);
        return { success: false };
      } else {
        await safeLogEvent('share_story_completed', {
          story_title: options.title,
          story_key: options.storyKey,
          share_duration_ms: shareDuration
        });
      }

      return { success: true };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sharing:', error);
    const endTime = Date.now();
    const shareDuration = endTime - startTime;

    if (shareDuration < MINIMUM_SHARE_TIME) {
      await safeLogEvent('share_story_failed_too_quickly', {
        story_title: options.title,
        story_key: options.storyKey,
        share_duration_ms: shareDuration
      });
      console.log(`Share completed too quickly: ${shareDuration}ms (minimum: ${MINIMUM_SHARE_TIME}ms)`);
      return { success: false };
    } else {
      await safeLogEvent('share_story_completed', {
        story_title: options.title,
        story_key: options.storyKey,
        share_duration_ms: shareDuration
      });
    }

    return { success: true };
  }
}; 