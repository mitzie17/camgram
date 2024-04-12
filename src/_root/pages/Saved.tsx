import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import React from "react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const savedPosts = currentUser?.save.map((savedPost: Models.Document) => ({
    ...savedPost.post,
    creator: { imageUrl: currentUser.imageUrl },
  }));
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/save.svg"
            width={30}
            height={30}
            alt="save"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
        {!currentUser ? (
          <Loader />
        ) : (
          <ul className="w-full flex justify-center max-w-5xl gap-9">
            {savedPosts.length === 0 ? (
              <p className="text-light-4">No available posts</p>
            ) : (
              <GridPostList posts={savedPosts} showStats={false} />
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Saved;
