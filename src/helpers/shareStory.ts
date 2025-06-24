import { RefObject } from 'react';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { safeLogEvent } from '../utils/analytics';

interface ShareStoryOptions {
  title: string;
  message: string;
  storyKey: string;
}

export const shareStory = async (
  viewShotRef: RefObject<ViewShot & { capture: () => Promise<string> }>,
  options: ShareStoryOptions
): Promise<{ success: boolean }> => {
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

      await safeLogEvent('share_story_completed', {
        story_title: options.title,
        story_key: options.storyKey
      });

      return { success: true };
    }

    // await safeLogEvent('share_story_failed', {
    //   story_title: options.title,
    //   story_key: options.storyKey
    // });

    // return { success: false };

    return { success: true };
  } catch (error) {
    console.error('Error sharing:', error);
    // await safeLogEvent('share_story_failed', {
    //   story_title: options.title,
    //   story_key: options.storyKey
    // });
    // return { success: false };

    return { success: true };
  }
}; 