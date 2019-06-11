import { Briefcase } from "../Object/Briefcase";

export interface BankerActivity {
    onOffering(playerBriefcase: Briefcase, eliminateBriefcases: Briefcase[]): bigint;
}