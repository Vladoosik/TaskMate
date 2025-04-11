import { AuthScreen } from "../../screens";
import { Stack } from "../../configs/authNavigationConfig";
import React from "react";

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Auth"
      component={AuthScreen}
      options={{ headerShown: false }}
    />
    {/* TODO: Добавлять сюда новые экраны регистрации */}
  </Stack.Navigator>
);

export default AuthStack;
