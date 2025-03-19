import AntDesign from "@expo/vector-icons/AntDesign";

const ProposeIcon = () => (
  <AntDesign name="notification" size={24} color="black" />
);

const UserIcon = () => <AntDesign name="user" size={24} color="black" />;
export const proposalOption = {
  title: "Доступные заявки",
  tabBarIcon: ProposeIcon,
};

export const profileOption = {
  title: "Профиль",
  tabBarIcon: UserIcon,
};
