import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { shareStory } from '../../helpers/shareStory';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../../store/slices/chatSlice';
import { StatisticType } from '../../utils/storyTypes';
import { AppDispatch, RootState } from '@store';
import { Chat } from '../../types/chat';

interface ViewShotContainerProps {
  children: React.ReactNode;
  chat: Chat;
  statisticType: StatisticType;
  title: string;
  message: string;
  handleShareCallback: () => void;
  shareButtonText?: string;
}

export const ViewShotContainer: React.FC<ViewShotContainerProps> = ({
  children,
  chat,
  statisticType,
  title,
  message,
  handleShareCallback,
  shareButtonText
}) => {
  const viewShotRef = useRef<ViewShot & { capture: () => Promise<string> }>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isSharing, setIsSharing] = useState(false);
  const sharedStatisticTypeFromSharePopup = useSelector((state: RootState) => state.chatReducer.sharedStatisticTypeFromSharePopup);

  useEffect(() => {
    if (sharedStatisticTypeFromSharePopup && statisticType === sharedStatisticTypeFromSharePopup) {
      handleShare();
      dispatch(chatActions.setSharedStatisticTypeFromSharePopup(null));
    }
  }, [sharedStatisticTypeFromSharePopup, statisticType]);

  const handleShare = async () => {
    handleShareCallback();
    setIsSharing(true);
    
    // Small delay to ensure the promotional text is rendered before screenshot
    setTimeout(async () => {
      const result = await shareStory(viewShotRef, {
        title,
        message: `${message} ${t('statistics.common.promotionalText')}`,
        storyKey: statisticType
      });

      if (result?.success) {
        dispatch(chatActions.addSharedChat(chat.id));
        dispatch(chatActions.hideShareOverlay());
      } else {
        dispatch(chatActions.setIsShareFailed(true));
      }
      
      // Hide the promotional text after screenshot
      setIsSharing(false);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <ViewShot 
        style={styles.container} 
        ref={viewShotRef} 
        options={{ format: 'jpg', quality: 0.9 }}
      >
        <View style={styles.contentContainer}>
          {children}
          {isSharing && (
            <View style={styles.promotionalContainer}>
              <View style={styles.promotionalContent}>
                <Image 
                  source={require('../../../assets/icons/Logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.promotionalText}>
                  {t('statistics.common.promotionalText')}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ViewShot>

      {!isSharing && <View style={styles.shareButtonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>
            {shareButtonText || t('statistics.common.share')}
          </Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  promotionalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  promotionalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logo: {
    width: 45,
    height: 45,
  },
  promotionalText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  shareButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 'auto',
  },
  shareButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  shareButtonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 