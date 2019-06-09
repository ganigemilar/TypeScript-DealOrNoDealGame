export interface GameActivity {
    onSetup(): void;
    onStart(): void;
    onUpdate(): void;
    onFinish(): void;   
}