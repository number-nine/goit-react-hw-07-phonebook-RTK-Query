import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://648c0cd78620b8bae7ec20f0.mockapi.io',
  }),
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `contacts`,
    }),
    deleteContactById: builder.mutation({
        query: ({ id }) => `contacts/${id}`,
        mathod: 'DELETE',
    }),
  }),
});


export const { useGetAllContactsQuery, useDeleteContactByIdMutation } = contactsApi;