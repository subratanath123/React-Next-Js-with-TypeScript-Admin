'use client'
import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
    <UserProfile path="/profile"/>
);

export default UserProfilePage;