import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'i-love-you';

interface ILoveYouStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'i_love_you_count' in analysis;
};

export const ILoveYouStory: React.FC<ILoveYouStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const loveCounts = Object.entries(analysis.i_love_you_count)
    .map(([name, count]) => ({
      name,
      count: count as number
    }))
    .sort((a, b) => b.count - a.count);

  const totalCount = loveCounts.reduce((sum, person) => sum + person.count, 0);
  const maxCount = Math.max(...loveCounts.map(p => p.count));

  const message = totalCount > 0
    ? `${loveCounts.map(p => `${p.name}: ${p.count} times`).join(', ')} ❤️`
    : t('statistics.stories.iLoveYou.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.iLoveYou.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#FF4081', '#E91E63']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.iLoveYou.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/ILoveYouCount.jpg')}
              style={styles.loveImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {totalCount > 0 ? (
              loveCounts.map((person) => (
                <View key={person.name} style={styles.statBox}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{person.name}</Text>
                    <Text style={styles.countText}>{person.count} times</Text>
                  </View>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.bar, 
                        { width: `${(person.count / maxCount) * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noDataBox}>
                <Text style={styles.noDataText}>
                  {t('statistics.stories.iLoveYou.noData')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.iLoveYou.footer')}
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
  loveImage: {
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
    color: '#FF4081',
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
    backgroundColor: '#FF4081',
    borderRadius: 4,
  },
  noDataBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4081',
    marginBottom: 5,
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