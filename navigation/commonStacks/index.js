import { Stack } from "../../configs/authNavigationConfig";
import { ChatScreen, FinishedRequestScreen, OtherProfile } from "../../screens";
import {
  ChatOption,
  finishedRequestOption,
  OtherProfileOptions,
} from "../appNavigator/config";

const CommonStacks = () => (
  <>
    <Stack.Screen
      name="FinishedRequest"
      component={FinishedRequestScreen}
      options={finishedRequestOption}
    />
    <Stack.Screen
      name="OtherProfile"
      component={OtherProfile}
      options={OtherProfileOptions}
    />
    <Stack.Screen name="Chat" component={ChatScreen} options={ChatOption} />
  </>
);

export default CommonStacks;
