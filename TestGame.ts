import { DealOrNoDealGameService } from "./Service/Experimental/DealOrNoDealGameService";
import { Briefcase } from "./Object/Briefcase";

export class TestGame extends DealOrNoDealGameService {
    
    onInterrupt(): void {
        console.log("call interrupt!");
    }    
    
    onGivePlayerName(fullname?: string): string {
        return "GG COY";
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
        let msg: string = `Offering Banker : ${ offering }`;
        console.log(msg);
    }

    onFinish(): void {
        console.log("FINISH!!!!!!!");
    }
}

let testCoy: TestGame = new TestGame();
testCoy.startGame();