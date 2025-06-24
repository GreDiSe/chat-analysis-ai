import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Chat } from '../../types/chat';
import { DaysTalkedStory } from './components/loveChat/DaysTalkedStory';
import { ConversationStarterStory } from './components/loveChat/ConversationStarterStory';
import { ResponseTimeStory } from './components/loveChat/ResponseTimeStory';
import { WordsPerMessageStory } from './components/loveChat/WordsPerMessageStory';
import { TopicsStory } from './components/loveChat/TopicsStory';
import { ManipulationStory } from './components/loveChat/ManipulationStory';
import { DominantPersonStory } from './components/loveChat/DominantPersonStory';
import { InterestLevelStory } from './components/loveChat/InterestLevelStory';
import { DesireLevelStory } from './components/loveChat/DesireLevelStory';
import { EffortStory } from './components/loveChat/EffortStory';
import { ApologyStory } from './components/loveChat/ApologyStory';
import { ILoveYouStory } from './components/loveChat/ILoveYouStory';
import { FirstLoveSentenceStory } from './components/loveChat/FirstLoveSentenceStory';
import { MostUsedLoveWordsStory } from './components/loveChat/MostUsedLoveWordsStory';
import { RomanticPersonStory } from './components/loveChat/RomanticPersonStory';
import { LaughTogetherStory } from './components/loveChat/LaughTogetherStory';
import { FunniestMessageStory } from './components/loveChat/FunniestMessageStory';
import { FavoriteLoveEmojiStory } from './components/loveChat/FavoriteLoveEmojiStory';
import { RelationshipDirectionStory } from './components/loveChat/RelationshipDirectionStory';
import { MessageCountStats } from './components/generalChat/MessageCountStats';
import { EmojiUsageStats } from './components/generalChat/EmojiUsageStats';
import { MostTextedPhraseStory } from './components/generalChat/MostTextedPhraseStory';
import { MostUsedCensoredWordStory } from './components/generalChat/MostUsedCensoredWordStory';
import { GhostMagnetStory } from './components/generalChat/GhostMagnetStory';
import { EmojiUsageByPersonStory } from './components/generalChat/EmojiUsageByPersonStory';
import { PeakHoursStory } from './components/generalChat/PeakHoursStory';
import { StreakDaysStory } from './components/generalChat/StreakDaysStory';
import { FastReplierStory } from './components/generalChat/FastReplierStory';
import { ChatSummaryStory } from './components/generalChat/ChatSummaryStory';
import { StatisticType } from 'src/utils/storyTypes';
  

interface StatisticCardProps {
  chat: Chat;
  type: StatisticType;
  buttonPressedRef: React.MutableRefObject<boolean>;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({ chat, type, buttonPressedRef }) => {
  const renderStory = () => {
    switch (type) {
      case 'days-talked':
        return <DaysTalkedStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'conversation-starter':
        return <ConversationStarterStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'response-time':
        return <ResponseTimeStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'words-per-message':
        return <WordsPerMessageStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'top-topics':
        return <TopicsStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'manipulation':
        return <ManipulationStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'dominant-person':
        return <DominantPersonStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'interest-level':
        return <InterestLevelStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'desire-level':
        return <DesireLevelStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'effort':
        return <EffortStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'apologies':
        return <ApologyStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'i-love-you':
        return <ILoveYouStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'first-love-sentence':
        return <FirstLoveSentenceStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'most-used-love-words':
        return <MostUsedLoveWordsStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'romantic-person':
        return <RomanticPersonStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'laugh-together':
        return <LaughTogetherStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'funniest-message':
        return <FunniestMessageStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'favorite-love-emoji':
        return <FavoriteLoveEmojiStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'relationship-direction':
        return <RelationshipDirectionStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'message-count':
        return <MessageCountStats chat={chat} handleShareCallback={handleShareCallback} />;
      case 'emoji-usage':
        return <EmojiUsageStats chat={chat} handleShareCallback={handleShareCallback} />;
      case 'most-texted-phrase':
        return <MostTextedPhraseStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'most-used-censored-word':
        return <MostUsedCensoredWordStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'ghost-magnet':
        return <GhostMagnetStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'emoji-usage-by-person':
        return (
          <EmojiUsageByPersonStory
            chat={chat}
            handleShareCallback={handleShareCallback}
          />
        );
      case 'peak-hours':
        return <PeakHoursStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'streak-days':
        return <StreakDaysStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'fast-replier':
        return <FastReplierStory chat={chat} handleShareCallback={handleShareCallback} />;
      case 'chat-summary':
        return <ChatSummaryStory chat={chat} handleShareCallback={handleShareCallback} />;
      default:
        return null;
    }
  };

  const handleShareCallback = () => {
    buttonPressedRef.current = true;
    setTimeout(() => { buttonPressedRef.current = false })
  };

  return (
    <View style={styles.container}>
      {renderStory()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#FFF',
  },
}); 