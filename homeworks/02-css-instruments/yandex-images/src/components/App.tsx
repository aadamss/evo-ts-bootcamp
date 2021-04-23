import React from 'react';
import styled from 'styled-components';
import pixabay, {GetResponse, GetData} from './ApiLogic';
import ImageList from './ImageSearch';

const Div = styled.div`
    margin-top: 20px;
    margin-left: 20px;
`;

type AppProperties = {
};

type Status = {
    images: GetData[]
};

type SearchProperties = {
    search: (term: string) => Promise<void>;
};

type SearchState = {
    text: string;
};

class ImageSearch extends React.Component<SearchProperties, SearchState> {
    state = { text: '' };

    newSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: event.target.value });
    };

    submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.search(this.state.text);
    };

    render(): React.ReactNode {
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={this.submit}>
                    <div className="field">
                        <label>Image Search</label>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.newSearch}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

class App extends React.Component<AppProperties, Status> {
    state = { images: [] };

    search = async (term: string): Promise<void> => {
        const response = await pixabay.get<GetResponse>('/', { params: { q: term } });
        this.setState({ images: response.data.hits });
    };

    public render(): React.ReactNode {
        return (
            <Div className="UI">
                <ImageSearch search={this.search}/>
                <ImageList images={this.state.images} />
            </Div>
        );
    }
}

export default App;
