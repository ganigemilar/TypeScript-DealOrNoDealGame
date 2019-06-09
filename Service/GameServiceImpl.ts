import { GameService } from "./GameService";
import { Briefcase } from "../Object/Briefcase";
import { Banker } from "../Object/Banker";
import { Score } from "../Object/Score";
import { Player } from "../Object/Player";
import { GameActivity } from "./GameActivity";
import { PlayerActivity } from "./PlayerActivity";
import { BankerActivity } from "./BankerActivity";

export class GameServiceImpl implements GameService {
    listBriefCase: Briefcase[];
    player: Player;    
    myBriefcase: Briefcase;
    banker: Banker;
    score: Score;
    
    readonly round: number = 1;
    private isOnPlaying: boolean;
    private limitChoose: number = 6;
    private isAlreadyRunning: boolean;
    readonly TOTAL_BRIEFCASE: number = 22;

    gameActivity: GameActivity;
    playerActivity: PlayerActivity;
    bankerActivity: BankerActivity;

    constructor() {
        this.setup();
    }

    setup(): void {
        this.listBriefCase = new Briefcase[this.TOTAL_BRIEFCASE];
        
        this.banker = new Banker();
        this.banker.fullname = "Banker COY";

        this.score = new Score();

        this.player = new Player();

        //TODO : onSetup activity()
        this.gameActivity.onSetup();

        //TODO : give player name()
        this.playerActivity.onGivePlayerName();
    }

    start(): void {
        this.isOnPlaying = true;
        if (!this.isAlreadyRunning) {
            //TODO : onStart()
            this.gameActivity.onStart();
            this.generateBriefcase();
            this.isAlreadyRunning = true;
            //TODO : act choose briefcase for player()
            this.playerActivity.onChooseBriefcase();
            this.update();   
        }
    }

    update(): void {
        for (let i = this.limitChoose; i > 0; i--) {
            //TODO : act eliminate briefcase()
            this.playerActivity.onEliminateBriefcase();
        }
        //TODO : act offering by banker();
        this.offeringByBanker(null, null);
    }

    end(): void {
        this.isOnPlaying = false;
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

    private offeringByBanker(playerBriefcase: Briefcase, currentEliminateBriefcases: Briefcase[]) {
        this.bankerActivity.onOffering();
    }

    eliminateBriefcase(numberBriefcase: Briefcase): Briefcase {
        return null;
    }
}