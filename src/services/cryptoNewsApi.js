import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '46fc5a5e9bmsha247dce2bf46bb2p12df5cjsn242e4c05ed1b',
    'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
}

const baseUrl = 'https://news-api14.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/search?q=${newsCategory}&pageSize=${count}`)
        })
    })
});

export const { useGetCryptoNewsQuery, } = cryptoNewsApi;