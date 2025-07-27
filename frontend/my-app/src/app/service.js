import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    // GET all notes
    getNotes: builder.query({
      query: () => "/api/v1/notes",
    }),
    getSummary:builder.query({
        query:()=>"/api/v1/notes/summary"
    }) ,

    // POST a new note
    postNotes: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/notes",
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // DELETE a note
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/api/v1/notes/${id}`,
        method: "DELETE",
      }),
    }),
    //update note 
    
    upDateNote:builder.mutation({
        query:({id,payload})=>({
            url:`/api/v1/notes/${id}` ,
            method:"PATCH",
            body:payload ,
             headers: {
          "Content-Type": "application/json",
        },


        })
    })
  }),
});

// Export hooks
export const {
  useGetNotesQuery,
  usePostNotesMutation,
  useDeleteNoteMutation,
  useUpDateNoteMutation ,
  useGetSummaryQuery
} = apiSlice;
