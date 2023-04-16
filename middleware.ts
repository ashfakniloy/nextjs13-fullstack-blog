export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/add-post", "/edit-post", "/my-profile/:path*"],
};
