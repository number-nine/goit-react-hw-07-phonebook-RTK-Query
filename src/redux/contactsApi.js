import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://648c0cd78620b8bae7ec20f0.mockapi.io',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `contacts`,
      providesTags: ['Contacts'],
    }),
    deleteContactById: builder.mutation({
      query: id => ({ url: `contacts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: values => ({ url: `contacts/`, method: 'POST', body: values }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useDeleteContactByIdMutation,
  useAddContactMutation,
} = contactsApi;
