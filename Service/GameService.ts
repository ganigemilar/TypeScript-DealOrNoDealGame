import { Briefcase } from "../Object/Briefcase";
import { Banker } from "../Object/Banker";
import { Score } from "../Object/Score";
import { Player } from "../Object/Player";

export interface GameService {
    listBriefCase: Briefcase[];
    player: Player;
    myBriefcase: Briefcase;
    banker: Banker;
    score: Score;

    setup(): void;
    start(): void;
    update(): void;
    end(): void;
}