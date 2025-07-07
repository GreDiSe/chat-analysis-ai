import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'most-texted-phrase';

interface MostTextedPhraseStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'most_used_phrase' in analysis;
};

export const MostTextedPhraseStory: React.FC<MostTextedPhraseStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const phrases = Object.entries(analysis.most_used_phrase)
    .map(([name, phrase]) => ({
      name,
      phrase
    }));

  const message = phrases.length > 0
    ? `${t('statistics.chatStats.general.mostTextedPhrase.title')}: ${phrases.map(p => `${p.name}: "${p.phrase}"`).join(', ')} 💬`
    : t('statistics.chatStats.general.mostTextedPhrase.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.mostTextedPhrase.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#26C6DA', '#00ACC1']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.mostTextedPhrase.title')}</Text>
        
        <View style={styles.contentContainer}>
          {phrases.length < 5 && <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/mostUsedPhrase.jpg')}
              style={[
                styles.phraseImage,
                phrases.length > 3 && styles.phraseImageCompact
              ]}
              resizeMode="cover"
            />
          </View>}

          <View style={[
            styles.statsContainer,
            phrases.length > 3 && styles.statsContainerCompact
          ]}>
            {phrases.length > 0 ? (
              phrases.map(({ name, phrase }) => (
                <View key={name} style={[
                  styles.phraseBox,
                  phrases.length > 3 && styles.phraseBoxCompact
                ]}>
                  <Text style={[
                    styles.nameText,
                    phrases.length > 3 && styles.nameTextCompact
                  ]}>{name}</Text>
                  <Text style={[
                    styles.phraseText,
                    phrases.length > 3 && styles.phraseTextCompact
                  ]}>"{phrase}"</Text>
                </View>
              ))
            ) : (
              <View style={styles.noDataBox}>
                <Text style={styles.noDataText}>
                  {t('statistics.chatStats.general.mostTextedPhrase.noData')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.chatStats.general.mostTextedPhrase.footer')}
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
  phraseImage: {
    width: 220,
    height: 220,
    borderRadius: 20,
  },
  phraseImageCompact: {
    width: 220,
    height: 220,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 10,
    gap: 10,
  },
  statsContainerCompact: {
    gap: 5,
    padding: 8,
  },
  phraseBox: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  phraseBoxCompact: {
    paddingVertical: 4,
  },
  nameText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  nameTextCompact: {
    fontSize: 16,
    marginBottom: 3,
  },
  phraseText: {
    fontSize: 24,
    color: '#26C6DA',
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  phraseTextCompact: {
    fontSize: 20,
  },
  noDataBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#26C6DA',
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