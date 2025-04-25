import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

//Export routes for Next APP Router
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});