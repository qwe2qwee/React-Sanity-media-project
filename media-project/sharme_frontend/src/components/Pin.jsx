import React, { useState } from "react";
import { urlFor, client } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";
const Pin = ({ pin }) => {
  const { postedBy, image, _id, destination } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();
  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <div className='m-2'>
      <div
        className='relative  cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onTouchMove={() =>
          setTimeout(() => {
            setPostHovered(false);
          }, 2000)
        }
        onTouchStart={() => setPostHovered(true)}
        onClick={() => navigate(`/pin-detail/${_id}`)}>
        <img
          className='rounded-lg w-full'
          alt='user-pin'
          src={urlFor(image).url()}
        />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: "100%" }}>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                  {pin?.save?.length} Save
                </button>
              )}
            </div>
            <div className=' flex justify-between items-center gap-2 w-full'>
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target='_blank'
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                  rel='noreferrer'>
                  {" "}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {postedBy?._id === user?.googleId && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none '>
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className=' flex gap-2 mt-2 items-center'>
        {" "}
        <img
          src={postedBy?.image}
          alt='postBy'
          className=' w-8 h-8 rounded-full object-cover'
        />
        <p className=' font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
