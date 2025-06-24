import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'interest-level';

interface InterestLevelStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const InterestLevelStory: React.FC<InterestLevelStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  const interestLevels = 'interest_level' in analysis ? analysis.interest_level || {} : {};
  const participants = Object.entries(interestLevels).map(([name, level]) => ({
    name,
    level: Math.round(level as number * 100),
  }));

  const message = participants.length > 0
    ? `Interest levels in the conversation: ${participants.map(p => `${p.name}: ${p.level}%`).join(', ')} 💫`
    : t('statistics.stories.interestLevel.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.interestLevel.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#4CAF50', '#388E3C']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.interestLevel.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/levelOfInterest.jpg')}
              style={styles.interestImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {participants.map((participant) => (
              <View key={participant.name} style={styles.statBox}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{participant.name}</Text>
                  <Text style={styles.percentageText}>{participant.level}%</Text>
                </View>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { width: `${participant.level}%` }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.interestLevel.footer')}
        </Text>
      </LinearGradient>
    </ViewShotContainer>
  );
};

const styles = StyleSheet.create({
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
  interestImage: {
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
    color: '#4CAF50',
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
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 