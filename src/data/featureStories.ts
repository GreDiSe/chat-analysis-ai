import { FeatureStory } from '../types/story';

export const featureStories: FeatureStory[] = [
  {
    id: 'laugh_more',
    title: 'screens.features.stories.laugh.title',
    subtitle: 'screens.features.stories.laugh.subtitle',
    gradient: ['#E9791A', '#E25822'],
    image: require('../../assets/images/feature-images/laugh.jpg'),
    data: {
      person1: {
        name: 'screens.features.stories.laugh.person1',
        percentage: 65,
      },
      person2: {
        name: 'screens.features.stories.laugh.person2',
        percentage: 35,
      },
    },
    cta: {
      buttonText: 'screens.features.stories.common.continue',
      disclaimer: 'screens.features.stories.common.disclaimer',
    },
    ctaSubtitle: 'screens.features.stories.common.stats_discover',
  },
  {
    id: 'romantic',
    title: 'screens.features.stories.romantic.title',
    subtitle: 'screens.features.stories.romantic.subtitle',
    gradient: ['#FF1493', '#C71585'],
    image: require('../../assets/images/feature-images/hearts.jpg'),
    data: {
      person1: {
        name: 'screens.features.stories.romantic.person1',
        percentage: 75,
      },
      person2: {
        name: 'screens.features.stories.romantic.person2',
        percentage: 25,
      },
    },
    cta: {
      buttonText: 'screens.features.stories.common.continue',
      disclaimer: 'screens.features.stories.common.disclaimer',
    },
    ctaSubtitle: 'screens.features.stories.common.stats_discover',
  },
  {
    id: 'dominant',
    title: 'screens.features.stories.dominant.title',
    subtitle: 'screens.features.stories.dominant.subtitle',
    gradient: ['#4B0082', '#8A2BE2'],
    image: require('../../assets/images/feature-images/dominant.jpg'),
    data: {
      person1: {
        name: 'screens.features.stories.dominant.person1',
        percentage: 55,
      },
      person2: {
        name: 'screens.features.stories.dominant.person2',
        percentage: 45,
      },
    },
    cta: {
      buttonText: 'screens.features.stories.common.continue',
      disclaimer: 'screens.features.stories.common.disclaimer',
    },
    ctaSubtitle: 'screens.features.stories.common.stats_discover',
  },
  {
    id: 'response_time',
    title: 'screens.features.stories.response.title',
    subtitle: 'screens.features.stories.response.subtitle',
    gradient: ['#191970', '#000080'],
    image: require('../../assets/images/feature-images/clocks.jpg'),
    data: {
      person1: {
        name: 'screens.features.stories.response.person1',
        percentage: 90,
      },
      person2: {
        name: 'screens.features.stories.response.person2',
        percentage: 53,
      },
    },
    cta: {
      buttonText: 'screens.features.stories.common.analyze',
      disclaimer: 'screens.features.stories.common.disclaimer',
    },
    ctaSubtitle: 'screens.features.stories.common.stats_discover',
  },
]; 