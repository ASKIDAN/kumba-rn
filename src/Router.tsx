import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapView from './views/MapView';
import {TaskContextProvider} from './TasksContext';
import NewItem from './views/NewItem';
import Tasks from './views/Tasks';
import styles from './styles';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const TABS = {
  MAP: 'tab_map',
  TASKS: 'tab_tasks',
};
const TABS_NAMES = {
  [TABS.MAP]: 'Map',
  [TABS.TASKS]: 'Tasks',
};

export const SCREENS = {
  MAP: 'Map',
  NEW_TASK: 'New Task',
  TASK_LIST: 'Tasks',
};

const TabTasks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStack,
        headerTitleStyle: styles.headerTitle,
      }}>
      <Stack.Screen name={SCREENS.TASK_LIST} component={Tasks} />
    </Stack.Navigator>
  );
};

const TabMap = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStack,
        headerTitleStyle: styles.headerTitle,
      }}>
      <Stack.Screen name={SCREENS.MAP} component={MapView} />
      <Stack.Screen name={SCREENS.NEW_TASK} component={NewItem} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: () => null,
        tabBarLabel: data => (
          <Text style={[styles.tabText, data.focused && styles.activeTab]}>
            {TABS_NAMES[data.children]}
          </Text>
        ),
      }}>
      <Tab.Screen name={TABS.TASKS} component={TabTasks} />
      <Tab.Screen name={TABS.MAP} component={TabMap} />
    </Tab.Navigator>
  );
};

function Router(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: '#fff',
          },
        }}>
        <TaskContextProvider>
          <Tabs />
        </TaskContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default Router;
