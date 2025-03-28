import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import SignUp from "@/assets/images/signup.jpg";
import highlight from "@/assets/images/highlight.png";

import home from "@/assets/icons/home.png";
import diagnosis from "@/assets/icons/diagnosis.png";
import chatbot from "@/assets/icons/chat-bot.png";
import seasonal from "@/assets/icons/seasonal.png";
import person from "@/assets/icons/person.png";
import community from "@/assets/icons/community.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  SignUp,
  highlight,
};

export const icons = {
  home,
  person,
  diagnosis,
  chatbot,
  seasonal,
  community,
};

export const onboarding = [
  {
    id: 1,
    title: "Smart Farming at Your Fingertips",
    description:
      "Monitor crop health, get real-time weather updates, and optimize your farm with AI-powered insights.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Connect with Experts & Farmers",
    description:
      "Join a thriving community of farmers, exchange knowledge, and get expert advice to boost productivity.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Maximize Your Harvest with AI",
    description:
      "Utilize AI-driven recommendations to improve yield, reduce waste, and enhance sustainability.",
    image: images.onboarding3,
  },
];
