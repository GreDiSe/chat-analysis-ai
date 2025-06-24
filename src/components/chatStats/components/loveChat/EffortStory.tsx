import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'effort';

interface EffortStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const EffortStory: React.FC<EffortStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  const mostEffortPerson = 'most_effort' in analysis ? analysis.most_effort : undefined;

  const renderContent = () => (
    <LinearGradient
      colors={['#673AB7', '#512DA8']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.effortStory.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/moreEffort.jpg')}
            style={styles.effortImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.resultContainer}>
          {mostEffortPerson ? (
            <View style={styles.resultBox}>
              <Text style={styles.nameText}>{mostEffortPerson}</Text>
              <Text style={styles.descriptionText}>{t('statistics.stories.effortStory.contributes')}</Text>
            </View>
          ) : (
            <View style={styles.resultBox}>
              <Text style={styles.balancedText}>{t('statistics.stories.effortStory.equalEffort')}</Text>
              <Text style={styles.descriptionText}>{t('statistics.stories.effortStory.bothEqual')}</Text>
            </View>
          )}
        </View>
      </View>
      
      <Text style={styles.footer}>
        {t('statistics.stories.effortStory.footer')}
      </Text>
    </LinearGradient>
  );

  const message = mostEffortPerson
    ? `${mostEffortPerson} ${t('statistics.stories.effortStory.moreEffort')}! 💪`
    : t('statistics.stories.effortStory.noData');

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.effortStory.title')}
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
  effortImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  resultContainer: {
    width: '100%',
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
    color: '#673AB7',
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
    color: '#673AB7',
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