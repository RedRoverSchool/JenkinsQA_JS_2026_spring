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
    sections: {
        systemConfiguration: {
            name: "System Configuration",
            configurationItems: {
                system: {
                    name: "System",
                    href: "configure",
                },
                tools: {
                    name: "Tools",
                    href: "configureTools",
                },
                plugins: {
                    name: "Plugins",
                    href: "pluginManager",
                },
                nodes: {
                    name: "Nodes",
                    href: "computer",
                },
                clouds: {
                    name: "Clouds",
                    href: "cloud",
                },
                appearance: {
                    name: "Appearance",
                    href: "appearance",
                },
            },
        },
        security: {
            name: "Security",
            configurationItems: {
                security: {
                    name: "Security",
                    href: "configureSecurity",
                },
                credentials: {
                    name: "Credentials",
                    href: "credentials",
                },
                credentialProviders: {
                    name: "Credential Providers",
                    href: "configureCredentials",
                },
                users: {
                    name: "Users",
                    href: "securityRealm/",
                },
            },
        },
        statusInfo: {
            name: "Status Information",
            configurationItems: {
                systemInfo: {
                    name: "System Information",
                    href: "systemInfo",
                },
                systemLog: {
                    name: "System Log",
                    href: "log",
                },
                loadStatistics: {
                    name: "Load Statistics",
                    href: "load-statistics",
                },
                aboutJenkins: {
                    name: "About Jenkins",
                    href: "about"
                }
            }
        },
        troubleshooting: {
            name: "Troubleshooting",
        },
        toolsAndActions: {
            name: "Tools and Actions",
        },
    },
};
