import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface contextProps {
    params: {
        postId: string;
    }
}
// delete post function
export async function DELETE(req: Request, context: contextProps) {
    try {
        // const body = await req.json();
        // console.log(body);
        const {params} = context
        await db.post.delete({
            where: {
                id: params.postId
            }
        })
        // console.log(post);
        return new Response (null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" + error }, { status: 500 });  
    }
}

// patch post function for updating post
export async function PATCH(req: Request, context: contextProps) {
    try {
        const body = await req.json();
        // console.log(body);
        const {params} = context
        await db.post.update({
            where: {
                id: params.postId
            },
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tagId
            }
        })
        // console.log(post);
        return NextResponse.json({message: "Successfully Updated"}, {status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" + error }, { status: 500 });  
    }
}


// get post by id function

// export async function GET(req: Request, context: contextProps) {
//     try {
//         const {params} = context;
//         const post = await db.post.findFirst({
//             where: {
//                 id: params.postId
//             },
//             include: {
//                 tag: true
//             }
//         });
//         return NextResponse.json(post, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: "Internal Server Error" + error }, { status: 500 });  
//     }
// }

// export async function GET(req: NextRequest, context: { params: { postId: string } }) {
//     try {
//         const { params } = context;
//         const post = await db.post.findFirst({
//             where: {
//                 id: params.postId
//             },
//             include: {
//                 tag: true
//             }
//         });

//         if (!post) {
//             return NextResponse.json({ message: "Post not found" }, { status: 404 });
//         }

//         return NextResponse.json(post, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: "Internal Server Error: " + error }, { status: 500 });
//     }
// }

interface Context {
    params: {
      postId: string;
    };
  }

export async function GET(req: NextRequest, { params }: Context) {
    try {
        const post = await db.post.findFirst({
            where: {
                id: params.postId
            },
            include: {
                tag: true
            }
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error: " + error }, { status: 500 });
    }
}