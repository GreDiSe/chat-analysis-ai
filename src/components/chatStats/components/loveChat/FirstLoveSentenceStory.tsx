import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'first-love-sentence';

interface FirstLoveSentenceStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'first_love_sentence' in analysis;
};

export const FirstLoveSentenceStory: React.FC<FirstLoveSentenceStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const firstLoveSentence = analysis.first_love_sentence;

  const message = firstLoveSentence
    ? `${t('statistics.stories.firstLove.title')}: "${firstLoveSentence}" 💕`
    : t('statistics.stories.firstLove.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.firstLove.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#F06292', '#EC407A']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.firstLove.title')}</Text>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/firstLoveWord.jpg')}
            style={styles.loveImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.resultCard}>
          {firstLoveSentence ? (
              <Text style={styles.sentenceText}>
                "{firstLoveSentence}"
              </Text>
          ) : (
            <Text style={styles.noDataText}>{t('statistics.stories.firstLove.noData')}</Text>
          )}
        </View>

        <Text style={styles.footer}>
          {t('statistics.stories.firstLove.footer')}
        </Text>
      </LinearGradient>
    </ViewShotContainer>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 30,
    marginBottom: 24,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loveImage: {
    width: 270,
    height: 270,
    borderRadius: 20,
  },
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 'auto',
  },
  sentenceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EC407A',
    textAlign: 'center',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EC407A',
    textAlign: 'center',
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 