import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'words-per-message';

interface WordsPerMessageStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const WordsPerMessageStory: React.FC<WordsPerMessageStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  // Sort participants by words per message
  const wordsPerMessage = 'average_words_per_message' in analysis
    ? Object.entries(analysis.average_words_per_message || {})
        .map(([name, count]) => ({
          name,
          count: Math.round(count as number)
        }))
        .sort((a, b) => b.count - a.count)
    : [];

  const mostVerbose = wordsPerMessage[0];

  const renderContent = () => (
    <LinearGradient
      colors={['#4CAF50', '#81C784']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.wordsPerMessage.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/wordsUsing.jpg')}
            style={styles.wordsImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.statsContainer}>
          {wordsPerMessage.map((participant) => (
            <View key={participant.name} style={styles.statBox}>
              <Text style={styles.nameText}>{participant.name}</Text>
              <Text style={styles.countText}>
                {participant.count} {t('statistics.stories.wordsPerMessage.wordsText')}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
      <Text style={styles.footer}>
        {t('statistics.stories.wordsPerMessage.footer')}
      </Text>
    </LinearGradient>
  );

  const message = `${mostVerbose.name} ${t('statistics.stories.wordsPerMessage.averageWords')} ${mostVerbose.count} ${t('statistics.stories.wordsPerMessage.wordsText')}! 📝`;

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.wordsPerMessage.title')}
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
    borderRadius: 20,
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
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordsImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    gap: 15,
  },
  statBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },
  countText: {
    fontSize: 18,
    color: '#4CAF50',
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
    color: '#4CAF50',
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