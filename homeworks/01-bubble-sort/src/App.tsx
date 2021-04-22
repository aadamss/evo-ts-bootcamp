import React from 'react';
import './App.css';
import {sortingStates, gameOver, newSortingState, Status, Sorting, SortVisualization} from './Components/BubbleSorting'

interface Properties {
    count: number
    height: number
}

interface AppState {
    gameState: Status
    interval: null | ReturnType<typeof window.setTimeout>
}

class App extends React.Component<Properties, AppState> {
    constructor(props: Properties) {
        super(props)
        this.state = this.newGame()
    }

    start(): void {
        const interval = setInterval(() => this.phase(), 50);

        this.setState({
            gameState: this.state.gameState,
            interval: interval,
        });
    }

    stop(): void {
        if (this.state.interval) {
            clearInterval(this.state.interval);
        }

        this.setState({
            gameState: this.state.gameState,
            interval: null
        });
    }

    newGame(): AppState {
        return {
            gameState: newSortingState(this.props.count, this.props.height),
            interval: null,
        }
    }

    restartGame(): void {
        this.stop()
        this.setState(this.newGame())
    }

    phase(): void {
        const newGame = sortingStates(this.state.gameState)

        if (gameOver(newGame)) {
            this.stop()
        }

        this.setState({
            gameState: newGame,
            interval: this.state.interval,
        })
    }

    render(): JSX.Element | null {
        const status = gameOver(this.state.gameState)
            ? Sorting.Sorted
            : (this.state.interval ? Sorting.Sorting : Sorting.Stopped)

        return (
            this.state
                ? <SortVisualization
                    state={this.state.gameState}
                    status={status}
                    height={this.props.height}
                    newGame={this.restartGame}
                    start={() => this.start()}
                    stop={() => this.stop()}
                />
                : null
        );
    }
}

export default App;
