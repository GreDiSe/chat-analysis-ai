import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Chat } from '../../types/chat';
import { selectAllChats } from '../../store/selectors/chatSelectors';
import { NavigationProp } from '../../types/navigation';
import { getLanguage } from '../../store/slices/appSlice';
import { safeLogEvent } from '../../utils/analytics';

interface ChatListItem {
  id: string;
  type: 'relationship' | 'chat';
  title: string;
  date: string;
}

export const MainScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const chats = useSelector(selectAllChats);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const language = useSelector(getLanguage);

  useEffect(() => {
    if (chats.length === 0) {
      navigation.replace('Guide');
    }
  }, [chats.length, navigation]);

  const chatListItems = useMemo(() => {
    return chats.map((chat: Chat) => {
      const chatItem: ChatListItem = {
        id: chat.id,
        type: chat.type === 'love' ? 'relationship' : 'chat',
        title: chat.title,
        date: chat.created_at.toLocaleDateString(language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };

      return chatItem;
    });
  }, [chats, language]);

  const renderTopIcon = (type: 'love' | 'friends') => {
    const isLove = type === 'love';
    return (
      <TouchableOpacity
        style={styles.topIconContainer}
        onPress={() => {
          safeLogEvent('top_icon_click', {
            icon_type: type,
            existing_chats_count: chats.length,
            is_first_chat: chats.length === 0
          });
          navigation.navigate('Guide', { skipWelcomeScreen: true });
        }}
      >
        <View
          style={[
            styles.topIcon,
            {
              backgroundColor: isLove ? '#FF69B4' : '#78fd53',
            },
          ]}
        >
          <Text style={styles.iconText}>{isLove ? '❤️' : '💬'}</Text>
        </View>
        <Text style={styles.topIconLabel}>
          {t(isLove ? 'screens.main.topButtons.love' : 'screens.main.topButtons.friends')}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderListIcon = (type: 'relationship' | 'chat') => {
    return (
      <View style={[
        styles.listIcon, 
        { backgroundColor: type === 'relationship' ? '#FFB6C1' : '#90EE90' }
      ]}>
        <Text style={styles.listIconText}>
          {type === 'relationship' ? '❤️' : '💬'}
        </Text>
      </View>
    );
  };

  const CreateModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        safeLogEvent('create_chat_modal_close', {
          existing_chats_count: chats.length,
          is_first_chat: chats.length === 0
        });
        setIsModalVisible(false);
      }}
      statusBarTranslucent={true}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => {
          safeLogEvent('create_chat_modal_close', {
            existing_chats_count: chats.length,
            is_first_chat: chats.length === 0
          });
          setIsModalVisible(false);
        }}
      >
        <TouchableOpacity 
          style={styles.modalContent}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity 
            style={styles.modalOption}
            onPress={() => {
              safeLogEvent('create_chat_modal_open', {
                chat_type: 'love',
                existing_chats_count: chats.length,
                is_first_chat: chats.length === 0
              });
              setIsModalVisible(false);
              navigation.navigate('Guide', { skipWelcomeScreen: true });
            }}
          >
            <View style={[styles.modalIcon, { backgroundColor: '#FFB6C1' }]}>
              <Text style={styles.modalIconText}>❤️</Text>
            </View>
            <Text style={styles.modalOptionText}>{t('screens.main.modal.loveOption')}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.modalOption}
            onPress={() => {
              safeLogEvent('create_chat_modal_open', {
                chat_type: 'friends',
                existing_chats_count: chats.length,
                is_first_chat: chats.length === 0
              });
              setIsModalVisible(false);
              navigation.navigate('Guide', { skipWelcomeScreen: true });
            }}
          >
            <View style={[styles.modalIcon, { backgroundColor: '#78fd53' }]}>
              <Text style={styles.modalIconText}>💬</Text>
            </View>
            <Text style={styles.modalOptionText}>{t('screens.main.modal.friendsOption')}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('screens.main.title')}</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
{/* 
        <View style={styles.iconRow}>
          {renderTopIcon('love')}
          {renderTopIcon('friends')}
        </View> */}

        <ScrollView style={styles.list}>
          {chatListItems.map((item: ChatListItem) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.listItem}
              onPress={() => {
                safeLogEvent('chat_stat_click_menu_item', {
                  chat_id: item.id,
                  chat_type: item.type,
                  existing_chats_count: chats.length,
                  is_first_chat: chats.length === 0
                });
                navigation.navigate('Statistics', {
                  chatId: item.id
                });
              }}
            >
              <View style={styles.itemLeft}>
                {renderListIcon(item.type)}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDate}>{item.date}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => {
            safeLogEvent('create_chat_click_button', {
              existing_chats_count: chats.length,
              is_first_chat: chats.length === 0
            });
            setIsModalVisible(true);
          }}
        >
          <Text style={styles.createButtonText}>{t('screens.main.createButton')}</Text>
        </TouchableOpacity>
      </View>
      <CreateModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
    opacity: 0.7,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  topIconContainer: {
    alignItems: 'center',
    gap: 8,
  },
  topIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 30,
  },
  topIconLabel: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    lineHeight: 16,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listIconText: {
    fontSize: 20,
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  itemInfo: {
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  chevron: {
    fontSize: 24,
    color: 'rgba(0, 0, 0, 0.3)',
  },
  createButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    paddingVertical: 30,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalIconText: {
    fontSize: 20,
  },
  modalOptionText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
}); 