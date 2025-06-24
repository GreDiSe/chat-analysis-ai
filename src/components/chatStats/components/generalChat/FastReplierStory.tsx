import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'fast-replier';

interface FastReplierStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'fastest_responder' in analysis;
};

export const FastReplierStory: React.FC<FastReplierStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const message = analysis.fastest_responder
    ? `${t('statistics.chatStats.general.fastReplier.title')}: ${analysis.fastest_responder}`
    : t('statistics.chatStats.general.fastReplier.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.fastReplier.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#4B0082', '#8A2BE2']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.fastReplier.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/fastReplier.jpg')}
              style={styles.fastReplierImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {analysis.fastest_responder ? (
              <View style={styles.nameBox}>
                <Text style={styles.label}>{t('statistics.chatStats.general.fastReplier.name')}</Text>
                <Text style={styles.value}>{analysis.fastest_responder}</Text>
              </View>
            ) : (
              <View style={styles.noDataBox}>
                <Text style={styles.noDataText}>
                  {t('statistics.chatStats.general.fastReplier.noData')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.chatStats.general.fastReplier.footer')}
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
  fastReplierImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
  },
  nameBox: {
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    color: '#4B0082',
    fontWeight: 'bold',
  },
  noDataBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 5,
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 