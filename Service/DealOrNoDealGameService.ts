import { GameActivity } from "./GameActivity";
import { PlayerActivity } from "./PlayerActivity";
import { BankerActivity } from "./BankerActivity";
import { Briefcase } from "../Object/Briefcase";
import { Player } from "../Object/Player";
import { Banker } from "../Object/Banker";
import { Score } from "../Object/Score";

export abstract class DealOrNoDealGameService implements GameActivity, PlayerActivity, BankerActivity {
    listBriefcases: Briefcase[] = [];
    player: Player;    
    playerBriefcase: Briefcase;
    banker: Banker;
    score: Score;

    private round: number = 1;
    private isOnPlaying: boolean;
    private limitChoose: number = 6;
    private isLastRound: boolean;
    
    readonly TOTAL_BRIEFCASE: number = 22;

    //Player Activity
    abstract onGivePlayerName(fullname?: string): string;
    abstract onChooseBriefcase(briefcaseNumber?: number): number;
    abstract onEliminateBriefcase(briefcaseNumber?: number): number;
    abstract onMakeDecisionOfferingBanker(isAcceptOffering?: boolean): boolean;
    abstract onGetOfferingByBanker(offering: number): void;

    constructor() {
        this.onSetup();
    }

    onSetup(): void {
        this.player = new Player();
        this.player.fullname = this.onGivePlayerName("GGWP Player");

        this.banker = new Banker();
        this.banker.fullname = "Banker Bankrut";

        this.score = new Score();

        this.generateBriefcase();
    }    
    
    onStart(): void {
        //this.gameActivity.onStart();
        this.onUpdate();
    }
    
    onUpdate(): void {
        this.printInfo();
        
        this.isOnPlaying = true;

        //First time to get briefcase
        if (this.playerBriefcase === undefined) {
            this.playerBriefcase = this.giveBriefcase(this.onChooseBriefcase());
        }

        //Eliminate briefcase
        let choosedBriefcases: Briefcase[] = [];
        for (let i = this.limitChoose; i > 0; i--) {
            choosedBriefcases.push(this.giveBriefcase(this.onEliminateBriefcase()));
        }

        let bankerOffer = this.onOffering(this.playerBriefcase, choosedBriefcases);
        this.onGetOfferingByBanker(bankerOffer);
        this.onMakeDecisionOfferingBanker();

        this.onInterrupt();

        this.round++;
        if (this.limitChoose - 1 > 0) {
            this.limitChoose--;
        } else {
            if (this.isLastRound) {
                this.isOnPlaying = false;
                this.onFinish();
            }
            this.isLastRound = true; 
        }

        if (this.isOnPlaying) {
            this.onUpdate();
        }
    }
    
    onFinish(): void {
        
    }

    onInterrupt(): void {

    }

    //Banker Activity
    onOffering(playerBriefcase: Briefcase, eliminateBriefcases: Briefcase[]): number {
        return 696969696969;
    }

    private generateBriefcase(): void {
        let cashes: number[] = [
            1000, 10000, 50000, 100000, 250000, 500000, 1000000, 2000000, 3000000, 4000000, 5000000,
            10000000, 25000000, 50000000, 75000000, 100000000, 250000000, 500000000, 750000000, 1000000000, 2500000000, 5000000000
        ];

        //Create list briefcase
        for (let i = 1; i <= this.TOTAL_BRIEFCASE; i++) {
            this.listBriefcases.push(new Briefcase(0, cashes[i - 1]));
        }

        //Randomize
        for (let i = 1; i <= this.TOTAL_BRIEFCASE; i++) {
            let newIndex: number = Math.floor(Math.random() * 22);
            let currentBriefcase: Briefcase = this.listBriefcases[i - 1];
            currentBriefcase.id = newIndex + 1;
            let movedBriefcase: Briefcase = this.listBriefcases[newIndex];
            movedBriefcase.id = i;
            this.listBriefcases[i - 1] = movedBriefcase;
            this.listBriefcases[newIndex] = currentBriefcase;

            if (currentBriefcase === undefined || movedBriefcase === undefined) {
                throw new Error(`${ currentBriefcase === undefined }[${ i }] or ${ movedBriefcase === undefined}[${ newIndex }]`);
            }
        }
    }

    private giveBriefcase(numberBriefcase: number): Briefcase {
        for (let briefcase of this.listBriefcases) {
            if ((<Briefcase> briefcase).id == numberBriefcase) {
                if (!(<Briefcase> briefcase).isOpen) {
                    briefcase.isOpen = true;
                    return briefcase;
                }
            }
        }
        return null;
    }

    startGame(): void {
        this.onStart();
    }

    private printInfo(): void {
        console.log(this);
    }
}