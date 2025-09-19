import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config.js";


const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1`
    }),
    tagTypes: ["Chat", "User", "Message"],

    endpoints: (builder) => ({

        loginUser: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                credentials: "include",
                body: data
            }),
        }),

        registerUser: builder.mutation({
            query: (data) => ({
                url: "/user/register",
                method: "POST",
                credentials: "include",
                body: data
            }),
        }),

        myChats: builder.query({
            query: () => ({
                url: "/chat/my",
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),

        chatDetails: builder.query({
            query: ({ chatId, populate }) => {
                let url = `/chat/${chatId}`;
                if (populate) url += '?populate=true';

                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags: ["Chat"]
        }),

        getMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `/chat/message/${chatId}?page=${page}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0
        }),

        searchUser: builder.query({
            query: (name) => ({
                url: `/user/search?name=${name}`,
                credentials: "include",
            }),
            providesTags: ["User"]
        }),

        getNotifications: builder.query({
            query: () => ({
                url: '/user/notifications',
                credentials: "include",
            }),
            keepUnusedDataFor: 0
        }),

        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "/user/send-request",
                method: "POST",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["User"],
        }),

        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "/user/accept-request",
                method: "DELETE",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),

        sendAttachments: builder.mutation({
            query: (data) => ({
                url: "/chat/message",
                method: "POST",
                credentials: "include",
                body: data
            })
        }),

        myGroups: builder.query({
            query: () => ({
                url: "/chat/my/groups",
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),

        newGroup: builder.mutation({
            query: (data) => ({
                url: "/chat/new",
                method: "POST",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),

        renameGroup: builder.mutation({
            query: ({ chatId, name }) => ({
                url: `/chat/${chatId}`,
                method: "PUT",
                credentials: "include",
                body: { name }
            }),
            invalidatesTags: ["Chat"]
        }),

        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `/chat/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        }),

        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `/chat/leave/${chatId}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ["Chat"]
        }),

        addMembersInGroup: builder.mutation({
            query: (data) => ({
                url: "/chat/add-members",
                method: "PUT",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),

        removeGroupMember: builder.mutation({
            query: (data) => ({
                url: "/chat/remove-member",
                method: "DELETE",
                credentials: "include",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),

        myFriends: builder.query({
            query: (chatId) => ({
                url: `/user/friends?chatId=${chatId || ''}`,
                credentials: "include",
            }),
            providesTags: ["Chat"]
        }),

        // ------------ admin --------------

        getAdmin: builder.query({
            query: () => ({
                url: "/admin",
                credentials: "include",
            })
        }),

        loginAdmin: builder.mutation({
            query: (secretKey) => ({
                url: "/admin/verify",
                method: "POST",
                credentials: "include",
                body: {
                    secretKey
                }
            })
        }),

        getDashboardStats: builder.query({
            query: () => ({
                url: "/admin/stats",
                credentials: "include",
            })
        }),

        getChatsStats: builder.query({
            query: () => ({
                url: "/admin/chats",
                credentials: "include",
            })
        }),

        getMessagesStats: builder.query({
            query: () => ({
                url: "/admin/messages",
                credentials: "include",
            })
        }),

        getUsersStats: builder.query({
            query: () => ({
                url: "/admin/users",
                credentials: "include",
            })
        }),
    })
})

export default api;

export const { useLoginUserMutation, useRegisterUserMutation, useMyChatsQuery, useLazyGetMessagesQuery, useGetMessagesQuery, useChatDetailsQuery, useLazySearchUserQuery, useSendFriendRequestMutation, useGetNotificationsQuery, useAcceptFriendRequestMutation, useSendAttachmentsMutation, useMyGroupsQuery, useMyFriendsQuery, useNewGroupMutation, useRenameGroupMutation, useAddMembersInGroupMutation, useRemoveGroupMemberMutation, useDeleteChatMutation, useLeaveGroupMutation, useGetAdminQuery, useLoginAdminMutation, useGetDashboardStatsQuery, useGetMessagesStatsQuery, useGetUsersStatsQuery, useGetChatsStatsQuery } = api;