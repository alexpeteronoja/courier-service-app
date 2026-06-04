import {
  AdditionalFeaturesIcon,
  AllCostIcon,
  ContentCalenderIcon,
  DashboardIcon,
  GenerateContentIcon,
  GenerateSongIcon,
  HireFreelancerIcon,
  LabelPerformerAnalysisIcon,
  LabelProfileIcon,
  LabelStreamingLinkIcon,
  LibraryIcon,
  NotificationIcon,
  PerformerAnalysisIcon,
  ProfileIcon,
  StreamingLinkIcon,
} from "../Components/Sidebar/SidebarIcons";

export const ArtistSideBarContent = [
  { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
  { name: "Library", path: "/library", icon: LibraryIcon },
  { name: "Generate song", path: "/generate-song", icon: GenerateSongIcon },
  { name: "Profile", path: "/profile", icon: ProfileIcon },
  {
    name: "Performers Analysis",
    path: "/performers-analysis",
    icon: PerformerAnalysisIcon,
  },
  {
    name: "Streaming Platform Links",
    path: "platform-links",
    icon: StreamingLinkIcon,
  },
  { name: "Notification", path: "/notification", icon: NotificationIcon },
];

// For Label

export const labelSideBarContent = [
  {
    name: "Dashboard",
    path: "/label/dashboard",
    icon: DashboardIcon,
    dashChildren: [
      {
        name: "Performers Analysis",
        path: "/label/performers-analysis",
        icon: LabelPerformerAnalysisIcon,
      },
      {
        name: "Streaming Platform Links",
        path: "/label/platform-links",
        icon: LabelStreamingLinkIcon,
      },
      {
        name: "Content Calender",
        path: "/label/content-calender",
        icon: ContentCalenderIcon,
      },
    ],
  },
  {
    name: "Hire AI Influencer",
    path: "/label/hire-influencer",
    icon: HireFreelancerIcon,
  },
  {
    name: "Generate Content",
    path: "/label/generate-content",
    icon: GenerateContentIcon,
  },

  {
    name: "Buy Additional Features",
    path: "/label/buy-additional-features",
    icon: AdditionalFeaturesIcon,
  },
  {
    name: "Artist",
    path: "/label/artist",
    icon: ProfileIcon,
    dashChildren: [
      { name: "Profile", path: "/label/profile", icon: LabelProfileIcon },
      { name: "All Cost", path: "/label/all-cost", icon: AllCostIcon },
      { name: "Library", path: "/label/library", icon: LibraryIcon },
    ],
  },

  { name: "Notification", path: "/label/notification", icon: NotificationIcon },
];
