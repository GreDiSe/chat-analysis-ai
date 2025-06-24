import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'manipulation';

interface ManipulationStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'most_manipulative' in analysis && 'lies_detected' in analysis;
};

export const ManipulationStory: React.FC<ManipulationStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const manipulator = analysis.most_manipulative;
  const liesData = Object.entries(analysis.lies_detected)
    .map(([name, count]) => ({
      name,
      count: count as number
    }))
    .sort((a, b) => b.count - a.count);

  const message = manipulator 
    ? `${manipulator} ${t('statistics.stories.manipulation.moreLeading')} 🤔`
    : t('statistics.stories.manipulation.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.manipulation.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#9C27B0', '#7B1FA2']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.manipulation.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/manipulation.jpg')}
              style={styles.manipulationImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {manipulator ? (
              <View style={styles.resultBox}>
                <Text style={styles.nameText}>{manipulator}</Text>
                <Text style={styles.descriptionText}>
                  {t('statistics.stories.manipulation.moreLeading')}
                </Text>
              </View>
            ) : (
              <View style={styles.resultBox}>
                <Text style={styles.balancedText}>
                  {t('statistics.stories.manipulation.balanced')}
                </Text>
                <Text style={styles.descriptionText}>
                  {t('statistics.stories.manipulation.noData')}
                </Text>
              </View>
            )}

            <View style={styles.liesContainer}>
              <Text style={styles.liesTitle}>
                {t('statistics.stories.manipulation.liesTitle')}
              </Text>
              {liesData.map((data) => (
                <View key={data.name} style={styles.lieStatBox}>
                  <Text style={styles.lieNameText}>{data.name}</Text>
                  <Text style={styles.lieCountText}>{data.count}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.manipulation.footer')}
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
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
  manipulationImage: {
    width: 220,
    height: 220,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    gap: 20,
  },
  resultBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: 5,
  },
  balancedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  liesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 15,
  },
  liesTitle: {
    fontSize: 16,
    color: '#9C27B0',
    marginBottom: 10,
    fontWeight: '600',
  },
  lieStatBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  lieNameText: {
    fontSize: 16,
    color: '#333',
  },
  lieCountText: {
    fontSize: 16,
    color: '#9C27B0',
    fontWeight: '600',
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 