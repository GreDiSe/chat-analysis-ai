import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from '../../types/navigation';
import { StoriesCarousel } from "../../components/stories/StoriesCarousel";
import { updateUserFeatureScreenShowed } from "../../firebase/auth";
import auth from "@react-native-firebase/auth";
import { featureStories } from "../../data/featureStories";
import { useTranslation } from "react-i18next";
import { FeatureStory, Story } from "../../types/story";
import { TranslationKeysType } from "../../types/translation";

type Props = StackScreenProps<RootStackParamList, "Features">;

export const FeaturesScreen: React.FC<Props> = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const markFeatureAsShown = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          await updateUserFeatureScreenShowed(currentUser.uid);
        }
      } catch (error) {
        console.error('Error updating feature screen status:', error);
      }
    };

    markFeatureAsShown();
  }, []); // Empty dependency array means this runs once on mount

  const translateFeatureStory = (story: FeatureStory): Story => {
    return {
      ...story,
      title: t(story.title as TranslationKeysType),
      subtitle: t(story.subtitle as TranslationKeysType),
      data: {
        person1: {
          ...story.data.person1,
          name: t(story.data.person1.name as TranslationKeysType),
        },
        person2: {
          ...story.data.person2,
          name: t(story.data.person2.name as TranslationKeysType),
        },
      },
      cta: {
        buttonText: t(story.cta.buttonText as TranslationKeysType),
        disclaimer: t(story.cta.disclaimer as TranslationKeysType),
      },
      ctaSubtitle: story.ctaSubtitle ? t(story.ctaSubtitle as TranslationKeysType) : undefined,
    };
  };

  const translatedStories: Story[] = featureStories.map(translateFeatureStory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <StoriesCarousel stories={translatedStories} mode="story" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  content: {
    flex: 1,
  },
}); 