import { apiSlice } from './apiSlice';

const BLOG_URL = '/blogs';

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: `${BLOG_URL}`,
        method: 'GET',
      }),
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: 'GET',
      }),
    }),
    postBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/upload`,
        method: `POST`,
        body: data,
      }),
    }),
    viewUserBlog: builder.query({
      query: (userId) => ({
        url: `${BLOG_URL}/myBlogs`,
        method: 'GET',
      }) 
    }),
    updateBlog: builder.mutation({
      query: ({id, data}) => ({
        url: `${BLOG_URL}/update/${id}`,
        method: 'PUT',
        body: data,
      })
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/delete/${id}`,
        method: 'DELETE',
      })
    })
  }),
});


export const {useGetBlogsQuery, useGetBlogByIdQuery, usePostBlogMutation, useViewUserBlogQuery,
  useUpdateBlogMutation, useDeleteBlogMutation
} = blogApiSlice;