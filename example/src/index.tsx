import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { InfiniteScroll } from '@ezraobiwale/react-infinite-scroll';

const BASE_URL = 'https://api.publicapis.org/entries';

const [url, setUrl] = useState(BASE_URL);
const [data, setData] = useState([]);

const fetchData = async (page: number) => {
    const newUrl = `${BASE_URL}?page=${page}`;
    const response = await fetch(newUrl)
    setUrl(newUrl);
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <div>
            <h2>Infinite scroll</h2>
            <InfiniteScroll id="test" fetchData={fetchData} url={url}/>
        </div>
    </React.StrictMode>,
);
