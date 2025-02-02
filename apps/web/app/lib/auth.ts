import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import { db } from "@repo/db/db";
import { to } from "@react-spring/web";

export const NEXTAUTH = {
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                username:{label:"Username", placeholder:"Username"},
                email:{label:"Email", placeholder:"Email"},
                password:{label:"password",placeholder:"password"}
            },
            async authorize(credentials:any){
                // console.log(credentials)
                const username = credentials.username
                const email = credentials.email
                const password = credentials.password
                return (
                    {
                    id:username,
                    email:email,
                    password:password
                }
                )
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    
    callbacks: {
        jwt: async ({ user, token }: any) => {
            // console.log("user is " ,user)
            // console.log("token0 is :",token)
            if (user) {
                token.uid = user.id;
                token.username = user.name
                token.pass = user.password
                // console.log("token is : ",token)
            }
            return token;
        },
      session: async({ session, token }: any) => {
        // console.log("session and token : ",session,token)
        try {
            const response = await db.user.findUnique({
                where:{
                    email:token.email,
                }
            })
            if(!response?.userid) {
                const res = await db.user.create({
                    data:{
                        username:token.sub,
                        password:token.pass,
                        email:token.email
                    }
                })
                const userid = res.userid
                if (session.user) {
                    // console.log("session : ",session.user)
                      session.user.name = token.uid
                      session.user.userid = userid
                      session.user.password = token.pass
                      session.user.email = token.email
                }
                return session
            }
            else {
                session.user.name = response.username
                session.user.userid = response.userid
                session.user.password = response.password
                session.user.email = response.email
                return session
            }
        }catch(err) {
            console.log("there is some error in prisma : " , err)
        }
      }
    },
}

//73355f71-2a01-430b-a2f2-d01c0d4e3bfa