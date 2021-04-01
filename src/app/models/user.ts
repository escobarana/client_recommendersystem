export class User{
    constructor(public _id: String,
                public name: String,
                public email: String,
                public password: String,
                public isAdmin: Boolean,
                public list_recommend: [],
                public list_assign: [],
                public list_remove: [],
                public role: String)
                { }
}