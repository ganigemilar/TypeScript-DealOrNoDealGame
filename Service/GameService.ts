import { Briefcase } from "../Object/Briefcase";
import { Banker } from "../Object/Banker";
import { Score } from "../Object/Score";

export interface GameService {
    listBriefCase: Briefcase[];
    myBriefcase: Briefcase;
    banker: Banker;
    score: Score;
    isOnPlaying: boolean;

    setup(): void;
    start(): void;
    update(): void;
    end(): void;
}