import { apiSlice } from './apiSlice';
import { BLOGS_URL, UPLOADS_URL } from '../constants';

export const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => ({
                url: BLOGS_URL,
            }),
            keepUnusedDataFor: 5,
        }),

        getUserBlogs: builder.query({
            query: () => ({
                url: `${BLOGS_URL}/myblogs`,
            }),
            providesTags: ['Blogs'],
        }),

        getBlogData: builder.query({
            query: (blogId) => ({
                url: `${BLOGS_URL}/${blogId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        createABlog: builder.mutation({
            query: (data) => ({
                url: BLOGS_URL,
                method: 'POST',
                body: data
            })
        }),
        uploadBlogImage: builder.mutation({
            query: (data) => ({
                url: UPLOADS_URL,
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const { useGetAllBlogsQuery, useGetBlogDataQuery, useCreateABlogMutation, useUploadBlogImageMutation, useGetUserBlogsQuery } = blogsApiSlice;