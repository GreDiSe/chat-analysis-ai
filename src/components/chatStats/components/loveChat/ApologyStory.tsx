import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'apologies';

interface ApologyStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'apology_count' in analysis;
};

export const ApologyStory: React.FC<ApologyStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const apologies = Object.entries(analysis.apology_count)
    .map(([name, count]) => ({
      name,
      count: count as number
    }))
    .sort((a, b) => b.count - a.count);

  const totalApologies = apologies.reduce((sum, person) => sum + person.count, 0);

  const message = totalApologies > 0
    ? `${apologies.map(p => `${p.name}: ${p.count} ${t('statistics.stories.apology.timesText')}`).join(', ')} 🌱`
    : t('statistics.stories.apology.noApologies');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.apology.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#009688', '#00796B']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.apology.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/saySorry.jpg')}
              style={styles.apologyImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {totalApologies > 0 ? (
              apologies.map((person) => (
                <View key={person.name} style={styles.statBox}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{person.name}</Text>
                    <Text style={styles.countText}>
                      {person.count} {t('statistics.stories.apology.timesText')}
                    </Text>
                  </View>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.bar, 
                        { width: `${(person.count / Math.max(...apologies.map(p => p.count))) * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noApologiesBox}>
                <Text style={styles.noApologiesText}>
                  {t('statistics.stories.apology.noApologies')}
                </Text>
                <Text style={styles.descriptionText}>
                  {t('statistics.stories.apology.smoothFlow')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.apology.footer')}
        </Text>
      </LinearGradient>
    </ViewShotContainer>
  );
};

const styles = StyleSheet.create({
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
  apologyImage: {
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
  countText: {
    fontSize: 16,
    color: '#009688',
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
    backgroundColor: '#009688',
    borderRadius: 4,
  },
  noApologiesBox: {
    alignItems: 'center',
    paddingVertical: 20,
    textAlign: 'center',
  },
  noApologiesText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
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