import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'desire-level';

interface DesireLevelStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'mutual_desire_score' in analysis;
};

export const DesireLevelStory: React.FC<DesireLevelStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const desireLevels = analysis.mutual_desire_score;
  const participants = Object.entries(desireLevels).map(([name, level]) => ({
    name,
    level: Math.round(level * 100),
  }));

  const renderContent = () => (
    <LinearGradient
      colors={['#E91E63', '#C2185B']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.desireLevel.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/desire.jpg')}
            style={styles.desireImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.statsContainer}>
          {participants.map((participant) => (
            <View key={participant.name} style={styles.statBox}>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{participant.name}</Text>
                <Text style={styles.percentageText}>{participant.level}{t('statistics.stories.desireLevel.percentage')}</Text>
              </View>
              <View style={styles.barContainer}>
                <View style={[styles.bar, { width: `${participant.level}%` }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <Text style={styles.footer}>
        {t('statistics.stories.desireLevel.footer')}
      </Text>
    </LinearGradient>
  );

  const message = participants.length > 0
    ? `${t('statistics.stories.desireLevel.mutualDesire')}: ${participants.map(p => `${p.name}: ${p.level}${t('statistics.stories.desireLevel.percentage')}`).join(', ')} ❤️`
    : t('statistics.stories.desireLevel.noData');

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.desireLevel.title')}
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
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desireImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    gap: 15,
  },
  statBox: {
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  percentageText: {
    fontSize: 16,
    color: '#E91E63',
    fontWeight: '600',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#E91E63',
    borderRadius: 4,
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
    color: '#E91E63',
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