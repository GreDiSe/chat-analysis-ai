import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'dominant-person';

interface DominantPersonStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const DominantPersonStory: React.FC<DominantPersonStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  const dominantPerson = 'dominant_person' in analysis ? analysis.dominant_person : undefined;

  const message = dominantPerson
    ? `${dominantPerson} ${t('statistics.stories.dominantPerson.moreLeading')} 👑`
    : t('statistics.stories.dominantPerson.balanced');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.dominantPerson.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#FF9800', '#F57C00']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.dominantPerson.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/dominant.jpg')}
              style={styles.dominantImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.resultContainer}>
            {dominantPerson ? (
              <View style={styles.resultBox}>
                <Text style={styles.nameText}>{dominantPerson}</Text>
                <Text style={styles.descriptionText}>
                  {t('statistics.stories.dominantPerson.moreLeading')}
                </Text>
              </View>
            ) : (
              <View style={styles.resultBox}>
                <Text style={styles.balancedText}>
                  {t('statistics.stories.dominantPerson.balanced')}
                </Text>
                <Text style={styles.descriptionText}>
                  {t('statistics.stories.dominantPerson.balancedDesc')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.dominantPerson.footer')}
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
  dominantImage: {
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
    color: '#FF9800',
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
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 