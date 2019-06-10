import { GameActivity } from "./GameActivity";
import { PlayerActivity } from "./PlayerActivity";
import { BankerActivity } from "./BankerActivity";
import { Briefcase } from "../Object/Briefcase";
import { Player } from "../Object/Player";
import { Banker } from "../Object/Banker";
import { Score } from "../Object/Score";

export abstract class DealOrNoDealGameService implements GameActivity, PlayerActivity, BankerActivity {
    playerActivity: PlayerActivity;
    bankerActivity: BankerActivity;
    gameActivity: GameActivity;

    listBriefcases: Briefcase[];
    player: Player;    
    playerBriefcase: Briefcase;
    banker: Banker;
    score: Score;

    readonly round: number = 1;
    private isOnPlaying: boolean;
    readonly limitChoose: number = 6;
    private isAlreadyRunning: boolean;
    readonly TOTAL_BRIEFCASE: number = 22;

    constructor() {
        this.onSetup();
    }

    onSetup(): void {
        this.gameActivity.onSetup();
        
        this.listBriefcases = new Briefcase[this.TOTAL_BRIEFCASE];
        
        this.player = new Player();
        this.player.fullname = this.onGivePlayerName("GGWP Player");

        this.banker = new Banker();
        this.banker.fullname = "Banker Bankrut";

        this.score = new Score();

        this.generateBriefcase();
    }    
    
    onStart(): void {
        this.gameActivity.onStart();
        this.onUpdate();
    }
    
    onUpdate(): void {
        let choosedBriefcases: Briefcase[];
        for (let i = this.limitChoose; i > 0; i--) {
            choosedBriefcases.push(this.giveBriefcase(this.onChooseBriefcase()));
        }

        

        this.gameActivity.onUpdate();
    }
    
    onFinish(): void {
        this.gameActivity.onFinish();
    }

    abstract onInterrupt(): void;

    //Player Activity
    abstract onGivePlayerName(fullname?: string): string;
    abstract onChooseBriefcase(briefcaseNumber?: number): number;
    abstract onEliminateBriefcase(briefcaseNumber?: number): number;
    abstract onSkipOfferingBanker(isAcceptOffering?: boolean): boolean;

    //Banker Activity
    onOffering(playerBriefcase: Briefcase, eliminateBriefcases: Briefcase[]): number {
        return 0;
    }

    private generateBriefcase(): void {
        let listBriefCase: Briefcase = new Briefcase[this.TOTAL_BRIEFCASE];
        let cashes: number[] = [
            1000, 10000, 50000, 100000, 250000, 500000, 1000000, 2000000, 3000000, 4000000, 5000000,
            10000000, 25000000, 50000000, 75000000, 100000000, 250000000, 500000000, 750000000, 1000000000, 2500000000, 5000000000
        ];

        for (let i = 0; i < this.TOTAL_BRIEFCASE; i++) {
            listBriefCase[i] = new Briefcase(i + 1, cashes[i]);
        }

        //Randomize
        for (let i = 0; i < this.TOTAL_BRIEFCASE; i++) {
            let newIndex: number = Math.floor((Math.random() * 22) + 1);
            let currentBriefcase: Briefcase = listBriefCase[i];
            let movedBriefcase: Briefcase = listBriefCase[newIndex];
            listBriefCase[i] = movedBriefcase;
            listBriefCase[newIndex] = currentBriefcase;
        }
    }

    private giveBriefcase(numberBriefcase: number): Briefcase {
        for (let briefcase of this.listBriefcases) {
            if ((<Briefcase> briefcase).id == numberBriefcase) {
                if ((<Briefcase> briefcase).isOpen) {
                    return briefcase;
                }
            }
        }
        return null;
    }

    startGame(): void {
        this.onStart();
    }
}