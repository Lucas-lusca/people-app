import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Platform } from 'react-native';
import newspaper from '../assets/newspaper.png';
import { Chat } from './screens/Chat';
import { Home } from './screens/Home';
import { Messages } from './screens/Messages';
import { NotFound } from './screens/NotFound';
import { Profile } from './screens/Profile';

const colors = {
  primary: '#2563eb',
  text: '#1f2937',
  muted: '#9ca3af',
  background: '#f2f4f7',
  white: '#ffffff',
};

const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    headerStyle: {
      backgroundColor: colors.white,
    },
    headerTitleStyle: {
      fontWeight: '700',
      fontSize: 18,
      color: colors.text,
    },
    headerTitleAlign: 'center',

    tabBarStyle: {
      backgroundColor: colors.white,
      borderTopWidth: 0,
      height: 70,
      paddingBottom: Platform.OS === 'ios' ? 20 : 10,
      paddingTop: 8,

      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: -2 },
      elevation: 10,
    },

    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.muted,

    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 4,
    },
  },

  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            style={{
              width: size,
              height: size,
              tintColor: color,
            }}
          />
        ),
      },
    },

    Messages: {
      screen: Messages,
      options: {
        title: 'Mensagens',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            style={{
              width: size,
              height: size,
              tintColor: color,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerStyle: {
      backgroundColor: colors.white,
    },
    headerTitleStyle: {
      fontWeight: '700',
      fontSize: 18,
      color: colors.text,
    },
    headerShadowVisible: false,
    headerTitleAlign: 'center',
  },

  screens: {
    Feed: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },

    Profile: {
      screen: Profile,
      options: {
        title: 'Perfil',
      },
    },

    Chat: {
      screen: Chat,
      options: {
        title: 'Chat',
      },
    },

    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}