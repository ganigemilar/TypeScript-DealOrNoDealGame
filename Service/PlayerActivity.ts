export interface PlayerActivity {
    onGivePlayerName(fullname: string): string;
    onChooseBriefcase(briefcaseNumber: number): number;
    onEliminateBriefcase(briefcaseNumber: number): number;
    onSkipOfferingBanker(isAcceptOffering: boolean): boolean;
    onGetOfferingByBanker(offering: number): void;
}