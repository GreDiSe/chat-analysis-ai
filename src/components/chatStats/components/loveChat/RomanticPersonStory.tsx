import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'romantic-person';

interface RomanticPersonStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'most_romantic' in analysis;
};

export const RomanticPersonStory: React.FC<RomanticPersonStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const romanticPerson = analysis.most_romantic;

  const message = romanticPerson
    ? `${t('statistics.stories.romanticPerson.title')}: ${romanticPerson} 💝`
    : t('statistics.stories.romanticPerson.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.romanticPerson.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#EC407A', '#D81B60']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.romanticPerson.title')}</Text>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/feature-images/hearts.jpg')}
            style={styles.loveImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.resultCard}>
          {romanticPerson ? (
            <Text style={styles.nameText}>{romanticPerson}</Text>
          ) : (
            <Text style={styles.noDataText}>{t('statistics.stories.romanticPerson.noData')}</Text>
          )}
        </View>

        <Text style={styles.footer}>
          {t('statistics.stories.romanticPerson.footer')}
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
    marginBottom: 24,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 32,
    marginBottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loveImage: {
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
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D81B60',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D81B60',
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