export const jenkinsData = {
	jobName: "Freestyle project",
	buildTriggers: {
		triggerBuildRemotely: "Trigger builds remotely (e.g., from scripts)",
		buildAfterOtherProjects: "Build after other projects are built",
		buildPeriodically: "Build periodically",
		gitHubHookTrigger: "GitHub hook trigger for GITScm polling",
		pollSCM: "Poll SCM",
		buildAfterOtherProjectsOptions: {
			triggerOnlyIfStable: "Trigger only if build is stable",
			triggerEvenIfUnstable: "Trigger even if the build is unstable",
			triggerEvenIfFailed: "Trigger even if the build fails",
			triggerEvenIfAborted: "Always trigger, even if the build is aborted",
		},
	},
};