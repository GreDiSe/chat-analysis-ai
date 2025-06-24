import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'funniest-message';

interface FunniestMessageStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'funniest_message' in analysis;
};

export const FunniestMessageStory: React.FC<FunniestMessageStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const funnyMessages = Array.isArray(analysis.funniest_message) ? analysis.funniest_message : [analysis.funniest_message];

  const renderContent = () => (
    <LinearGradient
      colors={['#26C6DA', '#00ACC1']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.funniestMessage.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/laughTogether.jpg')}
            style={styles.funnyImage}
            resizeMode="cover"
          />
        </View>
        
        {funnyMessages.length > 0 ? (
          <View style={styles.messagesContainer}>
            {funnyMessages.map((message, index) => (
              <View key={index} style={styles.messageBox}>
                <Text style={[styles.messageText, index === 0 && styles.topMessage]}>
                  "{message}"
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>{t('statistics.stories.funniestMessage.noData')}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.footer}>
        {t('statistics.stories.funniestMessage.footer')}
      </Text>
    </LinearGradient>
  );

  const message = funnyMessages.length > 0
    ? `${t('statistics.stories.funniestMessage.title')}: "${funnyMessages[0]}" 😄`
    : t('statistics.stories.funniestMessage.noData');

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.funniestMessage.title')}
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
    padding: 20,
    paddingHorizontal: 30,
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
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.9,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    gap: 15,
  },
  messageBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(38, 198, 218, 0.1)',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  topMessage: {
    fontSize: 20,
    color: '#00ACC1',
    fontWeight: '600',
  },
  noDataContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
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
  shareButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 'auto',
  },
  shareButtonText: {
    color: '#00ACC1',
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
  imageContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  funnyImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },
}); 