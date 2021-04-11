import React from 'react';
import './App.css';
import {sortingStates, gameOver, newSortingState, Status, Sorting, SortVisualization} from './Components/BubbleSorting'

interface Properties {
    count: number
    height: number
}

interface AppState {
    state: Status
    interval: null | ReturnType<typeof setTimeout>
}

class App extends React.Component<Properties, AppState> {
    constructor(props: Properties) {
        super(props)
        this.state = this.newGame()
    }

    start() {
        const interval = setInterval(() => this.phase(), 50);

        this.setState({
            state: this.state.state,
            interval: interval,
        });
    }

    stop() {
        if (this.state.interval) {
            clearInterval(this.state.interval);
        }

        this.setState({
            state: this.state.state,
            interval: null
        });
    }

    newGame() {
        return {
            state: newSortingState(this.props.count, this.props.height),
            interval: null,
        }
    }

    restartGame() {
        this.stop()
        this.setState(this.newGame())
    }

    phase() {
        const newGame = sortingStates(this.state.state)

        if (gameOver(newGame)) {
            this.stop()
        }

        this.setState({
            state: newGame,
            interval: this.state.interval,
        })
    }

    render() {
        const status = gameOver(this.state.state)
            ? Sorting.Sorted
            : (this.state.interval ? Sorting.Sorting : Sorting.Stopped)

        return (
            this.state
                ? <SortVisualization
                    state={this.state.state}
                    status={status}
                    height={this.props.height}
                    newGame={() => this.restartGame()}
                    start={() => this.start()}
                    stop={() => this.stop()}
                />
                : null
        );
    }
}

export default App;
