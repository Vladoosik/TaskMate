import AntDesign from "@expo/vector-icons/AntDesign";

const ProposeIcon = () => (
  <AntDesign name="notification" size={24} color="black" />
);

const ChatIcon = () => <AntDesign name="wechat" size={24} color="black" />;
const UserIcon = () => <AntDesign name="user" size={24} color="black" />;
export const proposalOption = {
  title: "Доступные заявки",
  tabBarIcon: ProposeIcon,
};

export const chatListOption = {
  title: "Список чатов",
  tabBarIcon: ChatIcon,
};

export const profileOption = {
  title: "Профиль",
  tabBarIcon: UserIcon,
};
