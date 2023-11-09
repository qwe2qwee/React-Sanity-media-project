import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client } from "../client";
import { useNavigate } from "react-router-dom";




const AddCommentt = ({ user, pinId,pinDetail}) => {
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState("");
  const nav= useNavigate()


  const addComment = () => {

    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          setComment("");
          
          setAddingComment(false);
          nav(`/`, { replace: true });
        });
    }
  };

  return (
    <Fragment>
      <h2 className='mt-5-2xl'>Comments</h2>
      <div className='max-h-370 overflow-y-auto'>
        {pinDetail?.comments?.map((item, i) => (
          <div
            className='flex gap-2 mt-5 items-center bg-white rounded-lg'
            key={i}>
            <img
              src={item?.postedBy.image}
              alt='user-profile'
              className='w-10 h-10 rounded-full cursor-pointer'
            />
            <div className='flex flex-col'>
              <p className='font-bold'>{item?.postedBy.userName}</p>
              <p>{item?.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap mt-6 gap-3'>
        <Link to={`user-profile/${pinDetail?.postedBy?._id}`}>
          {" "}
          <img
            src={user?.image}
            alt='postBy'
            className=' w-10 h-10 rounded-full cursor-pointer'
          />
        </Link>
        <input
          className=' flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
          type='text'
          placeholder='Add a comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='button'
          className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
          onClick={addComment}>
          {addingComment ? "Posting the comment..." : "Post"}
        </button>
      </div>
    </Fragment>
  );
};

export default AddCommentt;
