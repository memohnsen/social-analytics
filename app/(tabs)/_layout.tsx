import { TabBarContext } from '@/context/TabBarContext';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useState } from 'react';


const TabsLayout = () => {
  const [isTabBarHidden, setIsTabBarHidden] = useState(false);

  return (
    <TabBarContext value={{ setIsTabBarHidden }}>
      <NativeTabs
        tintColor={"#7f2ccb"}
        hidden={isTabBarHidden}
      >
          <NativeTabs.Trigger name="(content)" >
              <NativeTabs.Trigger.Label hidden />
              <NativeTabs.Trigger.Icon sf={{default: "house", selected: "house.fill"}} md="home" />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(analytics)" >
              <NativeTabs.Trigger.Label hidden />
              <NativeTabs.Trigger.Icon sf={{default: "chart.bar", selected: "chart.bar.fill"}} md="bar_chart" />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(settings)" >
              <NativeTabs.Trigger.Icon sf={{default: "gearshape", selected: "gearshape.fill"}} md="settings" />
              <NativeTabs.Trigger.Label hidden />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(add)" role="search">
              <NativeTabs.Trigger.Icon sf={{default: "plus", selected: "plus"}} md="add" />
              <NativeTabs.Trigger.Label hidden />
          </NativeTabs.Trigger>
      </NativeTabs>
    </TabBarContext>
  )
}

export default TabsLayout