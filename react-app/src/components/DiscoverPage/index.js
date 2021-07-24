import './DiscoverPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getNewUsers, removeUser } from '../../store/discover';
import { createLike } from '../../store/likes';
import { getCurrentUserAndAnswers } from '../../store/session';
import { createDislike } from '../../store/dislikes';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { GiWeight } from 'react-icons/gi';
import { FiUser, FiMapPin } from 'react-icons/fi';

const DiscoverPage = () => {
  const dispatch = useDispatch();
  const allUsersNotLiked = useSelector((state) =>
    Object.values(state.discover)
  );
  const allUsersNotLikedObj = useSelector((state) => state.discover);
  const { user } = useSelector((state) => state.session);
  const id = Number(user.id);
  const firstUser = allUsersNotLiked[0]
    ? allUsersNotLiked[0]
    : 'No more users to display!';

  const [likeButton, setLikeButton] = useState('/like-button-unclicked.png');
  const [dislikeButton, setDislikeButton] = useState(
    '/dislike-button-unclicked.png'
  );
  const [swipeDirection, setSwipeDirection] = useState('');

  const handleClickDislike = () => {
    dispatch(createDislike(id, firstUser?.id));
    setSwipeDirection('left');
    setTimeout(function () {
      setSwipeDirection('');
    }, 1000);
    dispatch(removeUser(allUsersNotLikedObj[firstUser?.id]));
  };

  const handleClickLike = () => {
    dispatch(createLike(id, firstUser?.id));
    setSwipeDirection('right');
    setTimeout(function () {
      setSwipeDirection('');
    }, 1000);
    dispatch(removeUser(allUsersNotLikedObj[firstUser?.id]));
  };

  const changeImageSourceLiked = (e) => {
    if (likeButton === '/like-button-clicked.png') {
      setLikeButton('/like-button-unclicked.png');
    } else {
      setLikeButton('/like-button-clicked.png');
    }
  };

  const changeImageSourceDisliked = (e) => {
    if (dislikeButton === '/dislike-button-clicked.png') {
      setDislikeButton('/dislike-button-unclicked.png');
    } else {
      setDislikeButton('/dislike-button-clicked.png');
    }
  };

  useEffect(() => {
    dispatch(getNewUsers(id));
    dispatch(getCurrentUserAndAnswers(id));
  }, [dispatch, id]);

  let weightClass;
  if (Number(firstUser?.weight_class) === 0)
    weightClass = "Women's Strawweight";
  if (Number(firstUser?.weight_class) === 1)
    weightClass = "Women's Bantamweight";
  if (Number(firstUser?.weight_class) === 2)
    weightClass = "Women's Featherweight";
  if (Number(firstUser?.weight_class) === 3)
    weightClass = "Women's Lightweight";
  if (Number(firstUser?.weight_class) === 4) weightClass = 'Lightweight';
  if (Number(firstUser?.weight_class) === 5) weightClass = 'Middleweight';
  if (Number(firstUser?.weight_class) === 6) weightClass = 'Heavyweight';

  let gender;
  if (Number(firstUser?.gender) === 0) {
    gender = 'Female';
  } else if (Number(firstUser?.gender) === 1) {
    gender = 'Male';
  } else {
    gender = 'Other';
  }

  const createMatchPercentage = () => {
    let total = 0;

    if (user.gender === firstUser.gender) {
      total += 49;
    } else if (Number(firstUser.gender) === 2) {
      total += 33;
    } else {
      total += 0;
    }
    if (user.location.split(',')[1] === firstUser.location.split(',')[1])
      total += 22;
    if (user.weight_class === firstUser.weight_class) total += 11;
    if (user.professional_level === firstUser.professional_level) total += 8;
    if (user.availability === firstUser.availability) total += 4;
    if (user.reach === firstUser.reach) total += 1;
    if (user.vaccinated === firstUser.vaccinated) total += 3;
    if (user.discipline === firstUser.discipline) total += 2;

    return total;
  };

  let usersLeftOrNoUsers;
  if (allUsersNotLiked.length === 0) {
    usersLeftOrNoUsers = (
      <div>'Out of users for today, better luck next time!'</div>
    );
  } else {
    usersLeftOrNoUsers = (
      <div className='main-area-container'>
        <div className='discover-title'>
          <h2>Recommended Just For You</h2>
        </div>
        <div className={`user-info-container ${swipeDirection}`}>
          <div className='top-row'>
            <div className='user-info'>
              <div className='full-name'>
                <p className='first-name'>{firstUser?.first_name}</p>
                <p className='last-name'>{firstUser?.last_name}</p>
              </div>
              <p>|</p>
              <p>{createMatchPercentage()}% Compatibility</p>
              <p>|</p>
              <Link to={`/users/${firstUser.id}`} className='view-profile-link'>
                View Profile <MdKeyboardArrowRight className='arrow-link' />
              </Link>
            </div>
            <div className='discover-btns'>
              <div onClick={handleClickDislike} className='pass-btn'>
                <img
                  className={`discover-button`}
                  src={dislikeButton}
                  onMouseDown={changeImageSourceDisliked}
                  onMouseUp={changeImageSourceDisliked}
                  alt=''
                />
              </div>
              <div onClick={handleClickLike} className='like-btn'>
                <img
                  className='discover-button'
                  src={likeButton}
                  onMouseDown={changeImageSourceLiked}
                  onMouseUp={changeImageSourceLiked}
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className='user-picture'>
            <img
              alt=''
              src={
                firstUser?.img_url === 'inTheWorks.jpg'
                  ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  : firstUser?.img_url
              }
              className='user-img'
            ></img>
          </div>
        </div>
        <div className={`bio-container ${swipeDirection}`}>
          <div className='bio-left'>
            <div className='about-me'>
              <h3>About Me</h3>
              <p>{firstUser?.about}</p>
            </div>
          </div>
          <div className='bio-right'>
            <div className='gender'>
              <FiUser className='bio-right-icon' />
              <p>{gender}</p>
            </div>
            <div className='location'>
              <FiMapPin className='bio-right-icon' />
              <p>{firstUser?.location}</p>
            </div>
            <div className='weightclass'>
              <GiWeight className='bio-right-icon' />
              <p>{weightClass}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className='discover-page'>{usersLeftOrNoUsers}</div>;
};

export default DiscoverPage;
