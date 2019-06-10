import { DealOrNoDealGameService } from "./Service/DealOrNoDealGameService";
import { Briefcase } from "./Object/Briefcase";

export class TestGame extends DealOrNoDealGameService {
    
    onInterrupt(): void {
        console.log("call interrupt!");
    }    
    
    onGivePlayerName(fullname?: string): string {
        return "Gani Gemilar";
    }
    
    onChooseBriefcase(briefcaseNumber?: number): number {
        return 1;
    }
    
    onEliminateBriefcase(briefcaseNumber?: number): number {
        for (let briefcase of this.listBriefcases) {
            if (!(<Briefcase> briefcase).isOpen) {
                return briefcase.id;
            }
        }
    }
    
    onSkipOfferingBanker(isAcceptOffering?: boolean): boolean {
        return true;
    }
    
    onGetOfferingByBanker(offering: number): void {
        console.log("Offering Banker : ${offering}");
    }
}

let testCoy: TestGame = new TestGame();
testCoy.startGame();