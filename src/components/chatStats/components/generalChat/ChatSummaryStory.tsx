import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'chat-summary';

interface ChatSummaryStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'general_summary' in analysis;
};

export const ChatSummaryStory: React.FC<ChatSummaryStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const message = `${t('statistics.chatStats.general.chatSummary.title')}: ${analysis.general_summary}`;

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.chatSummary.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#2E7D32', '#43A047']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.chatSummary.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.statsContainer}>
            <View style={styles.summaryBox}>
              <Text style={styles.label}>{t('statistics.chatStats.general.chatSummary.general')}</Text>
              <Text style={styles.value}>{analysis.general_summary}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.personalSummaryBox}>
              <Text style={styles.label}>{t('statistics.chatStats.general.chatSummary.personal')}</Text>
              {Object.entries(analysis.personal_summary).map(([name, summary], index) => (
                <View key={index} style={styles.personSummary}>
                  <Text style={styles.personName}>{name}:</Text>
                  <Text style={styles.personValue}>{summary}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.chatStats.general.chatSummary.footer')}
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
  summaryImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 50,
    gap: 20,
  },
  summaryBox: {
    alignItems: 'center',
    gap: 10,
  },
  personalSummaryBox: {
    gap: 15,
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  personSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  personName: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  personValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 