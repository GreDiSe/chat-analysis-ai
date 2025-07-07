import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { StoriesCarousel } from '../../components/stories/StoriesCarousel';
import { NavigationProp } from '../../../src/types/navigation';
import { chatActions } from '../../store/slices/chatSlice';

type StatisticsRouteParams = {
  chatId: string;
};

type StatisticsScreenRouteProp = RouteProp<
  { Statistics: StatisticsRouteParams },
  'Statistics'
>;

export const StatisticsScreen: React.FC = () => {
  const route = useRoute<StatisticsScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { chatId } = route.params;

  const chat = useSelector((state: RootState) => state.chatReducer.chats.find(c => c.id === chatId)
  );

  const handleClose = () => {
    navigation.navigate('Main');
  };

  useEffect(() => {
    if (chat) {
      dispatch(chatActions.hideShareOverlay());
    }
  }, [chat, dispatch]);

  if (!chat) {
    return null; // Or render an error state
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <StoriesCarousel
          mode="statistics"
          chat={chat}
          onClose={handleClose}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
}); 