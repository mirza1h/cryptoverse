import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_HOST
}

const baseUrl = process.env.REACT_APP_NEWS_URL;
const createRequest = (url) => { return { url, headers: cryptoApiHeaders } };

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({ query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`) })
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi;