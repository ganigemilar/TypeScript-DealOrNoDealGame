import { GameService } from "./GameService";
import { Briefcase } from "../Object/Briefcase";
import { Banker } from "../Object/Banker";
import { Score } from "../Object/Score";

export class GameServiceImpl implements GameService {
    listBriefCase: Briefcase[];    
    myBriefcase: Briefcase;
    banker: Banker;
    score: Score;
    isOnPlaying: boolean;
    
    readonly round: number = 1;
    private limitChoose: number = 6;
    private isAlreadyRunning: boolean;

    constructor() {
        this.setup();
    }

    setup(): void {
        this.listBriefCase = new Briefcase[26];
        
        this.banker = new Banker();
        this.banker.fullname = "Banker COY";

        this.score = new Score();
    }

    start(): void {
        this.isOnPlaying = true;
        if (!this.isAlreadyRunning) {
            this.generateBriefcase();
            this.isAlreadyRunning = true;   
        }
    }

    update(): void {

    }

    end(): void {
        this.isOnPlaying = false;
    }

    private generateBriefcase(): void {

    }
}