import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'top-topics';

interface TopicsStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const TopicsStory: React.FC<TopicsStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  const renderContent = () => (
    <LinearGradient
      colors={['#2196F3', '#1976D2']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.topics.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/topics.jpg')}
            style={styles.topicsImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.statsContainer}>
          {analysis.top_3_topics.map((topic, index) => (
            <View key={topic} style={styles.statBox}>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{t('statistics.stories.topics.rankPrefix')}{index + 1}</Text>
              </View>
              <View style={styles.topicContainer}>
                <Text style={styles.topicText} numberOfLines={2}>{topic}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <Text style={styles.footer}>
        {t('statistics.stories.topics.footer')}
      </Text>
    </LinearGradient>
  );

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.topics.title')}
      message={`Our top 3 conversation topics: ${analysis.top_3_topics.join(', ')}! 🗣️`}
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
    padding: 20,
    paddingHorizontal: 40,
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
  topicsImage: {
    width: 230,
    height: 230,
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
    alignItems: 'center',
    minHeight: 70,
  },
  rankContainer: {
    backgroundColor: '#2196F3',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topicContainer: {
    flex: 1,
    maxWidth: '100%',
  },
  topicText: {
    fontSize: 16,
    color: '#2196F3',
    lineHeight: 22,
    flexShrink: 1,
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
    color: '#2196F3',
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