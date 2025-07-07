import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'laugh-together';

interface LaughTogetherStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'laugh_together_count' in analysis;
};

export const LaughTogetherStory: React.FC<LaughTogetherStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const laughCount = analysis.laugh_together_count;

  const renderContent = () => (
    <LinearGradient
      colors={['#26A69A', '#00897B']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.laughTogether.title')}</Text>

      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../../../assets/images/feature-images/laugh.jpg')}
          style={styles.laughImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.resultCard}>
        {laughCount > 0 ? (
          <Text style={styles.countText}>{laughCount} {t('statistics.stories.laughTogether.times')}</Text>
        ) : (
          <Text style={styles.noDataText}>{t('statistics.stories.laughTogether.noData')}</Text>
        )}
      </View>

      <Text style={styles.footer}>
        {t('statistics.stories.laughTogether.footer')}
      </Text>
    </LinearGradient>
  );

  const message = laughCount > 0
    ? `${t('statistics.stories.laughTogether.title')}: ${laughCount} 😄`
    : t('statistics.stories.laughTogether.noData');

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.laughTogether.title')}
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
    marginBottom: 24,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 32,
    marginBottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  laughImage: {
    width: 300,
    height: 300,
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
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00897B',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00897B',
    textAlign: 'center',
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
    color: '#00897B',
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