import { url } from "node:inspector";

export const footer = {
  jenkinsVersion: "Jenkins 2.541.3",
  dropdownItems: {
    aboutJenkins: {
      text: "About Jenkins",
      href: "/manage/about",
    },
    getInvolved: {
      text: "Get involved",
      href: "https://www.jenkins.io/participate/",
    },
    website: {
      text: "Website",
      href: "https://www.jenkins.io/",
    },
  },
};

export const manageJenkinsPageData = {
  sections: [
    "System Configuration",
    "Security",
    "Status Information",
    "Troubleshooting",
    "Tools and Actions",
  ],
  systemConfigurationItems: ["System", "Tools", "Plugins", "Nodes", "Clouds", "Appearance"],
};
