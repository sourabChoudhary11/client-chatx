export const chats = [
    {
        avatar: [
            "https://www.w3schools.com/howto/img_avatar.png",
            "https://www.w3schools.com/howto/img_avatar.png",
            "https://www.w3schools.com/howto/img_avatar.png",
        ],
        name: "John",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    }, {
        avatar: [
            "https://www.w3schools.com/howto/img_avatar.png"
        ],
        name: "Brey",
        _id: "2",
        groupChat: false,
        members: ["1", "2"],
    }
]


export const users = [
    {
        avatar: "",
        name: "Hubert Blaine sldkf lsfldl fsld fls Sr. ",
        _id: "1",
    }, {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Brey",
        _id: "2",
    }
]

export const dummyNotification = [
    {
        _id: "1",
        sender: {
            avatar: "",
            name: "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr. ",
        }
    },
    {
        _id: "2",
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Brey",
        },
    }
]

export const dummyMessages = [
    {
        attachments: [],
        content: "hey",
        _id: "ksdjfksfdjdjf",
        sender: {
            _id: "user.id",
            name: "Chaturvedi Sharma"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
        attachments: [],
        content: "hi",
        _id: "ksdjfksfdjdjf",
        sender: {
            _id: "kdfjsdjf",
            name: "Manho"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
        attachments: [
            {
                public_id: "jdkfskf",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            }
        ],
        content: "",
        _id: "ksdjfksfdjdjf",
        sender: {
            _id: "kdfjsdjf",
            name: "Manho"
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z"
    }
]

export const dashboardData = {
    users: [
        {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Hubert",
            _id: "1",
            username: "hubert233",
            friends: 5,
            groups: 2
        },
        {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Hanma",
            _id: "2",
            username: "hanmahiui898",
            friends: 20,
            groups: 5
        }
    ],
    chats: [
        {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Movie Group",
            _id: "1",
            creator: {
                name: "Hanesh",
                avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            },
            groupChat: false,
            members: [
                {
                    _id: '1',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                },
                {
                    _id: '2',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            totalMembers: 2,
            totalMessages: 35
        },
        {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Learners Group",
            _id: "2",
            creator: {
                name: "Amit Shah",
                avatar: [
                    "https://www.w3schools.com/howto/img_avatar.png"
                ],
            },
            groupChat: true,
            members: [
                {
                    _id: '1',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                },
                {
                    _id: '2',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                },
                {
                    _id: '3',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                },
                {
                    _id: '4',
                    avatar: "https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            totalMembers: 4,
            totalMessages: 72
        }
    ],
    messages: [
        {
            _id: "ksdjfkjsdkjf",
            attachments: [],
            content: "Hey Bro",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Sundaru"
            },
            chat:"chatId",
            groupChat: false,
            createdAt: "2024-02-12T10:41:30.630Z"
        },
        {
            _id: "sdkjfksjdlfs",
            attachments: [{
                public_id: "wkjek",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            }],
            content: "",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Rohanu"
            },
            chat:"chatId",
            groupChat: true,
            createdAt: "2024-02-12T10:41:30.630Z"
        }
    ]
}