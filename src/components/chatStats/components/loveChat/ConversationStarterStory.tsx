import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'conversation-starter';

interface ConversationStarterStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const ConversationStarterStory: React.FC<ConversationStarterStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const starter = 'most_conversation_starts' in analysis
    ? analysis.most_conversation_starts
    : chat.participants[0];
  const { t } = useTranslation();

  const renderContent = () => (
    <LinearGradient
      colors={['#cf9a0a', '#b38405']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.conversationStarter.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/conversationStart.jpg')}
            style={styles.starterImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.statBox}>
          <Text style={styles.nameText}>{starter}</Text>
        </View>
      </View>
      
      <Text style={styles.footer}>
        {t('statistics.stories.conversationStarter.footer')}
      </Text>
    </LinearGradient>
  );

  const message = starter
    ? `${starter} ${t('statistics.stories.conversationStarter.mostStarts')}! ${t('statistics.stories.conversationStarter.takingFirstStep')} 💫`
    : t('statistics.stories.conversationStarter.noData');

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.conversationStarter.title')}
      message={message}
    >
      {renderContent()}
    </ViewShotContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 30,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starterImage: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  statBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  nameText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#b38405',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 18,
    color: '#b38405',
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
  shareButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 'auto',
  },
  shareButtonText: {
    color: '#b38405',
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