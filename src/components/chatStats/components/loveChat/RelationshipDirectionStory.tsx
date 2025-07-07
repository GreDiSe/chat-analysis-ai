import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'relationship-direction';

interface RelationshipDirectionStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'relationship_direction' in analysis;
};

export const RelationshipDirectionStory: React.FC<RelationshipDirectionStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const direction = analysis.relationship_direction;

  const message = direction
    ? `${t('statistics.stories.relationshipDirection.title')}: ${direction}`
    : t('statistics.stories.relationshipDirection.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.relationshipDirection.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#FFB74D', '#F57C00']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.relationshipDirection.title')}</Text>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/relationshipHeading.jpg')}
            style={styles.directionImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.resultCard}>
          {direction ? (
            <Text style={styles.directionText}>{direction}</Text>
          ) : (
            <Text style={styles.noDataText}>{t('statistics.stories.relationshipDirection.noData')}</Text>
          )}
        </View>

        <Text style={styles.footer}>
          {t('statistics.stories.relationshipDirection.footer')}
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
    paddingBottom: 100,
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
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionImage: {
    width: 250,
    height: 250,
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
  directionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F57C00',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F57C00',
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