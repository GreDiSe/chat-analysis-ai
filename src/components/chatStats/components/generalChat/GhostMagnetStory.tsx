import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'ghost-magnet';

interface GhostMagnetStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'ghost_magnet' in analysis;
};

export const GhostMagnetStory: React.FC<GhostMagnetStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const ghostMagnet = analysis.ghost_magnet;

  const message = ghostMagnet
    ? `${t('statistics.chatStats.general.ghostMagnet.title')}: ${ghostMagnet} 👻`
    : t('statistics.chatStats.general.ghostMagnet.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.ghostMagnet.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.ghostMagnet.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/ghost.jpg')}
              style={styles.ghostImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {ghostMagnet ? (
              <View style={styles.ghostBox}>
                <Text style={styles.ghostText}>{ghostMagnet}</Text>
              </View>
            ) : (
              <View style={styles.noDataBox}>
                <Text style={styles.noDataText}>
                  {t('statistics.chatStats.general.ghostMagnet.noData')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.chatStats.general.ghostMagnet.footer')}
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
  ghostImage: {
    width: 270,
    height: 270,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
  },
  ghostBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  ghostText: {
    fontSize: 24,
    color: '#9C27B0',
    fontWeight: '600',
  },
  noDataBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C27B0',
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