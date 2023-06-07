import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView, StyleSheet, Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView from './src/views/MapView';
import {TaskContextProvider} from './src/TasksContext';
import NewItem from './src/views/NewItem';
import Tasks from './src/views/Tasks';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const TABS = {
  MAP: 'tab_map',
  TASKS: 'tab_tasks'
}
const TABS_NAMES = {
  [TABS.MAP]: 'Map',
  [TABS.TASKS]: 'Tasks',
}

export const SCREENS = {
  MAP: 'Map',
  NEW_TASK: 'New Task',
  TASK_LIST: 'Tasks',
}

const TabTasks = () => {
  return <Stack.Navigator screenOptions={{ headerStyle: styles.headerStack, headerTitleStyle: styles.headerTitle }}>
    <Stack.Screen
      name={SCREENS.TASK_LIST}
      component={Tasks}
    />
  </Stack.Navigator>
};

const TabMap = () => {
  return <Stack.Navigator screenOptions={{
    headerStyle: styles.headerStack,
    headerTitleStyle: styles.headerTitle,
  }}>
    <Stack.Screen
      name={SCREENS.MAP}
      component={MapView}/>
    <Stack.Screen
      name={SCREENS.NEW_TASK}
      component={NewItem}/>
  </Stack.Navigator>
};

const Tabs = () => {
  return <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarIcon: () => null,
      tabBarLabel: (data) => <Text style={[styles.tabText, data.focused && styles.activeTab]}>{TABS_NAMES[data.children]}</Text>
  }}>
    <Tab.Screen name={TABS.TASKS} component={TabTasks} />
    <Tab.Screen name={TABS.MAP} component={TabMap} />
  </Tab.Navigator>
}

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#fff',
        }
      }}>
        <TaskContextProvider>
          <Tabs />
        </TaskContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStack: {
    backgroundColor: '#22A3C3',
  },
  headerTitle: {
    color: '#fff'
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingBottom: 20,
    height: 60,
  },
  tabText: {
    fontSize: 24,
    fontWeight: '500',
  },
  activeTab: {
    color: '#22A3C3'
  }
});

export default App;
