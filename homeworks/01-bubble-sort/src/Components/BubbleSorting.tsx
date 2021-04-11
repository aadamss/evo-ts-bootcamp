import React from 'react'
import {Ord, ord, ordNumber} from 'fp-ts/Ord';

export enum Sorting {
    Sorting,
    Stopped,
    Sorted,
}

interface SortingProperties {
    newGame: () => void
    start: () => void
    stop: () => void
    height: number
    state: Status
    status: Sorting
}

interface Props {
    value: number
    id: string
}

export interface Status {
    array: ReadonlyArray<Props>
    i: number
    j: number
}

export function newSortingState(count: number, max: number): Status {
    const array: ReadonlyArray<Props> = generateArray(count, max)
        .map((x, idx) =>
            ({
                value: x,
                id: `element-${idx}`,
            })
        )

    return {
        array,
        i: 0,
        j: -1,
    }
}

const generateArray = (length: number, max: number) => [...new Array(length)].map(() => Math.round(Math.random() * max));

export const gameOver = (state: Status): Boolean =>
    state.i >= state.array.length;

const ordering: Ord<Props> = ord.contramap(ordNumber, (x: Props) => x.value)

export function sortingStates(state: Status): Status {
    const [i, j] = (state.j < state.array.length - 2 - state.i)
        ? [state.i, state.j + 1]
        : [state.i + 1, 0]

    const array = state.array.slice();
    if (i < state.array.length) {
        if (ordering.compare(array[j], array[j + 1]) === 1) {
            let tmp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = tmp;
        }
    }

    return {
        array,
        i: i,
        j: j,
    };
}

export function SortVisualization(props: SortingProperties) {
    const {height, state, status, newGame, start, stop} = props

    return (
        <main className="app">
            <div className="array" style={{height: height + "px"}}>
                {
                    state.array.map((x) => (
                        <div
                            className="element"
                            style={{height: x.value + "px"}}
                            key={x.id}
                            title={`${x.id}, value ${x.value}`}
                        />
                    ))
                }
            </div>
            <div className="buttons">
                <button onClick={newGame}>New Game</button>
                {status === Sorting.Stopped ? <button onClick={start}>Start</button> : null}
                {status === Sorting.Sorting ? <button onClick={stop}>Stop</button> : null}
                {status === Sorting.Sorted ? <button disabled>Sorted</button> : null}
            </div>
        </main>
    )
}