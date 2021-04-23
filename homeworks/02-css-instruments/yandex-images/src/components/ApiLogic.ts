import axios from 'axios';

const minCount = 50;
const maxCount = 100;

export type GetData = {
  id: number;
  largeImageURL: string;
};

export type GetResponse = {
  hits: GetData[];
};

export default axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '21302486-c9442f216492c4ea888a94acc',
    per_page: Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount,
  },
});
